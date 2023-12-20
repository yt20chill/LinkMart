type DetailDisplayProps = {
  title?: string;
  icon?: string;
  label: string;
  url: string;
  className?: string;
};

export function UrlDisplay(props: DetailDisplayProps) {
  return (
    <div className={`mb-5 ${props.className}`}>
      <div className="flex items-center font-roboto text-xs text-slate-400/80 tracking-wider leading-none h-4 select-none">
        {props.icon && (
          <span className="material-symbols-rounded text-base icn-no-hvr">
            {props.icon}
          </span>
        )}
        {props.label}
      </div>
      <a
        className="leading-tight text-blue-600 hover:text-blue-9s00 underline decoration-1"
        href={props.url}
        title={props.title}
        target="_blank"
        rel="noreferrer"
      >
        {"https://" +
          props.url
            .replace("http://", "")
            .replace("https://", "")
            .split("/")[0] +
          "/"}
      </a>
    </div>
  );
}
