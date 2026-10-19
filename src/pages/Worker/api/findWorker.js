import { apiInstance } from "../../../utils/api/axiosInstance";

export const findWorker = {
    getAllWorker: async (filters = {}) => {
        const res = await apiInstance.get('/api/v1/worker/getAllWorkers', { params: filters })
        console.log(res.data);
        return res.data
    },
    
}