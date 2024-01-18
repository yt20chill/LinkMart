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
			await queryClient.invalidateQueries([queryKey.ORDER]);
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
					label="Carrier"
					name="logisticCompanyId"
					placeholder="Select carrier"
					register={register}
					optionItems={logistics.map((logistic) => ({
						value: logistic.logisticCompanyId + "",
						displayValue: logistic.companyName,
					}))}
					errors={errors}
				/>
				{/* display company url */}
				<div>
					{companyId ? (
						<>
							<a
								className="font-normal text-xs leading-none hover:text-base-content/50 hover:decoration-base-content/50 decoration-dashed decoration-base-content cursor-pointer underline"
								href={
									logistics.find(
										(logistic) => logistic.logisticCompanyId === companyId
									)?.companyUrl
								}
								target="_blank"
								rel="noreferrer"
							>
								<i className="me-1 bi bi-link-45deg"></i>
								{
									logistics.find(
										(logistic) => logistic.logisticCompanyId === companyId
									)?.companyUrl
								}
							</a>
						</>
					) : null}
				</div>
				<div className="flex">
					<div
						className="ms-auto inline-flex rounded-badge text-sm text-gray-400 hover:text-secondary-400"
						onClick={() => setShowAddCompany(true)}
					>
						<div className="me-2">Not on the list?</div>
						Add<i className="bi bi-plus-square-dotted ms-1"></i>
					</div>
				</div>
				{Object.keys(stringValues)
					.filter((key) => key !== "logisticCompanyId")
					.map((name) => (
						<FormInput
							label="Shipment No."
							placeholder="Input Tracking Number"
							key={name}
							name={name as keyof TUploadShippingForm}
							register={register}
							errors={errors}
						/>
					))}
				<div className="label">
					<span className="label-text">Upload Shipment Proof</span>
				</div>
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
			{
				showAddCompany && 
				<FormModal>
					<PostLogisticCompanyForm onSubmitCallback={(companyId)=>{
						setShowAddCompany(false)
						onAddCompany(companyId)
					}} />
				</FormModal>
			}
			<ControlModalContext.Provider
				value={{ isShow: showAddCompany, setIsShow: setShowAddCompany }}
			>	
				<FormModal>
					<PostLogisticCompanyForm onSubmitCallback={(companyId)=>{
						setShowAddCompany(false)
						onAddCompany(companyId)
					}} />
				</FormModal>
			</ControlModalContext.Provider>
		</>
	);
};

export default UploadShippingForm;
