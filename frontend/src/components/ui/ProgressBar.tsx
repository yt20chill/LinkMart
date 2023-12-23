import { twMerge } from "tailwind-merge";
import { OrderSectionTitle } from "../title/OrderSectionTitle";
import { useOrderDetailsContext } from "@/services/context/OrderDetailsContext";
import { OrderProgressDisplay } from "../display/OrderProgressDisplay";

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
  const stepIndex = Math.max(steps.indexOf(currentStep), 0);
  return (
    <>
      <OrderSectionTitle label="Order Status" className="active" />
      <div className="pl-8 pr-6 max-h-0 transition-all">
        <ul className="timeline timeline-snap-icon timeline-vertical timeline-compact">
          {steps.map((step, index) => (
            <li key={`${step}-${index}`}>
              {/* Skip the top line */}
              {!!index && (
                <hr
                  className={twMerge(
                    className,
                    index <= stepIndex ? "bg-primary-400" : ""
                  )}
                />
              )}
              <div className="timeline-middle">
                <i
                  className={
                    index <= stepIndex
                      ? "bi bi-check-circle-fill text-primary-400"
                      : "bi bi-circle-fill text-gray-200"
                  }
                ></i>
              </div>
              <div
                className={twMerge(
                  "timeline-end ms-10 max-md:ps-2 w-full max-w-[350px]",
                  index <= stepIndex ? "step-primary" : ""
                )}
              >
                <h5
                  className={twMerge(
                    "text-md font-roboto bcapitalize my-[0.35rem]",
                    stepIndex === index
                      ? "text-primary-400 font-bold"
                      : "text-gray-400"
                  )}
                >
                  {stepIndex === index ? (
                    <i className="bi bi-caret-right-fill me-1"></i>
                  ) : (
                    <i className="bi bi-caret-right me-1"></i>
                  )}
                  {step}
                </h5>
                {stepIndex > index && <OrderProgressDisplay step={step} />}
                {stepIndex === index && children}
              </div>
              {index < steps.length - 1 && (
                <hr
                  className={twMerge(
                    className,
                    index < stepIndex ? "bg-primary-400" : ""
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
