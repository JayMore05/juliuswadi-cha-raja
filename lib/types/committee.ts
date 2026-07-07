export interface CommitteeMember {
  id: string;
  created_at: string;

  name: string;
  designation: string;
  phone: string;

  photo: string | null;

  display_order: number;
  is_active: boolean;
}