"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, UserRound } from "lucide-react";
import { motion } from "framer-motion";

import GlassCard from "@/components/ui/GlassCard";
import { CommitteeMember } from "@/lib/types/committee";

interface CommitteeCardProps {
  member: CommitteeMember;
}

export default function CommitteeCard({
  member,
}: CommitteeCardProps) {
  return (
    <GlassCard className="group h-full">
      <div
        className="
          flex
          flex-col
          items-center

          p-6

          lg:p-8
        "
      >
        {/* Photo */}

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="
            relative

            h-28
            w-28

            overflow-hidden
            rounded-full

            border-4
            border-orange-200

            shadow-lg

            sm:h-32
            sm:w-32

            lg:h-36
            lg:w-36
          "
        >
          {member.photo ? (
            <Image
              src={member.photo}
              alt={member.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-orange-100">
              <UserRound
                size={50}
                className="text-orange-500 lg:h-[60px] lg:w-[60px]"
              />
            </div>
          )}
        </motion.div>

        {/* Designation */}

        <span
          className="
            mt-5

            rounded-full
            bg-orange-100

            px-3
            py-1

            text-xs
            font-semibold

            text-orange-600

            sm:px-4
            sm:text-sm

            lg:mt-6
          "
        >
          {member.designation}
        </span>

        {/* Name */}

        <h3
          className="
            mt-4

            text-center

            text-xl

            font-bold

            text-[#5E120F]

            lg:text-2xl
          "
        >
          {member.name}
        </h3>

        {/* Phone */}

        <Link
          href={`tel:${member.phone}`}
          className="
            mt-5

            inline-flex
            items-center
            justify-center
            gap-2

            rounded-full

            bg-gradient-to-r
            from-orange-500
            to-orange-600

            px-5
            py-3

            text-sm
            font-medium

            text-white

            transition

            hover:scale-105

            lg:mt-6
            lg:text-base
          "
        >
          <Phone size={18} />

          {member.phone}
        </Link>
      </div>
    </GlassCard>
  );
}