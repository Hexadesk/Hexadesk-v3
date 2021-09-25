import {
  Dialog,
  DialogContent,
  FormHelperText,
  IconButton,
} from "@material-ui/core";
import { AddCircle, Delete } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { createNotification } from "../../../components/Toast";
import { useQueryClient, useMutation } from "react-query";
import api from "../../../apiCalls/api";
import { useGetUsers } from "../../../hooks/useGetUsers";
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

export default function BoardForm({ handleClose, open, isEdit, initialState }) {
  const queryClient = useQueryClient();

  const { errors, handleSubmit, control, reset } = useForm();
  const { users, isLoadingUsers } = useGetUsers();

  useEffect(() => {
    if ((isEdit, initialState)) {
      reset({
        ...initialState,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialState, isEdit]);

  const { mutate, isLoading } = useMutation(
    isEdit ? api.editBoard : api.addBoard,
    {
      onSuccess: async (res) => {
        createNotification(
          "success",
          `Project ${isEdit ? "Edited" : "Created"} Successfully`
        );
        queryClient.invalidateQueries("get-all-boards");
        handleClose();
      },
      onError: async (err) => {
        createNotification(
          "error",
          err?.data?.message ?? "Unable to create project"
        );
      },
    }
  );
  const onSubmit = (data) => {
    if (isEdit) {
      mutate({ ...data, id: initialState._id });
    } else {
      const membersList = [];
      members.map(({ email, role }) =>
        membersList.push({
          email: email.value,
          role: role.value,
        })
      );
      mutate({ ...data, members: membersList });
    }
  };
  const [members, setMembers] = useState([]);
  const onChangeMembers = (name, value, idx) => {
    const insertMember = [...members];
    insertMember[idx][name] = value;
    setMembers(insertMember);
  };
  return (
    <Dialog maxWidth="lg" onClose={handleClose} open={open}>
      <DialogContent className="p-0">
        <form onSubmit={handleSubmit(onSubmit)} className="row mx-0">
          <div className="col-md-6 px-0">
            <div className="p-4">
              <div>
                <h4>Start a Project</h4>
                <p>
                  Boost your productivity by making it easier for everyone to
                  access boards in one location.
                </p>
              </div>

              <div className="form-group mb-2">
                <label className="font-weight-bold mb-1 small">
                  Project Name
                </label>
                <Controller
                  name="title"
                  control={control}
                  rules={{ required: true, min: 5, max: 100 }}
                  render={({ onChange, value }) => (
                    <div>
                      <input
                        className={`form-control form-control-sm ${
                          errors.title ? "text-danger border-danger" : ""
                        }`}
                        type="text"
                        placeholder="The Boys"
                        value={value}
                        onChange={({ target }) => onChange(target.value)}
                      />
                      {errors.title && (
                        <FormHelperText className="ml-2 text-danger">
                          This field is required
                        </FormHelperText>
                      )}
                    </div>
                  )}
                />
              </div>
              <div className="form-group mb-2">
                <label className="font-weight-bold mb-1 small">
                  Project Description
                </label>
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: false, min: 5, max: 10000 }}
                  render={({ onChange, value }) => (
                    <textarea
                      className="form-control form-control-sm"
                      rows="4"
                      type="text"
                      value={value}
                      onChange={({ target }) => onChange(target.value)}
                      placeholder="Get your members on board with a few words about your project"
                    />
                  )}
                />
              </div>
              {!isEdit && (
                <div className="form-group mb-2">
                  <label className="font-weight-bold mb-1 small">
                    Invite Members{" "}
                    <IconButton
                      size="small"
                      onClick={() => {
                        const newMembers = [...members];
                        newMembers.push({
                          email: "",
                          role: "",
                        });
                        setMembers(newMembers);
                      }}
                    >
                      <AddCircle color="primary" />
                    </IconButton>
                  </label>
                  {members?.map((value, idx) => (
                    <div className="d-flex align-items-center" key={idx}>
                      <div className="col-5 p-0 pr-2">
                        <CreatableSelect
                          placeholder="Email"
                          isClearable={true}
                          value={value.email}
                          menuPosition="fixed"
                          options={users}
                          isDisabled={isLoadingUsers}
                          onChange={(e) => onChangeMembers("email", e, idx)}
                        />
                      </div>
                      <div className="col-5 p-0">
                        <Select
                          placeholder="Role"
                          isClearable={true}
                          value={value.role}
                          options={roles}
                          menuPosition="fixed"
                          onChange={(e) => onChangeMembers("role", e, idx)}
                        />
                      </div>
                      <div className="col-2 d-flex justify-content-center align-items-center">
                        <IconButton
                          onClick={() => {
                            let deleteMember = [...members];
                            deleteMember.splice(idx, 1);
                            setMembers(deleteMember);
                          }}
                        >
                          <Delete color="primary" />
                        </IconButton>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="btn btn-block text-capitalize btn-primary"
                  disabled={isLoading}
                >
                  {isEdit
                    ? isLoading
                      ? "Updating"
                      : "Update"
                    : isLoading
                    ? "Creating"
                    : "Create"}{" "}
                  Project
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6 px-0 order-first order-md-last">
            <div className="h-100 w-100">
              <img
                style={{ objectFit: "contain", backgroundColor: "#C1E3E2" }}
                className="h-100 w-100"
                src={require("../../../assets/layout.jpg").default}
                alt="layout"
              />
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
