import { RouteEnum, siteMap } from "@/services/routes.config";
import { Link } from "react-router-dom";

type ButtonWithIconProps = {
  linkTo: RouteEnum;
  className?: string;
  icon?: string;
  label: string;
};
export function ButtonWithIcon(props: ButtonWithIconProps) {
  return (
    <>
      <Link to={siteMap(props.linkTo)}>
        <div
          className={`flex items-center p-3 rounded-lg hover:bg-slate-200 transition-all duration-300 [&>span]:hover:text-secondary-500 hover:text-secondary-950 hover:scale-105 ${props.className}`}
        >
          <span className="material-symbols-rounded mx-1">{props.icon}</span>
          {props.label}
        </div>
      </Link>
    </>
  );
}
