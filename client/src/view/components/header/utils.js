import React from "react";

import { NewItemView } from "../new-item/NewItemView";
import NewList from "../new-item/NewList";

export const ActionTitle = (title) => {
  switch (title) {
    case "new-item-view":
      return "New Item View";

    default:
      return "";
  }
};

export const ActionBody = (action, handleClose, initialState) => {
  switch (action) {
    case "new-item-view":
      return <NewItemView handleClose={handleClose} />;

    case "edit-list":
      return (
        <NewList
          handleClose={handleClose}
          initialState={initialState}
          isEdit={true}
        />
      );
    case "edit-item":
      return <NewList />;
    case "delete-item":
      return <NewList />;
    case "delete-list":
      return <NewList />;
    default:
      return "";
  }
};
