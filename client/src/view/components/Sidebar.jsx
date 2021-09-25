import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

// icons
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
// import FilterNoneIcon from "@material-ui/icons/FilterNone";
// import AssessmentOutlinedIcon from "@material-ui/icons/AssessmentOutlined";
// import AccountBoxOutlinedIcon from "@material-ui/icons/AccountBoxOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import queryString from "query-string";
export const Sidebar = ({ className, location, onHide }) => {
  const params = useLocation();
  const { boardId } = queryString.parse(params.search);

  let showSideBar =
    location.pathname === "/dashboard-items" ||
    location.pathname === "/invite-members" ||
    location.pathname === "/profile" ||
    location.pathname === "/dashboard-items/view-item";

  return (
    <>
      <div className={`h-100 ${className}`}>
        <button
          onClick={onHide}
          type="button"
          className="btn btn-close position-fixed end-0 top-0 m-2 text-white"
          style={{ top: 0, right: 0 }}
        >
          <h4 className="mb-0"> &times;</h4>
        </button>

        <ul className="nav flex-column pt-2 text-center">
          <li className="nav-item mb-4">
            <Link className="nav-link" to="/">
              <div
                className="text-primary h5 mb-0 font-weight-bold"
                style={{ fontFamily: "cursive" }}
              >
                Hexa
              </div>
            </Link>
          </li>
          {showSideBar && (
            <>
              <li className="nav-item mb-5">
                <NavLink
                  className="nav-link"
                  to={`/dashboard-items?boardId=${boardId}`}
                >
                  <DashboardOutlinedIcon />
                </NavLink>
              </li>
              <li className="nav-item mb-5">
                <NavLink
                  className="nav-link"
                  to={`/invite-members?boardId=${boardId}`}
                >
                  <PersonAddOutlinedIcon />
                </NavLink>
              </li>

              {/* <li className="nav-item mb-5">
                <NavLink className="nav-link" to="/dashboard">
                  <AssessmentOutlinedIcon />
                </NavLink>
              </li> */}
              <li className="nav-item mb-5">
                <NavLink
                  className="nav-link"
                  to={`/profile?boardId=${boardId}`}
                >
                  <SettingsOutlinedIcon />
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};
