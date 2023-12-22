import { twMerge } from "tailwind-merge";
import { OrderSectionTitle } from "../title/OrderSectionTitle";

type ProgressBarProps<T extends string[]> = {
	steps: T;
	currentStep: T extends (infer U)[] ? U : never;
	className?: string;
	children?: React.ReactNode;
};

const ProgressBar = <T extends string[]>({
	steps,
	currentStep,
	className,
	children,
}: ProgressBarProps<T>) => {
	// if currentStep not in steps, default to 0
	const found = Math.max(steps.indexOf(currentStep), 0);
	return (
		<>
			<OrderSectionTitle label="Order Status" className="active" />
			<div className="px-6 max-h-0 transition-all">
				<ul className="timeline timeline-snap-icon timeline-vertical timeline-compact">
					{steps.map((step, index) => (
						<li key={`${step}-${index}`}>
							{/* Skip the top line */}
							{!!index && (
								<hr
									className={twMerge(
										className,
										index < found ? "bg-primary-400" : ""
									)}
								/>
							)}
							<div className="timeline-middle">
								<i
									className={twMerge(
										"bi bi-check-circle-fill",
										index <= found ? "text-primary-400" : ""
									)}
								></i>
							</div>
							<div
								className={twMerge(
									"timeline-end ps-4",
									index <= found ? "step-primary" : ""
								)}
							>
								<h5 className="text-sm text-gray-400 capitalize">{step}</h5>
								{found === index && children}
							</div>
							{index < steps.length - 1 && (
								<hr
									className={twMerge(
										className,
										index <= found ? "bg-primary-400" : ""
									)}
								/>
							)}
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default ProgressBar;
