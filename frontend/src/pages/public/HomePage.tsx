import { RouteEnum, siteMap } from "@/services/routes.config";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="relative h-fit overflow-hidden">
        <div className="max-w-7xl max-lg:px-2 mx-auto flex w-fit p-12">
          <div
            className="rounded-lg flex shadow w-fit cursor-pointer overflow-hidden ring-8 ring-offset-1 ring-white/25"
            onClick={() => navigate(siteMap(RouteEnum.Requests))}
          >
            <img src="/image/event/Banner.jpg" className="contrast-[0.9]" />
          </div>
        </div>
        <div className="bg-[url('/image/event/Banner.jpg')] bg-cover bg-top w-screen backdrop-blur-3xl absolute inset-0 -z-10 blur-3xl"></div>
      </div>
      <div className="w-full">
        <div className="max-w-7xl max-lg:px-2 mx-auto flex max-lg:flex-col">
          <div className="max-lg:w-full w-1/2 p-12 my-8 max-lg:pb-0">
            <h1 className="text-left text-5xl mb-3">
              <span className="font-bold text-primary-400">Link</span>
              <span className="text-slate-400 font-light">mart</span>
            </h1>
            <p className="text-base-content font-roboto text-justify">
              <b className="text-primary-400 font-bold">Our</b> platform is a
              matching platform for shoppers and overseas personal shoppers! You
              can freely post the items you want to purchase from overseas, and
              people from around the world can become your personal shoppers to
              fulfill your mission. Linkmart can help you get the latest and
              coolest items from around the world and deliver them to your
              doorstep!
            </p>
            <p className="text-base-content font-roboto mb-5">
              Let&#39;s start your journey！
            </p>
            <button
              className="select-none bg-primary-400 hover:bg-primary-500 text-white hover:text-primary-100 rounded-badge ring-primary-200 hover:ring-2 hover:ring-offset-4 hover:-translate-y-1 transition-all py-3 px-12"
              onClick={() => navigate(siteMap(RouteEnum.Requests))}
            >
              Explore
            </button>
          </div>
          <div className="max-lg:w-full px-3 w-1/2 flex items-center justify-center -z-10 my-12">
            {/* <img src="/image/tags/tag_shopping_bag.png" /> */}
            <div className="relative w-full max-lg:p-4">
              <div className="w-full mockup-window bg-base-300 aspect-[4/3] shadow-lg border-4 border-base-300/20">
                <img src="/image/screenShot/Linkmart-Screen-Shot-02.png" />
              </div>
              <div className="absolute -bottom-2 left-12 lg:-bottom-6 lg:-left-12 w-1/4">
                <img src="/image/screenShot/Linkmart-mob_mu.png" className="" />
              </div>

              <img
                src="/image/tags/tag_shopping_bag.png"
                className="absolute -bottom-6 -right-6 w-20 h-20"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
