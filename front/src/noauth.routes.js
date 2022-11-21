
import { Fragment } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

const RequireAuth = () => {
  const auth =
    localStorage.getItem("token") !== undefined
      ? localStorage.getItem("token")
      : null;
  const location = useLocation();

  return auth !== null ? (
    <Fragment>
    <div id="headerWrap">
        <Navbar />
    </div>
        <Outlet />
    </Fragment>
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default RequireAuth;
