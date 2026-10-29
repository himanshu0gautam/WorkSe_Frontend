import { apiInstance } from "../../../../utils/api/axiosInstance";

export const workerService = {
    createWorker: async (payload) => {
        const response = await apiInstance.post("/api/v1/worker/register", payload, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        return response.data
    },
}