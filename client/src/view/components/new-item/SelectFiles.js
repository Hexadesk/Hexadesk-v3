import { CircularProgress, IconButton } from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import axios from "axios";
import React, { useState } from "react";

import { createNotification } from "../../../components/Toast";

export default function SelectFiles({
  label = "Documents",
  documents = [],
  onChangeFiles,
  isEdit,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const onChangeLocalFile = (e) => {
    const [file] = e.target.files;
    if (isEdit) {
      setIsLoading(true);
      let formData = new FormData();
      formData.append("file", file);
      axios
        .post("/item/upload/doc", formData)
        .then((res) => {
          onChangeFiles([...documents, { ...res.data }]);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          createNotification(
            "error",
            "Unable to upload file please try again later"
          );
        });
    } else
      onChangeFiles([
        ...documents,
        {
          file,
          placeHolder: URL.createObjectURL(file),
        },
      ]);
  };
  return (
    <>
      <div className="row mx-0 text-black-50">
        <label className="col-12 px-0 font-weight-bold text-capitalize mb-0">
          {label} :
        </label>

        {documents.map((data, i) => (
          <div
            key={i}
            className="py-2 pr-3 position-relative"
            style={{ width: 300 }}
          >
            <IconButton
              size={"small"}
              style={{
                position: "absolute",
                right: "7px",
                top: "0px",
              }}
              onClick={() => {
                let deleteDocument = [...documents];
                deleteDocument.splice(i, 1);
                onChangeFiles(deleteDocument);
              }}
            >
              <Clear color="error" fontSize="small" />
            </IconButton>
            <a
              type="button"
              href={isEdit ? data.url : data.placeHolder}
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
                  <div className="text-truncate" style={{ maxWidth: 200 }}>
                    {isEdit ? data.name : data?.file?.name}
                  </div>
                  <div className="small">{isEdit ? "" : data?.file?.type}</div>
                </div>
              </div>
            </a>
          </div>
        ))}

        <div className="py-2" style={{ width: 70 }}>
          <label className="btn p-0 btn-outline-light bg-light text-dark h-100 w-100 rounded-lg-2 position-relative">
            <div className="h-100 d-flex flex-column justify-content-center align-items-center text-center">
              <span>
                <div className="mb-0 h3">
                  {isLoading && <CircularProgress color="primary" size={30} />}
                  &nbsp;&#65291;
                </div>
              </span>
            </div>
            <input
              type="file"
              disabled={isLoading}
              className="btn-outline-light text-dark h-100 w-100 rounded-lg-2 border-0"
              onChange={(e) => {
                if (!isLoading) onChangeLocalFile(e);
              }}
            />
          </label>
        </div>
      </div>
      {documents.length ? (
        <small>Click to download these documents</small>
      ) : null}
    </>
  );
}
