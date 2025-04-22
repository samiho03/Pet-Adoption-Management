// import axios from 'axios';

// const axiosInstance = axios.create({
//     baseURL: 'http://localhost:8080/api/v1', // Your base URL
// });

// // Interceptor to add JWT token to request headers
// axiosInstance.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//         config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
// }, (error) => {
//     return Promise.reject(error);
// });

// export default axiosInstance;
// axiosConfig.js

// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:8080/api/v1', // The base URL for your API
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export default axiosInstance;


// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:8080/api/v1',
// });

// // Add JWT token to every request if available
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default axiosInstance;


// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:8080/api/v1',
// });

// // Add JWT token to every request if available
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('jwt'); // Change 'token' to 'jwt'
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default axiosInstance;


// axiosConfig.js
import axios from 'axios';

// Create an instance of axios
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/v1', // Your API base URL
});

// Add a request interceptor to include the token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Get the token from local storage
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Set the Authorization header
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
