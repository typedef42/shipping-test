import { axiosInstance } from "@/libs/utils/api";

import { Port } from "./find-best-route";

export const getListPort = async (country: string): Promise<Array<Port>> => {
  try {
    const res = await axiosInstance.get<Array<Port>>(`/port/available/${country}`);
    return res.data;
  } catch (error) {
    console.error(`Failed to get available ports for ${country}`, error);
    throw error;
  }
};
