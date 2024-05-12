import React, { ReactNode, createContext, useContext, useState } from 'react';
import { User } from '../types/User';

// Create an interface for the context value
interface UserContextValue {
  user: User | null;  // `null` initially, since no user might be logged in
  setUser: (user: User | null) => void; // Function to update the user data
}

// Create the context with a default empty value
const UserContext = createContext<UserContextValue | undefined>(undefined);

// Create the provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use the user context in other components
export const useUser = (): UserContextValue => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};