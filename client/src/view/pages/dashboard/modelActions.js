import { NewItemView } from "../../components/new-item/NewItemView";
import DeleteItemForm from "./DeleteItemForm";

export const getActionTitle = (action, title) => {
  switch (action) {
    case "new":
      return "Add Item";

    case "edit":
      return title;

    default:
      return "Delete Item";
  }
};

export const ActionBody = (action, setOpen, data) => {
  switch (action) {
    case "edit":
      return (
        <NewItemView
          handleClose={() => setOpen(false)}
          initialState={data}
          isEdit={true}
        />
      );
    case "delete":
      return <DeleteItemForm item={data} handleClose={() => setOpen(false)} />;

    default:
      break;
  }
};
