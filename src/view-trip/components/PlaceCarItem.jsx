import { Button } from "@/components/ui/button";
import React from "react";
import { GrMapLocation } from "react-icons/gr";
import { Link } from "react-router-dom";

const PlaceCarItem = ({ activity }) => {
  return (
    <div
      className="border rounded-xl p-3 mt-1 flex gap-5
    hover:scale-105 transition-all hover:shadow-md "
    >
      <img
        src={
          activity.imageUrl ||
          "https://i0.wp.com/port2flavors.com/wp-content/uploads/2022/07/placeholder-614.png?fit=1200%2C800&ssl=1"
        }
        alt={activity.name}
        className="w-[130px] h-[130px] rounded-xl object-cover"
      />
      <div>
        <h2>{activity.name}</h2>
        <p className="text-sm text-gray-400">{activity.details}</p>
        <Link
          to={
            "https://www.google.com/maps/search/?api=1&query=" + activity?.name
          }
          target="_blank"
        >
          <Button size="sm" className="mt-1 cursor-pointer">
            <GrMapLocation />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PlaceCarItem;
