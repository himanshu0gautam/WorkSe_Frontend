import { apiInstance } from "../../../utils/api/axiosInstance";

export const newWorkServices = {
    createNewWork: async (payload) => {
        console.log("FormData sent to createNewWork:", Array.from(payload.entries()));

        const response = await apiInstance.post("/api/v1/job/createNew", payload, {
            headers: {
                "Content-Type": undefined,
            },
        })
        return response.data
    }
}