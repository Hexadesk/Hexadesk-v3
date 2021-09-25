import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import api from "../../../apiCalls/api";
import { createNotification } from "../../../components/Toast";
import { useGetProfile } from "../../../hooks/useGetProfile";

export const Profile = () => {
  const { handleSubmit, control, watch, reset } = useForm();
  const { imageUrlLocal } = watch();
  const { profileData, isLoading } = useGetProfile();

  const { mutate, isLoading: isLoadingUpdate } = useMutation(
    api.updateProfile,
    {
      onSuccess: async (res) => {
        createNotification("success", "Profile Updated Successfully");
        // queryClient.invalidateQueries("get-all-items");
      },
      onError: async (err) => {
        createNotification(
          "error",
          err?.data?.message ?? "Unable to update profile"
        );
      },
    }
  );
  useEffect(() => {
    if (!isLoading && profileData?.name) reset({ ...profileData });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, profileData]);
  const onSubmit = (data) => {
    mutate(data);
  };
  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white shadow-sm border p-4 rounded-lg">
          <h2 className="text-center text-capitalize mb-4">Your profile</h2>

          <div className="mb-5 d-flex flex-column align-items-center">
            <label className="btn p-0" style={{ height: 150, width: 150 }}>
              <img
                height="100%"
                width="100%"
                src={
                  imageUrlLocal
                    ? URL.createObjectURL(imageUrlLocal)
                    : profileData?.imageUrl ??
                      "https://graph.facebook.com/100008343750912/picture?width=400&height=400"
                }
                alt=""
              />
              <Controller
                name="imageUrlLocal"
                control={control}
                rules={{ required: false }}
                render={({ onChange }) => (
                  <input
                    type="file"
                    onChange={(e) => {
                      const [file] = e.target.files;
                      if (file) {
                        onChange(file);
                      }
                    }}
                  />
                )}
              />
              <div className="bg-primary text-white"> Change Phone</div>
            </label>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Name</label>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: true }}
                  render={({ onChange, value }) => (
                    <input
                      placeholder="Enter your name"
                      type="text"
                      className="form-control"
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                    />
                  )}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Company Name</label>
                <Controller
                  name="companyName"
                  control={control}
                  rules={{ required: false }}
                  render={({ onChange, value }) => (
                    <input
                      placeholder="Enter your company name"
                      type="text"
                      className="form-control"
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Company Email address</label>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: false }}
                  render={({ onChange, value }) => (
                    <input
                      disabled={true}
                      placeholder="Enter your company email"
                      type="text"
                      className="form-control"
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                    />
                  )}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Company Website</label>
                <Controller
                  name="companyWebsite"
                  control={control}
                  rules={{ required: false }}
                  render={({ onChange, value }) => (
                    <input
                      placeholder="Enter your company website"
                      type="text"
                      className="form-control"
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="col-sm-12 p-0">
            <div className="form-group">
              <label className="form-label">Contact Number</label>
              <Controller
                name="contactNumber"
                control={control}
                rules={{ required: false }}
                render={({ onChange, value }) => (
                  <input
                    placeholder="Enter your Contact Number"
                    type="text"
                    className="form-control"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                  />
                )}
              />
            </div>
          </div>
          <div className="col mt-4 mx-auto px-0 text-right">
            <button
              type="submit"
              className="btn btn-primary text-uppercase font-weight-bold"
            >
              {isLoadingUpdate ? "Loading..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};
