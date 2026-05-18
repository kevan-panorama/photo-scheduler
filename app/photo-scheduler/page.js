"use client";

import { useMemo, useState } from "react";

const agents = [
  "Alejandro Romera PRRE",
  "Alex Clover",
  "Alfonso Muñoz",
  "Ash Rasoulian",
  "Beatrice Pittá",
  "Beatriz Garvayo",
  "Carolina Alaniz",
  "Christopher Clover",
  "David Montero",
  "Dominik Maroszek",
  "Eva Kiepel",
  "Evi Tinno",
  "Gonzalo Ruiz",
  "Johan Olson",
  "Jo Borda",
  "Jovita Vicuña",
  "Jules Franken",
  "Katinka Clover",
  "Kevan Martial",
  "Lindsey Medina PRRE",
  "Loli Vazquez",
  "Lorena Alaniz",
  "Luca Solari",
  "Marco Dalli",
  "Natividad Muñoz",
  "Samia Mohamdi",
  "Sarina Garber",
  "Sean Cannon",
  "Sian Luijke-Roskott",
  "Silvina Rigada",
  "Steve Barre",
  "Vanesa Mena",
  "Walter Fernandez",
];

const photographers = ["Marcos", "Cauana"];

const pipeline = [
  { key: "needs", label: "Needs Scheduling" },
  { key: "confirmed", label: "Confirmed" },
  { key: "scheduled", label: "Scheduled" },
  { key: "today", label: "Today" },
  { key: "editing", label: "Editing" },
  { key: "delivered", label: "Delivered" },
];

const initialShoots = [
  {
    id: 1,
    title: "Villa Nueva Andalucía",
    city: "Marbella",
    address: "Nueva Andalucía",
    status: "needs",
    date: "Unscheduled",
    time: "Pending",
    weather: "☀️ 24°",
    photographer: "Marcos",
    agent: "Kevan Martial",
  },
  {
    id: 2,
    title: "Penthouse Puente Romano",
    city: "Golden Mile",
    address: "Puente Romano",
    status: "confirmed",
    date: "Tue 21",
    time: "11:30",
    weather: "☀️ 24°",
    photographer: "Cauana",
    agent: "Alex Clover",
  },
  {
    id: 3,
    title: "Townhouse La Quinta",
    city: "Benahavís",
    address: "La Quinta",
    status: "scheduled",
    date: "Wed 22",
    time: "16:00",
    weather: "🌤️ 22°",
    photographer: "Marcos",
    agent: "Sarina Garber",
  },
];
export default function PhotoSchedulerPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedShoot, setSelectedShoot] = useState(initialShoots[0]);

  const stats = useMemo(() => {
    return {
      total: initialShoots.length,
      scheduled: initialShoots.filter((s) =>
        ["confirmed", "scheduled", "today"].includes(s.status)
      ).length,
      editing: initialShoots.filter((s) => s.status === "editing").length,
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#f5f3ee] text-[#15120f]">
      <div className="flex min-h-screen p-5">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <section className="flex-1 pl-5">
          <Topbar />

          {activeTab === "overview" && (
            <Overview
              stats={stats}
              selectedShoot={selectedShoot}
              setSelectedShoot={setSelectedShoot}
            />
          )}

          {activeTab === "pipeline" && (
            <Pipeline
              selectedShoot={selectedShoot}
              setSelectedShoot={setSelectedShoot}
            />
          )}

          {activeTab === "calendar" && <CalendarView />}

          {activeTab === "notes" && (
            <NotesView selectedShoot={selectedShoot} />
          )}
        </section>
      </div>
    </main>
  );
}
function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="w-[280px] shrink-0 rounded-[34px] border border-[#e8dfd2] bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
      <div className="rounded-[30px] bg-[#15120f] p-6 text-white">
        <p className="text-[10px] uppercase tracking-[0.35em] text-white/50">
          Panorama
        </p>

        <h1 className="mt-3 text-[38px] font-semibold leading-[1.05]">
          Photo Scheduler
        </h1>

        <p className="mt-4 text-sm leading-relaxed text-white/60">
          Shoot planning, photographer booking and production.
        </p>
      </div>

      <nav className="mt-8 space-y-2">
        {["overview", "pipeline", "calendar", "notes"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`w-full rounded-2xl px-4 py-3 text-left text-[15px] font-medium capitalize transition ${
              activeTab === tab
                ? "bg-[#15120f] text-white"
                : "text-[#6f6458] hover:bg-[#f5f3ee]"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      <div className="mt-8 rounded-[28px] border border-[#ebe2d8] bg-[#faf8f4] p-5">
        <p className="text-[15px] font-semibold">
          Google Calendar
        </p>

        <p className="mt-2 text-sm leading-relaxed text-[#85796d]">
          Photographer availability sync will appear here.
        </p>

        <button className="mt-5 w-full rounded-2xl bg-white px-4 py-3 text-sm font-medium shadow-sm">
          Connect calendar
        </button>
      </div>
    </aside>
  );
}

function Topbar() {
  return (
    <header className="mb-5 rounded-[34px] border border-[#e8dfd2] bg-white px-8 py-7 shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.32em] text-[#a39485]">
            Panorama Photography
          </p>

          <h2 className="mt-2 text-[58px] font-semibold tracking-[-0.04em]">
            Dashboard
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button className="rounded-2xl border border-[#e6ddd2] bg-[#faf8f4] px-5 py-3 text-sm font-medium text-[#5f554b]">
            This week
          </button>

          <button className="rounded-2xl bg-[#15120f] px-5 py-3 text-sm font-medium text-white shadow-lg shadow-black/10">
            New shoot
          </button>
        </div>
      </div>
    </header>
  );
}
function Overview({
  stats,
  selectedShoot,
  setSelectedShoot,
}) {
  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_390px]">
      <section className="space-y-5">
        <div className="grid grid-cols-3 gap-4">
          <StatCard
            title="Total shoots"
            value={stats.total}
            dark
          />

          <StatCard
            title="Scheduled"
            value={stats.scheduled}
          />

          <StatCard
            title="Editing"
            value={stats.editing}
          />
        </div>

        <div className="rounded-[34px] border border-[#e8dfd2] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-[34px] font-semibold tracking-[-0.03em]">
                Production Board
              </h3>

              <p className="mt-1 text-sm text-[#817567]">
                Drag-and-drop scheduling workspace.
              </p>
            </div>

            <button className="rounded-2xl bg-[#f5f3ee] px-5 py-3 text-sm font-medium">
              Open pipeline
            </button>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {initialShoots.map((shoot) => (
              <ShootCard
                key={shoot.id}
                shoot={shoot}
                active={selectedShoot?.id === shoot.id}
                onClick={() => setSelectedShoot(shoot)}
              />
            ))}
          </div>
        </div>
      </section>

      <DetailsPanel shoot={selectedShoot} />
    </div>
  );
}
function ShootCard({ shoot, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-[30px] p-5 text-left transition ${
        active
          ? "bg-[#15120f] text-white"
          : "border border-[#e9dfd4] bg-[#faf8f4]"
      }`}
    >
      <div className="mb-5 h-28 rounded-[24px] bg-gradient-to-br from-[#d7cab9] to-[#f5f0ea]" />

      <h3 className="text-[25px] font-semibold leading-tight tracking-[-0.03em]">
        {shoot.title}
      </h3>

      <p className="mt-2 text-sm opacity-70">
        {shoot.city}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        <span className="rounded-full bg-[#f5f3ee] px-3 py-1 text-xs font-medium text-[#6c6054]">
          {shoot.date}
        </span>

        <span className="rounded-full bg-[#e7f0de] px-3 py-1 text-xs font-medium text-[#3f5635]">
          {shoot.weather}
        </span>
      </div>
    </button>
  );
}

