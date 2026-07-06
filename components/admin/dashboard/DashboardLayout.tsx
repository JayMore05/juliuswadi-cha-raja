"use client";

import DashboardHeader from "./DashboardHeader";
import StatsCard from "./StatsCard";
import QuickActions from "./QuickActions";
import RecentGallery from "./RecentGallery";
import RecentUpdates from "./RecentUpdates";

export default function DashboardLayout() {
  return (
    <div className="space-y-8">
      <DashboardHeader />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Gallery Images"
          value="0"
          icon="📸"
          color="bg-orange-100"
        />

        <StatsCard
          title="Updates"
          value="0"
          icon="📰"
          color="bg-blue-100"
        />

        <StatsCard
          title="Committee"
          value="0"
          icon="👥"
          color="bg-green-100"
        />

        <StatsCard
          title="Donations"
          value="₹0"
          icon="💰"
          color="bg-yellow-100"
        />
      </div>

      <QuickActions />

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentUpdates />
        <RecentGallery />
      </div>
    </div>
  );
}