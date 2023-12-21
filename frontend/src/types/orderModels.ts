import { GetOrderDto } from "../schemas/responseSchema";

export type {
	OrderDetailInfoDto,
	RequestImages,
	RequestInfoDto,
	ShipmentInfoDto,
};

type RequestInfoDto = {
	locationName: string;
	itemDetail: Record<string, string> | null;
	requestRemark: string | null;
	url: string | null;
};

type ShipmentInfoDto = {
	address: string;
	companyName: string | null;
	companyUrl: string | null;
	shippingOrderNo: string | null;
};

type RequestImages = {
	primaryImage: string;
	images: string[];
};

type OrderDetailInfoDto = GetOrderDto & {
	estimateArrivalTime: string;
};
