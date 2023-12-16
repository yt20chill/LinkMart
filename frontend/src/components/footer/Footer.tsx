type FooterProps = {
  className?: string;
};

export function Footer(props: FooterProps) {
  return (
    <div className={`mt-auto p-12 bg-slate-700 ${props.className}`}>
      <div>Footer</div>
    </div>
  );
}
