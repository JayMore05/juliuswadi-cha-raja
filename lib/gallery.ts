import { supabase } from "@/lib/supabase/client";
import { v4 as uuid } from "uuid";

export async function uploadGalleryImage(file: File, title: string) {
  const extension = file.name.split(".").pop();
  const filename = `${uuid()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from("gallery")
    .upload(filename, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from("gallery")
    .getPublicUrl(filename);

  const imageUrl = data.publicUrl;

  const { error: dbError } = await supabase
    .from("gallery")
    .insert({
      image_url: imageUrl,
      title,
      category: "general",
    });

  if (dbError) throw dbError;

  return imageUrl;
}