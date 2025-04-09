
import React, { createContext, useContext, useState, useEffect } from "react";

// Define user types
type UserRole = "admin" | "user";

// Define user type
interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

// Define authentication context type
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  isLoading: true,
});

// Mock users data (in a real app, this would come from a backend)
const MOCK_USERS = [
  {
    id: "1",
    email: "admin@herbalalchemy.com",
    password: "admin123", // In a real app, never store plain text passwords
    role: "admin" as UserRole,
    name: "Admin Herbal",
  },
  {
    id: "2",
    email: "user@example.com",
    password: "user123",
    role: "user" as UserRole,
    name: "Pengguna Demo",
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("herbal_user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse stored user data");
        localStorage.removeItem("herbal_user");
      }
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const foundUser = MOCK_USERS.find(
      u => u.email === email && u.password === password
    );
    
    if (foundUser) {
      // Remove password before storing user
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("herbal_user", JSON.stringify(userWithoutPassword));
      return true;
    }
    
    return false;
  };

  // Register function
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if user already exists
    const userExists = MOCK_USERS.some(u => u.email === email);
    if (userExists) {
      return false;
    }
    
    // In a real app, this would add to the database and encrypt the password
    const newUser = {
      id: (MOCK_USERS.length + 1).toString(),
      email,
      password, // In a real app, this would be hashed
      role: "user" as UserRole,
      name,
    };
    
    // In a real app, we would add this user to the database
    MOCK_USERS.push(newUser);
    
    // Log the user in
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem("herbal_user", JSON.stringify(userWithoutPassword));
    return true;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("herbal_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => useContext(AuthContext);
