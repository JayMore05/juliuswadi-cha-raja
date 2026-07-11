import { createClient } from "@supabase/supabase-js";

export function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  return createClient(url, key);
}

export async function createDonor(
  donor_name: string,
  phone: string
) {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("donors")
    .insert({
      donor_name,
      phone,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
} 