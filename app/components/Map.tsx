declare let window: any;
import React, { useEffect, useRef, useState } from "react";
import { GoogleLatLng, GoogleMap,Location } from "../types/mapType";

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<GoogleMap>();
    const [currentLocation, setCurrentLocation] = useState<Location>()
  const initMap = (zoomLevel: number, address: GoogleLatLng): void => {
    if (mapRef.current) {
      setMap(
        new window.google.maps.Map(mapRef.current, {
          zoom: 14,
          center: address,
          mapTypeControl: false,
          streetViewControl: true,
          rotateControl: false,
          scaleControl: false,
          fullscreenControl: false,
          panControl: false,
          zoomControl: true,
          gestureHandling: "greedy",
          mapTypeId: window.google.maps.MapTypeId.ROADMAP,
          draggableCursor: "auto",
          draggingCursor: "pointer",
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
            ],
          
        })
      );
    }
  };
  const defaultMapStart = (): void => {
    const defaultAddress = currentLocation
        ? new google.maps.LatLng(currentLocation?.lat, currentLocation?.lng)
        : new google.maps.LatLng(10.826721289712577, 106.63145566849501);
    

    initMap(14, defaultAddress);
};
  const startMap = () => {
      defaultMapStart();
  };
  useEffect(() => {
    startMap();
  },[] );

  return (
    <div className="w-full border flex h-[300px] ">
      <div
        ref={mapRef}
        className="w-full h-[300px]"
      ></div>
    </div>
  );
};

export default Map;
