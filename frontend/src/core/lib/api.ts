import axios from 'axios';

export const apiConfig = {
  baseUrl: import.meta.env.VITE_API_URL,
  version: import.meta.env.VITE_API_VERSION || 'v1',
  get externalUrl() {
    return `${this.baseUrl}/api/${this.version}/external`;
  },
  get internalUrl() {
    return `${this.baseUrl}/api/${this.version}/internal`;
  },
};

export const publicClient = axios.create({
  baseURL: apiConfig.externalUrl,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 5000,
});

export const authenticatedClient = axios.create({
  baseURL: apiConfig.internalUrl,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 5000,
});

authenticatedClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

authenticatedClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      // For example, redirect to login page
      // This should be handled by a proper auth context/hook in a real app
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
