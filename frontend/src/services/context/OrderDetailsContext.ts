import { createContext, useContext } from "react";
import { calculateETA } from "../../lib/formattingUtils";
import { OrderDetailsDto } from "../../schemas/responseSchema";
import {
	OrderDetailInfoDto,
	RequestImages,
	RequestInfoDto,
	ShipmentInfoDto,
} from "../../types/orderModels";

export { OrderDetailsContext, useOrderDetailsContext };

type OrderDetailsContextType = OrderDetailsDto;

const OrderDetailsContext = createContext<OrderDetailsContextType | undefined>(
	undefined
);

const useOrderDetailsContext = () => {
	const context = useContext(OrderDetailsContext);
	if (!context)
		throw new Error(
			"OrderDetailsContext must be used within a OrderDetailsContext Provider"
		);
	const {
		orderId,
		orderStatus,
		providerId,
		providerName,
		item,
		primaryImage,
		quantity,
		price,
		estimatedProcessTime,
		createdAt,
		locationName,
		itemDetail,
		url,
		requestRemark,
		shippingOrderNo,
		logisticCompanyName,
		logisticCompanyUrl,
		images,
		address,
	} = context;

	const orderDto: OrderDetailInfoDto = {
		orderId,
		orderStatus,
		providerId,
		providerName,
		item,
		primaryImage,
		quantity,
		price,
		estimatedProcessTime,
		createdAt,
		estimateArrivalTime: calculateETA(createdAt, estimatedProcessTime),
	};

	const requestInfoDto: RequestInfoDto = {
		locationName,
		itemDetail,
		requestRemark,
		url,
	};
	const shipmentInfoDto: ShipmentInfoDto = {
		address,
		shippingOrderNo,
		companyName: logisticCompanyName,
		companyUrl: logisticCompanyUrl,
	};

	const requestImages: RequestImages = {
		primaryImage,
		images,
	};
	return { orderDto, requestInfoDto, shipmentInfoDto, requestImages };
};
