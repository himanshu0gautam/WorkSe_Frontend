import { apiInstance } from '../../../utils/api/axiosInstance';

// Job related API calls
export const jobService = {
  // Create a new job (supports files/FormData)
  createNewJob: async (jobData) => {
    const response = await apiInstance.post('/api/v1/job/createNew', jobData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Auto handled by browser when passing FormData
      },
    });
    return response.data;
  },

  // Get all jobs with optional filters
  getAllJobs: async (filters = {}) => {
    const response = await apiInstance.get('/api/v1/job/allWork', { params: filters });
    console.log(response.data);
    
    return response.data;
  },

  // Get single job details
  getJobById: async (jobId) => {
    const response = await apiInstance.get(`/api/v1/job/${jobId}`);
    return response.data;
  }
};