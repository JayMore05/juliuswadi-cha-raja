import { redirect } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/admin/login");
  }

  return <AdminLayout>{children}</AdminLayout>;
}