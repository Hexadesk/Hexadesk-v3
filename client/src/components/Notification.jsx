import React from "react";
import MailOutlineOutlinedIcon from "@material-ui/icons/MailOutlineOutlined";
import { Link } from "react-router-dom";
import dateformat from "../helpers/dateformat";
import { Grid, Button } from "@material-ui/core";
import axios from "axios";
import { useQueryClient } from "react-query";

export const Notification = ({
  open,
  className,
  onClose,
  readData = [],
  unreadData = [],
  totalNotifications = 0,
}) => {
  const queryClient = useQueryClient();
  const notificationData2 = [
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ];

  const updateNotificationStatus = () => {
    axios.patch("/notification/status").then(() => {
      queryClient.invalidateQueries("useGetNotifications");
    });
  };

  return (
    <>
      {/* Desktop Start */}
      <div className="position-relative d-none d-lg-block">
        <div
          className={`notification-container-1 bg-white shadow ${className}`}
        >
          <div className="row justify-content-between mx-0 text-black-50 px-2 py-3">
            <h6 className="mb-0 text-capitalize">notification</h6>
            <h6 className="mb-0">
              <small className="font-weight-bold">{totalNotifications}</small>
            </h6>
          </div>
          <div className="scroll-box" style={{ height: 450 }}>
            <Grid xs={12} container justify="flex-end">
              <Button
                variant="outlined"
                size="small"
                onClick={updateNotificationStatus}
              >
                Mark as read
              </Button>
            </Grid>
            <Grid xs={12} container>
              <small className="text-black small">New</small>
            </Grid>

            {unreadData?.map((data, i) => (
              <Link
                to={`/dashboard-items/view-item?boardId=${data.boardId}&itemId=${data.itemId}`}
                className={`border-top d-flex h6 text-black-50 mb-0 p-2 text-decoration-none ${className}`}
              >
                <div className="border-right small pr-3 d-flex align-items-center">
                  <MailOutlineOutlinedIcon />
                </div>
                <div className="small pl-3 text-left">
                  <div>
                    <b className="text-capitalize mr-1">{data.text}</b>
                  </div>

                  <div className="text-black-50 small">
                    {dateformat.fromNow(data.createdAt)}
                  </div>
                </div>
              </Link>
            )) ?? "No New Notifications"}
            <small className="text-black small">Old</small>

            {readData?.map((data, i) => (
              <Link
                to={`/dashboard-items/view-item?boardId=${data.boardId}&itemId=${data.itemId}`}
                className={`border-top d-flex h6 text-black-50 mb-0 p-2 text-decoration-none ${className}`}
              >
                <div className="border-right small pr-3 d-flex align-items-center">
                  <MailOutlineOutlinedIcon />
                </div>
                <div className="small pl-3 text-left">
                  <div>
                    <b className="text-capitalize mr-1">{data.text}</b>
                  </div>

                  <div className="text-black-50 small">
                    {dateformat.fromNow(data.createdAt)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* Desktop End */}
      {/* Mobile Start */}
      <div className="position-relative d-lg-none">
        <div className={`notification-container-2 ${className}`}>
          <div>
            <div className="row justify-content-between mx-0 bg-white px-2 py-3">
              <h6 className="mb-0 text-capitalize">notification</h6>
              <h6 className="mb-0">
                <small className="font-weight-bold">17</small>
              </h6>
              <button
                onClick={onClose}
                type="button"
                className="btn btn-primary rounded-circle border-0 m-2 fixed-bottom vibrate-1"
                style={{ left: "unset" }}
              >
                <span className="h5">&times;</span>
              </button>
            </div>
          </div>
          <div className="scroll-box px-2" style={{ height: "95%" }}>
            {notificationData2?.map((i, data) => (
              <Link
                to={data.link}
                className={`border-top d-flex h6 text-black-50 mb-0 p-2 text-decoration-none ${className}`}
              >
                <div className="border-right small pr-3 d-flex align-items-center">
                  <MailOutlineOutlinedIcon />
                </div>
                <div className="small pl-3 text-left">
                  <div>
                    <b className="text-capitalize mr-1">new requested date</b>
                    on
                  </div>
                  <div className="text-primary my-1">Training 985</div>
                  <div className="text-black-50 small">1 hour age</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* Mobile End */}
    </>
  );
};
