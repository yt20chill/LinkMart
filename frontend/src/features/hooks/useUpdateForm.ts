import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { queryKey } from "../../lib/apiUtils";
import { dtoToString } from "../../lib/formUtils";
import { getRequestDetailsAJAX } from "../api/requestApi";
import { RequestForm } from "../forms/requestSchema";

// type Identifiers = { requestId: string } | { orderId: string };

type RequestFormDropDownFields = { locationId: string; categoryId: string };
type RequestFormOtherFields = {
	imageFile: File[];
	itemDetail: Record<string, string>;
};
type RequestFormTextFields = Omit<
	RequestForm,
	keyof RequestFormDropDownFields | keyof RequestFormOtherFields
>;
const requestFormDropDownEmptyDefaultValues: RequestFormDropDownFields = {
	locationId: "",
	categoryId: "",
};
const requestFormOtherFieldsEmptyDefaultValues: RequestFormOtherFields = {
	imageFile: [],
	itemDetail: {},
};
const requestFormTextEmptyDefaultValues: RequestFormTextFields = {
	item: "",
	url: "",
	quantity: "",
	requestRemark: "",
	offerPrice: "",
};

type RequestFormEmptyDefaultValues = {
	dropDown: RequestFormDropDownFields;
	others: RequestFormOtherFields;
	text: RequestFormTextFields;
};

function useUpdateRequestForm(requestId?: string) {
	const { data } = useQuery({
		queryKey: [queryKey.REQUEST, { requestId }],
		queryFn: () => getRequestDetailsAJAX({ requestId: requestId! }),
		enabled: !!requestId,
	});
	const [defaultValuesByField, setDefaultValuesByField] =
		useState<RequestFormEmptyDefaultValues>({
			dropDown: requestFormDropDownEmptyDefaultValues,
			others: requestFormOtherFieldsEmptyDefaultValues,
			text: requestFormTextEmptyDefaultValues,
		});
	const defaultValues = Object.assign(
		{},
		requestFormDropDownEmptyDefaultValues,
		requestFormOtherFieldsEmptyDefaultValues,
		requestFormTextEmptyDefaultValues
	);
	useEffect(() => {
		if (!requestId || !data || Object.keys(data).length === 0) return;
		const {
			images,
			locationName,
			categoryName,
			createdAt,
			createdBy,
			itemDetail,
			locationId,
			categoryId,
			...rest
		} = data;
		const dropDown = dtoToString<RequestFormDropDownFields>({
			locationId,
			categoryId,
		});
		const text = dtoToString<RequestFormTextFields>(rest);
		const others = { imageFile: [], itemDetail };
		setDefaultValuesByField({
			dropDown,
			text,
			others,
		});
	}, [data, requestId]);
	return {
		defaultValues,
		defaultValuesByField,
		images: data?.images ?? [],
	};
}

export { useUpdateRequestForm };
