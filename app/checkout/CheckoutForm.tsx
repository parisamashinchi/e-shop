import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
  AddressElement,
} from "@stripe/react-stripe-js";
import useCart from "@/hooks/useCart";
import Heading from "../components/Heading";
import { formatPrice } from "@/utils/formatPrice";
import Button from "../components/Button";

interface CheckoutFormProps {
  handleSetPaymentSuccess: (status: boolean) => void;
}
const CheckoutForm: React.FC<CheckoutFormProps> = ({
    handleSetPaymentSuccess,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { handleClearCart, handleSetPaymentIntent, cartTotalAmount } =
    useCart();
  const formattedPrice = formatPrice(cartTotalAmount);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    if (!result.error) {
      handleSetPaymentSuccess(true);
      handleClearCart();
      handleSetPaymentIntent(null);
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-5">
        <Heading title="Fill the payment Detail" />
      </div>
      <h2 className="mb-2 mt-t font-semibold">Address Information</h2>

      <AddressElement options={{ mode: "shipping", allowedCountries: ["US"] }} />
      <h2 className="mb-2 mt-t font-semibold">Payment Information</h2>
      <PaymentElement options={{ layout: "tabs" }} />
      <div className="py-4 font-bold text-slate-700 tex-xl">
        Total: {formattedPrice}
      </div>
      <Button
        type="submit"
        label={isLoading ? "Processing" : "Pay now"}
        disabled={isLoading || !stripe || !elements}
      />
    </form>
  );
};

export default CheckoutForm;
