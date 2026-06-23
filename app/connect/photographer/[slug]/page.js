const photographers = {
  kevan: {
    name: "Kevan",
    id: "e45a94ec-c733-49e7-8513-709202bf7652",
  },
  marcos: {
    name: "Marcos",
    id: "9dc6ee67-f9ca-4ae2-aa0d-9c4eb0bf11c2",
  },
  cauana: {
    name: "Cauana",
    id: "976e90b6-fa1b-4e06-be04-acf358273136",
  },
  rafael: {
    name: "Rafael",
    id: "32115936-cdc0-4b87-b58c-8d759d5f1fdd",
  },
};

export default async function PhotographerConnectPage({ params }) {
  const resolvedParams = await params;
  const slug = String(resolvedParams?.slug || "").toLowerCase();
  const photographer = photographers[slug];

  if (!photographer) {
    return (
      <main className="min-h-screen bg-[#f5f3ee] p-8 text-[#123e63]">
        <div className="mx-auto max-w-xl rounded-[34px] bg-white p-8 shadow-xl">
          <h1 className="text-3xl font-semibold">Photographer not found</h1>
          <p className="mt-3 text-sm text-[#46667b]">Please check the connection link.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f3ee] p-6 text-[#123e63]">
      <section className="w-full max-w-xl rounded-[40px] border border-[#d7e1e7] bg-white p-8 shadow-[0_20px_60px_rgba(18,62,99,0.12)]">
        <div className="rounded-[30px] bg-gradient-to-br from-[#123e63] to-[#2f7898] p-7 text-white">
          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#e7d39a]">Panorama</p>
          <h1 className="mt-3 text-[36px] font-semibold leading-tight">Connect your calendar</h1>
          <p className="mt-4 text-sm leading-relaxed text-white/75">
            Hi {photographer.name}, please connect the calendar you use for photoshoots.
          </p>
        </div>

        <div className="mt-7 grid gap-3">
          <a
            href={`/api/google/connect?photographerId=${photographer.id}`}
            className="block rounded-2xl bg-[#123e63] px-5 py-4 text-center text-sm font-bold text-white hover:bg-[#164d73]"
          >
            Connect Google Calendar
          </a>

          <a
            href={`/api/microsoft/connect?photographerId=${photographer.id}`}
            className="block rounded-2xl bg-[#2563eb] px-5 py-4 text-center text-sm font-bold text-white hover:bg-[#1d4ed8]"
          >
            Connect Microsoft Outlook
          </a>
        </div>
      </section>
    </main>
  );
}
