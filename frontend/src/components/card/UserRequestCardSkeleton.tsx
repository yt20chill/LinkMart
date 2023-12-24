export function UserRequestCardSkeleton() {
  return (
    <div className="flex gap-3 w-full mb-2 bg-base-100/75 backdrop-blur-lg icn-hvr-fill rounded-xl p-2 transition-all h-fit border border-slate-500/20 select-none overflow-hidden">
      <figure className="aspect-square rounded-lg h-24 flex justify-center items-center bg-slate-300 overflow-hidden border border-gray-200 animate-pulse">
        <span className="material-symbols-rounded text-[64px] text-base-100">
          image
        </span>
      </figure>
      <div className="flex justify-between items-center grow p-3 ">
        <div>
          <div className="bg-gray-400 animate-pulse w-36 h-3 rounded mb-1"></div>
          <div className="bg-gray-400 animate-pulse w-72 h-5 rounded mb-1"></div>
          <div className="bg-gray-400 animate-pulse w-24 h-5 rounded"></div>
        </div>
        <div className="flex px-2">
          <div className="w-full">
            <div className="bg-gray-400 animate-pulse w-24 h-5 rounded mb-1"></div>
            <div className="bg-gray-400 animate-pulse w-24 h-3 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
