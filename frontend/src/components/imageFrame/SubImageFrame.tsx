type SubImageFrameProps = {
  imagePath: string;
  onClick: (e: React.MouseEvent<HTMLImageElement>) => void;
};

export function SubImageFrame(props: SubImageFrameProps) {
  return (
    <div className="hover:scale-110 z-[1] hover:z-10 flex justify-center aspect-square overflow-hidden hover:shadow rounded transition-all cursor-pointer bg-slate-100 border border-white/10 ring-1 ring-black/10 hover:ring-offset-2">
      <img
        title={props.imagePath}
        className="object-cover"
        src={props.imagePath}
        onClick={(e: React.MouseEvent<HTMLImageElement>) => props.onClick(e)}
      />
    </div>
  );
}
