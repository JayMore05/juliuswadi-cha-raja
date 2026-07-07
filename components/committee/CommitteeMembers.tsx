"use client";

import { useCommittee } from "@/hooks/useCommittee";
import CommitteeCard from "@/components/landing/Committee/CommitteeCard";
import CommitteeSkeleton from "@/components/landing/Committee/CommitteeSkeleton";
import CommitteeEmpty from "@/components/landing/Committee/CommitteeEmpty";

export default function CommitteeMembers() {
  const { members, loading } = useCommittee();

  if (loading) {
    return (
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <CommitteeSkeleton />
        </div>
      </section>
    );
  }

  const activeMembers = members
    .filter((member) => member.is_active)
    .sort((a, b) => a.display_order - b.display_order);

  if (activeMembers.length === 0) {
    return (
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <CommitteeEmpty />
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">

        {/* Heading */}

        <div className="mb-14 text-center">

          <span className="rounded-full bg-orange-100 px-5 py-2 font-semibold text-orange-600">
            Our Team
          </span>

          <h2 className="mt-5 font-heading text-3xl font-bold text-[#5E120F] sm:text-4xl lg:text-5xl">
            Dedicated Committee Members
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-slate-600">
            Every successful Ganesh Festival is made possible by our
            hardworking committee members who dedicate their time,
            devotion and efforts throughout the year.
          </p>

        </div>

        {/* Members */}

        <div
          className="
            grid
            gap-8

            sm:grid-cols-2

            lg:grid-cols-3

            xl:grid-cols-4
          "
        >
          {activeMembers.map((member) => (
            <CommitteeCard
              key={member.id}
              member={member}
            />
          ))}
        </div>

      </div>
    </section>
  );
}