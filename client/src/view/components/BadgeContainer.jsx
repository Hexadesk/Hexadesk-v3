import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export const BadgeContainer = ({ location }) => {
  let hideBadgeContainer =
    location.pathname === "/personal-board" ||
    location.pathname === "/profile" ||
    location.pathname === "/sign-up" ||
    location.pathname === "/sign-in" ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/payment";

  const [chipData, setChipData] = useState([
    { link: "/dashboard", label: "RFI" },
    { link: "/backlog1", label: "jQuery" },
    { link: "/backlog2", label: "Polymer" },
    { link: "/backlog3", label: "React" },
    { link: "/backlog4", label: "Vue.js" },
  ]);

  return (
    <>
      {hideBadgeContainer ? (
        ""
      ) : (
        <ul className="nav">
          {chipData.map((data) => {
            return (
              <li className="mr-2 mb-2">
                <NavLink
                  to={data.link}
                  size="small"
                  className="px-2 py-1 hexa-btn-primary text-decoration-none rounded-lg shadow-sm"
                >
                  <small className="font-weight-bold">{data.label}</small>
                </NavLink>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};
