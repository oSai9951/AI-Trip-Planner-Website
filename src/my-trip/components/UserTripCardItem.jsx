import { Button } from "@/components/ui/button"; // shadcn button
import { getUnsplashImage } from '@/service/unSplash';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";

const UserTripCardItem = ({ trip, index }) => {
  const navigate = useNavigate();
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

  function goToTrip(trip) {
    navigate(`/view-trip/${trip?.id}`);
  }

  const deleteTrip = async () => {
    const confirm = window.confirm("Are you sure you want to delete this trip?");
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, "AITrips", trip.id));
      alert("Trip deleted successfully.");
      window.location.reload(); // or lift state
    } catch (error) {
      console.error("Error deleting trip:", error);
      alert("Failed to delete trip. Please try again.");
    }
  };

  return (
    <div
      className="border rounded-xl overflow-hidden hover:scale-105 transition-all hover:shadow-md"
      key={index}
    >
      <img
        onClick={() => goToTrip(trip)}
        src={image}
        className="w-full h-40 object-cover cursor-pointer"
        alt="Trip destination"
      />
      <div className="p-3">
        <h2 className="font-bold text-lg">
          {trip?.userSelection?.location?.display_place || "Unknown Place"}
        </h2>
        <p className="text-sm text-gray-500">
          {trip?.userSelection?.noOfDays || "?"} Days trip with {trip?.userSelection?.budget || "?"} Budget
        </p>

        <Button
          variant="destructive"
          onClick={deleteTrip}
          className="mt-3"
        >
          Delete Trip
        </Button>
      </div>
    </div>
  );
};

export default UserTripCardItem;
