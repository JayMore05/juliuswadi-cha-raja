export default function HeroParticles() {
  return (
    <>
      {/* Floating Orange Dots */}

      <div className="absolute left-[8%] top-[18%] h-4 w-4 rounded-full bg-orange-400 shadow-lg animate-pulse" />

      <div className="absolute left-[18%] top-[72%] h-3 w-3 rounded-full bg-orange-300 animate-ping" />

      <div className="absolute left-[42%] top-[28%] h-2 w-2 rounded-full bg-orange-500 animate-pulse" />

      <div className="absolute right-[20%] top-[12%] h-5 w-5 rounded-full bg-yellow-400 shadow-lg animate-bounce" />

      <div className="absolute right-[10%] top-[45%] h-3 w-3 rounded-full bg-orange-500 animate-pulse" />

      <div className="absolute right-[15%] bottom-[15%] h-4 w-4 rounded-full bg-yellow-300 animate-ping" />

      {/* Blur Orbs */}

      <div className="absolute left-[30%] top-[10%] h-20 w-20 rounded-full bg-orange-200/30 blur-3xl" />

      <div className="absolute right-[25%] bottom-[20%] h-24 w-24 rounded-full bg-yellow-200/40 blur-3xl" />

      {/* Decorative Squares */}

      <div className="absolute left-[14%] top-[52%] h-4 w-4 rotate-45 rounded-sm bg-orange-300/70" />

      <div className="absolute right-[32%] top-[68%] h-3 w-3 rotate-45 rounded-sm bg-orange-400/70" />

      {/* Small Rings */}

      <div className="absolute left-[55%] top-[15%] h-6 w-6 rounded-full border border-orange-300" />

      <div className="absolute right-[40%] bottom-[22%] h-5 w-5 rounded-full border border-yellow-300" />
    </>
  );
}