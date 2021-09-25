import { ListItem } from "@material-ui/core";
// import { Delete, Edit } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import AlertDialog from "../../../components/AlertDialog";
// import { useGetBoardLists } from "../../../hooks/useGetBoardLists";
import { ActionBody, ActionTitle } from "./utils";
import queryString from "query-string";
import { documentTypes, statuses } from "../new-item/utils";
import { useDispatch, useSelector } from "react-redux";
import { SetBoardItems, setQuerySearchValues } from "../../../Action/Auth";
export const HeaderDashboardComponent = () => {
  const params = useLocation();
  const { boardId } = queryString.parse(params.search);
  const dispatch = useDispatch();
  const { boardItems, status, documentType, searchText } = useSelector(
    (state) => state.Auth
  );
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("new-item");

  useEffect(() => {
    dispatch(
      SetBoardItems({
        boardId,
        documentType: "",
        status: status.label,
        text: searchText,
      })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickOpen = (action) => {
    setAction(action);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <header className="mt-1 align-items-center mx-0">
        <div className="d-flex col-12 p-0 justify-content-between">
          <ul className="nav">
            <li className="mr-2 mb-2">
              <ListItem
                size="small"
                button
                className="px-2 py-0 rounded-pill hexa-btn-primary text-decoration-none shadow-sm"
                onClick={() => {
                  dispatch(setQuerySearchValues("documentType", { label: "" }));
                  dispatch(
                    SetBoardItems({
                      boardId,
                      documentType: "",
                      status: status.label,
                      text: searchText,
                    })
                  );
                }}
                selected={"" === documentType.label}
              >
                <small className="font-weight-bold mr-2">
                  {"All"}
                  {"" === documentType.label && (
                    <span>({boardItems?.length})</span>
                  )}
                </small>
              </ListItem>
            </li>
            {documentTypes.map((data) => {
              return (
                <li className="mr-2 mb-2">
                  <ListItem
                    // size="small"
                    button
                    onClick={() => {
                      dispatch(setQuerySearchValues("documentType", data));

                      dispatch(
                        SetBoardItems({
                          boardId,
                          documentType: data.label,
                          status: status.label,
                          text: searchText,
                        })
                      );
                    }}
                    className="px-2 py-0 rounded-pill hexa-btn-primary text-decoration-none shadow-sm"
                    selected={data.label === documentType.label}
                  >
                    <small className="font-weight-bold mr-2">
                      {data.label}{" "}
                      {data.label === documentType.label && (
                        <span>({boardItems?.length})</span>
                      )}
                    </small>
                  </ListItem>
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            onClick={() => handleClickOpen("new-item-view")}
            className="btn btn-sm btn-light rounded-pill mx-1"
          >
            <div className="d-flex align-items-center font-weight-bold small text-black-50  text-capitalize">
              <span className="mb-0 mr-1">&#43;</span>
              <span>Add another item</span>
            </div>
          </button>
        </div>
        <div className="d-flex col-12 p-0 justify-content-between">
          <ul className="nav">
            <li className="mr-2 mb-2">
              <ListItem
                size="small"
                button
                className="px-2 py-0 rounded-pill hexa-btn-primary text-decoration-none shadow-sm"
                onClick={() => {
                  dispatch(setQuerySearchValues("status", { label: "" }));
                  dispatch(
                    SetBoardItems({
                      boardId,
                      documentType: documentType.label,
                      status: "",
                      text: searchText,
                    })
                  );
                }}
                selected={"" === status.label}
              >
                <small className="font-weight-bold mr-2">
                  {"All"}{" "}
                  {"" === status.label && <span>({boardItems?.length})</span>}
                </small>
              </ListItem>
            </li>
            {statuses.map((data) => {
              return (
                <li className="mr-2 mb-2">
                  <ListItem
                    size="small"
                    button
                    className="px-2 py-0 rounded-pill hexa-btn-primary text-decoration-none shadow-sm"
                    onClick={() => {
                      dispatch(setQuerySearchValues("status", data));

                      dispatch(
                        SetBoardItems({
                          boardId,
                          documentType: documentType.label,
                          status: data?.label,
                          text: searchText,
                        })
                      );
                    }}
                    selected={data.label === status.label}
                  >
                    <small className="font-weight-bold mr-2">
                      {data.label}{" "}
                      {data.label === status.label && (
                        <span>({boardItems?.length})</span>
                      )}
                    </small>
                  </ListItem>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="ml-auto ">
          {/* <button
            type='button'
            onClick={() => handleClickOpen('new-list')}
            className='btn btn-sm btn-light rounded-pill mx-1'
          >
            <div className='d-flex align-items-center font-weight-bold small text-black-50  text-capitalize'>
              <span className='mb-0 mr-1'>&#43;</span>
              <span>Add another List</span>
            </div>
          </button> */}

          {/* <button
            type='button'
            onClick={() => handleClickOpen('new-item')}
            className='btn btn-sm btn-light rounded-pill mx-1'
          >
            <div className='d-flex align-items-center font-weight-bold small text-black-50 text-capitalize'>
              <span className='mb-0 mr-1'>&#43;</span>
              <span>Add another item</span>
            </div>
          </button> */}
          {open && (
            <AlertDialog
              title={ActionTitle(action)}
              open={open}
              showTitle={true}
              maxWidth="md"
              message={ActionBody(action, handleClose)}
              cancelAlertDialog={() => handleClose()}
            />
          )}
        </div>
      </header>
    </>
  );
};
