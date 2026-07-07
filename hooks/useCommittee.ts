"use client";

import { useEffect, useState } from "react";
import {
  getMembers,
} from "@/lib/services/committee";
import { CommitteeMember } from "@/lib/types/committee";

export function useCommittee() {
  const [members, setMembers] = useState<
    CommitteeMember[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  async function refresh() {
    setLoading(true);

    try {
      const data = await getMembers();

      setMembers(data);
    } catch (error) {
      console.error(
        "Committee Error:",
        error
      );

      setMembers([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  return {
    members,
    loading,
    refresh,
  };
}