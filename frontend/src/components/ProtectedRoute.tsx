import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import React from 'react'
import { ReactNode } from "react";



interface ProtectedRouteProps {
  children: ReactNode;
}


const ProtectedRoute : React.FC<ProtectedRouteProps>  = ({ children }) => {

    const { isSignedIn ,isLoaded} = useAuth()


    if(!isLoaded){
        return (
            <div>...Loading</div>
        )
    }

    if (!isSignedIn) {
        <Navigate to={"/login"} />
    }

    return (
        <>{children}</>
    )
}

export default ProtectedRoute