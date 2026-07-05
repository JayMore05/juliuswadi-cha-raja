import Image from "next/image";

const images = [
  "/images/ganpati.png",
  "/images/ganpati.png",
  "/images/ganpati.png",
  "/images/ganpati.png",
  "/images/ganpati.png",
  "/images/ganpati.png",
];

export default function GalleryPreview() {
  return (
    <section
      id="gallery"
      className="py-24 bg-gradient-to-b from-white to-orange-50"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center mb-14">

          <span className="rounded-full bg-orange-100 px-4 py-2 text-orange-600 font-semibold">
            📸 Memories
          </span>

          <h2 className="mt-5 text-5xl font-bold">
            Gallery
          </h2>

          <p className="mt-4 text-gray-600">
            Explore beautiful moments of Juliuswadi Cha Raja.
          </p>

        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {images.map((img, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-3xl shadow-lg group"
            >
              <Image
                src={img}
                alt="Gallery"
                width={600}
                height={600}
                className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
              />
            </div>
          ))}

        </div>

        <div className="mt-12 text-center">

          <button className="rounded-full bg-orange-600 px-8 py-4 font-semibold text-white hover:bg-orange-700 transition">
            View Full Gallery
          </button>

        </div>

      </div>
    </section>
  );
}