export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    </main>
  );
}
