import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "models/gemini-1.5-pro",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: `Generate travel plan for location, Las Vegas, for 3 days for couple with a cheap budget, give me a hotel's options list with hotel name, hotel address, price, hotel image url, geocoordinates, rating, destination. and suggest itinerary with place name, place details, place image url, geocoordinates, ticket pricing, rating, time travel each of the location for 3 days with each day planned with best time to visit in JSON format.`,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `I cannot directly access and display images or real-time pricing for hotels.  Hotel prices are incredibly dynamic and change constantly.  Also, I don't have access to a live image database.  Therefore, I will provide the JSON structure with placeholders for the image URLs and prices. You will need to use a hotel booking site (like Booking.com, Expedia, Kayak, etc.) and Google Maps/other mapping services to fill in the missing information.
        
        \`\`\`json
        {
          "trip": {
            "destination": "Las Vegas, Nevada",
            "duration": "3 Days",
            "budget": "Cheap",
            "travelers": "Couple"
          },
          "hotels": [
            {
              "name": "Hotel Name 1",
              "address": "Hotel Address 1, Las Vegas, NV",
              "price": "Placeholder Price (e.g., $50-$80/night)",
              "imageUrl": "Placeholder Image URL 1",
              "geocoordinates": "[Latitude, Longitude]",
              "rating": "Placeholder Rating (e.g., 3.8)",
              "destination": "Las Vegas"
            },
            {
              "name": "Hotel Name 2",
              "address": "Hotel Address 2, Las Vegas, NV",
              "price": "Placeholder Price (e.g., $60-$90/night)",
              "imageUrl": "Placeholder Image URL 2",
              "geocoordinates": "[Latitude, Longitude]",
              "rating": "Placeholder Rating (e.g., 4.1)",
              "destination": "Las Vegas"
            },
            {
              "name": "Hotel Name 3",
              "address": "Hotel Address 3, Las Vegas, NV",
              "price": "Placeholder Price (e.g., $40-$70/night)",
              "imageUrl": "Placeholder Image URL 3",
              "geocoordinates": "[Latitude, Longitude]",
              "rating": "Placeholder Rating (e.g., 3.5)",
              "destination": "Las Vegas"
            }
          ],
          "itinerary": {
            "day1": [
              {
                "name": "The Strip (Free)",
                "details": "Walk the Las Vegas Strip, see the sights, take photos.",
                "imageUrl": "Placeholder Image URL (Strip)",
                "geocoordinates": "[36.1091,-115.1716]",
                "ticketPricing": "Free",
                "rating": "4.5",
                "time": "Morning to Evening"
              },
              {
                "name": "Free Show (Check specific schedules)",
                "details": "Many hotels offer free fountain shows, light shows, or other performances.",
                "imageUrl": "Placeholder Image URL (Show)",
                "geocoordinates": "[Varying]", 
                "ticketPricing": "Free",
                "rating": "4.0",
                "time": "Evening"
              }
            ],
            "day2": [
              {
                "name": "Red Rock Canyon National Conservation Area",
                "details": "Hike or drive through beautiful red rock formations.",
                "imageUrl": "Placeholder Image URL (Red Rock Canyon)",
                "geocoordinates": "[36.164,-115.659]",
                "ticketPricing": "Park Entrance Fee (Check Current Price)",
                "rating": "4.8",
                "time": "Morning to Afternoon"
              },
              {
                "name": "Downtown Container Park (Free Entry)",
                "details": "Unique shopping and dining area made from shipping containers.",
                "imageUrl": "Placeholder Image URL (Container Park)",
                "geocoordinates": "[36.1637,-115.142]",
                "ticketPricing": "Free entry, paid food/drinks",
                "rating": "4.2",
                "time": "Late Afternoon/Evening"
              }
            ],
            "day3": [
              {
                "name": "Fremont Street Experience (Free)",
                "details": "Experience the Viva Vision light show on Fremont Street.",
                "imageUrl": "Placeholder Image URL (Fremont Street)",
                "geocoordinates": "[36.1669,-115.1419]",
                "ticketPricing": "Free (Optional paid attractions)",
                "rating": "4.3",
                "time": "Evening"
              },
               {
                "name": "Seven Magic Mountains (Free)",
                "details": "Art installation south of Las Vegas; requires transport.",
                "imageUrl": "Placeholder Image URL (Seven Magic Mountains)",
                "geocoordinates": "[36.0199,-114.993]",
                "ticketPricing": "Free (but transport costs apply)",
                "rating": "4.5",
                "time": "Afternoon"
              }
            ]
          }
        }
        \`\`\`
        
        Remember to replace the placeholder values with actual data from your research.  Prioritize free activities and look for affordable food options (buffets can be surprisingly cheap but check reviews first).  Consider using public transport or ride-sharing services to reduce transportation costs.  Always check the latest prices and opening hours before your trip!
        `,
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: `INSERT_INPUT_HERE`,
        },
      ],
    },
  ],
});
