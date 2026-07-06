interface Props {
  title: string;
  description: string;
}

export default function ComingSoon({
  title,
  description,
}: Props) {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <div className="mb-6 text-6xl">🚧</div>

        <h1 className="text-4xl font-bold text-orange-600">
          {title}
        </h1>

        <p className="mt-4 text-gray-600">
          {description}
        </p>
      </div>
    </main>
  );
}