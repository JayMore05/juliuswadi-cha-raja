"use client";

import CommitteeCard from "./CommitteeCard";
import { useCommittee } from "@/hooks/useCommittee";

export default function CommitteeGrid() {
  const {
    members,
    loading,
    refresh,
  } = useCommittee();

  if (loading) {
    return (
      <div className="rounded-2xl border bg-white p-8 shadow">
        Loading committee members...
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="rounded-2xl border bg-white p-8 shadow">
        No committee members found.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {members.map((member) => (
        <CommitteeCard
          key={member.id}
          member={member}
          refresh={refresh}
        />
      ))}
    </div>
  );
}