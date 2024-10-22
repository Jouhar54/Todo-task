import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  if (localStorage.getItem("authTokens")) {
    return element;
  }
  return <Navigate to={"/login"} />;
};

export default ProtectedRoute;