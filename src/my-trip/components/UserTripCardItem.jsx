import { getUnsplashImage } from '@/service/unSplash';
import React, { useEffect, useState } from 'react';

const UserTripCardItem = ({ trip, index }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchPhoto = async () => {

      const city =
        trip?.userSelection?.location?.address?.display_place ||
        trip?.userSelection?.location?.address?.name ||
        trip?.userSelection?.location?.label;

      if (!city) {
        console.warn("City name not found for trip:", trip);
        return;
      }

      try {
        const imageUrl = await getUnsplashImage(city);
        setImage(imageUrl);
      } catch (err) {
        console.error("Error fetching Unsplash image:", err);
      }
    };

    if (trip) fetchPhoto();
  }, [trip]);

  return (
    <div className="border rounded-xl overflow-hidden 
    hover:scale-105 transition-all hover:shadow-md" key={index}>
      <img
        src={image}
        className="w-full h-40 object-cover"
        alt="Trip destination"
      />
      <div className="p-3">
        <h2 className="font-bold text-lg">
          {trip?.userSelection?.location?.display_place || "Unknown Place"}
        </h2>
        <p className="text-sm text-gray-500">
          {trip?.userSelection?.noOfDays || "?"} Days trip with {trip?.userSelection?.budget || "?"} Budget
        </p>
      </div>
    </div>
  );
};

export default UserTripCardItem;
