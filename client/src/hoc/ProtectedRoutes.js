import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRedirect } from "../hooks/useRedirect";

const ProtectedRoutes = ({ children }) => {
  const { userToken, isAuthenticated } = useSelector((state) => state.Auth);
  const history = useHistory();

  const checkAuth = () => {
    if (userToken && isAuthenticated) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
      history.push("/sign-in");
    }
  };
  checkAuth();
  useRedirect();
  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line
  }, [history]);
  return <>{children}</>;
};

export default ProtectedRoutes;
