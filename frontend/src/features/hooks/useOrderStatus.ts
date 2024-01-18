import { getProviderTasksAJAX, getUserOrdersAJAX } from "@/services/api/orderApi";
import { queryKey } from "@/services/query.config";
import { useQuery } from "react-query";



export function useOrderStatus(activeTab:"inProgress" | "complete", role:"user" | "provider"){


    const { data: orders, isLoading} = useQuery({
		queryKey: [queryKey.ORDER, activeTab, { role }],
		queryFn:
			role === "user"
				? () => getUserOrdersAJAX(activeTab)
				: () => getProviderTasksAJAX(activeTab),
	});

    if(isLoading){
        return {
            isLoading,
            orders:[]
        }
    }

    if(!orders){
        return  {
            isLoading:false,
            orders:[]
        }
    }

    return {
        isLoading:false,
        orders
    }
}