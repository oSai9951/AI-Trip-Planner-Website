export const SelectTravelesList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A sole traveles in exploration",
    icon: "✈",
    people: "1",
  },

  {
    id: 2,
    title: "Two People",
    desc: "Two traveles in tandem",
    icon: "🥂",
    people: "2",
  },
  {
    id: 3,
    title: "Family",
    desc: "A group of fun loving adventure",
    icon: "🏡",
    people: "3 to 5 People",
  },
  {
    id: 4,
    title: "Group",
    desc: "A bunch of thrill-seekers",
    icon: "⛵",
    people: "5 to 10 People",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of costs",
    icon: "💵",
  },
  {
    id: 1,
    title: "Moderate",
    desc: "Keep cost on the average",
    icon: "💰",
  },
  {
    id: 1,
    title: "Luxury",
    desc: "Dont worry about cost",
    icon: "💸",
  },
];

// export const AI_PROMPT =
//   "Generate travel plan for location: {location}, for {totalDays} days for {traveler} with a {budget}, give me a hotel's options list with hotel name, hotel address, price, hotel image url, geocoordinates, rating, destination and suggest itinerary with place name, place details, place image url, geocoordinates, ticket pricing, rating, time travel each of the location for {totalDays} days with each day planned with best time to visit in JSON format.";

export const AI_PROMPT = `
Generate travel plan for location: {location}, for {totalDays} days for {traveler} with a {budget} budget. 
Give me a hotel options list with hotel name, hotel address, estimated price in USD, hotel image url (if known), geocoordinates, approximate rating (based on known data as of 2023 or expected quality), destination. 
Avoid placeholder text like "Placeholder Price" or "Placeholder Rating". 
Instead, give expected average price range (e.g., $60-$90) and estimated rating (e.g., 3.5). 
Also suggest itinerary with place name, place details, place image url, geocoordinates, ticket pricing, rating, and best time to visit. Return everything in clean JSON format.
`;
