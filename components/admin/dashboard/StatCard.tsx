interface Props {
  title: string;
  value: string | number;
  color?: string;
}

export default function StatCard({
  title,
  value,
  color = "bg-orange-500",
}: Props) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md border">
      <div
        className={`w-12 h-12 rounded-xl ${color} mb-4`}
      />

      <p className="text-gray-500">{title}</p>

      <h2 className="mt-2 text-4xl font-bold">
        {value}
      </h2>
    </div>
  );
}