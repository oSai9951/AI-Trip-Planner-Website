import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPlaceId, getPhotoUrl } from "../../service/GlobalApi";
import { getUnsplashImage } from "../../service/unSplash";

const Hotels = ({ trip }) => {
  const [hotelsWithImages, setHotelsWithImages] = useState([]);

  useEffect(() => {
    const fetchHotelImages = async () => {
      if (!trip?.tripData?.hotels) return;

      const enrichedHotels = await Promise.all(
        trip.tripData.hotels.map(async (hotel) => {
          let lat = null;
          let lng = null;
          let imageUrl = "";

          try {
            const coords = JSON.parse(hotel.geocoordinates);
            if (Array.isArray(coords) && coords.length === 2) {
              lat = coords[0];
              lng = coords[1];
            }
          } catch (err) {
            console.warn(
              "Invalid geocoordinates for hotel:",
              hotel.name,
              hotel.geocoordinates,
            );
          }

          try {
            // Try to get Foursquare image
            if (lat && lng) {
              const fsq_id = await getPlaceId(hotel.name, lat, lng);
              if (fsq_id) {
                imageUrl = await getPhotoUrl(fsq_id);
              }
            }

            // If Foursquare doesn't return anything, try Unsplash
            if (!imageUrl) {
              imageUrl = await getUnsplashImage(hotel.name);
            }
          } catch (error) {
            console.error("Error fetching image:", error);
            imageUrl = await getUnsplashImage(hotel.name); // fallback in case of error
          }

          return {
            ...hotel,
            imageUrl:
              imageUrl ||
              "https://i0.wp.com/port2flavors.com/wp-content/uploads/2022/07/placeholder-614.png?fit=1200%2C800&ssl=1",
          };
        }),
      );

      setHotelsWithImages(enrichedHotels);
    };

    fetchHotelImages();
  }, [trip]);

  return (
    <>
      <div className="font-bold text-xl mt-5 mb-5">Hotel Recommendation</div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
        {hotelsWithImages.map((hotel, index) => (
          <div
            key={index}
            className="hover:scale-105 transition-all cursor-pointer"
          >
            <img
              src={hotel.imageUrl}
              className="rounded-xl h-48 w-full object-cover"
              alt={hotel?.name}
            />
            <div className="my-2 flex flex-col gap-2">
              <h2 className="font-medium">{hotel?.name}</h2>
              <h2 className="text-xs text-gray-500">
                <Link
                  to={
                    "https://www.google.com/maps/search/?api=1&query=" +
                    hotel?.name +
                    "," +
                    hotel?.address
                  }
                  target="_blank"
                >
                  📍 {hotel?.address}
                </Link>
              </h2>
              <h2 className="text-sm">💰 {hotel.price}</h2>
              <h2 className="text-sm">⭐ {hotel?.rating}</h2>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Hotels;
