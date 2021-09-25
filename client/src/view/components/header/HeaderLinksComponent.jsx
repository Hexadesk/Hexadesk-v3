import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import queryString from "query-string";
import { useSelector } from "react-redux";
export const HeaderLinksComponent = () => {
  const { boardItems } = useSelector((state) => state.Auth);
  const params = useLocation();
  const { boardId } = queryString.parse(params.search);
  return (
    <div className="d-flex">
      <NavLink
        to={`/dashboard-items?boardId=${boardId}`}
        className="nav-link-with-border pb-2 pb-lg-3 mr-4"
      >
        <span className="text-capitalize h6 mb-0 mr-2">Work Items</span>
        <span className="badge badge-light px-2">
          <small className="font-weight-bold">{boardItems?.length}</small>
        </span>
      </NavLink>

      <NavLink
        to={`/invite-members?boardId=${boardId}`}
        className="nav-link-with-border pb-2 pb-lg-3"
      >
        <span className="text-capitalize h6 mb-0 mr-2">Teams</span>
        <span className="badge badge-light px-2">
          {/* <small className="font-weight-bold">34</small> */}
        </span>
      </NavLink>
    </div>
  );
};
