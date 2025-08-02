const CACHE_NAME = 'moon-phases-pro-v2.2';
const OFFLINE_URL = 'offline.html';
const urlsToCache = [
  '/',
  '/Index.html',
  '/manifest.json',
  '/install-prompt.js',
  '/lroc_color_poles_1k.jpg',
  '/ldem_3_8bit.jpg',
  '/eso0932a (splashcreen).jpg',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/suncalc/1.9.0/suncalc.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
  'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js',
  OFFLINE_URL
];

// --- Helper Functions for Background Logic ---
const LUNAR_CYCLE_DAYS = 29.530588853;

function getPhaseName(phaseValue) {
    if (phaseValue < 0.02 || phaseValue > 0.98) return 'New Moon';
    if (phaseValue < 0.23) return 'Waxing Crescent';
    if (phaseValue < 0.27) return 'First Quarter';
    if (phaseValue < 0.48) return 'Waxing Gibbous';
    if (phaseValue < 0.52) return 'Full Moon';
    if (phaseValue < 0.73) return 'Waning Gibbous';
    if (phaseValue < 0.77) return 'Last Quarter';
    return 'Waning Crescent';
}

function calculateUpcomingPhases(currentPhaseValue, currentDate) {
    const targetPhases = { newMoon: 0, firstQuarter: 0.25, fullMoon: 0.5, lastQuarter: 0.75 };
    const results = {};
    const currentTimestamp = currentDate.getTime();
    for (const [name, targetPhase] of Object.entries(targetPhases)) {
        let phaseDifference = targetPhase - currentPhaseValue;
        if (phaseDifference < -0.01) {
            phaseDifference += 1;
        }
        const daysUntilPhase = phaseDifference * LUNAR_CYCLE_DAYS;
        results[name] = Math.round(daysUntilPhase);
    }
    return results;
}


self.addEventListener('install', event => {
  importScripts('https://cdnjs.cloudflare.com/ajax/libs/suncalc/1.9.0/suncalc.min.js');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        const cachePromises = urlsToCache.map(urlToCache => {
          return cache.add(urlToCache).catch(err => {
            console.warn(`Failed to cache ${urlToCache}:`, err);
          });
        });
        return Promise.all(cachePromises);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match(OFFLINE_URL))
    );
  } else {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then(cachedResponse => {
        return cachedResponse || fetch(event.request);
      })
    );
  }
});

self.addEventListener('periodicsync', event => {
    if (event.tag === 'check-moon-phases') {
        event.waitUntil(checkMoonPhasesAndNotify());
    }
});

async function checkMoonPhasesAndNotify() {
    const settings = await getFromIdb('notificationSettings');
    const location = await getFromIdb('userLocation');

    if (!settings || !location) {
        console.log("No settings or location for background check.");
        return;
    }

    const now = new Date();
    const moonIllumination = SunCalc.getMoonIllumination(now);
    const upcomingPhases = calculateUpcomingPhases(moonIllumination.phase, now);

    for (const phase in upcomingPhases) {
        if (settings[phase] && upcomingPhases[phase] === settings.daysBefore) {
            const phaseName = getPhaseName(Object.keys(upcomingPhases).indexOf(phase) * 0.25);
            self.registration.showNotification('Moon Phase Alert', {
                body: `Upcoming ${phaseName} in ${settings.daysBefore} day(s)!`,
                icon: 'lroc_color_poles_1k.jpg',
                badge: 'lroc_color_poles_1k.jpg'
            });
        }
    }
}

self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
            if (clientList.length > 0) {
                let client = clientList[0];
                for (let i = 0; i < clientList.length; i++) {
                    if (clientList[i].focused) {
                        client = clientList[i];
                    }
                }
                return client.focus();
            }
            return clients.openWindow('/');
        })
    );
});

// IndexedDB helpers to get data from the main thread
function getFromIdb(key) {
    return new Promise((resolve, reject) => {
        const openRequest = indexedDB.open('moon-app-db', 1);
        openRequest.onupgradeneeded = () => {
            const db = openRequest.result;
            if (!db.objectStoreNames.contains('settings')) {
                db.createObjectStore('settings', { keyPath: 'key' });
            }
        };
        openRequest.onsuccess = () => {
            const db = openRequest.result;
            const transaction = db.transaction('settings', 'readonly');
            const store = transaction.objectStore('settings');
            const request = store.get(key);
            request.onsuccess = () => {
                resolve(request.result ? request.result.value : null);
            };
            request.onerror = () => {
                reject(request.error);
            };
        };
        openRequest.onerror = () => {
            reject(openRequest.error);
        };
    });
}

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
