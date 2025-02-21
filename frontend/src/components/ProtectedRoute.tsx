import { Navigate, Outlet } from "react-router-dom";
import useAppContext from "../hook/useAppContext";

function ProtectedRoute() {
  const { isCheckingIfLoggedIn, isLoggedIn } = useAppContext();

  if (isCheckingIfLoggedIn) return <div>Loading...</div>;

  return isLoggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default ProtectedRoute;
