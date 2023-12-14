import { DateBadge } from "@/components/badge/DateBadge";
import { PillBadge } from "@/components/badge/PillBadge";
import { DetailDisplay } from "@/components/display/DetailDisplay";
import { PriceDisplay } from "@/components/display/PriceDisplay";
import { IconCircleFrame } from "@/components/frame/IconCircleFrame";
import { MainImageFrame } from "@/components/imageFrame/MainImageFrame";
import { SubImageFrame } from "@/components/imageFrame/SubImageFrame";
import { SectionTitle } from "@/components/title/SectionTitle";
import { RequestDetailsDto } from "@/schemas/responseSchema";
import { useState } from "react";

function RequestDetailsPage() {
  const fakeRequest: RequestDetailsDto = {
    requestId: "01HHEZNSZ64QBWC6J77YAWHAEY",
    locationId: 1,
    locationName: "🇯🇵 Japan",
    categoryId: 1,
    categoryName: "Clothes",
    itemDetail: {
      Color: "White",
      Size: "XS",
      Width: "White",
      Height: "XS",
      Scale: "White",
      Range: "XS",
    },
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
    fakeRequest.primaryImage
  );
  return (
    <div className="bg-base-200/80 backdrop-blur-3xl mt-12 py-12 border-y border-base-300">
      <div className="max-w-7xl max-xl:px-2 mx-auto">
        <main className="flex flex-wrap max-md:px-6 px-12">
          {/*Request Img */}
          <div className="max-md:w-full w-2/5 flex flex-col flex-wrap max-md:order-2">
            <MainImageFrame title={fakeRequest.item} imagePath={currentImage} />
            <div className="mt-2 grid grid-cols-5 relative gap-2">
              {fakeRequest.images.map((itm) => (
                <SubImageFrame
                  key={itm.imagePath}
                  imagePath={itm.imagePath}
                  onClick={(e) =>
                    setCurrentImage((e.target as HTMLImageElement).src)
                  }
                />
              ))}
            </div>
          </div>
          {/*Request Info */}
          <div className="max-md:w-full w-3/5 flex flex-col flex-wrap max-md:pl-0 max-md:pt-6 pl-12 mb-3">
            <SectionTitle icon="package_2" content={"Request Item"} />
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
            <SectionTitle icon="view_list" content={"Details"} />
            <div className="grid max-md:grid-cols-2 grid-cols-3 gap-2 p-5">
              <DetailDisplay
                title={fakeRequest.locationName}
                label={"From"}
                value={fakeRequest.locationName
                  .split(" ")
                  .slice(1, 10)
                  .join(" ")}
              />
              {Object.entries(fakeRequest.itemDetail).map(([key, val]) => (
                <DetailDisplay
                  key={val}
                  className={val.length > 20 ? "col-span-2" : ""}
                  label={key}
                  value={val}
                  title={val}
                />
              ))}
              {fakeRequest.requestRemark && (
                <DetailDisplay
                  icon="info"
                  className="col-span-3"
                  label="Remark"
                  value={fakeRequest.requestRemark}
                />
              )}
            </div>
            <div className="text-right">
              <PriceDisplay
                badge={true}
                badgeContent="Offer"
                price={fakeRequest.offerPrice}
              />
            </div>

            <hr className="border-base-300 my-4" />
            <div>Offer Btn</div>
            <div>Clone Btn</div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default RequestDetailsPage;
