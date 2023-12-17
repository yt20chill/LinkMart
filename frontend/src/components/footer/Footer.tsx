import { RouteEnum, siteMap } from "@/services/routes.config";
import { Link } from "react-router-dom";

type FooterProps = {
  className?: string;
};

export function Footer(props: FooterProps) {
  return (
    <div className={`mt-auto bg-slate-700 ${props.className} py-12`}>
      <div className="mx-auto max-w-7xl grid grid-cols-1 px-6 gap-3 text-slate-300 items-end">
        <Link to={siteMap(RouteEnum.Home)}>
          <img
            className="w-48"
            src="/image/Linkmart-mono@512.png"
            title="Linkmart"
          />
        </Link>
        <div className="col-span-5 text-center text-slate-300 font-light text-sm">
          Copyright © 2023 Nicolas | Elaine | Fredy | Kenneth
        </div>
      </div>
    </div>
  );
}
