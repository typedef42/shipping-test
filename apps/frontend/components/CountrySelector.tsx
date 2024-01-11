import React from "react";

interface CountrySelectorProps {
  countries: string[];
  sourceCountry: string;
  onSelectCountry: (countryType: string, countryValue: string) => void;
  fetchCheapestRoute: () => void;
}

export const COUNTRY_TYPE = {
  SOURCE: "source",
  DESTINATION: "destination",
};

const CountrySelector: React.FC<CountrySelectorProps> = ({ countries, sourceCountry, onSelectCountry, fetchCheapestRoute }) => {
  return (
    <div className="flex flex-col md:gap-4 mb-4">
      <div className="w-full mb-4 md:mb-0 md:pr-2">
        <label htmlFor="sourceCountry" className="block mb-1">
          Departure Country:
        </label>
        <select
          id="sourceCountry"
          onChange={(e) => onSelectCountry(COUNTRY_TYPE.SOURCE, e.target.value)}
          className="w-full rounded-md border border-gray-300"
          style={{ height: 30 }}
        >
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full mb-4 md:mb-0 md:pr-2">
        <label htmlFor="destinationCountry" className="block mb-1">
          Arrival Country:
        </label>
        <select
          id="destinationCountry"
          onChange={(e) => onSelectCountry(COUNTRY_TYPE.DESTINATION, e.target.value)}
          className="w-full rounded-md border border-gray-300"
          style={{ height: 30 }}
        >
          {countries
            .filter((item) => item != sourceCountry)
            .map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
        </select>
      </div>
      <div className="w-full mb-4 md:mb-0 md:pr-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 p-2 font-bold py-2 rounded-lg text-white"
          type="button"
          onClick={fetchCheapestRoute}
        >
          Get Best Route
        </button>
      </div>
    </div>
  );
};

export default CountrySelector;
