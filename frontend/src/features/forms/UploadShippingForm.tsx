import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
	FormImageInput,
	FormInput,
	FormSelect,
	FormSubmitButton,
} from "../../components/form";
import Skeleton from "../../components/skeletons/Skeleton";
import { generateDefaultValues } from "../../lib/formUtils";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormModal from "../../components/modal/FormModal";
import {
	TUploadShippingForm,
	uploadShippingFormSchema,
} from "../../schemas/requestSchema";
import {
	getLogisticCompanyAJAX,
	uploadShippingAJAX,
} from "../../services/api/orderApi";
import { ControlModalContext } from "../../services/context/ControlModalContext";
import { queryKey } from "../../services/query.config";
import { RouteEnum, siteMap } from "../../services/routes.config";
import PostLogisticCompanyForm from "./PostLogisticCompanyForm";

type UploadShippingFormProps = {
	orderId: string;
};

const stringValues = generateDefaultValues(uploadShippingFormSchema, {
	exclude: ["shipmentProof"],
});
const defaultValues: TUploadShippingForm = {
	...stringValues,
	shipmentProof: null,
};

const UploadShippingForm = ({ orderId }: UploadShippingFormProps) => {
	const { data: logistics } = useQuery({
		queryKey: [queryKey.ORDER, "logistics"],
		queryFn: getLogisticCompanyAJAX,
	});
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { mutateAsync: uploadShipping, isLoading } = useMutation({
		mutationFn: (form: TUploadShippingForm) =>
			uploadShippingAJAX(orderId, form),
		onSuccess: async () => {
			toast.success("Updated order status");
			await queryClient.invalidateQueries([queryKey.ORDER, { orderId }]);
			navigate(siteMap(RouteEnum.Task), { replace: true });
		},
	});

	const [showAddCompany, setShowAddCompany] = useState(false);
	const {
		handleSubmit,
		formState: { errors },
		register,
		setValue,
		watch,
	} = useForm<TUploadShippingForm>({
		resolver: zodResolver(uploadShippingFormSchema),
		defaultValues,
	});
	const companyId = +watch("logisticCompanyId");

	const onSubmit = async (data: TUploadShippingForm) => {
		await uploadShipping(data);
	};
	const onAddCompany = (companyId: number) => {
		setValue("logisticCompanyId", companyId + "");
		setShowAddCompany(false);
	};
	if (!logistics) return <Skeleton />;
	return (
		<>
			<form>
				<FormSelect
					name="logisticCompanyId"
					register={register}
					optionItems={logistics.map((logistic) => ({
						value: logistic.logisticCompanyId + "",
						displayValue: logistic.companyName,
					}))}
					errors={errors}
				/>
				<div className="flex">
					Company not on the list?{" "}
					<div
						onClick={(e) => {
							e.preventDefault();
							setShowAddCompany(true);
						}}
					>
						Add it
					</div>{" "}
					manually
				</div>
				{/* display company url */}
				<div>
					<p>Company Url</p>
					<span>
						{
							logistics.find(
								(logistic) => logistic.logisticCompanyId === companyId
							)?.companyUrl
						}
					</span>
				</div>
				{Object.keys(stringValues)
					.filter((key) => key !== "logisticCompanyId")
					.map((name) => (
						<FormInput
							key={name}
							name={name as keyof TUploadShippingForm}
							register={register}
							errors={errors}
						/>
					))}
				<FormImageInput
					name="shipmentProof"
					placeholder="Please Upload Your Shipping Prove Here"
					register={register}
					errors={errors}
					watch={watch}
					setValue={setValue}
					multiple={false}
				/>
				<FormSubmitButton
					label="Update"
					onClick={handleSubmit(onSubmit)}
					disabled={isLoading}
				/>
			</form>
			<ControlModalContext.Provider
				value={{ isShow: showAddCompany, setIsShow: setShowAddCompany }}
			>
				<FormModal>
					<PostLogisticCompanyForm onSubmitCallback={onAddCompany} />
				</FormModal>
			</ControlModalContext.Provider>
		</>
	);
};

export default UploadShippingForm;
