import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { TabContextType } from "../../services/context/TabsContext";
import { RouteEnum, siteMap } from "../../services/routes.config";
import ExpandButton from "../button/ExpandButton";

// tabs should contain tabName and its path
type NavTabProps<T extends string[]> = {
	tabs: Readonly<Record<T[number], RouteEnum>>;
	useTabContext: () => TabContextType<T[number]>;
};

const NavTab = <T extends string[]>({
	tabs,
	useTabContext,
}: NavTabProps<T>) => {
	const { activeTab, setActiveTab } = useTabContext();
	const navigate = useNavigate();
	const [expand, setExpand] = useState(false);
	return (
		<>
			<ExpandButton isExpanded={expand} setIsExpanded={setExpand} />
			<div
				className={twMerge(
					"flex-col flex w-72 gap-2 bg-base-100 shadow me-6",
					!expand && "max-lg:hidden"
				)}
			>
				<div className="grow pt-6">
					{Object.keys(tabs).map((tab) => (
						<div
							key={tab}
							className={twMerge(
								"flex justify-start items-center px-12 py-1 hover:text-primary-400 hover:bg-base-200/80 m-2 rounded-none hover:rounded-lg transition-all font-normal",
								activeTab === tab
									? "bg-slate-500/20 text-slate-500 rounded-lg select-none pointer-events-none"
									: ""
							)}
							onClick={(e) => {
								e.preventDefault();
								setActiveTab(tab);
								navigate(siteMap(tabs[tab as T[number]]));
							}}
						>
							<div className="flex items-center">{tab}</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default NavTab;
