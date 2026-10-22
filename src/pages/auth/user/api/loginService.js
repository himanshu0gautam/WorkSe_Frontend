import { apiInstance } from "../../../../utils/api/axiosInstance";

export const loginService = {
  SendOtp: async (payload) => {

      const res = await apiInstance.post("/api/v1/user/send-otp", payload, {
        // withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        },
      });
      return res.data;
  },

  verifyOtp: async (payload) => {
    console.log(payload);    
      const res = await apiInstance.post("/api/v1/user/verify-otp", payload, {
        // withCredentials: true,
      });
      return res.data;
  },
};
