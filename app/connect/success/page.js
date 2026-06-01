export default function ConnectSuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f3ee] p-6 text-[#123e63]">
      <section className="max-w-xl rounded-[40px] bg-white p-8 text-center shadow-xl">
        <h1 className="text-4xl font-semibold">Calendar connected</h1>
        <p className="mt-4 text-sm text-[#46667b]">
          Thank you. Panorama can now use this calendar for scheduling.
        </p>
      </section>
    </main>
  );
}
