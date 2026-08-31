import { axiosClient } from '@/shared/api/axiosClient';
import { useAuthStore } from '@/features/auth/stores/authStore';

// A 401 from these is expected, not a session expiry
const AUTH_ENDPOINTS = ['/api/auth/me', '/api/auth/login', '/api/auth/register'];

export const setupInterceptors = () => {
  axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
      const url = error.config?.url ?? '';
      const isAuthCall = AUTH_ENDPOINTS.some((path) => url.includes(path));

      //If user in login page and got 401 because of wrong password we just show the error
      if (error.response?.status === 401 && !isAuthCall) {
        useAuthStore.getState().clearSession();

      }
      return Promise.reject(error);
    },
  );
};