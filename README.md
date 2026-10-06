# Moon Phases Pro 🌓

[![Website](https://img.shields.io/badge/Website-www.moonphases.pro-0f172a?style=for-the-badge&logo=googlechrome&logoColor=38bdf8)](https://www.moonphases.pro)
[![PWA Ready](https://img.shields.io/badge/PWA-Installable-blue?style=for-the-badge&logo=pwa&logoColor=white)](https://www.moonphases.pro)
[![NASA SVS](https://img.shields.io/badge/Imagery-NASA%20SVS-0b3d91?style=for-the-badge&logo=nasa&logoColor=white)](https://svs.gsfc.nasa.gov/)
[![Deployment](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)](https://www.moonphases.pro)

> **Official Website**: [**https://www.moonphases.pro**](https://www.moonphases.pro)  
> *Your daily moon companion with real-time 3D lunar rendering, astronomical ephemeris, and celestial event telemetry.*

---

## 🌟 Overview

**Moon Phases Pro** is a modern, high-precision lunar tracking Progressive Web App (PWA) inspired by Apple aesthetics and aeronautical telemetry dashboards. Powered by high-resolution imagery from the **NASA Scientific Visualization Studio (SVS)**, **Three.js** 3D graphics, and astronomical algorithms via **SunCalc**, Moon Phases Pro delivers real-time phase calculations, illumination percentages, golden/blue hour ephemeris, and eclipse telemetry right to your browser and mobile home screen.

---

## ✨ Features

- **🌓 Photorealistic 3D Lunar Visualization**: Real-time phase shading mapped over NASA LROC color topology texture maps.
- **🛰️ Celestial Events & Eclipse Telemetry**: Live countdowns, magnitude, Saros series numbers, duration, and global visibility tracking.
- **⏱️ Monospace Real-Time Countdowns**: Flighty-inspired live precision timing for upcoming lunar transitions and eclipses.
- **📅 One-Click Calendar Integration**: Export major lunar milestones and eclipse moments directly to `.ics` calendars (Apple Calendar, Google Calendar, Outlook).
- **🧭 Live Astronomical Ephemeris**: Real-time altitude, azimuth, moonrise/moonset, and distance from Earth adjusted to your geographic coordinates.
- **📱 PWA Offline Ready**: Installable to iOS and Android home screens with full offline caching via Service Worker.
- **📊 Real-Time Vercel Web Analytics**: Privacy-first, lightweight telemetry.

---

## 🛠️ Technology Stack

- **Frontend Core**: Vanilla HTML5, Modern ES6+ JavaScript, Tailwind CSS
- **3D Visualization**: [Three.js](https://threejs.org/)
- **Astronomical Engine**: [SunCalc.js](https://github.com/mourner/suncalc) (custom calibrated ephemeris)
- **Imagery**: NASA Scientific Visualization Studio (LROC, LOLA DEM data)
- **Deployment & Hosting**: [Vercel](https://vercel.com/)
- **Production Domain**: [https://www.moonphases.pro](https://www.moonphases.pro)

---

## 🚀 Local Development

To run Moon Phases Pro locally:

```bash
# Clone repository
git clone https://github.com/marcandreasyao/Moon-Phases-Pro.git
cd Moon-Phases-Pro

# Serve locally with any static server (e.g., Python or Node)
python3 -m http.server 8080
# or
npx serve .
```

Open your browser at `http://localhost:8080` to view the application.

---

## 🌐 Production Domain & Deployment

The official production domain is configured at:
- **Primary Domain**: `https://www.moonphases.pro`
- **Apex Domain Redirect**: `https://moonphases.pro` &rarr; `https://www.moonphases.pro`

---

## 👤 Author

Designed & developed by **Marc Andréas Yao**.  
Lunar surface textures and imagery courtesy of **NASA / GSFC / Scientific Visualization Studio**.
