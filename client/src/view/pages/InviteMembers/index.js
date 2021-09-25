import React, { useState } from "react";
import { useLocation } from "react-router";
import { useGetBoardMembers } from "../../../hooks/useGetBoardMembers";
import { Members } from "../members/Members";

import queryString from "query-string";
import { CircularProgress } from "@material-ui/core";
import AlertDialog from "../../../components/AlertDialog";
import InviteMemberForm from "./InviteMemberForm";
// import { HeaderLinksComponent } from "../../components/header/HeaderLinksComponent";
export default function InvitedMembers() {
  const params = useLocation();

  const { boardId } = queryString.parse(params.search);
  const { users, isLoadingUsers } = useGetBoardMembers({ boardId });
  const [open, setOpen] = useState(false);
  return (
    <section>
      {open && (
        <AlertDialog
          showTitle={true}
          title="Add Member"
          open={open}
          message={<InviteMemberForm handleClose={() => setOpen()} />}
        />
      )}

      <div className="mx-0 px-4">
        {/* <HeaderLinksComponent /> */}
        <div className="row mt-3">
          <div className="d-flex align-items-center">
            <h4 className="text-capitalize mb-0 ml-1 text-primary">
              Invited Members
            </h4>
          </div>
          <div className="ml-auto">
            <button
              onClick={() => {
                setOpen(true);
              }}
              type="button"
              class="btn btn-primary px-3"
            >
              <div class="d-flex">
                <span className="mr-2 h5 mb-0">+</span>
                <span>Invite New Member</span>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="m-3">
        {isLoadingUsers ? (
          <div className="h-70vh d-flex justify-content-center align-items-center">
            <CircularProgress size={36} />
          </div>
        ) : !users.length ? (
          <div className="h-70vh d-flex justify-content-center align-items-center">
            <h4>Opps no data found</h4>
          </div>
        ) : (
          <Members members={users} />
        )}
      </div>
    </section>
  );
}