function DetailsPanel({ shoot }) {
  return (
    <aside className="rounded-[34px] border border-[#e8dfd2] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
      <div className="h-52 rounded-[28px] bg-gradient-to-br from-[#ddd0bf] to-[#f7f2ec]" />

      <h3 className="mt-6 text-[40px] font-semibold leading-[1.05] tracking-[-0.04em]">
        {shoot.title}
      </h3>

      <p className="mt-2 text-sm text-[#7f7367]">
        {shoot.address}, {shoot.city}
      </p>

      <div className="mt-7 space-y-4">
        <InfoRow label="Agent" value={shoot.agent} />

        <InfoRow
          label="Photographer"
          value={shoot.photographer}
        />

        <InfoRow label="Date" value={shoot.date} />

        <InfoRow label="Time" value={shoot.time} />

        <InfoRow label="Weather" value={shoot.weather} />
      </div>

      <div className="mt-7">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[#786d62]">
            Assign Agent
          </span>

          <select className="w-full rounded-2xl border border-[#e7ddd2] bg-[#faf8f4] px-4 py-3 text-sm outline-none">
            {agents.map((agent) => (
              <option key={agent}>{agent}</option>
            ))}
          </select>
        </label>

        <label className="mt-4 block">
          <span className="mb-2 block text-sm font-medium text-[#786d62]">
            Assign Photographer
          </span>

          <select className="w-full rounded-2xl border border-[#e7ddd2] bg-[#faf8f4] px-4 py-3 text-sm outline-none">
            {photographers.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </label>
      </div>

      <button className="mt-7 w-full rounded-2xl bg-[#15120f] px-5 py-4 text-sm font-medium text-white">
        Open Shoot Details
      </button>
    </aside>
  );
}

function Pipeline() {
  return (
    <div className="rounded-[34px] border border-[#e8dfd2] bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
      <div className="flex gap-4 overflow-x-auto">
        {pipeline.map((column) => (
          <div
            key={column.key}
            className="min-h-[720px] min-w-[290px] rounded-[30px] bg-[#faf8f4] p-4"
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-[16px] font-semibold">
                {column.label}
              </h3>

              <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[#85796c]">
                {
                  initialShoots.filter(
                    (s) => s.status === column.key
                  ).length
                }
              </span>
            </div>

            <div className="space-y-3">
              {initialShoots
                .filter((s) => s.status === column.key)
                .map((shoot) => (
                  <ShootCard
                    key={shoot.id}
                    shoot={shoot}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CalendarView() {
  return (
    <div className="rounded-[34px] border border-[#e8dfd2] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-[36px] font-semibold tracking-[-0.03em]">
            Photographer Calendar
          </h3>

          <p className="mt-1 text-sm text-[#817567]">
            Google Calendar style booking system.
          </p>
        </div>

        <div className="flex gap-2">
          <button className="rounded-2xl bg-[#15120f] px-5 py-3 text-sm font-medium text-white">
            Week
          </button>

          <button className="rounded-2xl border border-[#e6ddd2] px-5 py-3 text-sm font-medium">
            Sync Google
          </button>
        </div>
      </div>

      <div className="mt-8 rounded-[30px] border border-[#ebe1d5] bg-[#faf8f4] p-10 text-center">
        <p className="text-[22px] font-medium">
          Calendar integration UI foundation
        </p>

        <p className="mt-2 text-sm text-[#817567]">
          Google Calendar sync and drag scheduling coming next.
        </p>
      </div>
    </div>
  );
}

function NotesView({ selectedShoot }) {
  return (
    <div className="grid gap-5 xl:grid-cols-[380px_1fr]">
      <div className="rounded-[34px] border border-[#e8dfd2] bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
        <h3 className="text-[28px] font-semibold tracking-[-0.03em]">
          Properties
        </h3>

        <div className="mt-5 space-y-3">
          {initialShoots.map((shoot) => (
            <button
              key={shoot.id}
              className={`w-full rounded-[28px] p-5 text-left ${
                selectedShoot?.id === shoot.id
                  ? "bg-[#15120f] text-white"
                  : "bg-[#faf8f4]"
              }`}
            >
              <p className="text-[20px] font-medium">
                {shoot.title}
              </p>

              <p className="mt-1 text-sm opacity-60">
                {shoot.city}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-[34px] border border-[#e8dfd2] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
        <h3 className="text-[40px] font-semibold tracking-[-0.04em]">
          {selectedShoot.title}
        </h3>

        <p className="mt-2 text-sm text-[#7e7367]">
          Internal production notes and confirmations.
        </p>

        <div className="mt-8 space-y-3">
          <Note
            author="Agent"
            text="Owner prefers late afternoon light."
          />

          <Note
            author="Photographer"
            text="Best slot is around 18:00 golden hour."
          />

          <Note
            author="Team"
            text="Drone shots depending on wind."
          />
        </div>

        <div className="mt-6 flex gap-3 rounded-[28px] bg-[#faf8f4] p-3">
          <input
            placeholder="Write an internal note..."
            className="flex-1 bg-transparent px-3 text-sm outline-none"
          />

          <button className="rounded-2xl bg-[#15120f] px-5 py-3 text-sm font-medium text-white">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

function Note({ author, text }) {
  return (
    <div className="rounded-[28px] bg-[#faf8f4] p-5">
      <p className="text-[16px] font-medium">
        {author}
      </p>

      <p className="mt-2 text-sm leading-relaxed text-[#5f554a]">
        {text}
      </p>
    </div>
  );
}

function StatCard({ title, value, dark }) {
  return (
    <div
      className={`rounded-[30px] p-6 ${
        dark
          ? "bg-[#15120f] text-white"
          : "border border-[#e8dfd2] bg-white"
      }`}
    >
      <p className="text-[54px] font-semibold tracking-[-0.05em]">
        {value}
      </p>

      <p
        className={`mt-2 text-[11px] uppercase tracking-[0.28em] ${
          dark
            ? "text-white/45"
            : "text-[#9d9081]"
        }`}
      >
        {title}
      </p>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-[#efe6dc] pb-3">
      <span className="text-sm font-medium text-[#8b7f73]">
        {label}
      </span>

      <span className="text-sm font-medium text-[#15120f]">
        {value}
      </span>
    </div>
  );
}
