import { useState } from "react";
import { useParams } from "react-router-dom";
import FormModal from "../../../components/modal/FormModal";
import Skeleton from "../../../components/skeletons/Skeleton";
import Loading from "../../../components/ui/Loading";
import ProgressBar from "../../../components/ui/ProgressBar";
import ReportForm from "../../../features/forms/ReportForm";
import { useGuardedQueryContainer } from "../../../features/hooks/useGuardedQueryContainer";
import useRedirectOnCondition from "../../../features/hooks/useRedirectOnCondition";
import { OrderDetailsDisplay } from "../../../features/order/OrderDetailsDisplay";
import { ControlModalContext } from "../../../services/context/ControlModalContext";
import { OrderDetailsContext } from "../../../services/context/OrderDetailsContext";
import { RouteEnum } from "../../../services/routes.config";
import { OrderStatuses, orderStatuses } from "../../../types/sharePropsModel";
import OrderStatusActions from "./OrderStatusActions";

const UserOrderDetailsPage = () => {
  const { orderId } = useParams();
  const [showReportForm, setShowReportForm] = useState(false);
  useRedirectOnCondition(!orderId, RouteEnum.UserOrder, "Order not found");

  const { data: details, isLoading } =
    useGuardedQueryContainer().useOrderDetails(orderId!);

  if (isLoading) return <Loading />;
  if (!details) return <Skeleton />;

  return (
    <>
      <ControlModalContext.Provider
        value={{ isShow: showReportForm, setIsShow: setShowReportForm }}
      >
        <div className="my-5 max-w-7xl w-full flex flex-col mx-auto bg-base-100 overflow-hidden rounded-3xl shadow [&_.active+div]:max-h-[2000px] [&_.active+div]:pb-6 mb-6">
          <OrderDetailsContext.Provider value={details}>
            <OrderDetailsDisplay />
            <div className="border-b border-slate-500/20 w-100"></div>
            <ProgressBar
              steps={[...orderStatuses]}
              currentStep={details.orderStatus as OrderStatuses}
            >
              <OrderStatusActions />
            </ProgressBar>
          </OrderDetailsContext.Provider>
        </div>
        <FormModal>
          <ReportForm orderId={orderId!} />
        </FormModal>
      </ControlModalContext.Provider>
    </>
  );
};

export default UserOrderDetailsPage;
