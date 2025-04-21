// src/service/UnsplashApi.js

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_API_KEY; // Replace with your key

// Generates a fallback random image URL with city or travel themes
function getFallbackImage(city) {
  const cityQuery = encodeURIComponent(city || "travel");
  return `https://source.unsplash.com/random/800x600/?${cityQuery},city`;
}

export const getUnsplashImage = async (query) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&client_id=${UNSPLASH_ACCESS_KEY}`,
    );
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      return data.results[0].urls.regular;
    } else {
      return getFallbackImage(query);
    }
  } catch (error) {
    console.error("Error fetching image from Unsplash:", error);
    return getFallbackImage(query);
  }
};
