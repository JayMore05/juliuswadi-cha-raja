import { supabase } from "@/lib/supabase/client";
import { v4 as uuid } from "uuid";

export async function addUpdate(
  title: string,
  description: string,
  file?: File
) {
  let imageUrl: string | null = null;

  // Upload image (optional)
  if (file) {
    const ext = file.name.split(".").pop();
    const filename = `${uuid()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("updates")
      .upload(filename, file);

    if (uploadError) {
      console.error(uploadError);
      throw new Error(uploadError.message);
    }

    imageUrl = supabase.storage
      .from("updates")
      .getPublicUrl(filename)
      .data.publicUrl;
  }

  // Save into database
  const { data, error } = await supabase
    .from("updates")
    .insert([
      {
        title,
        description,
        image_url: imageUrl,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function getUpdates() {
  const { data, error } = await supabase
    .from("updates")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function deleteUpdate(id: string) {
  const { error } = await supabase
    .from("updates")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
}