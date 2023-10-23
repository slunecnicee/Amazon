import { Navigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMemo } from "react";
import jwtDecode from "jwt-decode";
import { handleLogIn } from "../features/user";

const ProtectedRoute = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useMemo(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          return false;
        }
        dispatch(handleLogIn(decoded));
        return true;
      } catch (err) {
        return false;
      }
    }
  }, [dispatch]);

  if (isLoggedIn) {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
