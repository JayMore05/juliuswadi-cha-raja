import Link from "next/link";

interface Props {
  title: string;
  href: string;
}

export default function QuickAction({
  title,
  href,
}: Props) {
  return (
    <Link
      href={href}
      className="rounded-xl bg-orange-600 px-5 py-4 text-white font-semibold hover:bg-orange-700 transition"
    >
      {title}
    </Link>
  );
}