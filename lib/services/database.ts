import { supabase } from "@/lib/supabase/client";

/**
 * Fetch all rows
 */
export async function getAll<T>(
  table: string,
  orderBy = "created_at",
  ascending = false
): Promise<T[]> {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .order(orderBy, { ascending });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return (data ?? []) as T[];
}

/**
 * Fetch one row
 */
export async function getOne<T>(
  table: string,
  column: string,
  value: string
): Promise<T | null> {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq(column, value)
    .maybeSingle();

  if (error) {
    console.error(error);
    return null;
  }

  return data as T;
}

/**
 * Insert
 */
export async function insert(
  table: string,
  values: Record<string, any>
) {
  const query = supabase
    .from(table)
    .insert([values])
    .select();

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

/**
 * Update
 */
export async function update(
  table: string,
  column: string,
  value: string,
  values: Record<string, any>
) {
  const query = supabase
    .from(table)
    .update(values)
    .eq(column, value)
    .select();

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

/**
 * Delete
 */
export async function remove(
  table: string,
  column: string,
  value: string
) {
  const { error } = await supabase
    .from(table)
    .delete()
    .eq(column, value);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return true;
}