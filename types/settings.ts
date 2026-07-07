export interface Settings {
  id: string;

  mandal_name: string;
  marathi_name: string;

  years: number;

  /* Hero */

  hero_title: string;

  hero_marathi_title: string;

  hero_subtitle: string;

  hero_image: string | null;

  /* Contact */

  phone: string;

  email: string;

  address: string;

  /* Donation */

  upi: string;

  gpay: string;

  qr_image: string | null;

  

/* Social */

instagram: string;

youtube: string;

twitter: string;

maps: string;
 
  /* Branding */

  logo: string | null;
}