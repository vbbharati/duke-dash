
# KTM Duke Smart Dash

An offline-capable Progressive Web App (PWA) designed to turn an older smartphone into an instrument cluster, GPS odometer, and turn-by-turn navigation dashboard for the KTM Duke 250.

Built with HTML5, Tailwind CSS, Leaflet.js, and vanilla JavaScript. Operates fully offline without active mobile network connectivity for telemetry and pre-cached routes.

---

## About the Author

This project was conceived and built by **Vishal Bharati**, a mechanical engineering and operations management professional based in Pune, India. Combining a background in manufacturing, lean systems, and industrial automation with hands-on "vibe coding" and digital prototyping, this dashboard was developed as a practical, open-source solution to replace a non-functional physical motorcycle cluster with a modern, glanceable digital cockpit.

---

## Features

* **High-Contrast Digital HUD:** Large, AMOLED-optimized digital speedometer (km/h), max speed capture, and moving average speed calculation.
* **Dual Odometer & Trip Meters:** Persistent Lifetime Odometer with initial baseline calibration, dual trip meters (`Trip A`), and ride elapsed time tracking.
* **Turn-by-Turn Navigation (Android Auto Style):** 
  * In-map destination search powered by Nominatim and Open Source Routing Machine (OSRM).
  * Direct map-tap point-to-point routing.
  * Turn instruction cards with bottom-up forward-vector directional arrows and remaining distance countdowns.
  * Auto-follow locking with manual pan override.
* **Dynamic Shift Lights:** Top-mounted progressive LED warning bar with customizable amber threshold and redline strobe flash.
* **Smart Fuel Telemetry:** On-screen numeric keypad modal to record fill-ups, calculate real-time estimated remaining volume (against the 13.4 L Duke tank), dynamic range estimation, and average consumption ($km/L$).
* **Offline Readiness & PWA Support:** Built-in Service Worker (`sw.js`) and Web App Manifest (`manifest.json`) for standalone full-screen execution with screen auto-sleep prevention via the Screen WakeLock API.

---

## File Structure

```text
duke-dash/
 ├── index.html        # Main dashboard interface, styles, and logic
 ├── manifest.json     # PWA configuration and standalone launch rules
 ├── sw.js             # Service worker handling asset caching
 ├── icon-192.png      # 192x192 app icon
 └── icon-512.png      # 512x512 app icon

Quick Setup & Deployment
1. Host via GitHub Pages
 * Fork or upload this repository to GitHub.
 * Ensure repository visibility is set to Public.
 * Navigate to Settings > Pages (under the "Code and automation" section).
 * Under Build and deployment > Branch, select main (or master) and directory / (root).
 * Click Save. GitHub Pages will deploy the app over HTTPS at https://<your-username>.github.io/<repo-name>/.
2. Install on Android (e.g., Samsung Galaxy M30)
 * Open Google Chrome on your mobile device and visit your deployment URL.
 * Allow Location/GPS permissions when prompted.
 * Tap the browser menu (⋮) and select Install app or Add to Home screen.
 * Launch Duke Dash directly from your app drawer. The app opens in standalone full-screen mode without browser address bars.
Hardware Mount & Automation Setup
For dedicated motorcycle installation (such as on a KTM Duke handlebar or stem mount):
 * Mounting: Use a vibration-dampened handlebar mount to isolate single-cylinder vibrations.
 * Power Supply: Connect a 12V-to-5V step-down USB charger to an ignition-switched line (ACC2).
 * Android Display Settings:
   * Enable Developer Options > Stay awake while charging.
   * Set screen lock to None for instant dash access.
 * Auto-Launch via MacroDroid:
   * Trigger: Power Connected (Ignition ON).
   * Actions: Screen ON > Brightness 100% > Launch Application (Duke Dash).
   * Sleep Trigger: Power Disconnected (Ignition OFF) > Wait 15s > Screen OFF.
Configuration & Usage
 * GPS Activation: Tap the GPS Status button on the top bar if your browser blocks automatic background location queries.
 * Switching Views: Tap SHOW MAP / SHOW HUD in the top navigation bar.
 * Odometer Baseline: Tap SET next to Total Odometer to enter your motorcycle's last known physical cluster reading.
 * Refueling: Tap the green REFUEL button to open the glove-friendly numeric pad, input liters pumped, or use the quick presets (+2L, +5L, FULL TANK).
 * Shift Light Tuning: Tap the top Settings (Gear Icon) to adjust amber alert speeds and redline flash limits using the steppers or sliders.
Tech Stack & Dependencies
 * Tailwind CSS CDN
 * Leaflet.js
 * OpenStreetMap Tiles
 * OSRM Routing Engine
 * Google Fonts (Chakra Petch)
 * HTML5 Geolocation API & Screen WakeLock API
License
This project is licensed under the MIT License - feel free to modify and adapt it for your bike setup.

