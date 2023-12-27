type CounterBadgeProps = {
  count: number | string;
};

const CounterBadge = ({ count }: CounterBadgeProps) => {
  return (
    <div className="ms-1 text-sm text-center px-3 whitespace-nowrap inline-flex items-center justify-center shadow bg-emerald-500 rounded-badge indent-0 text-white">
      <i className="bi bi-app-indicator me-1"></i>
      {count}
    </div>
  );
};

export default CounterBadge;
