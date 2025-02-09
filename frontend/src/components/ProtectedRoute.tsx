import { Navigate } from "react-router-dom";
import useAppContext from "../hook/useAppContext";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isCheckingIfLoggedIn, isLoggedIn } = useAppContext();

  if (isCheckingIfLoggedIn) return <div>Loading...</div>;

  return isLoggedIn ? children : <Navigate to="/sign-in" />;
}

export default ProtectedRoute;
