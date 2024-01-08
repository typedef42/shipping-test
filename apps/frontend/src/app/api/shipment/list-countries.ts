import { axiosInstance } from "@/libs/utils/api";

export const getListCountry = async (): Promise<Array<string>> => {
  try {
    const res = await axiosInstance.get<Array<string>>("/shipment/list-countries");
    return res.data;
  } catch (error) {
    console.error("Failed to fetch country list", error);
    throw error;
  }
};
