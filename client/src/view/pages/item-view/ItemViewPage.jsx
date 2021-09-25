import React, { useState } from "react";

import { useLocation, Link as RRlink } from "react-router-dom";
import queryString from "query-string";
import { useGetSingleBoardItem } from "../../../hooks/useGetSingleBoardItem";
import { CircularProgress, IconButton, Link } from "@material-ui/core";
import { getPriorityColor } from "../dashboard/DashBoardCard";
import dateformat from "../../../helpers/dateformat";
import { ArrowBack } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import AlertDialog from "../../../components/AlertDialog";
import { getActionTitle, ActionBody } from "../dashboard/modelActions";

export const ItemViewPage = () => {
  const params = useLocation();
  const { itemId, boardId } = queryString.parse(params.search);
  const [openViewer, setOpenViewer] = useState(false);
  const [activeUrl, setActiveUrl] = useState(false);
  const [openActionModel, setOpenActionModel] = useState(false);
  const { itemData, isLoading } = useGetSingleBoardItem(itemId);

  if (isLoading) {
    return (
      <div className="h-70vh d-flex justify-content-center align-items-center">
        <CircularProgress size={36} />
      </div>
    );
  }

  return (
    <div className="flex-fill d-flex flex-column bg-white">
      {openActionModel && (
        <AlertDialog
          open={openActionModel}
          maxWidth="md"
          showTitle={true}
          title={getActionTitle(
            "edit",
            <span>
              {" "}
              {itemData?.documentType?.label}-{itemData?._id?.substr(-3)}-
              {itemData.title}
            </span>
          )}
          message={ActionBody("edit", setOpenActionModel, itemData)}
        />
      )}

      <div className="px-4 mt-3 glass d-flex col-sm-12 justify-content-between">
        <h4 className="text-primary font-weight-bold d-flex align-items-center">
          <IconButton size="small">
            <RRlink to={boardId ? `/dashboard-items?boardId=${boardId}` : "/"}>
              <ArrowBack />
            </RRlink>
          </IconButton>{" "}
          {itemData?.documentType?.label}-{itemData?._id?.substr(-3)}-
          {itemData.title}
        </h4>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenActionModel(true)}
          className="mb-2"
        >
          Edit
        </Button>
      </div>
      <div className="d-flex">
        <div className={openViewer ? "col-sm-6" : "col-sm-12"}>
          <section className="flex-fill mb-n2">
            <div>
              <div className="p-4">
                <div className="mb-3">
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
                            src={itemData?.createdBy?.imageUrl}
                            alt=""
                          />
                          <h5 className="ml-2">{itemData?.createdBy?.name}</h5>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row mx-0 mb-3">
                    <div className="col-md-2 pl-0">
                      <label className="font-weight-bold text-capitalize mb-0 text-black-50">
                        Name
                      </label>
                    </div>
                    <div className="small col px-0">
                      <p className="mb-0 font-weight-bold text-primary">
                        {itemData.title}
                      </p>
                    </div>
                  </div>
                  <div className="row mx-0 mb-3">
                    <div className="col-md-2 pl-0">
                      <label className="font-weight-bold text-capitalize mb-0 text-black-50">
                        Document Type
                      </label>
                    </div>
                    <div className="small col px-0">
                      <p className="mb-0 font-weight-bold text-primary">
                        {itemData.documentType?.label}
                      </p>
                    </div>
                  </div>
                  <div className="row mx-0 mb-3">
                    <div className="col-md-2 pl-0">
                      <label className="font-weight-bold text-capitalize mb-0 text-black-50">
                        Status
                      </label>
                    </div>
                    <div className="small col px-0">
                      <p className="mb-0 font-weight-bold text-primary">
                        {itemData?.status?.label}
                      </p>
                    </div>
                  </div>
                  <div className="row align-items-center mx-0 mb-3">
                    <div className="col-md-2 pl-0">
                      <label className="font-weight-bold text-capitalize mb-0 text-black-50">
                        Starting Date
                      </label>
                    </div>
                    <div className="col col-md-auto px-0 small">
                      <p className="mb-0 font-weight-bold text-primary">
                        {dateformat.parseDate(itemData.startDate)}
                      </p>
                    </div>
                  </div>
                  <div className="row align-items-center mx-0 mb-3">
                    <div className="col-md-2 pl-0">
                      <label className="font-weight-bold text-capitalize mb-0 text-black-50">
                        Due Date
                      </label>
                    </div>
                    <div className="col col-md-auto px-0 small">
                      <p className="mb-0 font-weight-bold text-primary">
                        {dateformat.parseDate(itemData.dueDate)}
                      </p>
                    </div>
                  </div>

                  <div className="row align-items-center mx-0 mb-3">
                    <div className="col-md-2 pl-0">
                      <label className="font-weight-bold text-capitalize mb-0 text-black-50">
                        Priority
                      </label>
                    </div>
                    <div className="col col-md-auto px-0 small">
                      <p
                        className="mb-0 font-weight-bold text-primary"
                        style={{
                          color: getPriorityColor(itemData?.priority.value),
                        }}
                      >
                        {itemData?.priority?.label}
                      </p>
                    </div>
                  </div>
                  <div className="row align-items-center mx-0 mb-3">
                    <div className="col-md-2 pl-0">
                      <label className="font-weight-bold text-capitalize mb-0 text-black-50">
                        Assigned to
                      </label>
                    </div>
                    <div className="col col-md-auto px-0 row mx-0 small">
                      {itemData?.assignedTo?.map((data, i) => (
                        <label key={i} className="m-1 mb-0">
                          <img
                            style={{
                              height: 28,
                              width: 28,
                              minHeight: 28,
                              minWidth: 28,
                            }}
                            className="small-img"
                            src={data?.id?.imageUrl}
                            alt="item"
                          />
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="row align-items-center mx-0 mb-3">
                    <div className="col-md-2 pl-0">
                      <label className="font-weight-bold text-capitalize mb-0 text-black-50">
                        CC
                      </label>
                    </div>
                    <div className="col col-md-auto px-0 row mx-0 small">
                      {itemData?.cc?.map((data, i) => (
                        <label key={i} className="m-1 mb-0">
                          <img
                            style={{
                              height: 28,
                              width: 28,
                              minHeight: 28,
                              minWidth: 28,
                            }}
                            className="small-img"
                            src={data?.id?.imageUrl}
                            alt="item"
                          />
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="row mx-0 mb-3">
                    <div className="col-md-2 pl-0">
                      <label className="font-weight-bold text-capitalize mb-0 text-black-50">
                        Description :
                      </label>
                    </div>
                    <div className="small col px-0">
                      <p className="mb-0 font-weight-bold text-primary">
                        {itemData?.description}
                      </p>
                    </div>
                  </div>
                  <div className="row mx-0 mb-3">
                    <div className="col-md-2 pl-0">
                      <label className="font-weight-bold text-capitalize mb-0 text-black-50">
                        Links
                      </label>
                    </div>
                    <div className="small col px-0 row mx-0">
                      {itemData?.links?.map((data, i) => (
                        <RRlink
                          key={i}
                          to={`/dashboard-items/view-item?boardId=${data?.boardId}&itemId=${data?._id}`}
                          target="_blank"
                          className="mr-2 mb-3 font-weight-bold text-uppercase text-underline"
                        >
                          {data?.label}
                        </RRlink>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="row mx-0 text-black-50">
                  <label className="col-12 px-0 font-weight-bold text-capitalize mb-0">
                    document :
                  </label>

                  {itemData?.documents?.map((data, i) => (
                    <div key={i} className="py-2 pr-3" style={{ width: 300 }}>
                      <Link
                        // href={PDF}
                        // type="button"
                        // download
                        onClick={() => {
                          setOpenViewer(true);
                          setActiveUrl(data?.url);
                        }}
                        className="btn p-2 d-flex align-items-baseline btn-outline-light bg-light text-dark"
                      >
                        <div className="row mx-0">
                          <div className="mr-2">
                            <img
                              className="small-img rounded"
                              src="https://play-lh.googleusercontent.com/nufRXPpDI9XP8mPdAvOoJULuBIH_OK4YbZZVu8i_-eDPulZpgb-Xp-EmI8Z53AlXHpqX=s180-rw"
                              alt="item"
                            />
                          </div>
                          <div className="text-left small">
                            <div>{data?.name}</div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>

                <div className="bg-light p-3">
                  <label className="col-12 px-0 font-weight-bold text-capitalize mb-2">
                    Activity :
                  </label>
                  {itemData?.activity?.map((data, i) => (
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
                              {" "}
                              <b>{dateformat.getDate(data?.createdAt)}</b>&nbsp;
                              {data.text}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
        {openViewer && (
          <div className="col-sm-6 shadow border">
            <iframe
              title="document-embed"
              src={`https://docs.google.com/viewer?embedded=true&url=${activeUrl}`}
              type="application/pdf"
              frameBorder="0"
              scrolling="auto"
              height="700px"
              width="100%"
            />
          </div>
        )}
      </div>
    </div>
  );
};
