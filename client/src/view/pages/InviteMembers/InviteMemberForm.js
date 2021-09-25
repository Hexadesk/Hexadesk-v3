import { FormHelperText } from "@material-ui/core";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useLocation } from "react-router";

import { createNotification } from "../../../components/Toast";
import queryString from "query-string";
import api from "../../../apiCalls/api";
import { useGetUsers } from "../../../hooks/useGetUsers";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";

const roles = [
  {
    label: "Project Manager",
    value: "Project Manager",
  },
  {
    label: "Engineer",
    value: "Engineer",
  },
  {
    label: "Forman",
    value: "Forman",
  },
];
export default function InviteMemberForm({ handleClose }) {
  const { errors, handleSubmit, control } = useForm();
  const params = useLocation();
  const { boardId } = queryString.parse(params.search);
  const { users, isLoadingUsers } = useGetUsers();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(api.addMember, {
    onSuccess: async (res) => {
      createNotification("success", "Member Added Successfully");
      queryClient.invalidateQueries("useGetBoardMembers");
      handleClose();
    },
    onError: async (err) => {
      createNotification(
        "error",
        err?.data?.message ?? "Unable to proform this action"
      );
    },
  });
  const onSubmit = (data) => {
    mutate({
      email: data.email.value,
      role: data.role.value,
      boardId,
    });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-fill d-flex flex-column"
    >
      <section className="flex-fill bg-very-light p-3">
        <div className="d-flex align-items-center">
          <div className="col-6 p-0 pr-2">
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ onChange, value }) => (
                <CreatableSelect
                  placeholder="Email"
                  isClearable={true}
                  value={value}
                  menuPosition="fixed"
                  options={users}
                  isDisabled={isLoadingUsers}
                  onChange={(e) => onChange(e)}
                />
              )}
            />
            {errors.email && (
              <FormHelperText className="ml-2 text-danger">
                This field is required
              </FormHelperText>
            )}
          </div>
          <div className="col-6 p-0">
            <Controller
              name="role"
              control={control}
              rules={{ required: true }}
              render={({ onChange, value }) => (
                <Select
                  placeholder="Role"
                  isClearable={true}
                  value={value}
                  options={roles}
                  menuPosition="fixed"
                  onChange={(e) => onChange(e)}
                />
              )}
            />
            {errors.role && (
              <FormHelperText className="ml-2 text-danger">
                This field is required
              </FormHelperText>
            )}
          </div>
        </div>

        <div className="d-flex justify-content-end mt-3">
          <button
            type="button"
            className="btn-danger btn-sm px-3 mr-2 border-0"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            disabled={isLoading}
            type="submit"
            className="btn-primary btn-sm px-3 border-0"
          >
            {isLoading ? "Loading..." : "Done"}
          </button>
        </div>
      </section>
    </form>
  );
}
