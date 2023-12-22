import { useQuery } from "react-query";
import Table from "../../../components/ui/Table";
import ApplyProviderForm from "../../../features/forms/ApplyProviderForm";
import SkeletonForm from "../../../features/forms/SkeletonForm";
import { getProviderApplicationStatusAJAX } from "../../../services/api/providerApi";
import { queryKey } from "../../../services/query.config";

const ApplyProviderProfile = () => {
	const { data: status, isLoading } = useQuery({
		queryKey: [queryKey.AUTH, "providerApplication"],
		queryFn: getProviderApplicationStatusAJAX,
	});
	if (isLoading) return <SkeletonForm />;
	if (status?.data === null) return <ApplyProviderForm />;
	return status && status.data && <Table data={[status.data]} />;
};

export default ApplyProviderProfile;
