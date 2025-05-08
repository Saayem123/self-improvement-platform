import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { AppState, Behavior, ImprovementItem } from '../types';
import { useAuth } from './AuthContext';

// Actions
type BehaviorAction =
  | { type: 'SET_BEHAVIORS'; payload: Behavior[] }
  | { type: 'ADD_BEHAVIOR'; payload: Behavior }
  | { type: 'DELETE_BEHAVIOR'; payload: string }
  | { type: 'ADD_ITEM'; payload: { behaviorId: string; item: ImprovementItem } }
  | { type: 'UPDATE_ITEM'; payload: { behaviorId: string; itemId: string; text: string; completed: boolean } }
  | { type: 'DELETE_ITEM'; payload: { behaviorId: string; itemId: string } }
  | { type: 'SET_LOADING' }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' };

// Initial state
const initialState: AppState = {
  behaviors: [],
  isLoading: false,
  error: null,
};

// Reducer
const behaviorReducer = (state: AppState, action: BehaviorAction): AppState => {
  switch (action.type) {
    case 'SET_BEHAVIORS':
      return {
        ...state,
        behaviors: action.payload,
        isLoading: false,
      };
    case 'ADD_BEHAVIOR':
      return {
        ...state,
        behaviors: [...state.behaviors, action.payload],
        isLoading: false,
      };
    case 'DELETE_BEHAVIOR':
      return {
        ...state,
        behaviors: state.behaviors.filter(behavior => behavior.id !== action.payload),
        isLoading: false,
      };
    case 'ADD_ITEM':
      return {
        ...state,
        behaviors: state.behaviors.map(behavior =>
          behavior.id === action.payload.behaviorId
            ? { ...behavior, items: [...behavior.items, action.payload.item] }
            : behavior
        ),
        isLoading: false,
      };
    case 'UPDATE_ITEM':
      return {
        ...state,
        behaviors: state.behaviors.map(behavior =>
          behavior.id === action.payload.behaviorId
            ? {
                ...behavior,
                items: behavior.items.map(item =>
                  item.id === action.payload.itemId
                    ? { ...item, text: action.payload.text, completed: action.payload.completed }
                    : item
                ),
              }
            : behavior
        ),
        isLoading: false,
      };
    case 'DELETE_ITEM':
      return {
        ...state,
        behaviors: state.behaviors.map(behavior =>
          behavior.id === action.payload.behaviorId
            ? { ...behavior, items: behavior.items.filter(item => item.id !== action.payload.itemId) }
            : behavior
        ),
        isLoading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Create context
interface BehaviorContextType extends AppState {
  fetchBehaviors: () => Promise<void>;
  addBehavior: (title: string, description: string, color: string) => Promise<void>;
  deleteBehavior: (id: string) => Promise<void>;
  addItem: (behaviorId: string, text: string) => Promise<void>;
  updateItem: (behaviorId: string, itemId: string, text: string, completed: boolean) => Promise<void>;
  deleteItem: (behaviorId: string, itemId: string) => Promise<void>;
  clearError: () => void;
}

const BehaviorContext = createContext<BehaviorContextType | undefined>(undefined);

// Provider component
export const BehaviorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(behaviorReducer, initialState);
  const { user, isAuthenticated } = useAuth();

  // Fetch behaviors when user changes
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchBehaviors();
    } else {
      dispatch({ type: 'SET_BEHAVIORS', payload: [] });
    }
  }, [isAuthenticated, user]);

  // Fetch behaviors
  const fetchBehaviors = async () => {
    if (!user) return;
    
    dispatch({ type: 'SET_LOADING' });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get behaviors from localStorage
      const storedBehaviors = localStorage.getItem('behaviors');
      const allBehaviors: Behavior[] = storedBehaviors ? JSON.parse(storedBehaviors) : [];
      
      // Filter behaviors for current user
      const userBehaviors = allBehaviors.filter(behavior => behavior.userId === user.id);
      
      dispatch({ type: 'SET_BEHAVIORS', payload: userBehaviors });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch behaviors' });
    }
  };

  // Add behavior
  const addBehavior = async (title: string, description: string, color: string) => {
    if (!user) return;
    
    dispatch({ type: 'SET_LOADING' });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create new behavior
      const newBehavior: Behavior = {
        id: Date.now().toString(),
        userId: user.id,
        title,
        description,
        color,
        items: [],
        createdAt: Date.now(),
      };
      
      // Get existing behaviors
      const storedBehaviors = localStorage.getItem('behaviors');
      const allBehaviors: Behavior[] = storedBehaviors ? JSON.parse(storedBehaviors) : [];
      
      // Add new behavior
      const updatedBehaviors = [...allBehaviors, newBehavior];
      localStorage.setItem('behaviors', JSON.stringify(updatedBehaviors));
      
      dispatch({ type: 'ADD_BEHAVIOR', payload: newBehavior });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add behavior' });
    }
  };

  // Delete behavior
  const deleteBehavior = async (id: string) => {
    dispatch({ type: 'SET_LOADING' });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get existing behaviors
      const storedBehaviors = localStorage.getItem('behaviors');
      const allBehaviors: Behavior[] = storedBehaviors ? JSON.parse(storedBehaviors) : [];
      
      // Remove behavior
      const updatedBehaviors = allBehaviors.filter(behavior => behavior.id !== id);
      localStorage.setItem('behaviors', JSON.stringify(updatedBehaviors));
      
      dispatch({ type: 'DELETE_BEHAVIOR', payload: id });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to delete behavior' });
    }
  };

  // Add item
  const addItem = async (behaviorId: string, text: string) => {
    dispatch({ type: 'SET_LOADING' });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create new item
      const newItem: ImprovementItem = {
        id: Date.now().toString(),
        text,
        completed: false,
        createdAt: Date.now(),
      };
      
      // Get existing behaviors
      const storedBehaviors = localStorage.getItem('behaviors');
      const allBehaviors: Behavior[] = storedBehaviors ? JSON.parse(storedBehaviors) : [];
      
      // Add item to behavior
      const updatedBehaviors = allBehaviors.map(behavior =>
        behavior.id === behaviorId
          ? { ...behavior, items: [...behavior.items, newItem] }
          : behavior
      );
      
      localStorage.setItem('behaviors', JSON.stringify(updatedBehaviors));
      
      dispatch({ type: 'ADD_ITEM', payload: { behaviorId, item: newItem } });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add item' });
    }
  };

  // Update item
  const updateItem = async (behaviorId: string, itemId: string, text: string, completed: boolean) => {
    dispatch({ type: 'SET_LOADING' });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Get existing behaviors
      const storedBehaviors = localStorage.getItem('behaviors');
      const allBehaviors: Behavior[] = storedBehaviors ? JSON.parse(storedBehaviors) : [];
      
      // Update item
      const updatedBehaviors = allBehaviors.map(behavior =>
        behavior.id === behaviorId
          ? {
              ...behavior,
              items: behavior.items.map(item =>
                item.id === itemId
                  ? { ...item, text, completed }
                  : item
              ),
            }
          : behavior
      );
      
      localStorage.setItem('behaviors', JSON.stringify(updatedBehaviors));
      
      dispatch({ type: 'UPDATE_ITEM', payload: { behaviorId, itemId, text, completed } });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update item' });
    }
  };

  // Delete item
  const deleteItem = async (behaviorId: string, itemId: string) => {
    dispatch({ type: 'SET_LOADING' });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Get existing behaviors
      const storedBehaviors = localStorage.getItem('behaviors');
      const allBehaviors: Behavior[] = storedBehaviors ? JSON.parse(storedBehaviors) : [];
      
      // Delete item
      const updatedBehaviors = allBehaviors.map(behavior =>
        behavior.id === behaviorId
          ? { ...behavior, items: behavior.items.filter(item => item.id !== itemId) }
          : behavior
      );
      
      localStorage.setItem('behaviors', JSON.stringify(updatedBehaviors));
      
      dispatch({ type: 'DELETE_ITEM', payload: { behaviorId, itemId } });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to delete item' });
    }
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  return (
    <BehaviorContext.Provider
      value={{
        ...state,
        fetchBehaviors,
        addBehavior,
        deleteBehavior,
        addItem,
        updateItem,
        deleteItem,
        clearError,
      }}
    >
      {children}
    </BehaviorContext.Provider>
  );
};

// Custom hook to use behavior context
export const useBehavior = (): BehaviorContextType => {
  const context = useContext(BehaviorContext);
  if (context === undefined) {
    throw new Error('useBehavior must be used within a BehaviorProvider');
  }
  return context;
};