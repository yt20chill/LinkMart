type MainImageFrameSkeletonProps = {
  className?: string;
};

export function MainImageFrame(props: MainImageFrameSkeletonProps) {
  return (
    <div
      className={`flex justify-center aspect-square w-full overflow-hidden rounded-sm bg-slate-300 border border-white/10 ring-1 ring-black/10 ${props.className}`}
    >
      <span className="material-symbols-rounded">image</span>
    </div>
  );
}
