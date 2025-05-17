export async function getPlaceId(name, latitude, longitude) {
  const url = `https://api.foursquare.com/v3/places/search?query=${encodeURIComponent(name)}&ll=${latitude},${longitude}&limit=1`;

  const response = await fetch(url, {
    headers: {
      Authorization: import.meta.env.VITE_PLACES_API_KEY,
    },
  });

  const data = await response.json();
  console.log("📍 Foursquare Search Response:", data); 

  if (data.results && data.results.length > 0) {
    return data.results[0].fsq_id;
  }
  return null;
}

export async function getPhotoUrl(fsq_id) {
  const res = await fetch(
    `https://api.foursquare.com/v3/places/${fsq_id}/photos?limit=1`,
    {
      headers: {
        Authorization: import.meta.env.VITE_PLACES_API_KEY,
      },
    },
  );

  const photos = await res.json();
  console.log("🖼️ Foursquare Photo Response:", photos); 

  if (photos.length > 0) {
    return `${photos[0].prefix}original${photos[0].suffix}`;
  }
  return null;
}
