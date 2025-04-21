import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";
import Footer from "../components/Footer";

const ViewTrip = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    const GetTripData = async () => {
      const docRef = doc(db, "AITrips", tripId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document", docSnap.data());
        setTrip(docSnap.data());
      } else {
        console.log("No search document");
        toast("No trip Found!");
      }
    };

    tripId && GetTripData();
  }, [tripId]);

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      {/* //information */}
      <InfoSection trip={trip} />
      {/* //hotels */}
      <Hotels trip={trip} />
      {/* //daily plan */}
      <PlacesToVisit trip={trip} />
      {/* //footer */}
      <Footer trip={trip} />
    </div>
  );
};

export default ViewTrip;
