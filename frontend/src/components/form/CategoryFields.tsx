import { useQuery } from "react-query";
import { getCategoryFields } from "../../features/api/requestApi";
import { CategoryFieldDto } from "../../features/api/responseSchema";
import { queryKey } from "../../lib/apiUtils";

const CategoryFields = (categoryId: number) => {
	const { data } = useQuery<CategoryFieldDto[]>({
		queryKey: [queryKey.REQUEST, { categoryId }],
		queryFn: () => getCategoryFields({ categoryId }),
	});
	return <div>CategoryFields</div>;
};

export default CategoryFields;
