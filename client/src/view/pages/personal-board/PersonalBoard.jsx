import React from "react";
import { PersonalBoardCard } from "./PersonalBoardCard";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import { useGetAllBoards } from "../../../hooks/useGetAllBoards";
import BoardForm from "./AddBoardForm";
import { CircularProgress } from "@material-ui/core";

export const PersonalBoard = () => {
  const [open, setOpen] = React.useState(false);
  const { personalBoards, teamsBoards, isLoading } = useGetAllBoards();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  if (isLoading) {
    return (
      <div className="h-100vh d-flex justify-content-center align-items-center">
        <CircularProgress size={45} />
      </div>
    );
  }
  return (
    <section className="members-container pb-3 min-vh-100">
      {teamsBoards?.length ? (
        <section className="mb-3">
          <div className="row mx-0 px-4">
            <div className="d-flex align-items-center">
              <QueryBuilderIcon fontSize="large" />
              <h4 className="text-capitalize mb-0 ml-1">Team Boards</h4>
            </div>
          </div>
          <div className="row mx-0 row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 align-items-start">
            {teamsBoards.map((value, i) => (
              <PersonalBoardCard value={value} key={i} />
            ))}
          </div>
        </section>
      ) : (
        ""
      )}

      {/* === */}
      <section>
        <div className="row mx-0 px-4">
          <div className="d-flex align-items-center">
            <PermIdentityIcon fontSize="large" />
            <h4 className="text-capitalize mb-0 ml-1">Personal Board</h4>
          </div>
          <div className="ml-auto">
            <button
              onClick={handleClickOpen}
              type="button"
              class="btn btn-primary px-3"
            >
              <div class="d-flex">
                <span className="mr-2 h5 mb-0">+</span>
                <span>Create</span>
              </div>
            </button>
          </div>
        </div>
        {teamsBoards?.length ? (
          <div className="row mx-0 row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 align-items-start">
            {personalBoards?.map((value, i) => (
              <PersonalBoardCard value={value} key={i} personalBoard={true} />
            ))}
          </div>
        ) : (
          <div className="h-70vh d-flex justify-content-center align-items-center col-12">
            <h4>Opps no data found please create a board to start</h4>
          </div>
        )}
      </section>
      {open && <BoardForm open={open} handleClose={handleClose} />}
    </section>
  );
};
