export function AnimatedBG() {
  return (
    <div className="w-screen h-screen overflow-hidden absolute top-0 left-0 -z-50">
      <div className="rounded-full z-20 bg-animate absolute w-full h-full blur-3xl bg-orange-50/50 top-[-200px] left-0"></div>
      <div className="rounded-full z-10 bg-animate-reverse absolute w-1/2 h-1/2 blur-3xl bg-orange-300/50 bottom-[300px] right-[50%]"></div>
      <div className="rounded-full z-10 bg-animate absolute w-3/4 h-3/4 blur-3xl bg-orange-500/30 bottom-0 left-[50%]"></div>
    </div>
  );
}
