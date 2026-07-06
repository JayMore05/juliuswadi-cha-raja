export interface Settings {
  id: string;

  mandal_name: string;
  marathi_name: string;
  years: number;

  hero_title: string;
  hero_subtitle: string;
  hero_image: string | null;

  phone: string;
  email: string;
  address: string;

  upi: string;
  gpay: string;
  qr_image: string | null;

  instagram: string;
  youtube: string;
  maps: string;

  logo: string | null;
}