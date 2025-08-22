# ✈🧳 AI Trip Planner

Trip Planner is a smart travel planning application that helps users receive personalized recommendations for places to visit, hotel suggestions, and itinerary plans based on trip preferences like destination, budget, duration, and group size.

---

## 🚀 Features

- 🌍 **Destination Input Form**  
  Users can input where they're going, for how many days, number of people (max: 5), and whether they want a budget-friendly trip.

- 💡 **AI-Based Recommendations**  
  Uses **Gemini API** to generate dynamic JSON-based recommendations including:
  - Suggested places to visit
  - Day-wise itineraries
  - Hotel recommendations based on budget and group size

- 🏨 **Hotel Suggestions**  
  Provides hotel options suited to the trip duration, budget, and number of travelers.

- 📍 **Tourist Spots**  
  Recommends tourist destinations based on the city and number of days.  
  _Example: Going to New Delhi? The app will suggest must-visit places for each day._

- 🧠 **Gemini API Integration**  
  Gemini helps generate structured travel data in JSON format for dynamic rendering of trip details.

- 🔍 **Place Autocomplete**  
  Integrated Autocomplete API to suggest places as the user types.

- 🖼️ **Visual Enhancements**  
  Images and visuals are fetched using external APIs to enhance user experience.

---

## 🛠️ Tech Stack & APIs

- **Frontend**: React (with Vite), Shadcn, Tailwindcss
- **Backend**: Firebase Realtime Database
- **APIs Used**:
  - 🌟 Gemini API (for trip and itinerary recommendations)
  - 🔄 Place Autocomplete API
  - 🖼️ External API for images

---

## 📌 How it Works

1. **User fills the form** with:
   - Destination
   - Trip duration (in days)
   - Number of travelers 
   - Budget preference 

2. **Form data is sent to Gemini API**, which:
   - Generates personalized travel plans
   - Returns JSON with itineraries, hotels, and place

3. **The data is then used** to dynamically render:
   - Daily travel plans
   - Hotels fitting the budget
   - Places to visit on each day

---

## 📷 Demo Link

https://travel-planner-mu-lyart.vercel.app/

---

## 📌 Note

This project aims to simplify travel planning using AI and provide a smooth, intuitive user experience with real-time suggestions and intelligent recommendations.

---


