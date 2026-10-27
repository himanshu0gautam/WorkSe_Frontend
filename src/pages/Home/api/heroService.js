import { apiInstance } from "../../../utils/api/axiosInstance";

export const heroService = {
  getNearbyWorker: async (searchQuery = "") => {
    const savedLocation = JSON.parse(localStorage.getItem("user_location"));

    const params = {};

    if (searchQuery && searchQuery.trim() !== "") {
      params.query = searchQuery.trim();
    }

    if (savedLocation && typeof savedLocation.latitude === 'number' && typeof savedLocation.longitude === 'number') {
      params.lat = savedLocation.latitude;
      params.lng = savedLocation.longitude;
    }

    const response = await apiInstance.get("/api/v1/worker/nearby-workers", {
      params,
    });
    return response.data;
  },

  // 2.
};
