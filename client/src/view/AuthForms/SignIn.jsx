import React from "react";
import { Link, useHistory } from "react-router-dom";
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@material-ui/core";

// Components
import { AuthHero } from "./AuthHero";
import { CustomCheckBox } from "../components/custom/CustomCheckBox";
import ErrorIcon from "@material-ui/icons/Error";
// icons
import { GoogleIcon } from "../../assets/svg/GoogleIcon";
import { useDispatch } from "react-redux";
import { setAuthInfo } from "../../Action/Auth";
import { createNotification } from "../../components/Toast";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "react-query";
import api from "../../apiCalls/api";
import { useRedirect } from "../../hooks/useRedirect";
export const SignIn = () => {
  useRedirect();
  const { errors, handleSubmit, control } = useForm();

  const history = useHistory();
  const dispatch = useDispatch();

  const { mutate, isLoading } = useMutation(api.login, {
    onSuccess: async (res) => {
      createNotification("success", "Login Successfully");
      dispatch(setAuthInfo({ access_token: res.token, user: res.user }));
      if (res.user.paid) {
        history.push("/");
      } else history.push("/payment");
    },
    onError: async (err) => {
      createNotification(
        "error",
        err?.data?.message ?? "Email or Password is incorrect"
      );
    },
  });
  const onSubmit = (data) => {
    mutate(data);
  };
  return (
    <main
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      className="row min-vh-100"
    >
      <form className="col-12 col-md-6 px-0">
        <div className="p-3 p-lg-5">
          <div className="mb-3">
            <h1 className="mb-2 font-weight-bold">Sign In</h1>
            <div className="fs-5 text-black-50">Welcome, we missed you</div>
          </div>
          <div className="col-lg-10 px-0">
            <div>
              <Controller
                name="email"
                control={control}
                rules={{ required: true, min: 5, max: 100 }}
                render={({ onChange, value }) => (
                  <FormControl className="w-100 mb-4" error={errors.email}>
                    <InputLabel htmlFor="your-email">Your Email</InputLabel>

                    <Input
                      id="your-email"
                      type="email"
                      placeholder="Enter your email"
                      aria-describedby="my-helper-text-2"
                      onChange={(e) => onChange(e.target.value)}
                      value={value}
                    />

                    <FormHelperText
                      id="my-helper-text-2"
                      className="position-absolute  text-success mt-n1"
                      style={{ top: "50%", right: 0 }}
                    >
                      {errors.email ? (
                        <ErrorIcon color="error" />
                      ) : (
                        "" // <CheckOutlinedIcon />
                      )}
                    </FormHelperText>
                  </FormControl>
                )}
              />
              <Controller
                name="password"
                control={control}
                rules={{ required: true, min: 3 }}
                render={({ onChange, value }) => (
                  <FormControl className="w-100 mb-4" error={errors.password}>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      onChange={(e) => onChange(e.target.value)}
                      value={value}
                      aria-describedby="my-helper-text-3"
                    />

                    <FormHelperText
                      id="my-helper-text-2"
                      className="position-absolute  text-success mt-n1"
                      style={{ top: "50%", right: 0 }}
                    >
                      {errors.password ? (
                        <ErrorIcon color="error" />
                      ) : (
                        "" // <CheckOutlinedIcon color='success' />
                      )}
                    </FormHelperText>
                  </FormControl>
                )}
              />
              <div className="mb-5 d-flex justify-content-between">
                <span>
                  <CustomCheckBox id="flexCheckChecked" label="Remember me" />
                </span>
                <span>
                  <Link
                    to="/forgot-password"
                    className="text-info text-decoration-none"
                  >
                    Forgot Password?
                  </Link>
                </span>
              </div>

              <div className="my-4">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="btn btn-block btn-info text-white btn-lg"
                >
                  {isLoading ? "Loading..." : "Sign In"}
                </button>

                <div className="my-4 text-black-50 text-center position-relative">
                  <span
                    className="position-relative bg-white px-3"
                    style={{ zIndex: 1 }}
                  >
                    or continue with
                  </span>
                  <span
                    className="d-flex bg-light position-absolute w-100"
                    style={{ height: 1, top: "50%" }}
                  ></span>
                </div>

                <button type="button" className="btn btn-block btn-dark btn-lg">
                  <div className="d-flex align-items-center justify-content-center">
                    <GoogleIcon size={20} />
                    <span className="ml-3">Or sign-in with google</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <section className="col-12 col-md-6 px-0 order-first order-md-last">
        <AuthHero link="/sign-up" linkText="Don’t have an account?" />
      </section>
    </main>
  );
};
