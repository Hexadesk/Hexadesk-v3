import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
export const useRedirect = () => {
  const { isAuthenticated, user } = useSelector((state) => state.Auth);
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated && !user?.paid) {
      history.push("/payment");
    }
  }, [isAuthenticated, history, user.paid]);
};
