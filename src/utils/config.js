
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

if (!apiBaseUrl) {
  console.error("VITE_API_BASE_URL is missing in your .env file!");
}

// 2. Config object export
export const config = {
  baseURL: apiBaseUrl,
};