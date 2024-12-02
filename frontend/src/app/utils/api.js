import axios from 'axios';

// Create the axios instance with the base URL pointing to your backend
export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000', // Adjust this to match your backend server's URL
withCredentials: true,
headers: {
  'Content-Type': 'application/json',
}

});
