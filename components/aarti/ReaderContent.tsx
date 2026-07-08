"use client";

interface Props {
  content: string;
}

export default function ReaderContent({
  content,
}: Props) {
  const verses = content
    .split("\n\n")
    .filter((verse) => verse.trim() !== "");

  return (
    <section className="relative bg-gradient-to-b from-[#FFF9F3] to-[#FFF3E2] py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-5 print:max-w-none print:px-0">

        <div
          className="
            overflow-hidden
            rounded-[36px]
            border-2
            border-orange-200
            ring-4
            ring-orange-100
            bg-[#FFFCF6]
            shadow-[0_20px_60px_rgba(0,0,0,0.08)]
          "
        >
          {/* Top Header */}

          <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 py-10">

            <div className="text-center">

              <div className="text-6xl">
                🪔
              </div>

              <p className="mt-4 text-lg font-semibold tracking-[4px] text-white">
                ॥ श्री गणेशाय नमः ॥
              </p>

            </div>

          </div>

          {/* Body */}

          <div className="relative px-6 py-14 lg:px-16">

            {/* Decorative Heading */}

            <div className="mb-14 text-center">

              <div className="flex items-center justify-center gap-4">

                <div className="h-px w-24 bg-orange-300" />

                <span className="text-3xl">
                  🪔
                </span>

                <div className="h-px w-24 bg-orange-300" />

              </div>

              <h2 className="mt-6 text-4xl font-bold text-[#5E120F]">
                श्री गणेश आरती
              </h2>

              <p className="mt-4 text-xl text-orange-500">
                ❀ ❀ ❀
              </p>

            </div>

            {/* Verses */}

            {verses.map((verse, index) => (

              <div
                key={index}
                className="mb-16"
              >

                {/* Verse Number */}

                <div className="mb-8 flex justify-center">

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-full
                      bg-orange-500
                      text-lg
                      font-bold
                      text-white
                      shadow-lg
                    "
                  >
                    {index + 1}
                  </div>

                </div>

                {/* Verse */}

                <div
                  className="
                    whitespace-pre-line
                    text-center
                    text-[30px]
                    font-medium
                    leading-[2.2]
                    tracking-wide
                    text-[#5E120F]
                  "
                >
                  {verse}
                </div>

                {/* Divider */}

                {index !== verses.length - 1 && (

                  <div className="mt-10 flex justify-center">

                    <div
                      className="
                        rounded-full
                        bg-orange-100
                        px-8
                        py-3
                        text-lg
                        text-orange-600
                      "
                    >
                      🪔 ─── 🌸 ─── 🪔
                    </div>

                  </div>

                )}

              </div>

            ))}

          </div>

          {/* Footer */}

          <div className="border-t border-orange-100 bg-orange-50 py-10">

            <div className="text-center">

              <div className="text-4xl">
                🌺
              </div>

              <p className="mt-4 text-2xl font-bold text-[#5E120F]">
                गणपती बाप्पा मोरया
              </p>

              <p className="mt-2 text-lg text-orange-600">
                मंगलमुर्ती मोरया
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}