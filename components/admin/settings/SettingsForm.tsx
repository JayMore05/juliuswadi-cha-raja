"use client";

import { SettingsProvider } from "./provider/SettingsProvider";

import GeneralCard from "./GeneralCard";
import HeroCard from "./HeroCard";
import ContactCard from "./ContactCard";
import DonationCard from "./DonationCard";
import SocialCard from "./SocialCard";
import BrandingCard from "./BrandingCard";

export default function SettingsForm() {
  return (
    <SettingsProvider>
      <div className="space-y-8">
        <GeneralCard />
        <HeroCard />
        <ContactCard />
        <DonationCard />
        <SocialCard />
        <BrandingCard />
      </div>
    </SettingsProvider>
  );
}