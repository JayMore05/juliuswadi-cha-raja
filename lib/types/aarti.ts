export interface AartiPage {
  id: string;
  created_at: string;
  updated_at: string;

  title: string;
  slug: string;

  category: string;
  language: string;

  content: string;

  display_order: number;

  is_active: boolean;
}