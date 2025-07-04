# farmerproject
for an ideathon
# AgroPredictor: AI Agricultural Intelligence

![AgroPredictor Logo](https://placehold.co/600x300/1a201b/4CAF50?text=AgroPredictor)

**AgroPredictor** is a sophisticated, AI-powered web application designed to provide farmers, traders, and agricultural analysts with actionable intelligence. By integrating real-time climate data, market trends, and advanced AI models, this tool empowers users to make informed decisions, mitigate risks, and maximize profitability.

---

## ✨ Key Features

* **Interactive Dashboard:** A central hub providing an at-a-glance overview of critical metrics, including local weather, soil moisture, drought risk, and a 7-day forecast.
* **AI Crop Recommender:** Leverages the Google Gemini API to deliver detailed crop suggestions based on location, climate conditions, and weather forecasts. Recommendations include soil preparation, water management, and potential risks.
* **Dynamic Field Insights:** An AI-driven advisory page that generates real-time alerts and recommendations for:
    * Pest & Disease Risks
    * Irrigation Scheduling
    * Fertilizer Application Timing
    * Nutrient Deficiency Warnings
    * Market Opportunities
* **Comprehensive Climate Analysis:** Visualizes historical climate data (Temperature, Rainfall, Soil Moisture) through interactive charts, allowing for in-depth trend analysis.
* **Advanced Market Watch:** Tracks global commodity prices with a searchable interface. It features an interactive price chart and a "Market Snapshot" with key statistics and AI-generated sentiment analysis.
* **Dynamic Location Selector:** Users can easily change their location by typing any city/region into a modern modal window, which instantly updates all relevant data across the application.
* **Stunning "Verdant Field" UI:** A professionally designed, farmer-centric user interface featuring a beautiful agricultural background, high-contrast text, and an intuitive layout for an exceptional user experience.

---

## 🛠️ Tech Stack

* **Frontend:**
    * **HTML5:** For the core structure of the application.
    * **CSS3:** For all styling, animations, and the responsive "Verdant Field" theme.
    * **JavaScript (ES6+):** For all interactivity, DOM manipulation, API calls, and application logic.
* **APIs & Libraries:**
    * **Google Gemini API:** Powers the AI Crop Recommender and Field Insights features.
    * **Chart.js:** Used for creating beautiful, interactive, and responsive charts for climate and market data.
    * **Unsplash:** For the high-quality background image.

---

## 📂 File Structure

The project is organized into three main files for clarity and maintainability:


/AgroPredictor
|-- index.html         # The main HTML file containing the page structure.
|-- style.css          # All CSS for styling, layout, and animations.
|-- script.js          # All JavaScript for application logic and interactivity.


---

## 🚀 Setup and Usage

To run this project locally, simply follow these steps:

1.  **Download the Files:** Save `index.html`, `style.css`, and `script.js` into a single folder on your computer.
2.  **Open in Browser:** Double-click the `index.html` file to open it in your web browser (e.g., Google Chrome, Mozilla Firefox).

The application is fully functional out-of-the-box using mock data. To connect to live data, you will need to integrate the relevant APIs within the `script.js` file.

---

## 🔌 API Integration

The application is designed for easy integration with live data sources. The primary areas for API integration are within the `script.js` file:

* **AI Features:** The `handleRecommendationSubmit` function contains the fetch call to the **Google Gemini API**.
* **Climate Data:** The mock data objects (`mockClimateData`) can be replaced with API calls to a service like the **NASA POWER API**.
* **Market Data:** The `mockMarketData` object can be replaced with API calls to a service like the **Barchart API**.

---

## 📸 Screenshots

| Dashboard View                                        | Crop AI Recommendation                               |
| ----------------------------------------------------- | ---------------------------------------------------- |
| ![Dashboard](https://placehold.co/400x250/1a201b/f0f0f0?text=Dashboard) | ![Crop AI](https://placehold.co/400x250/1a201b/f0f0f0?text=Crop+AI) |

---
![Screenshot 2025-07-05 040004](https://github.com/user-attachments/assets/c03bdd9a-0709-4e47-8f20-fa83794dee57)
![Screenshot 2025-07-05 040019](https://github.com/user-attachments/assets/7b597be3-bd13-4aab-8466-551a77c69d8a)
![Screenshot 2025-07-05 040113](https://github.com/user-attachments/assets/4ab595a6-4f79-4135-a674-c0bd14b3cf0c)
![Screenshot 2025-07-05 040121](https://github.com/user-attachments/assets/501db941-2f27-49e3-b158-167bc9637f5a)
![Screenshot 2025-07-05 040203](https://github.com/user-attachments/assets/0a8d975f-aeae-4d2b-887b-83703f3abeea)

## 🔮 Future Improvements

* **User Authentication:** Add user accounts to save preferences, locations, and historical data.
* **Live Weather Alerts:** Integrate a real-time weather API to provide push notifications for severe weather warnings.
* **Multi-Language Support:** Localize the application for farmers in different regions.
* **Offline Functionality:** Use service workers to cache data and provide limited functionality without an internet connection.
