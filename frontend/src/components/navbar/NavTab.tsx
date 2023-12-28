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
					"inline-flex flex-col pr-2 min-w-[200px] max-lg:w-screen max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:z-10 bg-base-100 max-lg:bg-base-100/10 backdrop-blur-3xl max-lg:h-screen max-lg:overflow-y-auto max-lg:pt-[15%] max-lg:px-6",
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
								setExpand(false);
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
