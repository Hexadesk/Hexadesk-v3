import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
// import CardActions from "@material-ui/core/CardActions";
// import Collapse from "@material-ui/core/Collapse";

import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import dateformat from "../../../helpers/dateformat";

import { MenuItem, Menu, CircularProgress } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { useMutation, useQueryClient } from "react-query";
import { createNotification } from "../../../components/Toast";
import api from "../../../apiCalls/api";
import { useLocation } from "react-router";
import queryString from "query-string";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
    borderRadius: "0.8rem",
  },
  media: {
    height: 80,
    width: 80,
    borderRadius: 50,
    boxShadow: "0 0 4px 2px #b2a8a8",
    border: "1px solid #fff",
    margin: "auto",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

export default function MemberCard({ className, member }) {
  const classes = useStyles();
  const queryClient = useQueryClient();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const params = useLocation();

  const { boardId } = queryString.parse(params.search);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const badges = [
  //   { className: "badge-success", name: "RFL: 25" },
  //   { className: "badge-primary", name: "Task: 1550" },
  //   { className: "badge-dark", name: "Invoice: 450" },
  //   { className: "badge-info", name: "Submittals: 1 25" },
  //   { className: "badge-danger", name: "Additional Cost: 78" },
  //   { className: "badge-light", name: "Change Order: 12" },
  //   { className: "badge-secondary", name: "Impairment: 350" },
  //   { className: "badge-warning", name: "Payment Request: 210" },
  //   { className: "badge-success", name: "Quote: 56" },
  //   { className: "badge-primary", name: "Unit Specification: 191" },
  //   { className: "badge-danger", name: "PO: 560" },
  //   { className: "badge-warning", name: "Meeting Minutes: 60" },
  // ];

  const { mutate, isLoading } = useMutation(api.removeMember, {
    onSuccess: async (res) => {
      handleClose();
      createNotification("success", "Member Removed Successfully");
      queryClient.invalidateQueries("useGetBoardMembers");
    },
    onError: async (err) => {
      createNotification(
        "error",
        err?.data?.message ?? "Unable to remove Member"
      );
    },
  });

  return (
    <Card className={`${className} ${classes.root}`} style={{ height: "0%" }}>
      <CardHeader
        className="pb-0"
        action={
          <IconButton aria-label="settings" size="small" onClick={handleClick}>
            <MoreHorizIcon />
          </IconButton>
        }
        subheader={dateformat.fromNow(member.updatedAt)}
      />
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        {/* <MenuItem onClick={handleClose}>
          <div className="d-flex">
            <Edit />
            Modify Member
          </div>
        </MenuItem> */}
        <MenuItem
          onClick={() =>
            mutate({
              boardId,
              memberId: member?.id,
              memberEmail: member?.email,
            })
          }
        >
          <div className="d-flex">
            {isLoading && <CircularProgress size={15} />}{" "}
            <Delete color="error" />
            {isLoading ? "Deleting Member" : " Delete Member"}
          </div>
        </MenuItem>
      </Menu>
      <CardMedia
        className={classes.media}
        image={member.imageUrl}
        title="Kevin Cyr"
      />
      <CardContent>
        <Typography
          variant="subtitle2"
          component="p"
          className="text-center text-primary"
        >
          {member.label}
        </Typography>
        <Typography variant="subtitle2" component="p" className="text-center">
          {member.companyName} {member.role && <span>{member.role}</span>}
        </Typography>
        <Typography
          variant="caption"
          color="textSecondary"
          component="p"
          className="text-center"
        >
          Member Since: {dateformat.getDate(member.updatedAt)}
        </Typography>
        <div className="text-center badges-container">
          <span
            className={`badge badge-light text-primary m-2 py-1 px-2 rounded-lg`}
          >
            All Items: {member.totalItems ?? 0}
          </span>
        </div>
      </CardContent>
      {/* <CardActions disableSpacing className="border-top">
        <IconButton
          className={` mx-auto ${clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}`}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <div className="text-center badges-container">
            {badges.map((value) => (
              <span
                className={`badge m-2  py-1 px-2 rounded-lg  ${value.className}`}
              >
                {value.name}
              </span>
            ))}
          </div>
        </CardContent>
      </Collapse> */}
    </Card>
  );
}
