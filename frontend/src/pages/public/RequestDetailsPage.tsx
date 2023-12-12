import { ImageFrame } from "@/components/imageFrame/ImageFrame";
import { imageHoverEnd, imageHoverView } from "@/lib/utils";
import { useState } from "react";

function RequestDetailsPage() {
  const fakeImgList = [
    { path: "https://loremflickr.com/320/240?random=1" },
    { path: "https://loremflickr.com/320/240?random=2" },
    { path: "https://loremflickr.com/320/240?random=3" },
    { path: "https://loremflickr.com/320/240?random=4" },
    { path: "https://loremflickr.com/320/240?random=5" },
    { path: "https://loremflickr.com/320/240?random=6" },
    { path: "https://loremflickr.com/320/240?random=7" },
    { path: "https://loremflickr.com/320/240?random=8" },
  ];
  const [currentImage, setCurrentImage] = useState(
    "https://www.price.com.hk/space/product/nsp/images/20231005/044782eb9e34c68173ac.jpg"
  );
  return (
    <div className="mt-5 max-w-7xl max-xl:px-2 mx-auto rounded-lg bg-base-100/50 backdrop-blur-lg shadow p-12">
      <header className="flex">
        <div className="max-md:w-full w-1/3 flex flex-col flex-wrap">
          <div className="flex  min-h-[150px] h-[50vw] max-h-[350px] overflow-hidden rounded border border-base-200/50">
            <img
              title="fake"
              className="object-cover origin-top-left min-w-full"
              src={currentImage}
              onMouseMove={(e) => imageHoverView(e)}
              onMouseLeave={(e) => imageHoverEnd(e)}
            />
          </div>
          <div className="mt-2 grid grid-cols-5 relative gap-2">
            {fakeImgList.map((itm) => (
              <ImageFrame
                key={itm.path}
                {...itm}
                onClickFn={(e) =>
                  setCurrentImage((e.target as HTMLImageElement).src)
                }
              />
            ))}
          </div>
        </div>
      </header>
      <div>RequestDetailsPage</div>
      <div></div>
    </div>
  );
}

export default RequestDetailsPage;
