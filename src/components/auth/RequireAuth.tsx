
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface RequireAuthProps {
  children: React.ReactNode;
  requireUser?: boolean; // New prop to specify if we're requiring a regular user (not admin)
}

const RequireAuth = ({ children, requireUser = false }: RequireAuthProps) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  
  // If still checking auth status, show loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-herb-primary border-t-transparent"></div>
          <p className="mt-4 text-herb-primary font-medium">Loading...</p>
        </div>
      </div>
    );
  }
  
  // If not authenticated at all, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If requireUser is true, allow access to both regular users and admins
  // If requireUser is false (admin required), only allow admins
  if (!requireUser && user.role !== "admin") {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  
  // If authenticated with correct role, render children
  return <>{children}</>;
};

export default RequireAuth;
