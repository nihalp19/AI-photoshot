// PublicOnlyRoute.tsx
import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import React, { ReactNode } from "react";

interface PublicOnlyRouteProps {
  children: ReactNode;
}

const PublicOnlyRoute: React.FC<PublicOnlyRouteProps> = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default PublicOnlyRoute;
