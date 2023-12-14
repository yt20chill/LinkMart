export function RequestCardSkeleton() {
  return (
    <div className="icn-hvr-fill p-1 rounded-lg shadow transition-all bg-base-100/25 backdrop-blur-lg pointer-events-none border border-base-200/75">
      <figure className="rounded-md h-48 flex justify-center items-center bg-gray-300 animate-pulse">
        <span className="material-symbols-rounded text-[128px] text-base-100">
          image
        </span>
      </figure>
      <div className="px-2 pt-2 flex flex-col gap-1 w-full animate-pulse">
        <div className="bg-gray-300 w-32 h-5 rounded-sm"></div>
        <div className="bg-gray-300 w-16 h-4 rounded-sm"></div>
        <div className="w-full flex flex-col gap-1 justify-end">
          <div className="ml-auto bg-gray-300 w-2/6 h-6"></div>
          <div className="ml-auto w-full h-4 flex justify-end gap-1">
            <div className="bg-gray-300 w-4 h-4 rounded-full"></div>
            <div className="bg-gray-300 w-8 h-4"></div>
          </div>
          <div className="ml-auto bg-gray-300 w-1/2 h-4 my-2"></div>
        </div>
      </div>
    </div>
  );
}
