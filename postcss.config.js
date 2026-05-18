import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-lg w-full">
        <h1 className="text-4xl font-bold mb-4">Photo Scheduler</h1>
        <p className="mb-6 text-gray-600">Real Estate Photography Dashboard</p>
        <Link href="/photo-scheduler" className="inline-block bg-black text-white px-6 py-3 rounded-xl">
          Open Dashboard
        </Link>
      </div>
    </main>
  );
}
