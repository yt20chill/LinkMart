type TabItem = {
	id: number;
	name: string;
};

export type FilterTabProps = {
	tabIcon: string;
	tabName: string;
	filterKey: string;
	onClick: (queryParam: string, value: string) => void;
	tabItemList: TabItem[];
};

export function FilterTab({
	tabIcon,
	tabName,
	filterKey,
	onClick,
	tabItemList,
}: FilterTabProps) {
	return (
		<div className="dropdown dropdown-hover">
			<div
				tabIndex={0}
				role="button"
				className="flex justify-center items-center w-52 py-5 focus:bg-amber-200/50 hover:bg-amber-200/50 hover:text-amber-800 backdrop-blur"
			>
				<span className="material-symbols-rounded me-1">{tabIcon}</span>
				{tabName}
			</div>
			<ul
				tabIndex={0}
				className="dropdown-content z-[1] p-2 shadow bg-base-200/20 backdrop-blur-xl w-52 mt-1 rounded-lg border border-base-100/25"
			>
				{tabItemList.map((item) => (
					<li key={item.id}>
						<div
							onClick={() => onClick(filterKey, item.name)}
							className="bg-transparent hover:bg-base-100/50 hover:scale-95 transition-all flex items-center rounded-md p-2 text-slate-800 hover:text-slate-500"
						>
							<b className="emo me-1 text-lg">💬</b> {item.name}
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
