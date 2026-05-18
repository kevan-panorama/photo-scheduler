import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-3xl shadow-xl text-center">
        <h1 className="text-4xl font-bold mb-4">
          Photo Scheduler
        </h1>

        <p className="text-gray-500 mb-6">
          Real Estate Photography Dashboard
        </p>

        <Link
          href="/photo-scheduler"
          className="bg-black text-white px-6 py-3 rounded-xl"
        >
          Open Dashboard
        </Link>
      </div>
    </main>
  );
}
