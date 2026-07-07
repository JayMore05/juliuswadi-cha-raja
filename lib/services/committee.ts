import { uploadImage } from "@/lib/services/upload";
import { BUCKETS } from "@/lib/constants/buckets";
import { CommitteeMember } from "@/lib/types/committee";

export async function getMembers(): Promise<
  CommitteeMember[]
> {
  const res = await fetch("/api/committee", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load committee.");
  }

  return await res.json();
}

export async function addMember(
  name: string,
  designation: string,
  phone: string,
  displayOrder: number,
  isActive: boolean,
  file?: File
) {
  let photo: string | null = null;

  if (file) {
    photo = await uploadImage(
      file,
      BUCKETS.COMMITTEE
    );
  }

  const res = await fetch("/api/committee", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      designation,
      phone,
      photo,
      display_order: displayOrder,
      is_active: isActive,
    }),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(
      json.error || "Failed to add member."
    );
  }

  return json;
}

export async function updateMember(
  id: string,
  values: Partial<CommitteeMember>
) {
  const res = await fetch("/api/committee", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      ...values,
    }),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(
      json.error || "Failed to update member."
    );
  }

  return json;
}

export async function deleteMember(
  id: string
) {
  const res = await fetch("/api/committee", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
    }),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(
      json.error || "Failed to delete member."
    );
  }

  return json;
}