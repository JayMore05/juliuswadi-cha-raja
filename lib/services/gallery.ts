import { supabase } from "@/lib/supabase/client";
import { v4 as uuid } from "uuid";

export async function uploadGallery(file: File, title: string) {
  const ext = file.name.split(".").pop();
  const filename = `${uuid()}.${ext}`;

  // Upload to Storage
  const { error: uploadError } = await supabase.storage
    .from("gallery")
    .upload(filename, file);

  if (uploadError) {
    console.error("Storage Upload Error:", uploadError);
    throw uploadError;
  }

  // Get Public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("gallery").getPublicUrl(filename);

  // Insert into Database
  const { data, error: dbError } = await supabase
    .from("gallery")
    .insert([
      {
        title,
        image_url: publicUrl,
        category: "General",
      },
    ])
    .select();

  console.log("Database Response:", data);

  if (dbError) {
    console.error("Database Error:", dbError);
    throw dbError;
  }

  return publicUrl;
}

export async function getGallery() {
  const { data, error } = await supabase
    .from("gallery")
    .select("*");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function deleteGallery(id: string) {
  await supabase.from("gallery").delete().eq("id", id);
}