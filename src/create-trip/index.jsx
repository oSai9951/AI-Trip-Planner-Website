import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "../constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModal";
import { FcGoogle } from "react-icons/fc";
import { doc, setDoc } from "firebase/firestore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { db } from "@/service/firebaseConfig";
import { useNavigate } from "react-router-dom";

const CreateTrip = () => {
  const [apiData, setApiData] = useState({
    query: {
      selected_name: "",
      place: null,
    },
    suggestion: [],
  });
  const [openDialog, setOpenDialog] = useState(false);
  const skipFetch = useRef(false);
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

  const navigate = useNavigate();
  useEffect(() => {
    if (skipFetch.current) {
      skipFetch.current = false;
      return;
    }

    const fetchSuggestions = async () => {
      if (
        !apiData.query.selected_name ||
        apiData.query.selected_name.length < 2
      ) {
        setApiData((prev) => ({
          ...prev,
          suggestion: [],
        }));
        return;
      }

      try {
        const response = await fetch(
          `https://api.locationiq.com/v1/autocomplete?key=${API_KEY}&q=${apiData.query.selected_name}&limit=5&format=json`,
        );
        const data = await response.json();
        setApiData((prev) => ({
          ...prev,
          suggestion: Array.from(data) ? data : [],
        }));
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [apiData.query.selected_name]);

  const handleSelect = (place) => {
    skipFetch.current = true;
    setApiData((prev) => ({
      ...prev,
      query: {
        selected_name: place.display_name,
        place: place,
      },
      suggestion: [],
    }));
  };

  function handleFormSubmission(name, value) {
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  console.log(formData);

  const login = useGoogleLogin({
    onSuccess: (coderResp) => getUserProfile(coderResp),
    onError: (error) => console.log(error),
  });

  const getUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: `Application/json`,
          },
        },
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        handleGenerateTrip();
      });
  };
  async function handleGenerateTrip() {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }
    if (
      (!Number(formData?.noOfDays) < 5 && !formData?.location) ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast("Please fill all details");
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.display_name,
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result.response.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  }

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
  
    try {
      const parsed = JSON.parse(TripData);
      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: parsed,
        userEmail: user?.email,
        id: docId,
      });
    } catch (err) {
      console.error("Invalid JSON in TripData:", TripData);
      toast("Invalid trip data received. Please try again.");
      setLoading(false);
      return;
    }
  
    setLoading(false);
    navigate(`/view-trip/${docId}`);
  };
  
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🚞 🏖
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-9">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your destination of choice?
          </h2>

          <Input
            className="relative "
            value={apiData.query.selected_name || ""}
            onChange={(e) => {
              const value = e.target.value;
              setApiData((prev) => ({
                ...prev,
                query: {
                  ...prev.query,
                  selected_name: value,
                },
              }));
            }}
            placeholder="Search for a place..."
          />

          <ul
            className="absolute px-5 bg-white w-[400px] sm:w-[450px] md:sm:w-[500px] lg:w-[550px]  
                  xl:w-[900px] py-4 border-1 rounded-md shadow-md mt-1
                 "
            style={
              apiData.suggestion.length > 0
                ? { zIndex: "10", display: "block" }
                : { display: "none" }
            }
          >
            {apiData?.suggestion.map((place) => (
              <li
                className="py-1 font-semibold text-gray-500 cursor-pointer 
                         hover:border-2 hover:border-blue-300 hover:pl-1 hover:rounded-md
                         transition-all duration-200 ease-in-out"
                key={place.place_id}
                onClick={() => {
                  handleSelect(place);
                  handleFormSubmission("location", place);
                }}
              >
                {place.display_name}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder={"Ex. 3"}
            type="number"
            onChange={(e) => handleFormSubmission("noOfDays", e.target.value)}
          />
          {Number(formData.noOfDays) > 5 && (
            <p className="text-orange-600">
              Please enter number of days less than 5
            </p>
          )}
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                className={`p-4 cursor-pointer border rounded-lg hover:shadow-lg
              ${formData?.budget == item.title && "shadow-xl border-2 border-gray-500"}`}
                onClick={() => handleFormSubmission("budget", item.title)}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do you plan on traveling with on your next adventure?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelesList.map((item, index) => (
              <div
                key={index}
                className={`p-4 cursor-pointer border rounded-lg hover:shadow-lg
              ${formData?.traveler == item.people && "shadow-xl border-2 border-gray-500"}`}
                onClick={() => handleFormSubmission("traveler", item.people)}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="my-10 flex justify-end">
        <Button disabled={loading} onClick={handleGenerateTrip}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" />
              <h2 className="font-bold text-lg mt-7">Sign in with Google</h2>
              <p>Sign in to the App with Google authentication securely</p>
              <Button
                className="w-full mt-5 flec gap-4 items-center"
                onClick={login}
              >
                <FcGoogle className="h-7 w-7" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;
