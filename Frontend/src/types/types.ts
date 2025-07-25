export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export interface User {
  phone: string;
  name: string;
  email: string;
  id: string;
}

export interface Host {
  phone: string;
  name: string;
  email: string;
  id: string;
}
