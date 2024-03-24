/* eslint-disable @next/next/no-img-element */
"use client";
declare let window: any;
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Map from "../components/Map";
import Loading from "../components/Loading";
import { IMarker } from "../types/mapType";

const CreateEvent = () => {
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [scriptLoadedForMap, setScriptLoadedForMap] = useState(true);
  const [addedMarker, setAddedMarker] = useState<IMarker>();
  useEffect(() => {
    const loadGoogleMapsScript = (): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (window.google) {
          // Google Maps script is already loaded
          resolve();
        } else {
          // Google Maps script is not yet loaded, create a script element and append it to the document
          const script = document.createElement("script");
          script.src = `https:maps.googleapis.com/maps/api/js?key=AIzaSyCFMU4e1Q5EKIOEo8qbxPArWTZskWtxjkY&libraries=geometry,places&language=vi&region=vi&v=quarterly`;
          script.async = true;
          script.defer = true;
          script.onload = () => {
            resolve();
          };
          script.onerror = () => {
            reject(new Error("Failed to load Google Maps script."));
          };
          document.head.appendChild(script);
        }
      });
    };
    loadGoogleMapsScript()
      .then(() => {
        setGoogleLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
    return () => {};
  }, []);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [ShowDateandTime, setShowDateandTime] = useState<boolean>(false);
  const[showOtherInfo,setShowOtherInfo]=useState<boolean>(false)
  const [location, setLocation] = useState('');
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setLocation(e.target.value);

  }
  return (
    <div className=" w-screen relative px-[120px]  ">
      <div className="flex items-center py-[20px] fixed h-[80px] z-[10] bg-white left-0 right-0 px-[120px] w-full">
        <Link href="/events">Back</Link>
        <h2 className="absolute left-[50%] uppercase translate-x-[-50%] text-[24px]">
          Create An Event
        </h2>
      </div>
      <div className="w-full min-h-[swap-height]  flex flex-col absolute top-[80px] left-0 right-0 items-center justify-center overflow-scroll">
        <motion.div
          initial={{ height: "61px", overflow: "hidden" }}
          animate={{ height: showInfo ? "500px" : "61px" }}
          transition={{ duration: 0.2 }}
          className="w-[50%] h-[60px] border  rounded-[10px] shadow-sm p-[20px] "
        >
          <div className="flex justify-between border-b-[1px] mb-[10px]">
            <h4 className="text-[20px] font-[500] mb-[10px] text-[#8b5cf6]">
              Basic Information
            </h4>
            {showInfo ? (
              <svg
                onClick={() => setShowInfo(false)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-5 h-5 cursor-pointer"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m4.5 15.75 7.5-7.5 7.5 7.5"
                />
              </svg>
            ) : (
                <svg
                onClick={() => setShowInfo(true)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-5 h-5 cursor-pointer"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            )}
          </div>
          <p>All of these fields can also be adjusted later</p>
          <div className="flex justify-between mt-[30px]">
            <div className="w-1/2 mt-[20px] ">
              <div className="w-[80%] border border-[#8b5cf6] rounded-[5px] h-[80%] shadow-md">
                <div className="w-full h-full flex items-center justify-center">
                  <p>No image selected</p>
                </div>
              </div>
              <p className="text-[#988f8f] text-[13px] mt-[10px]">
                This image will be used for your event page,
                <div> as well as the NFT Tickets default.</div>
              </p>
              <div className="w-[80%] mt-[20px]  flex items-center justify-center">
                <div className="border rounded-[10px] py-1 px-[20px] cursor-pointer border-[#8b5cf6]">
                  Select an image file
                </div>
              </div>
            </div>
            <div className="w-1/2">
              <div>
                <label htmlFor="eventName">Event Name</label>
                <input
                  type="text"
                  id="eventName"
                  className="w-full p-[10px] text-[#212121] rounded-[5px] mt-[5px] bg-transparent outline-none border border-[#8b5cf6] "
                />
                <p className="text-[#988f8f] text-[13px] mt-[10px]">
                  Enter the name of your event.It will appear on the NFT tickets
                </p>
              </div>
              <div className="mt-[20px]">
                <label htmlFor="eventName">Description</label>
                <textarea
                  id="eventName"
                  className="w-full p-[10px] text-[#212121] rounded-[5px] mt-[5px] bg-transparent outline-none border border-[#8b5cf6] "
                />
                <p className="text-[#988f8f] text-[13px] mt-[5px]">
                  Enter a description for your event
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ height: "60px", overflow: "hidden" }}
          animate={{ height: ShowDateandTime ? "500px" : "60px" }}
          transition={{ duration: 0.2 }}
          className="w-[50%] border  mt-[50px] rounded-[10px] shadow-sm p-[20px] "
        >
          <div className="flex justify-between border-b-[1px] mb-[10px]">
            <h4 className="text-[20px] font-[500] mb-[10px] text-[#8b5cf6]">
              Location, date and time
            </h4>
            {ShowDateandTime ? (
              <svg
                onClick={() => setShowDateandTime(false)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-5 h-5 cursor-pointer"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m4.5 15.75 7.5-7.5 7.5 7.5"
                />
              </svg>
            ) : (
                <svg
                onClick={() => setShowDateandTime(true)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-5 h-5 cursor-pointer"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            )}
          </div>
          <p>
            This information will be public and included on each of the NFT
            tickets. There again it can be adjusted later
          </p>
          <div className="flex justify-between mt-[30px]">
            <div className="w-1/2 mt-[20px] ">
              <div className="w-[95%] border border-[#8b5cf6] rounded-[5px] h-[300px] shadow-md">
                {scriptLoadedForMap && googleLoaded ? (
                  <Map />
                ) : (
                  <div className="w-screen h-screen flex-col flex-center justify-center">
                    <Loading />
                  </div>
                )}
              </div>
            </div>
            <div className="w-1/2">
              <div className="flex items-center justify-between">
                <div className=" w-[48%]">
                  <label htmlFor="eventName">Starting date</label>
                  <input
                    type="date"
                    id="eventName"
                    className="w-full p-[10px] text-[#212121] rounded-[5px] mt-[5px] bg-transparent outline-none border border-[#8b5cf6] "
                  />
                </div>
                <div className=" w-[48%]">
                  <label htmlFor="eventName">Time</label>
                  <input
                    type="time"
                    id="eventName"
                    className="w-full p-[10px] text-[#212121] rounded-[5px] mt-[5px] bg-transparent outline-none border border-[#8b5cf6] "
                  />
                </div>
              </div>
              <div className="flex items-center justify-between mt-[20px]">
                <div className=" w-[48%]">
                  <label htmlFor="eventName">Ending date</label>
                  <input
                    type="date"
                    id="eventName"
                    className="w-full p-[10px] text-[#212121] rounded-[5px] mt-[5px] bg-transparent outline-none border border-[#8b5cf6] "
                  />
                </div>
                <div className=" w-[48%]">
                  <label htmlFor="eventName">Time</label>
                  <input
                    type="time"
                    id="eventName"
                    className="w-full p-[10px] text-[#212121] rounded-[5px] mt-[5px] bg-transparent outline-none border border-[#8b5cf6] "
                  />
                </div>
              </div>
              <div className="mt-[20px]">
                <label htmlFor="eventName">Location</label>
                <input
                  value={location}
                  id="text"
                  onChange={handleOnChange}
                  placeholder="Ho Chi Minh City, Vietnam"
                  className="w-full p-[10px] text-[#212121] rounded-[5px] mt-[5px] bg-transparent outline-none border border-[#8b5cf6] "
                />
                <p className="text-[#988f8f] text-[13px] mt-[5px]">
                  Enter the location where takepplace your event
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ height: "61px", overflow: "hidden" }}
          animate={{ height: showOtherInfo ? "250px" : "61px" }}
          transition={{ duration: 0.2 }}
          className="w-[50%] h-[60px] border mt-[50px] rounded-[10px] shadow-sm p-[20px] "
        >
          <div className="flex justify-between border-b-[1px] mb-[10px]">
            <h4 className="text-[20px] font-[500] mb-[10px] text-[#8b5cf6]">
              Price and other information
            </h4>
            {showOtherInfo ? (
              <svg
                onClick={() => setShowOtherInfo(false)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-5 h-5 cursor-pointer"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m4.5 15.75 7.5-7.5 7.5 7.5"
                />
              </svg>
            ) : (
                <svg
                onClick={() => setShowOtherInfo(true)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-5 h-5 cursor-pointer"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            )}
          </div>
          <p>All of these fields can also be adjusted later</p>
          <div className=" w-full  mt-[20px]">
            <p className="font-[500] text-[20px]">Currency and Price:</p>
            <div className="w-[99%]  flex justify-between mt-[10px] ">
              <div className="w-[49%] border border-[#8b5cf6] rounded-[5px] px-[15px] flex items-center ">
              <img
                  className="h-[25px] w-[25px] mr-1"
                  src="https://assets.staticimg.com/cms/media/8uGGQmvkfODw7cnx3GuekBb404A2bTYUcTjBklHja.png"
                  alt=""
                />
                <p>SUI</p>
              </div>
              <input
                  type="number"
                id="eventName"
                placeholder="0"
                  className="w-[49%] p-[10px] text-[#212121] rounded-[5px] bg-transparent outline-none border border-[#8b5cf6] "
                />
             
            </div>
          </div>
        </motion.div>
        <div className="w-full flex items-center justify-center mt-[50px] ">
                <div className="border py-3 px-[150px] rounded-[20px] bg-[#8b5cf6] text-white cursor-pointer">Create an event</div>
            </div>
      </div>
    </div>
  );
};

export default CreateEvent;
