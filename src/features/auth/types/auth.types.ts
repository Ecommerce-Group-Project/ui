export type AuthUser = {
  id: string;
  email: string;
  name: string;
  roles: string[];
}

export type AuthResponse = {
  accessToken: string;
  user: AuthUser;
}

export type LoginCredentials = {
  email: string;
  password: string;
}

export type RegisterData = {
  name: string;
  email: string;
  password: string;
}