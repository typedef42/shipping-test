import { faMapMarkerAlt, faRuler, faShip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import { Route } from "../interfaces";

interface BestRouteProps {
  cheapestRoute: Route;
  setIsShowAll: (bool: boolean) => void;
}

const BestRoute: React.FC<BestRouteProps> = ({ cheapestRoute, setIsShowAll }) => {
  const { departurePort, arrivalPort, distance } = cheapestRoute;

  if (!distance) {
    return null;
  }
  return (
    <div className="border border-blue-500 rounded-md p-6">
      <h3 className="text-md font-semibold mb-3">Found most affordable option:</h3>
      <div className="flex flex-col justify-between mb-4">
        <div className="flex items-center mb-2 md:mb-0">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-500" style={{ marginRight: 10 }} />
          <span className="font-medium">Departure Port: </span>
          <span className="ml-2">{departurePort.name}</span>
        </div>
        <div className="flex items-center mb-2 md:mb-0">
          <FontAwesomeIcon icon={faShip} className="text-blue-500" style={{ marginRight: 5 }} />
          <span className="font-medium">Arrival Port: </span>
          <span className="ml-2">{arrivalPort.name}</span>
        </div>
        <div className="flex items-center mb-2">
          <FontAwesomeIcon icon={faRuler} className="text-gray-500" style={{ marginRight: 7 }} />
          <span className="font-medium">Distance: </span>
          <span className="ml-2">{distance} km</span>
        </div>
      </div>
      <a onClick={() => setIsShowAll(true)} className="text-blue-500 mt-4 block underline cursor-pointer">
        Click here to explore all available routes
      </a>
    </div>
  );
};

export default BestRoute;
