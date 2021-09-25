import api from "../apiCalls/api";
import { createNotification } from "../components/Toast";

export const setAuthInfo = (info = {}) => (dispatch) => {
  dispatch({
    type: "SET_AUTH_INFO",
    payload: info,
  });
};

export const resetContent = () => (dispatch) => {
  localStorage.clear();
  dispatch({
    type: "LOGOUT",
  });
};
export const setProjectNameToNavbar = (projectName) => (dispatch) => {
  dispatch({
    type: "SET_PROJECT_NAME",
    payload: projectName,
  });
};

export const changeDarkMode = (value) => (dispatch) => {
  dispatch({
    type: "SET_DARK_MODE",
    payload: value,
  });
};

export const setQuerySearchValues = (name, value) => (dispatch) => {
  dispatch({
    type: "SET_SEARCH_QUERY_PARAMS",
    payload: {
      name,
      value,
    },
  });
};

export const SetBoardItems = ({
  boardId,
  documentType = "",
  text = "",
  status,
}) => (dispatch) => {
  dispatch({
    type: "BOARD_ITEMS_LOADING",
    payload: true,
  });
  api
    .getBoardItemsForFilters({
      boardId,
      documentType: documentType,
      text,
      status,
    })
    .then((res) => {
      dispatch({
        type: "SET_BOARD_ITEMS",
        payload: res.items,
      });
      dispatch({
        type: "BOARD_ITEMS_LOADING",
        payload: false,
      });
    })
    .catch((err) => {
      dispatch({
        type: "BOARD_ITEMS_LOADING",
        payload: false,
      });
      createNotification("error", "Interval Server Error");
    });
};
