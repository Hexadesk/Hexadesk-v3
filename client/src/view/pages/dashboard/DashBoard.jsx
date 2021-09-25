import React from "react";

import { HeaderDashboardComponent } from "../../components/header/HeaderDashboardComponent";

import { DashBoardCard } from "./DashBoardCard";

import { CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

// import { HeaderLinksComponent } from "../../components/header/HeaderLinksComponent";

export const DashBoard = () => {
  const { boardItems, boardItemsLoading } = useSelector((state) => state.Auth);

  return (
    <>
      {/* <HeaderLinksComponent /> */}
      {/* <HeaderItemsComponent /> */}
      <HeaderDashboardComponent />

      {boardItemsLoading ? (
        <div className="h-70vh d-flex justify-content-center align-items-center">
          <CircularProgress size={36} />
        </div>
      ) : !boardItems.length ? (
        <div className="h-70vh d-flex justify-content-center align-items-center">
          <h4>Opps no data found</h4>
        </div>
      ) : (
        <section className="Dashboard-container h-70vh pb-3">
          <div className="row mx-0 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 justify-content-center justify-content-sm-start">
            {boardItems?.map((value) => (
              <DashBoardCard value={value} />
            ))}
          </div>
        </section>
      )}
    </>
  );
};
