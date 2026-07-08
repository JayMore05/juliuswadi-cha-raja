export default function AartiSkeleton() {
  return (
    <div className="grid gap-6">

      {[1,2,3,4].map((item)=>(
        <div
          key={item}
          className="h-36 animate-pulse rounded-2xl bg-gray-200"
        />
      ))}

    </div>
  );
}