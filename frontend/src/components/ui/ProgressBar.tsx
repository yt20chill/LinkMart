type ProgressBarProps<T extends string[]> = {
	steps: T;
	currentStep: T extends (infer U)[] ? U : never;
};

const ProgressBar = <T extends string[]>({
	steps,
	currentStep,
}: ProgressBarProps<T>) => {
	// if currentStep not in steps, default to 0
	const found = Math.max(steps.indexOf(currentStep), 0);
	return (
		<ul className="steps steps-vertical">
			{steps.map((step, index) => (
				<li
					key={`${step}`}
					className={`${index <= found ? "step step-primary" : "step"}`}
				>
					{step}
				</li>
			))}
		</ul>
	);
};

export default ProgressBar;
