export default function Loading() {
  return (
    <div className="p-8">
      <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-4" />
      <div className="space-y-3">
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
}
