export function ImageFrame(props: {
  path: string;
  onClickFn: (e: React.MouseEvent) => void;
}) {
  return (
    <div className="hover:scale-105 hover:z-10 flex aspect-square overflow-hidden rounded border border-base-200/50 hover:ring-2 ring-0 hover:ring-offset-4 ring-offset-0 ring-orange-200 transition-all">
      <img
        title="fake"
        className="object-cover"
        src={props.path}
        onClick={(e) => props.onClickFn(e)}
      />
    </div>
  );
}
