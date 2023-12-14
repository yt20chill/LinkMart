type RequestDetailBadgeProps = {
  title?: string;
  label: string;
  value: string;
};

export function RequestDetailBadge(props: RequestDetailBadgeProps) {
  return (
    <div className="mb-3">
      <div className="font-roboto text-xs text-slate-500 tracking-wider font-bold">
        {props.label}
      </div>
      <div title={props.title}>{props.value}</div>
    </div>
  );
}
