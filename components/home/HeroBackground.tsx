export default function HeroBackground() {
  return (
    <>
      {/* Main Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF8F0] via-white to-orange-50" />

      {/* Left Decorative Mandala */}
      <div className="absolute -left-44 top-10 h-[700px] w-[700px] rounded-full border border-orange-200/40 opacity-70" />

      <div className="absolute -left-32 top-20 h-[550px] w-[550px] rounded-full border border-orange-100/70" />

      {/* Giant Orange Glow */}
      <div className="absolute left-0 top-0 h-[700px] w-[700px] rounded-full bg-orange-200/30 blur-[150px]" />

      {/* Right Golden Glow */}
      <div className="absolute right-0 top-0 h-[900px] w-[900px] rounded-full bg-yellow-200/30 blur-[180px]" />

      {/* Decorative Gradient */}
      <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-orange-100/40 via-orange-50/20 to-transparent" />

      {/* Dotted Pattern */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(#EA580C 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-[#FFF8F2] to-transparent" />
    </>
  );
}