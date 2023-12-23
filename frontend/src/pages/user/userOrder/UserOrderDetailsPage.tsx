import { useParams } from "react-router-dom";
import Skeleton from "../../../components/skeletons/Skeleton";
import Loading from "../../../components/ui/Loading";
import ProgressBar from "../../../components/ui/ProgressBar";
import { useGuardedQueryContainer } from "../../../features/hooks/useGuardedQueryContainer";
import useRedirectOnCondition from "../../../features/hooks/useRedirectOnCondition";
import { OrderDetailsDisplay } from "../../../features/order/OrderDetailsDisplay";
import { OrderDetailsContext } from "../../../services/context/OrderDetailsContext";
import { RouteEnum } from "../../../services/routes.config";
import { OrderStatuses, orderStatuses } from "../../../types/sharePropsModel";
import OrderStatusActions from "./OrderStatusActions";

const UserOrderDetailsPage = () => {
  const { orderId } = useParams();

  useRedirectOnCondition(!orderId, RouteEnum.UserOrder, "Order not found");

  const { data: details, isLoading } =
    useGuardedQueryContainer().useOrderDetails(orderId!);

  if (isLoading) return <Loading />;
  if (!details) return <Skeleton />;

  return (
    <>
      <div className="my-5 max-w-7xl w-screen flex flex-col mx-auto bg-base-100 overflow-hidden rounded-3xl shadow [&_.active+div]:max-h-[2000px] [&_.active+div]:pb-6">
        <OrderDetailsContext.Provider value={details}>
          <OrderDetailsDisplay />
          <div className="border-b w-100"></div>
          <ProgressBar
            steps={[...orderStatuses]}
            currentStep={details.orderStatus as OrderStatuses}
          >
            <OrderStatusActions />
          </ProgressBar>
          <div className="border-b w-100"></div>
        </OrderDetailsContext.Provider>
      </div>
    </>
  );
};

export default UserOrderDetailsPage;
