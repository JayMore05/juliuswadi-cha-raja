export interface CommitteeMember {
  id: string;
  name: string;
  designation: string;
  phone: string | null;
  photo: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
}