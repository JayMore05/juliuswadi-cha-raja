"use client";

import Image from "next/image";
import { toast } from "sonner";

import Button from "@/components/ui/Button";
import { CommitteeMember } from "@/types/committee";
import { deleteMember } from "@/lib/services/committee";

interface CommitteeCardProps {
  member: CommitteeMember;
  refresh: () => Promise<void>;
}

export default function CommitteeCard({
  member,
  refresh,
}: CommitteeCardProps) {
  async function handleDelete() {
    const confirmed = window.confirm(
      `Delete ${member.name}?`
    );

    if (!confirmed) return;

    try {
      await deleteMember(member.id);

      await refresh();

      toast.success(
        "Member deleted successfully."
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to delete member."
      );
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

      {member.photo && (
        <Image
          src={member.photo}
          alt={member.name}
          width={500}
          height={500}
          className="h-64 w-full object-cover"
        />
      )}

      <div className="space-y-3 p-5">

        <h3 className="text-xl font-bold">
          {member.name}
        </h3>

        <p className="text-orange-600 font-medium">
          {member.designation}
        </p>

        {member.phone && (
          <p className="text-gray-600">
            📞 {member.phone}
          </p>
        )}

        <div className="flex justify-between">

          <span
            className={`rounded-full px-3 py-1 text-sm ${
              member.is_active
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {member.is_active
              ? "Active"
              : "Inactive"}
          </span>

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