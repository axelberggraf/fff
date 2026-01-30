import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useShoppingCart } from "use-shopping-cart";
import Spinner from "../inlines/spinner";
import CheckoutForm from "../shop/checkoutForm";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
const appearance = {
  theme: "minimal",
  disableLink: true,
  variables: {
    colorPrimary: "#000000",
    colorBackground: "#11111111",
    colorText: "#30313d",
    colorDanger: "#df1b41",
    fontFamily: '"Smuss", sans-serif',
    fontFamilyBase: '"Smuss", sans-serif', // Ensure your font is used here

    spacingUnit: "2px",
    borderRadius: "0",
    tabLogoColor: "light",
    // See all possible variables below
  },
  rules: {
    ".Tab": {
      border: "1px solid #E0E6EB",
      boxShadow:
        "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02)",
    },

    ".Tab:hover": {
      color: "var(--colorText)",
    },

    ".Tab--selected": {
      borderColor: "#E0E6EB",
      boxShadow:
        "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02), 0 0 0 2px var(--colorPrimary)",
    },

    ".Input--invalid": {
      boxShadow:
        "0 1px 1px 0 rgba(0, 0, 0, 0.07), 0 0 0 2px var(--colorDanger)",
    },
    ".Input": {
      border: "1px solid black",
    },

    // See all supported class names and selector syntax below
  },
};

export default function StripeWrapper({
  customerInfo,
  handleSuccess,
  globalBase64String,
  coupon,
  resetPay,
}) {
  const [clientSecret, setClientSecret] = useState("");
  const [amount, setAmount] = useState();
  const [dpmCheckerLink, setDpmCheckerLink] = useState("");
  const { formattedTotalPrice, cartCount, clearCart, cartDetails } =
    useShoppingCart();

  const [error, setError] = useState();
  useEffect(() => {
    if (cartDetails) {
      const fetchClientSecret = async () => {
        try {
          const response = await fetch("/api/create_payment_intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              cartItems: cartDetails,
              customerInfo,
              coupon,
            }),
          });

          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }

          const data = await response.json();

          setClientSecret(data.clientSecret);
          setAmount(data.amount);
          setDpmCheckerLink(data.dpmCheckerLink);
        } catch (err) {
          // console.error("Failed to fetch client secret:", err);
          setError("Something went wrong :(");
        }
      };

      fetchClientSecret();
    }
  }, [cartDetails]);
  const options = {
    clientSecret,
    fonts: [
      {
        family: "Smuss",
        src: `url(data:font/woff;base64,${globalBase64String}) format("woff2")`,
        weight: "normal",
      },
    ],
    appearance,
  };
  return (
    <>
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            onSuccess={handleSuccess}
            clientSecret={clientSecret}
            amount={amount}
            fontString={globalBase64String}
            customerInfo={customerInfo}
          />
        </Elements>
      ) : (
        <>
          {error ? (
            <div style={{ marginTop: "1rem" }}>
              <p>Something went wrong 😣</p>
              <p>
                Please try again, and if the error persists{" "}
                <a href="type@smuss.studio">contact us</a> and we will help you
                solve the problem.
              </p>
              <button onClick={resetPay} className="home-button">
                Reset
              </button>
            </div>
          ) : (
            <div className="loading-payment">
              <Spinner />
            </div>
          )}
        </>
      )}
    </>
  );
}
