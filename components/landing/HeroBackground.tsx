export default function HeroBackground() {
  return (
    <>
      {/* Main Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF7ED] via-white to-orange-50" />

      {/* Orange Glow */}
      <div className="absolute -left-32 top-0 h-[750px] w-[750px] rounded-full bg-orange-300/25 blur-[180px]" />

      {/* Gold Glow */}
      <div className="absolute right-0 top-0 h-[900px] w-[900px] rounded-full bg-yellow-200/30 blur-[180px]" />

      {/* Decorative Rings */}

      <div className="absolute -left-48 top-10 h-[700px] w-[700px] rounded-full border border-orange-200/40" />

      <div className="absolute -left-24 top-32 h-[520px] w-[520px] rounded-full border border-orange-100" />

      {/* Pattern */}

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(#EA580C 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Bottom Gradient */}

      <div className="absolute bottom-0 left-0 h-56 w-full bg-gradient-to-t from-[#FFF8F2] to-transparent" />
    </>
  );
}