import { apiInstance } from "../utils/api/axiosInstance";

// Send location to backend
export const updateUserLocation = async (lat, lng, address) => {
  try {
    const response = await apiInstance.post("/api/v1/user/update-location", {
      latitude: lat,
      longitude: lng,
      address: address
    });
    return response.data;
  } catch (error) {
    console.error("Failed to sync location with backend", error);
    throw error;
  }
};
