import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import "./style.css";
import { Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "react-query";
// import { useRedirect } from "../../hooks/useRedirect";

// Images
import api from "../../apiCalls/api";
import { resetContent, setAuthInfo } from "../../Action/Auth";
import { createNotification } from "../../components/Toast";
import { useRedirect } from "../../hooks/useRedirect";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#ffff",
      color: "#000",
      fontWeight: 500,
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#000",
      },
      "::placeholder": {
        color: "#000",
      },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

const CardField = ({ onChange }) => (
  <div className="userform-input px-3 border shadow">
    <CardElement options={CARD_OPTIONS} onChange={onChange} />
  </div>
);

const SubmitButton = ({ processing, error, children, disabled }) => (
  <button
    className={`btn btn-primary text-white font-weight-bold btn-block py-2 mt-3 ${
      error ? "SubmitButton--error" : ""
    }`}
    type="submit"
    disabled={processing || disabled}
  >
    {processing ? "Processing..." : children}
  </button>
);

const ErrorMessage = ({ children }) => (
  <small className="d-flex text-danger">{children}</small>
);

const CheckoutForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);

  const { mutate } = useMutation(api.payment, {
    onSuccess: (res) => {
      setProcessing(false);
      dispatch(setAuthInfo({ access_token: res.token, user: res.user }));
      history.push("/");
    },
    onError: () => {
      createNotification("error", "Error while payment");
      setProcessing(false);
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    if (error) {
      elements.getElement("card").focus();
      return;
    }

    if (cardComplete) {
      setProcessing(true);
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      // billing_details: billingDetails,
    });

    if (payload.error) {
      setError(payload.error);
      setProcessing(false);
    } else {
      mutate({ token: payload.paymentMethod.id });
    }
  };

  return (
    <form
      className="autofill-black-container Form col-sm-12 d-flex flex-wrap"
      onSubmit={handleSubmit}
    >
      <Form.Group className="my-2 col-sm-12 px-0">
        <CardField
          onChange={(e) => {
            setError(e.error);
            setCardComplete(e.complete);
          }}
        />
      </Form.Group>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <SubmitButton
        className="mt-2"
        processing={processing}
        error={error}
        disabled={!stripe}
      >
        Pay Now
      </SubmitButton>
    </form>
  );
};

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: "https://fonts.googleapis.com/css?family=Roboto",
    },
  ],
};

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_jyP40HEn8hXEjOLrLOPKfy8Q00tVhFuOWz");

const StripeForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  useRedirect();
  const { user } = useSelector((state) => state.Auth);
  return (
    <section className="container-stripe row  vh-100 d-flex bg-white justify-content-center align-items-center flex-column">
      <div className="row h-100 w-100">
        <div className="col-lg-8 col-xl-6 text-center mx-auto d-flex flex-column justify-content-center">
          <div className="py-5 px-1 px-md-5">
            <div className="row justify-content-center justify-content-md-between align-items-center mb-4">
              <h1 className="mb-0">Wellcome {user.name}</h1>
              <button
                className="btn btn-primary text-white font-weight-bold ml-auto col-12 col-md-3 order-first order-md-last mb-3 mb-md-0"
                onClick={() => {
                  dispatch(resetContent());
                  history.push("/sign-in");
                }}
              >
                Logout
              </button>
            </div>
            <h2 className=" my-3 text-center display-4 font-weight-bold">
              Our Plans
            </h2>
            <div className="d-flex justify-content-center align-items-center my-5 mx-3">
              <div
                className="d-flex flex-column justify-content-center align-items-center m-2 "
                style={{ height: "250px", width: "250px" }}
              >
                <img
                  src={require("../../assets/our-plans.jpg").default}
                  alt="pic"
                  height="100%"
                  width="100%"
                  className="mb-3"
                />
                <h2 className="font-weight-bold  ">10$</h2>
                <h2 className="font-weight-bold  ">Monthly</h2>
              </div>
            </div>
            <div className="mt-3" style={{ maxHeight: 350 }}>
              <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
                <CheckoutForm />
              </Elements>
            </div>
          </div>
        </div>
        <div className="col-xl-6 d-flex align-items-center justify-content-center bg-info order-first order-xl-last">
          <div style={{ height: "70vmin" }}>
            <img
              style={{ objectFit: "contain" }}
              className="h-100 w-100 vibrate-1"
              src={require("../../assets/pay-now.png").default}
              alt="pic"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StripeForm;
