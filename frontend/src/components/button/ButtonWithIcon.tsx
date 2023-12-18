import { RouteEnum, siteMap } from "@/services/routes.config";
import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

type BaseProps = {
  className?: string;
  icon?: string;
  label: string;
};

type LinkProps = BaseProps & {
  linkTo: RouteEnum;
};

type ButtonProps = BaseProps & {
  onClick: (e: MouseEvent) => void;
};
type ButtonWithIconProps = LinkProps | ButtonProps;
export function ButtonWithIcon({
  className,
  icon,
  label,
  ...props
}: ButtonWithIconProps) {
  // let clickFn: (e: MouseEvent) => void;
  const clickFn: (e: MouseEvent) => void =
    "linkTo" in props
      ? (e) => {
          e.preventDefault();
          navigate(siteMap(props.linkTo));
        }
      : props.onClick;
  const navigate = useNavigate();
  return (
    <>
      <button onClick={clickFn}>
        <div
          className={`flex items-center p-3 rounded-lg hover:bg-slate-200/50 hover:shadow transition-all duration-300 [&>span]:hover:text-slate-500 hover:text-slate-600 ${className}`}
        >
          <span className="material-symbols-rounded mx-1">{icon}</span>
          {label}
        </div>
      </button>
    </>
  );
}
