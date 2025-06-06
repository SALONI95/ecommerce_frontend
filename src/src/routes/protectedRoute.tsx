import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isLoggedIn
  );

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" />;
  // }
  return <>{isAuthenticated ? <>{children}</> : <Navigate to="/login" />}</>;
};

export default ProtectedRoute;
