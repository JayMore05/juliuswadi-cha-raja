"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { addUpdate } from "@/lib/services/updates";

interface UpdateFormProps {
  onSuccess: () => Promise<void>;
}

export default function UpdateForm({
  onSuccess,
}: UpdateFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a title.");
      return;
    }

    if (!description.trim()) {
      alert("Please enter a description.");
      return;
    }

    try {
      setLoading(true);

      await addUpdate(
        title,
        description,
        file
      );

      setTitle("");
      setDescription("");
      setFile(undefined);

      const input = document.getElementById(
        "update-image"
      ) as HTMLInputElement | null;

      if (input) {
        input.value = "";
      }

      await onSuccess();

      document
        .getElementById("updates-grid")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

      alert("✅ Update Published Successfully!");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to publish update.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border bg-white p-8 shadow"
    >
      <h2 className="text-3xl font-bold">
        Publish New Update
      </h2>

      <Input
        placeholder="Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <Textarea
        rows={6}
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <input
        id="update-image"
        type="file"
        accept="image/*"
        onChange={(e) =>
          setFile(e.target.files?.[0])
        }
      />

      <Button
        type="submit"
        loading={loading}
      >
        Publish Update
      </Button>
    </form>
  );
}