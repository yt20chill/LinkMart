export function ImageFrame(props: {
  path: string;
  onClickFn: (e: React.MouseEvent) => void;
}) {
  return (
    <div className="hover:scale-110 z-[1] hover:z-10 flex aspect-square overflow-hidden hover:shadow rounded hover:ring-2 ring-slate-800/50 transition-all cursor-pointer">
      <img
        title={props.path}
        className="object-cover"
        src={props.path}
        onClick={(e) => props.onClickFn(e)}
      />
    </div>
  );
}
