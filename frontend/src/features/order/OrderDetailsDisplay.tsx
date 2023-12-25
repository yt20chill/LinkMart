import { twMerge } from "tailwind-merge";
import { OrderSectionTitle } from "../../components/title/OrderSectionTitle";
import { camelToTitleCase } from "../../lib/utils";
import { useOrderDetailsContext } from "../../services/context/OrderDetailsContext";

type OrderCardProps = {
	className?: string;
};
export function OrderDetailsDisplay({ className }: OrderCardProps) {
	const { requestInfoDto, orderDto, shipmentInfoDto } =
		useOrderDetailsContext();
	const isCompleted = /complete/i.test(orderDto.orderStatus);
	return (
		<div className={twMerge("", className ?? "")}>
			<div className="w-full border-b p-6 pb-2 text text-slate-500 tracking-tight flex items-center border-slate-500/20">
				Order
			</div>

			<div className="flex flex-wrap justify-start grow px-6 gap-6 py-4">
				<div className="aspect-square rounded-xl overflow-hidden h-40 w-40 bg-slate-200 flex justify-center items-center border border-slate-200">
					<img
						src={orderDto.primaryImage}
						className="object-cover h-full"
						title={orderDto.item}
					/>
				</div>
				<div className="py-2 grow">
					<div className="leading-none flex flex-col mb-2">
						<span className="text-gray-400 text-xs flex items-center gap-1">
							<span className="material-symbols-rounded text-base">
								receipt_long
							</span>
							Reference No.
						</span>
						<div
							className={twMerge(
								"text-lg",
								isCompleted ? "text-slate-400" : " text-base-content"
							)}
						>
							<span
								className="text-slate-300 me-1 text-sm"
								onClick={(e) => e.target}
							>
								#
							</span>
							{orderDto.orderId}
						</div>
						<div>
							<div
								className={twMerge(
									"uppercase inline-flex px-2 text-white me-1 text-sm items-center justify-center rounded-xl",
									isCompleted ? "bg-slate-400" : " bg-emerald-400"
								)}
							>
								{orderDto.orderStatus}
							</div>
						</div>
					</div>
					<div className="leading-none inline-flex flex-col">
						<div className="leading-none flex flex-col">
							<span className="text-gray-400 text-xs flex items-center gap-1">
								<span className="material-symbols-rounded text-base">
									event_upcoming
								</span>
								Estimated Arrival
							</span>
							<div
								className={twMerge(
									"text-lg",
									isCompleted ? "text-slate-400" : " text-base-content"
								)}
							>
								<div className="font-roboto-mono">
									{orderDto.estimateArrivalTime}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="border-b flex w-screen border-slate-500/20"></div>
			<div className="rounded-none">
				<OrderSectionTitle label="Details" />
				<div className="grid grid-cols-3 px-6 gap-4 max-h-0 overflow-hidden transition-all">
					<div className="col-span-3 flex flex-col">
						<span className="text-gray-400 text-xs">Order Item</span>
						{orderDto.item}
					</div>
					{requestInfoDto.itemDetail &&
						Object.entries(requestInfoDto.itemDetail).map(([key, value]) => (
							<div className="flex flex-col" key={key + value}>
								<span className="text-gray-400 text-xs">
									{camelToTitleCase(key)}
								</span>
								{value}
							</div>
						))}
					<div className="col-span-3 flex flex-col">
						<span className="text-gray-400 text-xs">Shipping Address</span>
						{shipmentInfoDto.address}
					</div>
					{requestInfoDto.requestRemark && (
						<div className="flex flex-col col-span-3">
							<span className="text-gray-400 text-xs">Remarks</span>
							{requestInfoDto.requestRemark}
						</div>
					)}
				</div>
			</div>

			<div className="border-b flex w-screen border-slate-500/20"></div>
			<div className="flex flex-col">
				<OrderSectionTitle label="Payment" />
				<div className="flex flex-col px-6 max-h-0 overflow-hidden transition-all">
					<div className="flex flex-col mb-2">
						<b className="text-gray-400 text-xs me-4">Payment Date</b>
						<span>{new Date(orderDto.createdAt).toLocaleDateString()}</span>
					</div>
					<div className="border p-4 rounded-lg">
						<table className="table-auto w-full">
							<thead>
								<tr className="text-left text-xs text-gray-400">
									<th className="w-3/4">Item</th>
									<th>Qty</th>
									<th>Amount</th>
								</tr>
							</thead>
							<tbody>
								<tr className="border-b border-slate-500/20">
									<td>{orderDto.item}</td>
									<td>{orderDto.quantity}</td>
									<td>HK${orderDto.price.toLocaleString("en")}</td>
								</tr>
								<tr>
									<td></td>
									<td></td>
									<td className="font-bold">
										HK${orderDto.price.toLocaleString("en")}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
