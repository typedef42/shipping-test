import { getListCountry } from "@/app/api/shipment/list-countries";
import { useEffect, useState } from "react";

export const useCountries = () => {
  const [listCountry, setListCountry] = useState<Array<string>>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const countries = await getListCountry();
      setListCountry(countries);
    };

    fetchCountries();
  }, []);

  return listCountry;
};
