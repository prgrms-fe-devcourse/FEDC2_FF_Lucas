import propTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../store/GlobalProvider";

const ProtectedRoute = ({ children }) => {
  const { state } = useGlobalContext();

  if (!state.userInfo) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: propTypes.node,
};

export default ProtectedRoute;
