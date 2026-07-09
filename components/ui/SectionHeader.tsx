interface Props {
  badge?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  center = true,
}: Props) {
  return (
    <div
      className={`mb-14 ${
        center ? "text-center" : "text-left"
      }`}
    >
      {badge && (
        <div
          className={`
            inline-flex
            items-center
            rounded-full
            border
            border-orange-200
            bg-orange-100
            px-5
            py-2
            font-semibold
            text-orange-700
          `}
        >
          {badge}
        </div>
      )}

      <h2
        className="
          mt-5
          text-4xl
          font-bold
          tracking-tight
          text-[#5E120F]
          sm:text-5xl
        "
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className="
            mx-auto
            mt-5
            max-w-3xl
            text-lg
            leading-8
            text-slate-600
          "
        >
          {subtitle}
        </p>
      )}

      <div className="mt-8 flex justify-center">

        <div className="flex items-center gap-3">

          <div className="h-px w-16 bg-orange-300" />

          <span className="text-xl">
            🪔
          </span>

          <div className="h-px w-16 bg-orange-300" />

        </div>

      </div>

    </div>
  );
}