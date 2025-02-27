import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ allowedRoles }) => {
    const { authUser, authToken, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading || authUser === null) {
        return <Spinner />; 
    } 

    if (!authUser && !authToken) {
        toast.error("You must be logged in to access this page.");
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(authUser.role)) {
        toast.error("Unauthorized access! Redirecting...");
        return <Navigate to="/" replace />;
    }

    return <Outlet />; // Render the protected route
};

export default ProtectedRoute;
