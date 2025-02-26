"use client";
import useCart from "@/hooks/useCart";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import Button from "../components/Button";


const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const ClientCheckOut = () => {
  const router = useRouter();
  const { cartProducts, paymentIntentId, handleSetPaymentIntent } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    if (cartProducts) {
      fetch("api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartProducts,
          payment_intent_id: paymentIntentId,
        }),
      })
        .then((res) => {
          setIsLoading(false);
          if (res.status === 401) {
            return router.push("/login");
          }
          return res.json();
        })
        .then((data) => {
          if (data.paymentIntent?.client_secret) {
            setClientSecret(data.paymentIntent.client_secret);
          } else {
            throw new Error("Missing client_secret in API response");
          }
          if (
            data.payment_intent_id &&
            data.payment_intent_id !== paymentIntentId
          ) {
            handleSetPaymentIntent(data.payment_intent_id);
          }
        })
        .catch((error) => {
          setIsError(true);
          toast.error("Something went wrong, please try again");
        });
    }
  }, [cartProducts, paymentIntentId]);

  const options = clientSecret
  ? {
      clientSecret,
      appearance: { theme: "stripe" as "flat" | "stripe" | "night" | undefined, labels: "floating" as "floating" },
    }
  : undefined;

  const handleSetPaymentSuccess = useCallback((status: boolean) => {
    setPaymentSuccess(status);
  }, []);

  return (
    <div className="w-full h-full">
      {clientSecret && cartProducts && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm
            handleSetPaymentSuccess={handleSetPaymentSuccess}
          />
        </Elements>
      )}
      {isError && <div>Something went wrong, please try again</div>}
      {isLoading && <div>Loading...</div>}
      {paymentSuccess && (
        <div>
          <div>Payment successful</div>
          <div>
            <Button onClick={() => router.push("/orders")} label="View order" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientCheckOut;
