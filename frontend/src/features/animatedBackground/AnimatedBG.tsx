export function AnimatedBG() {
  return (
    <div className="overflow-hidden fixed inset-0 -z-50 w-screen">
      <img
        src="/image/BG-1.jpeg"
        className="object-cover blur-3xl scale-110 opacity-30 select-none pointer-events-none h-full w-screen"
        title="LinkMart"
      />
      {/* <div className="select-none rounded-full z-30 absolute w-[80vw] h-[80vw] blur-3xl bg-secondary-50/50 origin-center transform-center "></div>
      <div className="select-none rounded-full z-10 bg-animate-reverse absolute w-96 h-96 blur-3xl bg-primary-500/25 bottom-1 right-1"></div>
      <div className="select-none rounded-full z-10 absolute w-[calc(35vw)] h-[calc(35vw)] blur-xl bg-secondary-300/25 bottom-1/2 right-3/4"></div>
      <div className="select-none rounded-full z-20 absolute w-[calc(15vw)] h-[calc(15vw)] blur-3xl bg-secondary-500/50 bottom-1/3 right-5/6"></div> */}
    </div>
  );
}
