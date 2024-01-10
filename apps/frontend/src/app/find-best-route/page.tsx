"use client";

import Distance from "@/components/FindBestRoute/Distance";
import ListPort from "@/components/FindBestRoute/ListPort";
import OptionSelect from "@/components/Shared/OptionSelect";
import { useCountries } from "@/hooks/useCountries";
import { validateCountries } from "@/utils/validation";
import { useEffect, useState } from "react";

import { findBestRoute, FindBestRouteResponseDto } from "../api/shipment/find-best-route";

const FindBestRoute = () => {
  const listCountry = useCountries();
  const [sourceCountry, setSourceCountry] = useState("");
  const [destinationCountry, setDestinationCountry] = useState("");
  const [bestRoute, setBestRoute] = useState<FindBestRouteResponseDto | null>(null);

  useEffect(() => {
    const fetchBestRoute = async () => {
      if (validateCountries(sourceCountry, destinationCountry)) {
        return;
      }
      const bestRoute = await findBestRoute(sourceCountry, destinationCountry);
      setBestRoute(bestRoute);
    };
    fetchBestRoute();
  }, [sourceCountry, destinationCountry]);
  return (
    <>
      <h1 className="text-4xl font-bold text-center text-blue-300 my-8">Find the Cheapest Route</h1>
      <div className="flex gap-12">
        <div className="flex-1">
          <OptionSelect
            value={sourceCountry}
            onChange={setSourceCountry}
            options={listCountry.filter((country) => country !== destinationCountry)}
            className="w-80"
            label="Please select source country"
          />
          <ListPort country={sourceCountry} highlightPort={bestRoute?.sourcePort} />
        </div>
        <div className="flex-1">
          <OptionSelect
            value={destinationCountry}
            onChange={setDestinationCountry}
            options={listCountry.filter((country) => country !== sourceCountry)}
            label={"Please select destination country"}
            className="w-80"
          />
          <ListPort country={destinationCountry} highlightPort={bestRoute?.destPort} />
        </div>
      </div>
      <div>{bestRoute?.distance && <Distance distance={bestRoute.distance} />}</div>
    </>
  );
};

export default FindBestRoute;
