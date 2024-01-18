import { GetOrderDto } from "../schemas/responseSchema";

export type {
	OrderDetailInfoDto,
	RequestImages,
	RequestInfoDto,
	ShipmentInfoDto,
};

// Dto -> Data Transfer Object --> No method to call, for data structure only
// Java Object Oriented Programming Dto <--> Service, Controller, Bean, Provider
// DAO -> Database Access Object -> Strictly Backend. 收埋 access database嘅logic 嘅object
type RequestInfoDto = {
	locationName: string;
	itemDetail: Record<string, string | null> | null;
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
