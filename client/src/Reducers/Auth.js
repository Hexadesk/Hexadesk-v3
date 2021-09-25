import produce from "immer";
import { statuses } from "../view/components/new-item/utils";
const initialstate = {
  userToken: "",
  user: {},
  isAuthenticated: false,
  darkMode: true,
  projectName: "",
  boardItems: [],
  boardItemsLoading: true,
  searchText: "",
  status: statuses[1],
  documentType: { label: "", value: "" },
};

const LoginReducer = produce((state = initialstate, action) => {
  switch (action.type) {
    case "SET_AUTH_INFO": {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.userToken = action.payload.access_token;
      return state;
    }
    case "LOGOUT": {
      return initialstate;
    }
    case "SET_PROJECT_NAME": {
      state.projectName = action.payload;
      return state;
    }
    case "SET_BOARD_ITEMS": {
      state.boardItems = action.payload;
      return state;
    }
    case "BOARD_ITEMS_LOADING": {
      state.boardItemsLoading = action.payload;
      return state;
    }
    case "SET_SEARCH_QUERY_PARAMS": {
      state[action.payload.name] = action.payload.value;
      return state;
    }
    default:
      return state;
  }
});

export default LoginReducer;
