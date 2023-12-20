import { RequestDetailsDto } from "@/schemas/responseSchema";
import { DetailDisplay } from "./DetailDisplay";
import { PriceDisplay } from "./PriceDisplay";
import { SectionTitle } from "../title/SectionTitle";
import { UrlDisplay } from "./UrlDisplay";

export function DetailInfoDisplay(props: RequestDetailsDto) {
  return (
    <>
      <SectionTitle icon="view_list" content={"Details"} />
      <div className="grid max-md:grid-cols-2 grid-cols-3 gap-2 p-5 pb-0">
        <DetailDisplay
          title={props.locationName}
          label={"From"}
          value={props.locationName.split(" ").slice(1, 10).join(" ")}
        />
        {Object.entries(props.itemDetail ?? []).map(([key, val]) => {
          return (
            <DetailDisplay
              key={`${key}-${val}`}
              className={val && val.length > 20 ? "col-span-2" : ""}
              label={key}
              value={val ?? ""}
              title={val ?? ""}
            />
          );
        })}
        {props.requestRemark && (
          <DetailDisplay
            icon="info"
            className="col-span-3"
            label="Remark"
            value={props.requestRemark}
          />
        )}
        {props.url && (
          <UrlDisplay
            icon="public"
            className="col-span-3"
            label="Link"
            url={props.url}
          />
        )}
      </div>
      <div className="text-right">
        <PriceDisplay
          badge={true}
          badgeContent="Offer"
          price={props.offerPrice}
        />
      </div>
      <hr className="border-base-300 my-4" />
    </>
  );
}
