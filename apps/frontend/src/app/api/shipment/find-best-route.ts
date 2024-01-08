import { axiosInstance } from "@/libs/utils/api";

export interface Port {
  name: string;
  country: string;
}
export interface FindBestRouteResponseDto {
  distance: number;
  sourcePort: Port;
  destPort: Port;
}
export const findBestRoute = async (sourceCountry: string, destinationCountry: string): Promise<FindBestRouteResponseDto> => {
  try {
    const res = await axiosInstance.get<FindBestRouteResponseDto>(
      `/shipment/find-best-route/${sourceCountry}/${destinationCountry}`,
    );
    return res.data;
  } catch (error) {
    console.error(`Failed to find best route from ${sourceCountry} to ${destinationCountry}`, error);
    throw error;
  }
};
