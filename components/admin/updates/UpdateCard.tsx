import Image from "next/image";
import { UpdateItem } from "@/types/update";

export default function UpdateCard({
  update,
}: {
  update: UpdateItem;
}) {
  return (
    <div className="rounded-2xl bg-white shadow overflow-hidden">
      {update.image_url && (
        <Image
          src={update.image_url}
          width={600}
          height={400}
          alt={update.title}
          className="w-full h-60 object-cover"
        />
      )}

      <div className="p-5">
        <h3 className="text-xl font-bold">
          {update.title}
        </h3>

        <p className="text-gray-600 mt-3">
          {update.description}
        </p>
      </div>
    </div>
  );
}