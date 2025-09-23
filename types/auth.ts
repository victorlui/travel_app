export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  is_premium: boolean;
  itinerary_count_monthly: number;
  last_reset_itinerary_count: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    access_token: string;
    user: User;
  };
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthActions {
  login: (authData: AuthResponse['data']) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  updateUser: (userData: Partial<User>) => void;
}

export type AuthStore = AuthState & AuthActions;