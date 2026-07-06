interface Props {
  title: string;
  description: string;
}

export default function EmptyState({
  title,
  description,
}: Props) {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
      <h3 className="text-2xl font-bold">{title}</h3>

      <p className="mt-3 text-gray-500">
        {description}
      </p>
    </div>
  );
}