"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ImageIcon,
  BellRing,
  Users,
  Heart,
} from "lucide-react";

const actions = [
  {
    title: "Gallery",
    subtitle: "Festival Memories",
    icon: ImageIcon,
    href: "/gallery",
    color: "from-orange-500 to-orange-600",
  },
  {
    title: "Updates",
    subtitle: "Latest News",
    icon: BellRing,
    href: "/updates",
    color: "from-amber-500 to-orange-500",
  },
  {
    title: "Committee",
    subtitle: "Meet Our Team",
    icon: Users,
    href: "/committee",
    color: "from-orange-600 to-red-500",
  },
  {
    title: "Donate",
    subtitle: "Support Mandal",
    icon: Heart,
    href: "/donation",
    color: "from-red-500 to-orange-500",
  },
];

export default function QuickActions() {
  return (
    <section className="bg-[#FFF8F2] py-12 sm:py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">

        <div
          className="
            grid
            grid-cols-2
            gap-4

            md:grid-cols-4
            lg:gap-6
          "
        >
          {actions.map((action, index) => {
            const Icon = action.icon;

            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Link
                  href={action.href}
                  className="
                    group
                    flex
                    flex-col
                    items-center
                    rounded-3xl
                    border
                    border-orange-100
                    bg-white
                    p-5
                    text-center
                    shadow-lg
                    transition-all
                    duration-300

                    hover:-translate-y-2
                    hover:shadow-2xl

                    lg:p-8
                  "
                >
                  <div
                    className={`
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-full
                      bg-gradient-to-r
                      ${action.color}
                      text-white
                      shadow-lg

                      lg:h-20
                      lg:w-20
                    `}
                  >
                    <Icon size={30} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-[#5E120F] lg:text-xl">
                    {action.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500 lg:text-base">
                    {action.subtitle}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}