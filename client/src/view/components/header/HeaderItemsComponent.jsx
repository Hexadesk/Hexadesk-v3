import React, { useState } from "react";
import {
  Avatar,
  Dialog,
  // FormControl, NativeSelect
} from "@material-ui/core";
import { AvatarGroup } from "@material-ui/lab";

// Components

import { CustomBtnPrimary } from "../custom/CustomBtnPrimary";

// icons
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// import DateRangeOutlinedIcon from "@material-ui/icons/DateRangeOutlined";
// import TuneOutlinedIcon from "@material-ui/icons/TuneOutlined";
import AppsOutlinedIcon from "@material-ui/icons/AppsOutlined";
import { useHistory, useLocation } from "react-router";
import { useGetBoardMembers } from "../../../hooks/useGetBoardMembers";

import queryString from "query-string";
export const HeaderItemsComponent = () => {
  const history = useHistory();
  const [itemsToggle, setItemsToggle] = useState(false);
  const params = useLocation();

  const { boardId } = queryString.parse(params.search);
  const { users } = useGetBoardMembers({ boardId });

  return (
    <div className="ms-auto">
      {/* Desktop Start */}
      <div className="d-none d-lg-flex">
        <CustomBtnPrimary className="px-3  mr-3">
          <LockOutlinedIcon style={{ fontSize: "1.2rem" }} />
          <span className="ms-2"> Private</span>
        </CustomBtnPrimary>

        <AvatarGroup max={4} className="avatar-container mr-3">
          {users?.map((value) => (
            <Avatar alt={value.label} src={value.imageUrl} />
          ))}
        </AvatarGroup>

        <CustomBtnPrimary
          className="px-3 mr-3"
          onClick={() => {
            history.push(`/invite-members?boardId=${boardId}`);
          }}
        >
          <span>Invite</span>
        </CustomBtnPrimary>

        {/*  <CustomDivider color="#D8DAE1" />

       <CustomBtnPrimary className="mx-3">
          <DateRangeOutlinedIcon style={{ fontSize: "1.2rem" }} />
        </CustomBtnPrimary>

        <CustomBtnPrimary className="mr-3">
          <TuneOutlinedIcon style={{ fontSize: "1.2rem" }} />
        </CustomBtnPrimary>

        <FormControl>
          <NativeSelect
            className="text-light"
            name="age"
            inputProps={{ "aria-label": "age" }}
            style={{ fontSize: "0.9rem" }}
          >
            <option value="" disabled selected>
              Board
            </option>
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </NativeSelect>
        </FormControl> */}
      </div>
      {/* Desktop End */}
      {/* Mobile Start */}
      <div className="d-lg-none">
        <CustomBtnPrimary
          className="p-1 border-0"
          onClick={() => setItemsToggle(!itemsToggle)}
        >
          <AppsOutlinedIcon style={{ fontSize: "0.9rem" }} />
        </CustomBtnPrimary>
        <Dialog
          fullScreen
          open={itemsToggle}
          onClose={() => setItemsToggle(false)}
          aria-labelledby="responsive-dialog-title"
        >
          <div className="d-flex bg-white align-items-center justify-content-center p-3">
            <CustomBtnPrimary className="px-3 mr-3">
              <LockOutlinedIcon style={{ fontSize: "1.2rem" }} />
              <span className="ms-2"> Private</span>
            </CustomBtnPrimary>

            <AvatarGroup max={4} className="avatar-container mr-3">
              {users?.map((value) => (
                <Avatar alt={value.label} src={value.imageUrl} />
              ))}
            </AvatarGroup>
            <button
              onClick={() => setItemsToggle(false)}
              type="button"
              className="btn btn-close position-fixed m-1"
              style={{ top: 0, right: 0 }}
            >
              <h4 className="mb-0"> &times;</h4>
            </button>
          </div>

          <div className="d-flex bg-white align-items-center justify-content-center p-3">
            <CustomBtnPrimary
              className="px-3"
              onClick={() => {
                history.push(`/invite-members?boardId=${boardId}`);
              }}
            >
              <span>Invite</span>
            </CustomBtnPrimary>

            {/* <CustomBtnPrimary className="mx-3">
              <DateRangeOutlinedIcon style={{ fontSize: "1.2rem" }} />
            </CustomBtnPrimary>

            <CustomBtnPrimary className="mr-3">
              <TuneOutlinedIcon style={{ fontSize: "1.2rem" }} />
            </CustomBtnPrimary> */}

            {/* <FormControl>
              <NativeSelect
                className="text-light"
                name="age"
                inputProps={{ "aria-label": "age" }}
                style={{ fontSize: "0.9rem" }}
              >
                <option value="" disabled selected>
                  Board
                </option>
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
              </NativeSelect>
            </FormControl> */}
          </div>
        </Dialog>
      </div>
      {/* Mobile End */}
    </div>
  );
};
