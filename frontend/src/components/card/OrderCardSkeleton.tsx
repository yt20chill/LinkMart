export function OrderCardSkeleton() {
  return (
    <div className="bg-base-100 rounded-2xl shadow flex flex-wrap overflow-hidden mb-4 border">
      <div className="w-full border-b py-3 pl-4 tracking-tight flex items-center">
        <span className="bg-gray-300 w-4 h-4 me-1 rounded animate-pulse"></span>
        <span className="bg-gray-300 w-1/3 h-4 rounded animate-pulse"></span>
      </div>
      <div className="m-2 aspect-square rounded-xl overflow-hidden h-20 w-20 bg-gray-300 flex justify-center items-center border border-slate-200 animate-pulse"></div>
      <div className="flex flex-wrap justify-between grow px-6 py-4">
        <div className="">
          <div className="bg-gray-300 animate-pulse rounded h-6 w-24 mb-1"></div>
          <div className="bg-gray-300 animate-pulse rounded h-4 w-16 mb-1"></div>
          <div className="bg-gray-300 animate-pulse rounded h-4 w-48"></div>
        </div>
        <div className="flex items-end">
          <div className="bg-gray-300 animate-pulse rounded h-6 w-6 me-1"></div>
          <div className="bg-gray-300 animate-pulse rounded h-10 w-12"></div>
        </div>
      </div>
    </div>
  );
}
