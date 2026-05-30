# 🌊 HydroClean - Smart Aquatic Plastic Monitoring System

HydroClean is an AI-powered aquatic plastic pollution monitoring system that enables users to report polluted water bodies and helps environmental organizations identify pollution hotspots efficiently.

The system uses the **Google Gemini API** for image analysis, **Geolocation API** for location tracking, and **Telegram Bot API** for automated NGO notifications.

---

## 📌 Problem Statement

Plastic pollution in rivers, lakes, ponds, and canals is increasing rapidly due to improper waste disposal and poor waste management practices.

Traditional monitoring methods are often:

- Expensive
- Infrastructure-heavy
- Difficult to scale
- Dependent on manual surveys

HydroClean provides a low-cost, community-driven alternative for monitoring aquatic plastic pollution.

---

## 🚀 Features

- 📷 Upload images of polluted water bodies
- 🤖 AI-powered plastic waste detection using Gemini API
- 📍 Automatic location detection using Geolocation API
- 📊 Pollution severity estimation
- 🔔 Telegram notifications for NGOs
- 🌍 Pollution hotspot identification
- ☁️ Cloud-based data processing

---

## 🏗️ System Workflow

```text
User Uploads Image
        │
        ▼
Location Captured (Geolocation API)
        │
        ▼
Image Sent to Backend
        │
        ▼
Gemini API Analysis
        │
        ▼
Plastic Waste Detection
        │
        ▼
Pollution Severity Estimation
        │
        ▼
Data Storage
        │
        ▼
Telegram Alert Generation
        │
        ▼
NGO Notification
```

---

## 🛠️ Tech Stack

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Python / Flask

### AI Integration
- Google Gemini API

### APIs
- Geolocation API
- Telegram Bot API

### Database
- Firebase / MongoDB (depending on implementation)

---

## 💡 How It Works

1. User captures or uploads an image of a polluted water body.
2. The browser retrieves the user's geographical location.
3. The image and location data are sent to the backend server.
4. Gemini API analyzes the image and identifies visible plastic waste.
5. The system estimates the pollution intensity.
6. Image details and coordinates are stored.
7. Telegram alerts are automatically sent to NGOs.
8. Reported locations can be used to identify pollution hotspots.

---

## ✨ Novelty

HydroClean combines:

- Community Participation
- Artificial Intelligence
- Geolocation Services
- Automated Alert Systems

into a single platform for aquatic plastic pollution monitoring.

Unlike traditional hardware-based monitoring systems, HydroClean is:

- Cost-effective
- Scalable
- Easy to deploy
- Suitable for rural and semi-urban regions

---

## 📈 Future Enhancements

- Mobile Application
- Real-time Pollution Heatmaps
- Drone-Based Monitoring
- Government Agency Integration
- Predictive Pollution Analytics
- Multi-language Support

---

## 👥 Team Members

- K R Sikha
- Mohamed Zayaf N A
- Mohammed Anoof
- Mohammed Haseeb K V

### Guide
**Mr. Shyjith M.B**

---

## 🎓 Academic Project

Developed as a Mini Project for the B.Tech Computer Science and Engineering Program.

---

## 📜 License

This project is intended for academic and educational purposes.
