import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
    const location = useLocation();
    return (
            JSON.parse(localStorage.getItem("userData"))
                ? <Outlet/>
                : <Navigate to='/sign-in' state={{from: location}} replace/>

    );
}

export default RequireAuth;