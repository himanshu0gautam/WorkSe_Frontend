import { apiInstance } from "../utils/api/axiosInstance";

export const searchItem = async (searchQuery) => {
    const savedLocation = JSON.parse(localStorage.getItem('user_location'))
    console.log(savedLocation);

    const params = { query: searchQuery }

    if(savedLocation) {
        params.lat = savedLocation.latitude;
        params.lng = savedLocation.longitude;
    }

    const response = await apiInstance.get('/api/v1/user/search', {params})
    return response.data   
}
