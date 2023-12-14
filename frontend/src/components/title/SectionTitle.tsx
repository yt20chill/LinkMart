type SectionTitleProps = {
  icon?: string;
  content: string;
  className?: string;
};
export function SectionTitle(props: SectionTitleProps) {
  return (
    <div
      className={`text-slate-400/80 flex items-center gap-1 font-roboto tracking-wide text-sm select-none ${props.className}`}
    >
      {props.icon && (
        <span className="material-symbols-rounded icn-no-hvr msr-light">
          {props.icon}
        </span>
      )}
      {props.content}
    </div>
  );
}
