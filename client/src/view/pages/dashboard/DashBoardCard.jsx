import React, { useState } from "react";

import FlagIcon from "@material-ui/icons/Flag";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import WatchLaterSharpIcon from "@material-ui/icons/WatchLaterSharp";

import dateformat from "../../../helpers/dateformat";
import AlertDialog from "../../../components/AlertDialog";
import { List, ListItem, ListItemText } from "@material-ui/core";

import { getActionTitle, ActionBody } from "./modelActions";
import { useHistory } from "react-router";

export const getPriorityColor = (value) => {
  switch (value) {
    case 0:
      return "orange";
    case 1:
      return "yellow";
    case 2:
      return "green";
    case 3:
      return "red";

    default:
      return "";
  }
};
export const DashBoardCard = ({ value }) => {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const [action, setAction] = useState("edit");
  const [openActionModel, setOpenActionModel] = useState(false);
  const handleListItemClick = (event, action) => {
    setAction(action);
    setOpen(false);
    setOpenActionModel(true);
  };

  return (
    <div className="p-2 p-md-3 ">
      {/* <AlertDialog
        open={open}
        showTitle={true}
        title="Chose Action"
        message={
          <>
            <List component="nav" aria-label="secondary mailbox folder">
              <ListItem
                className="border-bottom"
                button
                onClick={(event) => handleListItemClick(event, "edit")}
              >
                <ListItemText className="my-0" primary="Modify Item" />
              </ListItem>
              <ListItem
                className="border-bottom"
                button
                onClick={(event) => handleListItemClick(event, "delete")}
              >
                <ListItemText className="my-0" primary="Delete Item" />
              </ListItem>
            </List>
          </>
        }
        cancelButtonText="Cancel"
        cancelAlertDialog={() => setOpen(false)}
      /> */}
      {openActionModel && (
        <AlertDialog
          open={openActionModel}
          maxWidth="md"
          showTitle={true}
          title={getActionTitle(action, value?.title)}
          message={ActionBody(action, setOpenActionModel, value)}
        />
      )}

      <div className="card task-box hover shadow-sm rounded-xl small">
        <div className="card-body  p-0">
          <div
            className="p-3"
            type="button"
            // onClick={() =>
            //   history.push(
            //     `/dashboard-items/view-item?boardId=${value.boardId}&itemId=${value._id}`
            //   )
            // }
          >
            <div>
              <h6 className="font-size-16">
                <span className="text-dark text-decoration-none">
                  <span>
                    {" "}
                    {value?.documentType?.label}-{value?._id?.substr(-3)}-
                    {value.title}
                  </span>
                </span>
              </h6>
              <p className="mb-0">{value.description}</p>
            </div>
          </div>
          <div
            className="d-flex flex-column flex-sm-row border-top py-2 px-3 team mb-0 justify-content-between position-relative"
            type="button"
            // onClick={() => {
            //   setOpen(true);
            //   handleListItemClick("", "edit");
            // }}
            onClick={() =>
              history.push(
                `/dashboard-items/view-item?boardId=${value.boardId}&itemId=${value._id}`
              )
            }
          >
            <button
              className="MuiButtonBase-root MuiButton-root MuiButton-outlined kanbad-modal-overlay MuiButton-outlinedPrimary"
              tabIndex={0}
              type="button"
            >
              <span className="MuiButton-label" />
              <span className="MuiTouchRipple-root" />
            </button>
            <div className="mr-0 mr-sm-3 align-self-center d-flex align-items-center">
              <div className="text-black-50 small d-flex align-items-center">
                <AttachFileIcon fontSize="small" />
                <span className="ml-1">{value.documents.length}</span>
              </div>
              <div className="mx-2">
                <FlagIcon
                  // className={
                  //   value?.priority?.value ? "text-success" : "text-danger"
                  // }
                  style={{ color: getPriorityColor(value?.priority?.value) }}
                />
              </div>
              <div className="d-flex align-items-center  text-black-50">
                <WatchLaterSharpIcon fontSize="small" />
                <div className="small ml-2">
                  {dateformat.getDate(value.dueDate)}
                </div>
              </div>
            </div>
            <div className="d-flex align-self-center mt-1 mt-sm-0">
              <div className="team-member">
                {value.assignedTo?.map((val) => (
                  <span className="team-member d-inline-block text-decoration-none">
                    <img
                      height={30}
                      width={30}
                      src={
                        val.id?.imageUrl ?? "https://source.unsplash.com/random"
                      }
                      className="rounded-circle avatar-xs ml-n2 border border-white"
                      alt="Nazox"
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
