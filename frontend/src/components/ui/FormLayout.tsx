import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type FormLayoutProps = {
  title: string;
  bootstrapIcon?: string;
  children: ReactNode;
  className?: string;
};
export function FormLayout({
  title,
  bootstrapIcon,
  children,
  className,
}: FormLayoutProps) {
  return (
    <>
      <h2
        className={twMerge(
          "text-xl inline-flex gap-2 text-primary-400 font-bold p-6 pb-3 border-b border-primary-400 shadow-3xl",
          className ?? ""
        )}
      >
        <i className={`bi ${bootstrapIcon}`}></i>
        {title}
      </h2>
      <div className="p-6 [&>form]:flex [&>form]:flex-col [&>form]:gap-6">
        {children}
      </div>
    </>
  );
}
