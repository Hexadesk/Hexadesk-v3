import { Grid } from "@material-ui/core";
import React from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { SetBoardItems } from "../../../Action/Auth";
import api from "../../../apiCalls/api";
import { createNotification } from "../../../components/Toast";

export default function DeleteItemForm({ item, handleClose }) {
  const dispatch = useDispatch();
  const { mutate, isLoading } = useMutation(api.deleteItem, {
    onSuccess: async (res) => {
      createNotification("success", "Board Deleted Successfully");
      dispatch(SetBoardItems({ boardId: item.boardId }));
      handleClose();
    },
    onError: async (err) => {
      createNotification(
        "error",
        err?.data?.message ?? "Unable to delete item"
      );
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutate(item._id);
      }}
      className="flex-fill d-flex flex-column p-2"
    >
      <Grid
        container
        xs={12}
        spacing={2}
        className="flex-fill d-flex flex-column"
      >
        <Grid xs={12} item>
          Are you sure you want to delete <b>{item?.title}</b>?{" "}
        </Grid>
        <Grid container item justify="flex-end">
          <Grid>
            <button
              type="button"
              className="btn-danger btn-sm px-3 border-0 mr-3"
              disabled={isLoading}
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary btn-sm px-3 border-0"
              disabled={isLoading}
            >
              {isLoading ? "Loading, It might take time" : "Delete"}
            </button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}
