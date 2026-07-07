"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { name: "Home", href: "/" },
  { name: "Gallery", href: "/gallery" },
  { name: "Updates", href: "/updates" },
  { name: "Committee", href: "/committee" },
  { name: "Donation", href: "/donation" },
  { name: "Contact", href: "/contact" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          border
          border-orange-200
          bg-orange-50
          transition
          hover:bg-orange-100
          lg:hidden
        "
      >
        <Menu size={24} className="text-orange-600" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            />

            {/* Drawer */}

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 28,
              }}
              className="
                fixed
                right-0
                top-0
                z-50
                flex
                h-screen
                w-[320px]
                max-w-full
                flex-col
                overflow-y-auto
                bg-white
                shadow-2xl
              "
            >
              {/* Header */}

              <div className="flex items-center justify-between bg-gradient-to-r from-orange-500 to-amber-500 p-6 text-white">

                <div>
                  <h2 className="text-xl font-bold">
                    Juliuswadi Cha Raja
                  </h2>

                  <p className="mt-1 text-sm text-orange-100">
                    गणपती बाप्पा मोरया
                  </p>
                </div>

                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-white/20 p-2"
                >
                  <X size={24} />
                </button>

              </div>

              {/* Links */}

              <nav className="flex flex-col px-6 py-8">

                {links.map((link) => {
                  const active = pathname === link.href;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`
                        rounded-xl
                        px-5
                        py-4
                        text-lg
                        font-semibold
                        transition-all
                        duration-300

                        ${
                          active
                            ? "bg-orange-100 text-orange-600"
                            : "text-slate-700 hover:bg-orange-50 hover:text-orange-600"
                        }
                      `}
                    >
                      {link.name}
                    </Link>
                  );
                })}

              </nav>

              {/* Bottom */}

              <div className="mt-auto border-t bg-orange-50 p-6">

                <Link
                  href="/donation"
                  onClick={() => setOpen(false)}
                  className="
                    flex
                    justify-center
                    rounded-full
                    bg-gradient-to-r
                    from-orange-500
                    to-orange-600
                    px-6
                    py-4
                    font-semibold
                    text-white
                    shadow-lg
                  "
                >
                  ❤️ Donate Now
                </Link>

              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}