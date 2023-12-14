type DetailDisplayProps = {
  title?: string;
  icon?: string;
  label: string;
  value: string;
  className?: string;
};

export function DetailDisplay(props: DetailDisplayProps) {
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
      <div className="leading-tight" title={props.title}>
        {props.value}
      </div>
    </div>
  );
}
