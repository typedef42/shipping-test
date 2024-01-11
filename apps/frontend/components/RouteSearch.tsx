"use client";

import axiosInstance from "@/axios/axiosInstance";
import React, { useEffect, useState } from "react";

import { Route } from "../interfaces";
import AvailableRouteList from "./AvailableRouteList";
import BestRoute from "./BestRoute";
import CountrySelector, { COUNTRY_TYPE } from "./CountrySelector";
import ErrorMessage from "./ErrorMessage";

const defaultCheapestRoute = { departurePort: "", arrivalPort: "", distance: 0 };

const RouteSearch: React.FC = () => {
  const [sourceCountry, setSourceCountry] = useState("");
  const [destinationCountry, setDestinationCountry] = useState("");
  const [cheapestRoute, setCheapestRoute] = useState<Route>(defaultCheapestRoute);
  const [availableCountries, setAvailableCountries] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [routes, setRoutes] = useState<Route[]>([]);
  const [isShowAll, setIsShowAll] = useState<boolean>(false);

  useEffect(() => {
    const fetchAvailableCountries = async () => {
      try {
        const { data } = await axiosInstance.get("/port/listCountries");
        setAvailableCountries(data);
        setSourceCountry(data[0]);
        setDestinationCountry(data[1]);
      } catch (error: any) {
        setErrorMessage(error?.message || "Something went wrong to get countries list! Please try again.");
      }
    };
    fetchAvailableCountries();
  }, []);

  const fetchCheapestRoute = async () => {
    try {
      const response = await axiosInstance.get(`/shipment/find-best-route/${sourceCountry}/${destinationCountry}`);
      const {
        data: { cheapestRoute, allAvailableRoutes },
      }: { data: { cheapestRoute: Route; allAvailableRoutes: Route[] } } = response;
      setCheapestRoute(cheapestRoute);
      setRoutes(allAvailableRoutes);
      setErrorMessage("");
    } catch ({ response: { data } }: any) {
      setErrorMessage(data?.message || "Something went wrong! Please try again.");
      setCheapestRoute(defaultCheapestRoute);
      setRoutes([]);
    }
  };

  const onSelectCountry = (countryType: string, countryValue: string) => {
    if (countryType === COUNTRY_TYPE.SOURCE) {
      setSourceCountry(countryValue);
    } else {
      setDestinationCountry(countryValue);
    }
  };

  return (
    <>
      <CountrySelector
        sourceCountry={sourceCountry}
        countries={availableCountries}
        onSelectCountry={onSelectCountry}
        fetchCheapestRoute={fetchCheapestRoute}
      />
      <ErrorMessage message={errorMessage} />
      <BestRoute cheapestRoute={cheapestRoute} setIsShowAll={setIsShowAll} />
      {isShowAll && <AvailableRouteList bestDistance={cheapestRoute.distance} routes={routes} setIsShowAll={setIsShowAll} />}
    </>
  );
};

export default RouteSearch;
