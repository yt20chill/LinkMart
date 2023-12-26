import { useMutation } from "react-query";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import CancelButton from "../../components/ui/CancelButton";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { CreateOrderParams } from "../../schemas/requestSchema";
import { createOrderAJAX } from "../../services/api/orderApi";
import { RouteEnum, siteMap } from "../../services/routes.config";
import { FormInput } from "@/components/form";
import {
  RegisterOptions,
  FieldValues,
  UseFormRegisterReturn,
} from "react-hook-form";

const PaymentPage = () => {
  const { offerId } = useParams();
  const [searchParams] = useSearchParams();
  const userAddressId = searchParams.get("addressId");
  const price = searchParams.get("price");
  const navigate = useNavigate();
  const { mutateAsync: pay, isLoading } = useMutation({
    mutationFn: (params: CreateOrderParams) => createOrderAJAX(params),
    onSuccess: (result) => {
      if (!result) return;
      toast.success("Payment Success!");
      navigate(`${siteMap(RouteEnum.OrderDetail)}/${result.orderId}`);
    },
  });
  if (!offerId || !userAddressId || !price) {
    toast.error("invalid url, redirect to request page");
    navigate(siteMap(RouteEnum.UserRequests));
  }
  return (
    offerId &&
    userAddressId &&
    price && (
      <>
        <div className="mt-6 sm:mt-12 my-5 max-w-xl w-full mx-auto sm:px-6">
          <div className="flex flex-col mx-auto bg-base-100 sm:border border-slate-500/20 rounded-xl overflow-hidden sm:shadow">
            <div className="font-bold px-6 py-4 bg-base-100 border-b border-slate-500/20 text-primary-400">
              <i className="bi bi-credit-card me-2 "></i>
              Checkout
            </div>
            <div className="px-6 py-4">
              <span className="label-text text-gray-500">Order Amount</span>
              <div className="flex flex-col px-6 py-3 border rounded-lg gap-1">
                <div className="flex justify-between border-b">
                  <span></span>
                  <span className="font-light">
                    ${(+price).toLocaleString("en")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>${(+price).toLocaleString("en")}</span>
                </div>
              </div>
              <div className="label mt-4">
                <span className="label-text text-gray-500">
                  <i className="bi bi-wallet2 me-2"></i>Payment Method
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 h-16">
                <label className="border ring-2 ring-primary-400 rounded-lg py-2 px-3 relative">
                  <span className="text-sm">
                    <i className="bi bi-credit-card me-2"></i>Credit Card
                  </span>
                  <div className="absolute top-2 right-2">
                    <i className="bi bi-check-circle-fill text-primary-400"></i>
                  </div>
                  <input
                    type="radio"
                    name="payment_method"
                    className="hidden"
                    defaultChecked
                  />
                </label>
                <label className="border rounded-lg py-2 px-3 relative">
                  <span className="text-sm text-gray-400">
                    <i className="bi bi-stripe me-2"></i>Stripe
                  </span>
                  <div className="absolute top-2 right-2">
                    <i className="bi bi-circle text-gray-400"></i>
                  </div>
                  <input
                    type="radio"
                    name="payment_method"
                    className="hidden"
                    defaultChecked
                  />
                </label>
                <label className="border rounded-lg py-2 px-3 relative">
                  <span className="text-sm text-gray-400">
                    <i className="bi bi-paypal me-2"></i>Paypal
                  </span>
                  <div className="absolute top-2 right-2">
                    <i className="bi bi-circle text-gray-400"></i>
                  </div>
                  <input
                    type="radio"
                    name="payment_method"
                    className="hidden"
                    defaultChecked
                  />
                </label>
              </div>
              <label className="form-control w-1/2 sm:w-2/5">
                <div className="label">
                  <span className="label-text text-gray-500">
                    <i className="bi bi-person-check me-2"></i>Card Holder
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Name of card holder"
                  defaultValue={"Linkmart Payment"}
                  className="input input-bordered w-full"
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-gray-500">
                    <i className="bi bi-credit-card-2-front me-2"></i>Card
                    Number
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="0000-0000-0000-0000"
                  defaultValue={"4140-4140-4140-4140"}
                  maxLength={19}
                  className="input input-bordered w-full ordinal slashed-zero tabular-nums font-sans"
                />
              </label>
              <div className="flex gap-3">
                <label className="form-control w-1/2 sm:w-1/5">
                  <div className="label">
                    <span className="label-text text-gray-500 text-xs">
                      Expired Date
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    defaultValue={"12/25"}
                    maxLength={5}
                    className="input input-bordered w-full ordinal slashed-zero tabular-nums font-sans"
                  />
                </label>
                <label className="form-control w-1/2 sm:w-1/4">
                  <div className="label">
                    <span className="label-text text-gray-500 text-xs">
                      <i className="bi bi-key me-2"></i>CVV
                    </span>
                    <span className="label-text-alt text-gray-500 text-xs">
                      3 Digits
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="CVV"
                    defaultValue={"321"}
                    maxLength={3}
                    className="input input-bordered w-full ordinal slashed-zero tabular-nums font-sans"
                  />
                </label>
              </div>
            </div>
            <div className="w-full p-6 flex flex-col gap-3">
              <div className="mt-6 flex gap-2 h-12">
                <PrimaryButton
                  className="grow"
                  label="Place order"
                  onClick={() =>
                    pay({ success: "true", offerId, userAddressId })
                  }
                  disabled={isLoading}
                />
                <CancelButton
                  label="Cancel"
                  onClick={() => navigate(siteMap(RouteEnum.UserRequests))}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default PaymentPage;
