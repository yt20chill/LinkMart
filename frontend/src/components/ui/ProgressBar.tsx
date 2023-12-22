import { OrderSectionTitle } from "../title/OrderSectionTitle";

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
    <>
      <OrderSectionTitle label="Order Status" className="active" />
      <div className="px-6 max-h-0 overflow-hidden transition-all">
        <ul className="timeline timeline-vertical">
          {steps.map((step, index) => (
            <>
              <li key={`${step}`}>
                {index !== 0 && <hr />}
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div
                  className={`${
                    index <= found
                      ? "timeline-end step-primary"
                      : "timeline-end"
                  }`}
                >
                  {step}
                </div>
              </li>
            </>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ProgressBar;
