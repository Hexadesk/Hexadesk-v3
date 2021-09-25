import Select from "react-select";
import React, { useState } from "react";
import AlertDialog from "../../../components/AlertDialog";
import queryString from "query-string";
import { useGetBoardMembers } from "../../../hooks/useGetBoardMembers";
import { useLocation } from "react-router";
import { IconButton, Tooltip } from "@material-ui/core";
import { Clear } from "@material-ui/icons";

export default function SelectPersonModel({
  label,
  usersArray = [],
  onChange,
  error,
}) {
  const params = useLocation();

  const { boardId } = queryString.parse(params.search);
  const [open, setOpen] = useState(false);
  const { isLoadingUsers, users } = useGetBoardMembers({ boardId });
  const [value, setValue] = useState("");

  return (
    <div className="row align-items-center mx-0 mb-2">
      <AlertDialog
        open={open}
        title="Select Persons"
        showTitle={true}
        cancelButtonText="Cancel"
        applyButtonText={value ? "Done" : ""}
        message={
          <div className="p-3">
            <Select
              options={users}
              menuPosition="fixed"
              value={value}
              onChange={(e) => setValue(e)}
              isLoading={isLoadingUsers}
            />
          </div>
        }
        cancelAlertDialog={() => {
          setOpen(false);
        }}
        applyAlertDialog={() => {
          setOpen(false);
          onChange([...usersArray, value]);
        }}
      />
      <div className="col-md-2 pl-0">
        <label className="font-weight-bold text-capitalize mb-0 text-black-50">
          {label}
        </label>
      </div>
      <div className="d-flex flex-column">
        <div className="col col-md-auto px-0 row mx-0 small">
          {usersArray?.map((value, i) => (
            <label key={i} className="m-1 mb-0">
              {/* <label
                style={{
                  height: 28,
                  width: 28,
                  minHeight: 28,
                  minWidth: 28,
                }}
                className="small-img d-flex justify-content-center align-items-center font-weight-bold"
              >
                {value?.label?.split("")[0]}
              </label> */}
              <Tooltip title={value.label ?? value?.name} placement="top">
                <span className="position-relative">
                  <img
                    style={{
                      height: 28,
                      width: 28,
                      minHeight: 28,
                      minWidth: 28,
                    }}
                    className="small-img"
                    src={value?.imageUrl}
                    alt=""
                  />
                  <IconButton
                    size={"small"}
                    style={{
                      position: "absolute",
                      right: "-9px",
                      top: "-15px",
                    }}
                    onClick={() => {
                      let deleteMember = [...usersArray];
                      deleteMember.splice(i, 1);
                      onChange(deleteMember);
                    }}
                  >
                    <Clear color="error" fontSize="small" />
                  </IconButton>
                </span>
              </Tooltip>
            </label>
          ))}
          <label className="m-1 mb-0 btn p-0" onClick={() => setOpen(true)}>
            <Tooltip title={"Add New Member"} placement="top">
              <img
                style={{
                  height: 28,
                  width: 28,
                  minHeight: 28,
                  minWidth: 28,
                }}
                className="small-img"
                src={require("../../../assets/placeholder-user.jpg").default}
                alt=""
              />
            </Tooltip>
          </label>
        </div>
        {error && (
          <small className="text-danger">Atleast one assigne is required</small>
        )}
      </div>
    </div>
  );
}
