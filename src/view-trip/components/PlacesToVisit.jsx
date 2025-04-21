import React, { useEffect, useState } from "react";
import PlaceCarItem from "./PlaceCarItem";
import { getPlaceId, getPhotoUrl } from "../../service/GlobalApi";
import { getUnsplashImage } from "../../service/unSplash";

const PlacesToVisit = ({ trip }) => {
  const [enrichedItinerary, setEnrichedItinerary] = useState({});

  useEffect(() => {
    const fetchImages = async () => {
      if (!trip?.tripData?.itinerary) return;

      const enriched = {};

      for (const [day, activities] of Object.entries(trip.tripData.itinerary)) {
        enriched[day] = await Promise.all(
          activities.map(async (activity) => {
            let lat = null;
            let lng = null;
            let imageUrl = "";

            try {
              const coords = JSON.parse(activity.geocoordinates);
              if (Array.isArray(coords) && coords.length === 2) {
                lat = coords[0];
                lng = coords[1];
              }
            } catch (err) {
              console.warn(
                "Invalid geocoordinates for activity:",
                activity.name,
              );
            }

            try {
              // Try Foursquare image
              if (lat && lng) {
                const fsq_id = await getPlaceId(activity.name, lat, lng);
                if (fsq_id) {
                  imageUrl = await getPhotoUrl(fsq_id);
                }
              }

              // If Foursquare fails, use Unsplash
              if (!imageUrl) {
                imageUrl = await getUnsplashImage(activity.name);
              }
            } catch (error) {
              console.error("Error fetching image:", error);
              imageUrl = await getUnsplashImage(activity.name); // fallback anyway
            }

            return {
              ...activity,
              imageUrl:
                imageUrl ||
                "https://i0.wp.com/port2flavors.com/wp-content/uploads/2022/07/placeholder-614.png?fit=1200%2C800&ssl=1",
            };
          }),
        );
      }

      setEnrichedItinerary(enriched);
    };

    fetchImages();
  }, [trip]);

  if (!trip?.tripData?.itinerary) {
    return <div>Loading itinerary...</div>;
  }

  return (
    <div>
      <h2 className="font-bold text-lg">Places to Visit</h2>
      <div>
        {Object.entries(enrichedItinerary).map(([day, activities], index) => (
          <div key={index}>
            <h2 className="font-medium text-lg mt-5">{day}</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {activities.map((activity, index) => (
                <div key={index} className="my-3">
                  <h2 className="font-medium text-sm text-orange-600">
                    {activity.time}
                  </h2>
                  <PlaceCarItem activity={activity} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacesToVisit;
