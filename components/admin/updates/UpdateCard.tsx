"use client";

import Image from "next/image";
import { toast } from "sonner";

import { UpdateItem } from "@/types/update";
import { deleteUpdate } from "@/lib/services/updates";
import Button from "@/components/ui/Button";

interface UpdateCardProps {
  update: UpdateItem;
  refresh: () => Promise<void>;
}

export default function UpdateCard({
  update,
  refresh,
}: UpdateCardProps) {
  async function handleDelete() {
    const confirmed = window.confirm(
      "Delete this update?"
    );

    if (!confirmed) return;

    try {
      await deleteUpdate(update.id);

      await refresh();

      toast.success("Update deleted successfully.");
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete update.");
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      {update.image_url && (
        <Image
          src={update.image_url}
          alt={update.title}
          width={800}
          height={500}
          className="h-60 w-full object-cover"
        />
      )}

      <div className="space-y-4 p-5">
        <h3 className="text-xl font-bold">
          {update.title}
        </h3>

        <p className="text-gray-600">
          {update.description}
        </p>

        <div className="flex justify-end">
          <Button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}