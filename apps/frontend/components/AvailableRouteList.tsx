import React from "react";

import { Route } from "../interfaces";

interface AvailableRouteListProps {
  routes: Route[];
  bestDistance: number;
  setIsShowAll: (bool: boolean) => void;
}

const AvailableRouteList: React.FC<AvailableRouteListProps> = ({ routes, bestDistance, setIsShowAll }) => {
  const onClose = () => setIsShowAll(false);
  const highlightedIndex = routes.findIndex((route) => route.distance === bestDistance);
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded-lg shadow-lg flex flex-col w-96"
        style={{ zIndex: 2 }}
      >
        <h2 className="text-lg font-semibold mb-4">All available routes</h2>
        <ol className="list-decimal pl-6 flex-1 max-h-80 overflow-y-auto">
          {routes.map((route, index) => (
            <li key={index} className={`mb-1 p-2 rounded ${index === highlightedIndex ? "bg-blue-100" : ""}`}>
              <p>
                From {route.arrivalPort.name} to {route.departurePort.name}
              </p>
              <p>
                Distance: <span className="font-bold">{route.distance} km</span>
              </p>
            </li>
          ))}
        </ol>
        <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 self-end">
          Close
        </button>
      </div>
      <div onClick={onClose} className="fixed top-0 left-0 w-full h-full bg-black opacity-50"></div>
    </div>
  );
};

export default AvailableRouteList;
