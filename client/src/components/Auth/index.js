import { useSelector } from "react-redux";
import { Navigate, useLocation, Outlet } from "react-router-dom";

const Auth = () => {
  const location = useLocation();

  const { userInfo } = useSelector((state) => state.userLogin);

  return !userInfo ? (
    <Navigate to="/signin" state={{ path: location.pathname }} />
  ) : (
    <Outlet />
  );
};

export default Auth;
