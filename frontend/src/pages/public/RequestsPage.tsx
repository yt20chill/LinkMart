import { Filter } from "@/features/filter/Filter";
import { getAllRequestsAJAX } from "@/features/api/requestApi";
import { RequestDto } from "@/features/api/responseSchema";
import { useState } from "react";
import { RequestCard } from "@/components/card/RequestCard";

const fakeRequestList: RequestDto[] = [
  {
    requestId: "1",
    locationId: 1,
    locationName: "Japan",
    item: "1/48 RX-78F00 GUNDAM Full Gear with Extra Paint",
    image: "https://dummyimage.com/300x300/c9843e/fff.png",
    offerPrice: 500,
    createdBy: "Fredy",
    updatedAt: "2022-12-10 12:00",
  },
  {
    requestId: "2",
    locationId: 2,
    locationName: "Korea",
    item: "Sakura Figure 2",
    image: "https://dummyimage.com/300x300/c9843e/fff.png",
    offerPrice: null,
    createdBy: "Mad",
    updatedAt: "2023-11-10 12:10",
  },
  {
    requestId: "3",
    locationId: 1,
    locationName: "Japan",
    item: "Sakura Figure 3",
    image: "https://dummyimage.com/300x300/c9843e/fff.png",
    offerPrice: 250,
    createdBy: "Mad",
    updatedAt: "2023-12-10 12:20",
  },
  {
    requestId: "4",
    locationId: 1,
    locationName: "Japan",
    item: "Sakura Figure",
    image: "https://dummyimage.com/300x300/c9843e/fff.png",
    offerPrice: 500,
    createdBy: "Fredy",
    updatedAt: "2023-12-04 12:00",
  },
  {
    requestId: "5",
    locationId: 2,
    locationName: "Korea",
    item: "Sakura Figure 2",
    image: "https://dummyimage.com/400x300/c9843e/fff.png",
    offerPrice: null,
    createdBy: "Mad",
    updatedAt: "2023-12-10 12:10",
  },
  {
    requestId: "6",
    locationId: 1,
    locationName: "Japan",
    item: "Sakura Figure 3",
    image: "https://dummyimage.com/300x400/c9843e/fff.png",
    offerPrice: 250,
    createdBy: "Mad",
    updatedAt: "2023-12-10 21:20",
  },
];

function RequestsPage() {
  const [requestList] = useState<RequestDto[]>(fakeRequestList);
  //const [page, setPage] = useState(1);
  //const requestList = getAllRequestsAJAX()
  return (
    <>
      <Filter />
      <div className="mt-5 max-w-7xl mx-auto grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {requestList.map((item) => (
          <RequestCard key={item.requestId} {...item} />
        ))}
      </div>
    </>
  );
}

export default RequestsPage;
