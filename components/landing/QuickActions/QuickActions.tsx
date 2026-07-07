"use client";

import Link from "next/link";
import {
  Camera,
  Bell,
  HeartHandshake,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";

const actions = [
  {
    title: "Gallery",
    icon: Camera,
    href: "/gallery",
    color: "from-orange-500 to-orange-600",
  },
  {
    title: "Updates",
    icon: Bell,
    href: "/updates",
    color: "from-yellow-500 to-orange-500",
  },
  {
    title: "Donate",
    icon: HeartHandshake,
    href: "/donation",
    color: "from-red-500 to-orange-500",
  },
  {
    title: "Visit",
    icon: MapPin,
    href: "/contact",
    color: "from-amber-500 to-yellow-500",
  },
];

export default function QuickActions() {
  return (
    <section className="relative -mt-10 z-30 pb-20 px-5">

      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-4">

        {actions.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.15,
              }}
            >
              <Link
                href={item.href}
                className="
                  group
                  relative
                  block
                  overflow-hidden
                  rounded-3xl
                  bg-white/90
                  p-8
                  shadow-xl
                  backdrop-blur-xl
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:shadow-2xl
                "
              >
                <div
                  className={`
                    mb-6
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    ${item.color}
                    text-white
                  `}
                >
                  <Icon size={30} />
                </div>

                <h3 className="text-2xl font-bold text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-2 text-gray-500">
                  Explore {item.title}
                </p>

                <div
                  className="
                    absolute
                    inset-0
                    opacity-0
                    transition
                    duration-500
                    group-hover:opacity-100
                    bg-gradient-to-br
                    from-orange-100/30
                    to-transparent
                  "
                />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}