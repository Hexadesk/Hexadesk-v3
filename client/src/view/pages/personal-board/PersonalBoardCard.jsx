import { Avatar, IconButton } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { AvatarGroup } from "@material-ui/lab";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setProjectNameToNavbar } from "../../../Action/Auth";
import api from "../../../apiCalls/api";
import AlertDialog from "../../../components/AlertDialog";
import { createNotification } from "../../../components/Toast";

import BoardForm from "./AddBoardForm";

export const PersonalBoardCard = ({ value, personalBoard = false }) => {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const [action, setAction] = useState("edit");
  const handleClose = () => {
    setOpen(false);
  };
  const { mutate, isLoading } = useMutation(api.deleteBoard, {
    onSuccess: async (res) => {
      createNotification("success", "Project Deleted Successfully");
      queryClient.invalidateQueries("get-all-boards");
      setOpen(false);
    },
    onError: async (err) => {
      createNotification(
        "error",
        err?.data?.message ?? "Unable to delete project"
      );
    },
  });

  const actionBody = () => {
    if (action === "edit") {
      return (
        <BoardForm
          open={open}
          handleClose={handleClose}
          isEdit={true}
          initialState={value}
        />
      );
    } else {
      return (
        <AlertDialog
          open={open}
          showTitle={true}
          title={`Delete Board (${value.title})`}
          message={
            <div className="p-2 my-3">
              Are you sure you wants to delete {value.title} ?
            </div>
          }
          cancelButtonText="Cancel"
          applyButtonText={isLoading ? "Deleting" : "Delete"}
          disableBackdropClick={isLoading}
          disableAction={isLoading}
          cancelAlertDialog={() => {
            setOpen(false);
          }}
          applyAlertDialog={() => {
            mutate(value._id);
          }}
        />
      );
    }
  };
  return (
    <div className="p-3">
      {open ? actionBody() : ""}
      <div className="card shadow rounded-xl border-0">
        <div
          className="rounded-top-xl"
          style={{
            height: "100%",
            width: "100%",
          }}
          type="button"
          onClick={() => {
            dispatch(setProjectNameToNavbar(value.title));
            history.push(`/dashboard-items?boardId=${value._id}`);
          }}
        >
          {/* <img
            className="h-100 w-100 rounded-top-xl object-cover"
            src="https://source.unsplash.com/random"
            alt={value.title}
          /> */}
        </div>
        <div className="p-3 rounded-bottom-xl">
          <div>
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0 p-0 text-truncate">{value.title}</h5>
              {personalBoard && (
                <div>
                  <IconButton
                    size="small"
                    onClick={() => {
                      setAction("edit");
                      setOpen(true);
                    }}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => {
                      setAction("delete");
                      setOpen(true);
                    }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </div>
              )}
            </div>
            <div
              type="button"
              onClick={() => {
                dispatch(setProjectNameToNavbar(value.title));
                history.push(`/dashboard-items?boardId=${value._id}`);
              }}
              style={{
                minHeight: 50,
              }}
              className="mb-2 my-3 small"
            >
              {value.description}
            </div>
          </div>
          <AvatarGroup max={4}>
            {value.boardMembers?.map((value) => (
              <Avatar alt={value?.name} src={value.imageUrl} />
            ))}

            {/* <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" /> */}
          </AvatarGroup>
        </div>
      </div>
    </div>
  );
};
