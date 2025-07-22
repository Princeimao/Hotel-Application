export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export interface RegisteredUser {
  phone: string;
  name: string;
  email: string;
  id: string;
}
