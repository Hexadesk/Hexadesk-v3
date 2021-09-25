import React, { useEffect } from "react";
// import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
// import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
// import PDF from "../../../assets/test.pdf";
import { Controller, useForm } from "react-hook-form";
import SelectPersonModel from "./SelectPersonsModel";
import Select from "react-select";
import { statuses, documentTypes, priorities } from "./utils";
import SelectFiles from "./SelectFiles";
import { useMutation, useQueryClient } from "react-query";
import api from "../../../apiCalls/api";
import { createNotification } from "../../../components/Toast";
import { useLocation } from "react-router";
import queryString from "query-string";
import { SetBoardItems } from "../../../Action/Auth";
import { useDispatch, useSelector } from "react-redux";
import dateformat from "../../../helpers/dateformat";
import { useGetBoardItems } from "../../../hooks/useGetBoardItems";

const transformUsers = (data) => {
  const newData = [];
  data?.map((value) =>
    newData.push({
      ...value?.id,
      id: value?.id?._id,
    })
  );
  return newData;
};

export const NewItemView = ({ isEdit, initialState, handleClose }) => {
  const dispatch = useDispatch();
  const params = useLocation();
  const { searchText, documentType: dt, status: ss } = useSelector(
    (state) => state.Auth
  );
  const queryClient = useQueryClient();

  const { boardId } = queryString.parse(params.search);
  const { errors, handleSubmit, control, reset, watch } = useForm();
  const { boardItems, isLoading: isLoadingBoardItems } = useGetBoardItems(
    boardId
  );
  useEffect(() => {
    if (isEdit) {
      reset({
        ...initialState,
        assignedTo: transformUsers(initialState?.assignedTo),
        cc: transformUsers(initialState?.cc),
        dueDate: dateformat.parseDate(initialState.dueDate),
        startDate: dateformat.parseDate(initialState.startDate),
      });
    } else {
      reset({
        startDate: dateformat.parseDate(new Date()),
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialState, isEdit]);

  const { mutate, isLoading } = useMutation(
    isEdit ? api.editItem : api.addItem,
    {
      onSuccess: async (res) => {
        createNotification("success", "Item Created Successfully");
        dispatch(
          SetBoardItems({
            boardId: boardId,
            status: ss.label,
            documentType: dt.label,
            text: searchText,
          })
        );
        if (isEdit) {
          queryClient.invalidateQueries("useGetSingleBoardItem");
        }
        handleClose();
      },
      onError: async (err) => {
        createNotification(
          "error",
          err?.data?.message ?? "Unable to create item"
        );
      },
    }
  );
  const onSubmit = (data) => {
    mutate({ ...data, boardId, id: initialState?._id });
  };

  const { mutate: deleteItem, isLoading: isLoadingDelete } = useMutation(
    api.deleteItem,
    {
      onSuccess: async (res) => {
        createNotification("success", "Item Deleted Successfully");
        dispatch(
          SetBoardItems({
            boardId: initialState.boardId,
            status: ss.label,
            documentType: dt.label,
            text: searchText,
          })
        );
        handleClose();
      },
      onError: async (err) => {
        createNotification(
          "error",
          err?.data?.message ?? "Unable to delete item"
        );
      },
    }
  );
  const { documentType, title } = watch();
  const getListOfItems = () => {
    const boardItemsOptions = [];
    boardItems?.map(({ title, _id, ...rest }) =>
      boardItemsOptions.push({
        label: title,
        value: _id,
        _id,
        ...rest,
      })
    );
    return boardItemsOptions;
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-fill d-flex flex-column"
    >
      <div className="px-4 mt-3 glass">
        {isEdit && (
          <h4 className="text-primary font-weight-bold">
            {documentType?.label}-{initialState?._id.substr(-3)}-{title}
          </h4>
        )}
      </div>
      <section className="flex-fill mb-n2">
        <div className="scroll-box" style={{ height: "50vh" }}>
          <div className="p-4">
            <div className="mb-3">
              {isEdit && (
                <div className="row align-items-center mx-0 mb-2">
                  <div className="col-md-2 pl-0">
                    <label className="font-weight-bold text-capitalize mb-0 text-black-50">
                      Created By
                    </label>
                  </div>
                  <div className="d-flex flex-column">
                    <div className="col col-md-auto px-0 row mx-0 small">
                      <label className="m-1 mb-0 d-flex ">
                        <img
                          style={{
                            height: 32,
                            width: 32,
                            minHeight: 32,
                            minWidth: 32,
                          }}
                          className="small-img"
                          src={initialState?.createdBy?.imageUrl}
                          alt=""
                        />
                        <h5 className="ml-2">
                          {initialState?.createdBy?.name}
                        </h5>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              <Controller
                name="title"
                control={control}
                rules={{ required: true }}
                render={({ onChange, value }) => (
                  <div className="row mx-0 mb-2">
                    <div className="col-md-2 pl-0">
                      <label className="font-weight-bold text-capitalize mb-0 text-black-50">
                        Name
                      </label>
                    </div>
                    <div className="small col px-0">
                      <textarea
                        type="text"
                        placeholder={
                          "Plumbing sleeve in shear wall M27 level 22"
                        }
                        className="font-weight-bold text-primary w-100 "
                        value={value}
                        onChange={({ target }) => {
                          onChange(target.value);
                        }}
                      />
                      {errors?.title && (
                        <small className="text-danger">
                          This Field is required
                        </small>
                      )}
                    </div>
                  </div>
                )}
              />

              <Controller
                name="documentType"
                control={control}
                rules={{ required: true }}
                render={({ onChange, value }) => (
                  <div className="row mx-0 mb-2">
                    <div className="col-md-2 pl-0">
                      <label className="font-weight-bold text-capitalize mb-0 text-black-50">
                        Document Type
                      </label>
                    </div>
                    <div className="small col px-0">
                      <Select
                        placeholder={"Submittals, Invoice etc "}
                        className="font-weight-bold text-primary w-100 border-0"
                        value={value}
                        onChange={(e) => {
                          onChange(e);
                        }}
                        options={documentTypes}
                      />
                      {errors?.documentType && (
                        <small className="text-danger">
                          This Field is required
                        </small>
                      )}
                    </div>
                  </div>
                )}
              />
              <Controller
                name="status"
                control={control}
                rules={{ required: true }}
                defaultValue={statuses[0]}
                render={({ onChange, value }) => (
                  <div className="row mx-0 mb-2">
                    <div className="col-md-2 pl-0">
                      <label className="font-weight-bold text-capitalize mb-0 text-black-50">
                        Status
                      </label>
                    </div>
                    <div className="small col px-0">
                      <Select
                        placeholder={"TODO, Inprogress ... "}
                        className="font-weight-bold text-primary w-100 border-0"
                        value={value}
                        onChange={(e) => {
                          onChange(e);
                        }}
                        options={statuses}
                      />
                    </div>
                  </div>
                )}
              />
              <Controller
                name="startDate"
                control={control}
                rules={{ required: true }}
                render={({ onChange, value }) => (
                  <div className="row align-items-center mx-0 mb-3">
                    <div className="col-md-2 pl-0">
                      <label className="font-weight-bold text-capitalize mb-0 text-black-50">
                        Starting Date
                      </label>
                    </div>
                    <div className="col col-md-auto px-0 small">
                      <input
                        value={value}
                        onChange={({ target }) => {
                          onChange(target.value);
                        }}
                        className="font-weight-bold text-primary w-100 border-0"
                        type="date"
                      />
                      {errors?.startDate && (
                        <small className="text-danger">
                          This Field is required
                        </small>
                      )}
                    </div>
                  </div>
                )}
              />
              <Controller
                name="dueDate"
                control={control}
                rules={{ required: true }}
                render={({ onChange, value }) => (
                  <div className="row align-items-center mx-0 mb-3">
                    <div className="col-md-2 pl-0">
                      <label className="font-weight-bold text-capitalize mb-0 text-black-50">
                        Due Date
                      </label>
                    </div>
                    <div className="col col-md-auto px-0 small">
                      <input
                        onChange={({ target }) => {
                          onChange(target.value);
                        }}
                        value={value}
                        className="font-weight-bold text-primary w-100 border-0"
                        type="date"
                      />
                      {errors?.dueDate && (
                        <small className="text-danger">
                          This Field is required
                        </small>
                      )}
                    </div>
                  </div>
                )}
              />
              <Controller
                name="priority"
                control={control}
                rules={{ required: true }}
                render={({ onChange, value }) => (
                  <div className="row mx-0 mb-2">
                    <div className="col-md-2 pl-0">
                      <label className="font-weight-bold text-capitalize mb-0 text-black-50">
                        Priority
                      </label>
                    </div>
                    <div className="small col px-0">
                      <Select
                        placeholder={"High, Medium, Low"}
                        className="font-weight-bold text-primary w-100 border-0"
                        value={value}
                        onChange={(e) => {
                          onChange(e);
                        }}
                        options={priorities}
                      />
                      {errors?.priority && (
                        <small className="text-danger">
                          This Field is required
                        </small>
                      )}
                    </div>
                  </div>
                )}
              />
              <Controller
                name="assignedTo"
                control={control}
                rules={{ required: true }}
                render={({ onChange, value }) => (
                  <>
                    <SelectPersonModel
                      label={"Assigned To"}
                      onChange={onChange}
                      usersArray={value}
                      error={errors?.assignedTo}
                    />
                  </>
                )}
              />
              <Controller
                name="cc"
                control={control}
                rules={{ required: false }}
                render={({ onChange, value }) => (
                  <SelectPersonModel
                    label={"CC"}
                    onChange={onChange}
                    usersArray={value}
                  />
                )}
              />
              <Controller
                name="description"
                control={control}
                rules={{ required: true }}
                render={({ onChange, value }) => (
                  <div className="row mx-0 mb-2">
                    <div className="col-md-2 pl-0">
                      <label className="font-weight-bold text-capitalize mb-0 text-black-50">
                        Description :
                      </label>
                    </div>
                    <div className="small col px-0">
                      <textarea
                        type="text"
                        className="font-weight-bold text-primary w-100"
                        placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Plumbing sleeve in shear wall M27 level 22"
                        onChange={({ target }) => {
                          onChange(target.value);
                        }}
                        value={value}
                      />
                    </div>
                  </div>
                )}
              />
              {/* <div className="row mx-0 mb-2">
                <div className="col-md-2 pl-0">
                  <label className="font-weight-bold text-capitalize mb-0 text-black-50">
                    Links
                  </label>
                </div>
                <div className="small col px-0 row mx-0">
                  {linksArr.map((i, data) => (
                    <a
                      key={i}
                      href="/"
                      className="m-1 font-weight-bold text-uppercase"
                    >
                      PO-2567
                    </a>
                  ))}
                </div>
              </div> */}
              <Controller
                name="links"
                control={control}
                rules={{ required: false }}
                render={({ onChange, value }) => (
                  <div className="row mx-0 mb-2">
                    <div className="col-md-2 pl-0">
                      <label className="font-weight-bold text-capitalize mb-0 text-black-50">
                        Links
                      </label>
                    </div>
                    <div className="small col px-0">
                      <Select
                        isMulti
                        placeholder={"Links"}
                        className="font-weight-bold text-primary w-100 border-0"
                        value={value}
                        onChange={(e) => {
                          onChange(e);
                        }}
                        options={getListOfItems()}
                        isLoading={isLoadingBoardItems}
                      />
                      {errors?.links && (
                        <small className="text-danger">
                          This Field is required
                        </small>
                      )}
                    </div>
                  </div>
                )}
              />
            </div>
            <Controller
              name="documents"
              control={control}
              rules={{ required: false }}
              render={({ onChange, value }) => (
                <SelectFiles
                  onChangeFiles={onChange}
                  documents={value}
                  isEdit={isEdit}
                />
              )}
            />
          </div>
          {/* Chat Start */}
          {isEdit && (
            <div className="bg-light p-3">
              <label className="col-12 px-0 font-weight-bold text-capitalize mb-2">
                Activity :
              </label>
              {initialState?.activity?.map((data, i) => (
                <div key={i} className="chat-container">
                  <div className="row mx-0 align-items-baseline">
                    <span className="mr-2">
                      <img
                        className="small-img"
                        src={data?.userId?.imageUrl}
                        alt="user"
                      />
                    </span>
                    <div className="small ">
                      <div className="chat-container__header d-flex align-items-baseline">
                        <span className="font-weight-bold">
                          {data?.userId?.name}
                        </span>
                        <small className="ml-1">
                          {dateformat.fromNow(data?.createdAt)}
                        </small>
                        <div className="ml-auto"></div>
                      </div>

                      <div className="chat-container__body mt-2">
                        <div className="mb-1">
                          <b>{dateformat.getDate(data?.createdAt)}</b>&nbsp;
                          {data.text}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Chat End */}
        </div>
      </section>

      <section className="bg-light p-3 border-top">
        {isEdit && (
          <div className="row mx-0">
            <div className="mr-2">
              <img
                className="small-img"
                src={initialState?.createdBy?.imageUrl}
                alt="item"
              />
            </div>
            <div className="flex-fill">
              <Controller
                name="commentText"
                control={control}
                rules={{ required: false }}
                render={({ onChange, value }) => (
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Add Options"
                    onChange={({ target }) => onChange(target.value)}
                  />
                )}
              />
            </div>
          </div>
        )}
        <div className="mt-2 text-right">
          {isEdit && (
            <button
              type="button"
              className="btn-danger btn-sm px-3 border-0 mr-3"
              disabled={isLoadingDelete}
              onClick={() => {
                deleteItem(initialState._id);
              }}
            >
              {isLoadingDelete ? "Deleting" : "Delete"}
            </button>
          )}

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
            {isLoading ? "Loading, It might take time" : "Done"}
          </button>
        </div>
      </section>
    </form>
  );
};
