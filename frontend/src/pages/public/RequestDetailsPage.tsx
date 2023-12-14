import { DateBadge } from "@/components/badge/DateBadge";
import { PillBadge } from "@/components/badge/PillBadge";
import { RequestDetailBadge } from "@/components/badge/RequestDetailBadge";
import { IconCircleFrame } from "@/components/frame/IconCircleFrame";
import { ImageFrame } from "@/components/imageFrame/ImageFrame";
import { imageHoverEnd, imageHoverView } from "@/lib/utils";
import { RequestDetailsDto } from "@/schemas/responseSchema";
import { useState } from "react";

function RequestDetailsPage() {
  const fakeRequest: RequestDetailsDto = {
    requestId: "01HHEZNSZ64QBWC6J77YAWHAEY",
    locationId: 1,
    locationName: "🇯🇵 Japan",
    categoryId: 1,
    categoryName: "Clothes",
    itemDetail: { Color: "White", Size: "XS" },
    item: "Uniqlo White Jacket",
    primaryImage:
      "http://cdn.linkmart.com.s3-website-ap-southeast-1.amazonaws.com/profiles/profile-1702383773670.avif",
    images: [
      {
        imageId: 1,
        imagePath:
          "http://cdn.linkmart.com.s3-website-ap-southeast-1.amazonaws.com/profiles/profile-1702383773670.avif",
      },
      { imageId: 2, imagePath: "https://loremflickr.com/320/240?random=1" },
      { imageId: 3, imagePath: "https://loremflickr.com/320/240?random=2" },
      { imageId: 4, imagePath: "https://loremflickr.com/320/240?random=3" },
      { imageId: 5, imagePath: "https://loremflickr.com/320/240?random=4" },
      { imageId: 6, imagePath: "https://loremflickr.com/320/240?random=5" },
      { imageId: 7, imagePath: "https://loremflickr.com/320/240?random=6" },
      { imageId: 8, imagePath: "https://loremflickr.com/320/240?random=7" },
      { imageId: 9, imagePath: "https://loremflickr.com/320/240?random=8" },
    ],
    url: "https://google.com",
    quantity: 1,
    requestRemark: "無縫羽絨連帽外套",
    offerPrice: 1900,
    createdBy: "Jackie Mo",
    createdAt: "2023-12-12 20:22:54.04832",
    updatedAt: "2023-12-12 20:22:54.04832",
  };

  const [currentImage, setCurrentImage] = useState<string>(
    fakeRequest.primaryImage as string
  );
  return (
    <div className="bg-base-200/80 backdrop-blur-3xl mt-12 py-12 border-y border-base-300">
      <div className="max-w-7xl max-xl:px-2 mx-auto">
        <main className="flex flex-wrap max-md:px-6 px-12">
          {/*Request Img */}
          <div className="max-md:w-full w-2/5 flex flex-col flex-wrap max-md:order-2">
            <div className="flex justify-center aspect-square w-full overflow-hidden rounded-sm bg-slate-300 border border-white/10 ring-1 ring-black/10">
              <img
                title={fakeRequest.item}
                className="object-cover origin-top-left"
                src={currentImage}
                onMouseMove={(e) => imageHoverView(e)}
                onMouseLeave={(e) => imageHoverEnd(e)}
              />
            </div>
            <div className="mt-2 grid grid-cols-5 relative gap-2">
              {fakeRequest.images.map((itm) => (
                <ImageFrame
                  key={itm.imagePath}
                  {...itm}
                  onClick={(e) =>
                    setCurrentImage((e.target as HTMLImageElement).src)
                  }
                />
              ))}
            </div>
          </div>
          {/*Request Info */}
          <div className="max-md:w-full w-3/5 flex flex-col flex-wrap max-md:pl-0 max-md:pt-6 pl-12 mb-3">
            <div className="text-slate-400/80 flex items-center gap-1 font-roboto tracking-wide text-sm">
              <span className="material-symbols-rounded msr-light">
                package_2
              </span>
              Request Item
            </div>
            <div className="inline-flex max-md:text-2xl text-3xl font-bold mb-2">
              {fakeRequest.item}
            </div>

            <div className="flex justify-between items-start mb-5">
              <div className="flex gap-2">
                <PillBadge content={fakeRequest.locationName} />
                <PillBadge content={fakeRequest.categoryName} />
              </div>
              <DateBadge date={fakeRequest.updatedAt} />
            </div>
            <div className="flex flex-wrap justify-end items-center">
              <IconCircleFrame username="fakeRequest.createdBy" />
              <div>
                <span className="text-slate-400/80 flex items-center gap-1 font-roboto tracking-wide text-xs leading-none">
                  Created By
                </span>
                {fakeRequest.createdBy}
              </div>
            </div>
            <hr className="border-base-300 my-4" />

            <div className="text-slate-400/80 flex items-center gap-1 font-roboto tracking-wide text-sm">
              <span className="material-symbols-rounded msr-light">
                view_list
              </span>
              Details
            </div>
            <div className="grid max-md:grid-cols-2 grid-cols-3 gap-2 p-5">
              <RequestDetailBadge
                title={fakeRequest.locationName}
                label={"From"}
                value={fakeRequest.locationName
                  .split(" ")
                  .slice(1, 10)
                  .join(" ")}
              />
              {Object.entries(fakeRequest.itemDetail).map(([key, val]) => (
                <RequestDetailBadge
                  key={val}
                  label={key}
                  value={val}
                  title={val}
                />
              ))}
            </div>
            <div className="text-right">
              <div className="inline-flex px-2 rounded-badge text-slate-400 bg-slate-200 text-sm me-2">
                Offer
              </div>
              {fakeRequest.offerPrice ? (
                <span className="text-3xl tracking-tighter">
                  <span className="text-base">HK $</span>
                  {fakeRequest.offerPrice.toLocaleString("en")}
                </span>
              ) : (
                <span className="text-3xl">{fakeRequest.offerPrice}</span>
              )}
            </div>
            <hr className="border-base-300 my-4" />
          </div>
        </main>
      </div>
    </div>
  );
}

export default RequestDetailsPage;
