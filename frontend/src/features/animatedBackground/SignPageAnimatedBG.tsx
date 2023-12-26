export function SignPageAnimatedBG() {
  return (
    <div className="overflow-hidden fixed inset-0 -z-50 w-screen hidden sm:block">
      <img
        src="/image/BG.svg"
        className="object-cover bg-animate-blur scale-110 select-none pointer-events-none h-full w-screen opacity-50"
        title="LinkMart"
      />
    </div>
  );
}
