"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Gallery",
    href: "/gallery",
  },
  {
    name: "Updates",
    href: "/updates",
  },
  {
    name: "Donation",
    href: "/donation",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex items-center gap-12">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`
            relative
            font-semibold
            transition-all
            duration-300

            ${
              pathname === link.href
                ? "text-orange-600"
                : "text-gray-800 hover:text-orange-500"
            }
          `}
        >
          {link.name}

          {pathname === link.href && (
            <span
              className="
                absolute
                -bottom-2
                left-0
                h-[3px]
                w-full
                rounded-full
                bg-orange-500
              "
            />
          )}
        </Link>
      ))}
    </nav>
  );
}