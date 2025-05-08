export interface User {
  id: string;
  username: string;
  email: string;
}

export interface ImprovementItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export interface Behavior {
  id: string;
  userId: string;
  title: string;
  description: string;
  color: string;
  items: ImprovementItem[];
  createdAt: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AppState {
  behaviors: Behavior[];
  isLoading: boolean;
  error: string | null;
}