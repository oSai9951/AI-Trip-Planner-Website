import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { getUnsplashImage } from "../../service/unSplash"; // image fetch utility

const InfoSection = ({ trip }) => {
  console.log("trip", trip)
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      const label = trip?.userSelection?.location?.label;
      const displayPlace = trip?.userSelection?.location?.address?.display_place;
      const cityName = label || displayPlace || trip?.userSelection?.location?.address?.name;

      if (!cityName) {
        console.warn("City name not found.");
        return;
      }

      try {
        const imageUrl = await getUnsplashImage(`${cityName} travel`); // use more specific query
        setImage(imageUrl);
      } catch (err) {
        console.error("Error fetching Unsplash image:", err);
      }
    };

    if (trip) fetchPhoto();
  }, [trip]);

  return (
    <div>
      <img
        src={
          image ||
          "https://i0.wp.com/port2flavors.com/wp-content/uploads/2022/07/placeholder-614.png?fit=1200%2C800&ssl=1"
        }
        className="h-[340px] w-full object-cover rounded-xl"
        alt="Location"
      />

      <div className="flex justify-between items-center gap-4">
        <div className="my-5 flex-col gap-2">
          <h2 className="font-bold text-2xl mb-2">
            {trip?.userSelection?.location?.display_place || "Unknown Location"}
          </h2>
          <div className="flex gap-5 flex-wrap">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs text-center md:text-lg">
              📅 {trip?.userSelection?.noOfDays} Day
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs text-center md:text-lg">
              💵 {trip?.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs text-center md:text-lg">
              ✈ No. of Travellers: {trip?.userSelection?.traveler} people
            </h2>
          </div>
        </div>
        <Button>
          <BsFillSendFill />
        </Button>
      </div>
    </div>
  );
};

export default InfoSection;
