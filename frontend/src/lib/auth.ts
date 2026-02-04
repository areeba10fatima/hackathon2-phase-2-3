// Utility functions for handling authentication state

// Store token in localStorage
export const setAuthToken = (token: string) => {
  localStorage.setItem('access_token', token);
};

// Get token from localStorage
export const getAuthToken = (): string | null => {
  return localStorage.getItem('access_token');
};

// Remove token from localStorage
export const removeAuthToken = () => {
  localStorage.removeItem('access_token');
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = getAuthToken();
  if (!token) return false;

  // Decode token to check expiration
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp > currentTime;
  } catch (error) {
    return false;
  }
};

// Get user info from token
export const getUserInfo = () => {
  const token = getAuthToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      id: payload.sub,
      email: payload.email,
    };
  } catch (error) {
    return null;
  }
};

// Auth state management
export interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export const initialAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: true,
};