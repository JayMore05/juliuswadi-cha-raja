import { supabase } from "@/lib/supabase/client";
import { v4 as uuid } from "uuid";

export async function uploadImage(
  file: File,
  bucket: string
): Promise<string> {
  const extension = file.name.split(".").pop();

  const filename = `${uuid()}.${extension}`;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(filename, file);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  const {
    data: { publicUrl },
  } = supabase.storage
    .from(bucket)
    .getPublicUrl(filename);

  return publicUrl;
}