"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { useCommittee } from "@/hooks/useCommittee";

import CommitteeCard from "./CommitteeCard";
import CommitteeEmpty from "./CommitteeEmpty";
import CommitteeSkeleton from "./CommitteeSkeleton";

export default function CommitteeGrid() {
  const { members, loading } = useCommittee();

  if (loading) {
    return <CommitteeSkeleton />;
  }

  const activeMembers = members
    .filter((member) => member.is_active)
    .sort((a, b) => a.display_order - b.display_order);

  if (activeMembers.length === 0) {
    return <CommitteeEmpty />;
  }

  const featuredMembers = activeMembers.slice(0, 4);

  return (
    <>
      {/* Grid */}

      <div
        className="
          grid

          gap-6

          grid-cols-1

          sm:grid-cols-2

          xl:grid-cols-4

          lg:gap-8
        "
      >
        {featuredMembers.map((member) => (
          <CommitteeCard
            key={member.id}
            member={member}
          />
        ))}
      </div>

      {/* Button */}

      <div
        className="
          mt-10

          flex
          justify-center

          lg:mt-12
        "
      >
        <Link
          href="/committee"
          className="
            inline-flex
            items-center
            justify-center
            gap-2

            rounded-full

            bg-gradient-to-r
            from-orange-500
            to-orange-600

            px-7
            py-3

            text-sm
            font-semibold

            text-white

            shadow-lg

            transition
            duration-300

            hover:scale-105
            hover:shadow-xl

            sm:px-8
            sm:py-4
            sm:text-lg
          "
        >
          View Full Committee

          <ArrowRight size={20} />
        </Link>
      </div>
    </>
  );
}