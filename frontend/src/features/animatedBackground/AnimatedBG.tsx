export function AnimatedBG() {
  return (
    <div className="w-screen h-screen overflow-hidden fixed top-0 left-0 -z-50">
      <div className="select-none rounded-full z-30 absolute w-[80vw] h-[80vw] blur-3xl bg-amber-50/50 origin-center transform-center "></div>
      <div className="select-none rounded-full z-10 bg-animate-reverse absolute w-96 h-96 blur-3xl bg-orange-500/25 bottom-1 right-1"></div>
      <div className="select-none rounded-full z-10 absolute w-[calc(35vw)] h-[calc(35vw)] blur-xl bg-amber-300/25 bottom-1/2 right-3/4"></div>
      <div className="select-none rounded-full z-20 absolute w-[calc(15vw)] h-[calc(15vw)] blur-3xl bg-amber-500/50 bottom-1/3 right-5/6"></div>
    </div>
  );
}
