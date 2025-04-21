import { db } from "@/service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTripCardItem from "./components/UserTripCardItem";

const MyTrips = () => {
  const navigation = useNavigate();
const [userTrips, setUserTrips] = useState([])
  useEffect(() => {
    const GetUserTrips = async () => {
      const userStr = JSON.parse(localStorage.getItem("user"));
      console.log("Parsed user:", userStr);
      if (!userStr) {
        navigation("/create-trip");
        return;
      }
      
      const q = query(
        collection(db, "AITrips"),
        where("userEmail", "==", userStr?.email)
      );
      
setUserTrips([])
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
       
        setUserTrips(prev=>[...prev, doc.data()])
      });
    }

    GetUserTrips();
  }, []);
console.log(userTrips)
  return <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
    <h2 className="font-bold text-3xl">My trip & Search History</h2>
    <div className="grid grid-cols-2 mt-10 md:grid-cols-3 gap-5">
        {userTrips.map((trip, index)=>(
            <UserTripCardItem trip={trip} index={index}/>
        ))}
    </div>
  </div>;
};

export default MyTrips;
