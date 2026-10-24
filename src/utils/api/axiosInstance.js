import axios from 'axios';
import { setAccessToken, logout } from '../../redux/authSlice';
import { config } from '../../utils/config';
import store from "../../redux/store"

export const apiInstance = axios.create({
  ...config,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// A temporary storage reference for the Access Token (In-memory storage is secure against XSS)
// let memoryAccessToken = null;

// export const setAccessToken = (token) => {
//   memoryAccessToken = token;
// };

// export const getAccessToken = () => {
//   return memoryAccessToken;
// };


// 2. REQUEST INTERCEPTOR: Inject Access Token
apiInstance.interceptors.request.use(
  (config) => {
    const state = store.getState()
    const token = state.auth.accessToken;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


// ==========================================
// 3. RESPONSE INTERCEPTOR: Handle Expired Tokens & Auto-Refresh
// ==========================================
// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });
//   failedQueue = [];
// };

// apiInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Check if error is 401 Unauthorized and we haven't tried retrying yet
//     if (error.response?.status === 401 && !originalRequest._retry) {
      
//       // If the refresh token route itself failed, don't loop—just logout user
//       if (originalRequest.url.includes('/refresh-token')) {
//         setAccessToken(null);
//         window.location.href = '/login'; // Redirect to login
//         return Promise.reject(error);
//       }

//       if (isRefreshing) {
//         // If a refresh is already in progress, queue the failed requests
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then((token) => {
//             originalRequest.headers.Authorization = `Bearer ${token}`;
//             return api(originalRequest);
//           })
//           .catch((err) => Promise.reject(err));
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         // Call your backend refresh token endpoint
//         // (Browser sends the httpOnly cookie automatically because of withCredentials: true)
//         const response = await axios.post(
//           `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1'}/auth/refresh-token`,
//           {},
//           { withCredentials: true }
//         );

//         const newAccessToken = response.data.accessToken || response.data.token;
        
//         // Save new token in memory
//         setAccessToken(newAccessToken);

//         // Update default headers and retry original request
//         api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
//         originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

//         processQueue(null, newAccessToken);
//         isRefreshing = false;

//         return api(originalRequest);
//       } catch (refreshError) {
//         processQueue(refreshError, null);
//         isRefreshing = false;
        
//         // Refresh token expired or invalid -> Clear session and force re-login
//         setAccessToken(null);
//         window.location.href = '/login';
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );


// 2. Response Interceptor: Token expire hone par Refresh Token use karega
apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Agar access token expire ho gaya (401) aur request pehle retry nahi hui hai
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Aapke backend ka refresh token endpoint call hoga
        const response = await axios.post(
          'http://localhost:8000/api/v1/user/refresh-token', // Apna exact route check kar lein
          {},
          { withCredentials: true }
        );

        // Aapka backend ApiResponse(200, accessToken, ...) bhej raha hai, toh naya token yahan milega:
        const newAccessToken = response.data.data; 

        // Redux memory mein naya access token save karein
        store.dispatch(setAccessToken(newAccessToken));

        // Ruki hui original request ko naye token ke sath dobara bhejein
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return apiInstance(originalRequest);

      } catch (refreshError) {
        // Agar refresh token bhi invalid ya expired hai, toh user ko logout kar dein
        store.dispatch(logout());
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
