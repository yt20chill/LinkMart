import { useNavigate } from "react-router-dom";
import { TabContextType } from "../../services/context/TabsContext";

type NavTabProps<T extends string[]> = {
	tabs: Readonly<Record<T[number], string>>;
	useTabContext: () => TabContextType<T[number]>;
};

const NavTab = <T extends string[]>({
	tabs,
	useTabContext,
}: NavTabProps<T>) => {
	const { activeTab, setActiveTab } = useTabContext();
	const navigate = useNavigate();

	return (
		<div className="flex flex-col w-96 gap-2 bg-base-100 grow">
			{Object.keys(tabs).map((tab) => (
				<div
					key={tab}
					className={`flex justify-center items-center px-12 py-6 hover:bg-primary-400 ${
						activeTab === tab ? "bg-primary-400" : ""
					}`}
					onClick={(e) => {
						e.preventDefault();
						setActiveTab(tab);
						console.log(tab);
						navigate(tabs[tab as keyof typeof tabs]);
					}}
				>
					{tab}
				</div>
			))}
		</div>
	);
};

export default NavTab;
