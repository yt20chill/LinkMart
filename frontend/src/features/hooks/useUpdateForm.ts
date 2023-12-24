import { useMemo } from "react";
import { useQuery } from "react-query";
import { dtoToString } from "../../lib/formUtils";
import { RequestForm } from "../../schemas/requestSchema";
import { getRequestDetailsAJAX } from "../../services/api/requestApi";
import { queryKey } from "../../services/query.config";

type RequestFormDropDownFields = Pick<RequestForm, "locationId" | "categoryId">;
type RequestFormOtherFields = Pick<RequestForm, "imageFile" | "itemDetail">;
export type RequestFormTextFields = Omit<
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

function useUpdateRequestForm(requestId: string | null) {
	const { data } = useQuery({
		queryKey: [queryKey.REQUEST, { requestId }],
		queryFn: () => getRequestDetailsAJAX({ requestId: requestId! }),
		enabled: requestId !== null,
	});

	return useMemo(() => {
		const defaultValuesByField: RequestFormEmptyDefaultValues = {
			dropDown: requestFormDropDownEmptyDefaultValues,
			others: requestFormOtherFieldsEmptyDefaultValues,
			text: requestFormTextEmptyDefaultValues,
		};
		if (!data) return { defaultValuesByField, images: [] };
		const {
			images,
			locationName,
			categoryName,
			createdAt,
			createdBy,
			primaryImage,
			requestId,
			updatedAt,
			...formData
		} = data;
		const { locationId, categoryId, itemDetail, ...rest } = formData;
		defaultValuesByField.dropDown = {
			locationId: locationId + "",
			categoryId: categoryId + "",
		};
		defaultValuesByField.text =
			dtoToString<Record<keyof RequestFormTextFields, string>>(rest);
		defaultValuesByField.others = {
			imageFile: [],
			itemDetail: itemDetail ? dtoToString(itemDetail) : {},
		};
		return { defaultValuesByField, images, primaryImage };
	}, [data]);
}

export { useUpdateRequestForm };
