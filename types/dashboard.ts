export interface DashboardStats {
  totalGallery: number;
  totalUpdates: number;
  totalCommittee: number;
  totalDonations: number;

  recentGallery: {
    id: string;
    title: string;
    image_url: string;
  }[];

  recentUpdates: {
    id: string;
    title: string;
    description: string;
    created_at: string;
  }[];
}