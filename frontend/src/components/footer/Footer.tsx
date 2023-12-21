import { RouteEnum, siteMap } from "@/services/routes.config";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

type FooterProps = {
  className?: string;
};

export function Footer(props: FooterProps) {
  return (
    <div
      className={twMerge("mt-auto bg-slate-700 py-12", props.className ?? "")}
    >
      <div className="mx-auto max-w-7xl py-3 mb-2 gap-3 text-slate-300 flex justify-center items-end">
        <Link to={siteMap(RouteEnum.Home)}>
          <img
            className="w-48"
            src="/image/Linkmart-mono@512.png"
            title="Linkmart"
          />
        </Link>
        <div className="flex gap-5 px-3 mb-1">
          <a href="https://www.facebook.com/">
            <i className="bi bi-facebook text-2xl"></i>
          </a>
          <a href="https://github.com/">
            <i className="bi bi-github text-2xl"></i>
          </a>
          <a href="https://t.me/">
            <i className="bi bi-telegram text-2xl"></i>
          </a>
          <a href="https://www.instagram.com/">
            <i className="bi bi-instagram text-2xl"></i>
          </a>
        </div>
      </div>
      <div className="col-span-5 text-center text-slate-300 font-light text-sm">
        Copyright © 2023 Nicolas | Elaine | Fredy | Kenneth
      </div>
    </div>
  );
}
