import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Optional: Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Add a response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Handle successful response
    return response;
  },
  (error) => {
    // Handle response error, e.g., logging or redirecting
    if (error.status === 403) {
      localStorage.removeItem("authToken");
    }
    alert(error.message);
    return Promise.reject(error);
  }
);

export default apiClient;