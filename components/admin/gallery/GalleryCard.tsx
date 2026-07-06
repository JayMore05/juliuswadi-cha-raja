import Image from "next/image";

interface Props {
  image: any;
}

export default function GalleryCard({ image }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md border">

      <Image
        src={image.image_url}
        alt={image.title}
        width={400}
        height={300}
        className="h-60 w-full object-cover"
      />

      <div className="p-4">

        <h2 className="font-semibold">
          {image.title}
        </h2>

      </div>

    </div>
  );
}