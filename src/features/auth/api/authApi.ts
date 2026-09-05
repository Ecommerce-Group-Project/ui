import { axiosClient } from '@/shared/api/axiosClient';
import type {
  AuthUser,
  ForgotPasswordData,
  LoginCredentials,
  RegisterData,
  ResetPasswordData,
} from '../types/auth.types';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthUser> => {
    const { data } = await axiosClient.post<AuthUser>(
      '/api/auth/login',
      credentials,
    );
    return data;
  },

  register: async (payload: RegisterData): Promise<string> => {
    const { data } = await axiosClient.post<string>(
      '/api/auth/register',
      payload,
    );
    return data;
  },

  me: async (): Promise<AuthUser> => {
    const { data } = await axiosClient.get<AuthUser>('/api/auth/me');
    return data;
  },

  refresh: async ():Promise<AuthUser> => {
    const {data} = await axiosClient.post<AuthUser>('/api/auth/refresh');
    return data;
  },

  logout: async (): Promise<void> => {
    await axiosClient.post('/api/auth/logout');
  },


  forgotPassword: async (payload:ForgotPasswordData): Promise<string> => {
    const {data} = await axiosClient.post<{message:string}>(
      '/api/auth/forgot-password',
      payload
    )

    return data.message;
  },

  validateResetToken: async(token:string):Promise<void> =>{
    await axiosClient.get('/api/auth/reset-password/validate',{
      params:{token},
    })
  },
  
  resetPassword: async (payload: ResetPasswordData): Promise<string> => {
    const { data } = await axiosClient.post<{ message: string }>(
      '/api/auth/reset-password',
      payload,
    );
    return data.message;
  },
};