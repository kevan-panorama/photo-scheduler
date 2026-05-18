"use client";

import { useMemo, useState } from "react";

const pipeline = [
  { key: "needs", label: "Needs Scheduling" },
  { key: "confirmed", label: "Confirmed" },
  { key: "scheduled", label: "Scheduled" },
  { key: "today", label: "Shooting Today" },
  { key: "editing", label: "Editing" },
  { key: "delivered", label: "Delivered" },
];

const shoots = [
  {
    id: 1,
    title: "Villa in Nueva Andalucía",
    address: "Calle Los Jazmines 18",
    city: "Marbella",
    agent: "Kevan Martial",
    photographer: "Main Photographer",
    status: "needs",
    time: "Not booked",
    date: "Unscheduled",
    weather: "Pending",
    priority: "High",
  },
  {
    id: 2,
    title: "Penthouse Puente Romano",
    address: "Golden Mile",
    city: "Marbella",
    agent: "Alex Clover",
    photographer: "Main Photographer",
    status: "confirmed",
    time: "11:30",
    date: "Tue 21",
    weather: "☀️ 24°",
    priority: "Normal",
  },
  {
    id: 3,
    title: "Townhouse La Quinta",
    address: "La Quinta Golf",
    city: "Benahavís",
    agent: "Sarina Garber",
    photographer: "Main Photographer",
    status: "scheduled",
    time: "16:00",
    date: "Wed 22",
    weather: "🌤️ 22°",
    priority: "Normal",
  },
  {
    id: 4,
    title: "Apartment Puerto Banús",
    address: "Marina Banús",
    city: "Marbella",
    agent: "Lindsey Medina",
    photographer: "Main Photographer",
    status: "today",
    time: "18:30",
    date: "Today",
    weather: "☀️ 25°",
    priority: "Urgent",
  },
  {
    id: 5,
    title: "Villa El Madroñal",
    address: "Gate 4",
    city: "Benahavís",
    agent: "Johan Olson",
    photographer: "Main Photographer",
    status: "editing",
    time: "Completed",
    date: "Yesterday",
    weather: "Done",
    priority: "Normal",
  },
];

const calendarDays = [
  {
    day: "Mon",
    date: "20",
    events: [
      { time: "09:30", title: "Availability block", type: "available" },
      { time: "14:00", title: "Editing / delivery", type: "busy" },
    ],
  },
  {
    day: "Tue",
    date: "21",
    events: [{ time: "11:30", title: "Penthouse Puente Romano", type: "shoot" }],
  },
  {
    day: "Wed",
    date: "22",
    events: [
      { time: "10:00", title: "Available", type: "available" },
      { time: "16:00", title: "Townhouse La Quinta", type: "shoot" },
    ],
  },
  {
    day: "Thu",
    date: "23",
    events: [{ time: "12:00", title: "Available", type: "available" }],
  },
  {
    day: "Fri",
    date: "24",
    events: [
      { time: "09:00", title: "Blocked by photographer", type: "busy" },
      { time: "18:30", title: "Golden hour slot", type: "available" },
    ],
  },
  {
    day: "Sat",
    date: "25",
    events: [{ time: "10:30", title: "Available", type: "available" }],
  },
  {
    day: "Sun",
    date: "26",
    events: [],
  },
];

export default function PhotoSchedulerPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedShoot, setSelectedShoot] = useState(shoots[3]);

  const stats = useMemo(
    () => ({
      total: shoots.length,
      needs: shoots.filter((s) => s.status === "needs").length,
      booked: shoots.filter((s) =>
        ["confirmed", "scheduled", "today"].includes(s.status)
      ).length,
      editing: shoots.filter((s) => s.status === "editing").length,
    }),
    []
  );

  return (
    <main className="min-h-screen bg-[#f5f3ee] text-[#15120f]">
      <div className="flex min-h-screen p-4 md:p-6">
        <aside className="hidden w-72 shrink-0 rounded-[32px] border border-[#e8dfd2] bg-white/75 p-5 shadow-[0_24px_80px_rgba(64,47,31,0.08)] backdrop-blur md:block">
          <div className="mb-8 rounded-[26px] bg-[#15120f] p-5 text-white">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-white/45">
              Panorama
            </p>
            <h1 className="mt-3 text-2xl font-black leading-tight">
              Photo Scheduler
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              Shoot planning, calendar bookings and production notes.
            </p>
          </div>

          <nav className="space-y-2">
            <SidebarButton active={activeTab === "overview"} onClick={() => setActiveTab("overview")}>
              Overview
            </SidebarButton>
            <SidebarButton active={activeTab === "pipeline"} onClick={() => setActiveTab("pipeline")}>
              Pipeline
            </SidebarButton>
            <SidebarButton active={activeTab === "calendar"} onClick={() => setActiveTab("calendar")}>
              Calendar
            </SidebarButton>
            <SidebarButton active={activeTab === "notes"} onClick={() => setActiveTab("notes")}>
              Notes
            </SidebarButton>
          </nav>

          <div className="mt-8 rounded-[26px] border border-[#ebe2d8] bg-[#faf8f4] p-4">
            <p className="text-sm font-black">Google Calendar</p>
            <p className="mt-1 text-xs leading-relaxed text-[#7b7064]">
              Photographer availability sync will connect here.
            </p>
            <button className="mt-4 w-full rounded-2xl bg-white px-4 py-3 text-sm font-black shadow-sm">
              Connect calendar
            </button>
          </div>
        </aside>

        <section className="flex-1 md:pl-6">
          <TopBar activeTab={activeTab} setActiveTab={setActiveTab} />

          {activeTab === "overview" && (
            <Overview
              stats={stats}
              selectedShoot={selectedShoot}
              setSelectedShoot={setSelectedShoot}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === "pipeline" && (
            <Pipeline selectedShoot={selectedShoot} setSelectedShoot={setSelectedShoot} />
          )}

          {activeTab === "calendar" && <Calendar />}

          {activeTab === "notes" && <Notes selectedShoot={selectedShoot} />}
        </section>
      </div>
    </main>
  );
}

function TopBar({ activeTab, setActiveTab }) {
  return (
    <header className="mb-5 rounded-[32px] border border-[#e8dfd2] bg-white/80 p-5 shadow-[0_24px_80px_rgba(64,47,31,0.08)] backdrop-blur">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-[#9a8f82]">
            Visual Operations Workspace
          </p>
          <h2 className="mt-2 text-3xl font-black capitalize tracking-tight md:text-5xl">
            {activeTab}
          </h2>
        </div>

        <div className="flex flex-wrap gap-2 md:hidden">
          {["overview", "pipeline", "calendar", "notes"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-2xl px-4 py-2 text-sm font-black capitalize ${
                activeTab === tab
                  ? "bg-[#15120f] text-white"
                  : "bg-[#f5f3ee] text-[#62584e]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button className="rounded-2xl border border-[#e5d9ca] bg-[#faf8f4] px-5 py-3 text-sm font-black text-[#5f554a]">
            This week
          </button>
          <button className="rounded-2xl bg-[#15120f] px-5 py-3 text-sm font-black text-white shadow-lg shadow-black/10">
            New shoot
          </button>
        </div>
      </div>
    </header>
  );
}

function Overview({ stats, selectedShoot, setSelectedShoot, setActiveTab }) {
  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_390px]">
      <section className="space-y-5">
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard label="Total shoots" value={stats.total} tone="dark" />
          <StatCard label="Needs scheduling" value={stats.needs} />
          <StatCard label="Booked" value={stats.booked} />
          <StatCard label="Editing" value={stats.editing} />
        </div>

        <div className="rounded-[32px] border border-[#e8dfd2] bg-white p-5 shadow-[0_24px_80px_rgba(64,47,31,0.08)]">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-black">Today’s production board</h3>
              <p className="mt-1 text-sm text-[#7b7064]">
                A Canva-style workspace for moving shoots through the process.
              </p>
            </div>
            <button
              onClick={() => setActiveTab("pipeline")}
              className="rounded-2xl bg-[#f5f3ee] px-4 py-3 text-sm font-black"
            >
              Open board
            </button>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {shoots.slice(0, 3).map((shoot) => (
              <MiniShootCard
                key={shoot.id}
                shoot={shoot}
                active={selectedShoot?.id === shoot.id}
                onClick={() => setSelectedShoot(shoot)}
              />
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border border-[#e8dfd2] bg-[#15120f] p-5 text-white shadow-[0_24px_80px_rgba(64,47,31,0.12)]">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-white/40">
                Smart scheduling
              </p>
              <h3 className="mt-2 text-3xl font-black">
                Calendar confirmation flow
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/55">
                The photographer will confirm availability in the calendar view,
                then the shoot moves automatically into scheduled.
              </p>
            </div>
            <button
              onClick={() => setActiveTab("calendar")}
              className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-[#15120f]"
            >
              View calendar
            </button>
          </div>
        </div>
      </section>

      <DetailPanel shoot={selectedShoot} />
    </div>
  );
}

function Pipeline({ selectedShoot, setSelectedShoot }) {
  return (
    <div className="overflow-x-auto rounded-[32px] border border-[#e8dfd2] bg-white/80 p-5 shadow-[0_24px_80px_rgba(64,47,31,0.08)]">
      <div className="flex min-w-[1180px] gap-4">
        {pipeline.map((column) => {
          const columnShoots = shoots.filter((shoot) => shoot.status === column.key);

          return (
            <section
              key={column.key}
              className="min-h-[640px] w-[260px] shrink-0 rounded-[28px] bg-[#f8f5ef] p-4"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-black">{column.label}</h3>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#8d8174]">
                  {columnShoots.length}
                </span>
              </div>

              <div className="space-y-3">
                {columnShoots.map((shoot) => (
                  <LargeShootCard
                    key={shoot.id}
                    shoot={shoot}
                    active={selectedShoot?.id === shoot.id}
                    onClick={() => setSelectedShoot(shoot)}
                  />
                ))}

                {columnShoots.length === 0 && (
                  <div className="rounded-[24px] border border-dashed border-[#ded3c3] p-5 text-center text-sm font-bold text-[#a09589]">
                    Drop cards here
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function Calendar() {
  return (
    <div className="rounded-[32px] border border-[#e8dfd2] bg-white p-5 shadow-[0_24px_80px_rgba(64,47,31,0.08)]">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-2xl font-black">Photographer Calendar</h3>
          <p className="mt-1 text-sm text-[#7b7064]">
            Google Calendar-style weekly view for bookings and confirmations.
          </p>
        </div>

        <div className="flex gap-2">
          <button className="rounded-2xl bg-[#f5f3ee] px-4 py-3 text-sm font-black">
            Month
          </button>
          <button className="rounded-2xl bg-[#15120f] px-4 py-3 text-sm font-black text-white">
            Week
          </button>
          <button className="rounded-2xl border border-[#e5d9ca] px-4 py-3 text-sm font-black">
            Sync Google
          </button>
        </div>
      </div>

      <div className="grid min-h-[680px] grid-cols-[80px_repeat(7,1fr)] overflow-hidden rounded-[28px] border border-[#e8dfd2]">
        <div className="bg-[#faf8f4]" />

        {calendarDays.map((day) => (
          <div key={day.day} className="border-l border-[#e8dfd2] bg-[#faf8f4] p-4 text-center">
            <p className="text-xs font-black uppercase tracking-widest text-[#9a8f82]">
              {day.day}
            </p>
            <p className="mt-1 text-2xl font-black">{day.date}</p>
          </div>
        ))}

        {["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"].map((time) => (
          <>
            <div
              key={`${time}-label`}
              className="border-t border-[#e8dfd2] bg-[#faf8f4] p-3 text-xs font-bold text-[#9a8f82]"
            >
              {time}
            </div>

            {calendarDays.map((day) => (
              <div
                key={`${day.day}-${time}`}
                className="relative min-h-[92px] border-l border-t border-[#e8dfd2] bg-white p-2"
              >
                {day.events
                  .filter((event) => event.time.startsWith(time.slice(0, 2)))
                  .map((event) => (
                    <div
                      key={event.title}
                      className={`rounded-2xl p-3 text-xs font-black shadow-sm ${
                        event.type === "shoot"
                          ? "bg-[#15120f] text-white"
                          : event.type === "available"
                          ? "bg-[#e8f1df] text-[#39512d]"
                          : "bg-[#eee6dc] text-[#67594c]"
                      }`}
                    >
                      <p>{event.time}</p>
                      <p className="mt-1 leading-tight">{event.title}</p>
                    </div>
                  ))}
              </div>
            ))}
          </>
        ))}
      </div>
    </div>
  );
}

function Notes({ selectedShoot }) {
  const notes = [
    {
      author: "Agent",
      text: "Owner prefers late afternoon light and needs 24h notice before the shoot.",
      time: "10:24",
    },
    {
      author: "Photographer",
      text: "Best slot is 18:00–19:00. Terrace should be prepared before arrival.",
      time: "11:02",
    },
    {
      author: "Team",
      text: "Add drone shots if wind is below limit.",
      time: "11:18",
    },
  ];

  return (
    <div className="grid gap-5 xl:grid-cols-[380px_1fr]">
      <section className="rounded-[32px] border border-[#e8dfd2] bg-white p-5 shadow-[0_24px_80px_rgba(64,47,31,0.08)]">
        <h3 className="mb-4 text-xl font-black">Properties</h3>

        <div className="space-y-3">
          {shoots.map((shoot) => (
            <button
              key={shoot.id}
              className={`w-full rounded-[24px] p-4 text-left transition ${
                selectedShoot?.id === shoot.id
                  ? "bg-[#15120f] text-white"
                  : "bg-[#f8f5ef] hover:bg-[#f1ebe2]"
              }`}
            >
              <p className="font-black">{shoot.title}</p>
              <p className="mt-1 text-sm opacity-60">{shoot.city}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-[32px] border border-[#e8dfd2] bg-white p-5 shadow-[0_24px_80px_rgba(64,47,31,0.08)]">
        <div className="mb-5 border-b border-[#e8dfd2] pb-5">
          <h3 className="text-2xl font-black">{selectedShoot?.title}</h3>
          <p className="mt-1 text-sm text-[#7b7064]">
            Internal updates, photographer notes and confirmations.
          </p>
        </div>

        <div className="mb-5 space-y-3">
          {notes.map((note) => (
            <div key={note.time} className="rounded-[24px] bg-[#f8f5ef] p-4">
              <div className="mb-1 flex justify-between">
                <p className="font-black">{note.author}</p>
                <p className="text-xs font-bold text-[#9a8f82]">{note.time}</p>
              </div>
              <p className="text-sm leading-relaxed text-[#5f554a]">{note.text}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-3 rounded-[24px] bg-[#f8f5ef] p-3">
          <input
            placeholder="Write a note or update..."
            className="flex-1 bg-transparent px-3 text-sm font-semibold outline-none placeholder:text-[#9a8f82]"
          />
          <button className="rounded-2xl bg-[#15120f] px-5 py-3 text-sm font-black text-white">
            Send
          </button>
        </div>
      </section>
    </div>
  );
}

function DetailPanel({ shoot }) {
  return (
    <aside className="rounded-[32px] border border-[#e8dfd2] bg-white p-5 shadow-[0_24px_80px_rgba(64,47,31,0.08)]">
      <div className="mb-5 h-44 rounded-[28px] bg-gradient-to-br from-[#d8cbbb] via-[#f1ebe2] to-white p-5">
        <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-black">
          Selected shoot
        </span>
      </div>

      <h3 className="text-2xl font-black">{shoot?.title}</h3>
      <p className="mt-1 text-sm text-[#7b7064]">
        {shoot?.address}, {shoot?.city}
      </p>

      <div className="mt-6 space-y-3">
        <Info label="Agent" value={shoot?.agent} />
        <Info label="Photographer" value={shoot?.photographer} />
        <Info label="Date" value={shoot?.date} />
        <Info label="Time" value={shoot?.time} />
        <Info label="Weather" value={shoot?.weather} />
        <Info label="Priority" value={shoot?.priority} />
      </div>

      <button className="mt-6 w-full rounded-2xl bg-[#15120f] px-5 py-3 text-sm font-black text-white">
        Open shoot details
      </button>
    </aside>
  );
}

function StatCard({ label, value, tone }) {
  return (
    <div
      className={`rounded-[28px] p-5 shadow-[0_18px_50px_rgba(64,47,31,0.07)] ${
        tone === "dark"
          ? "bg-[#15120f] text-white"
          : "border border-[#e8dfd2] bg-white"
      }`}
    >
      <p className="text-4xl font-black">{value}</p>
      <p className={`mt-2 text-xs font-black uppercase tracking-wider ${tone === "dark" ? "text-white/45" : "text-[#9a8f82]"}`}>
        {label}
      </p>
    </div>
  );
}

function SidebarButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-black transition ${
        active
          ? "bg-[#15120f] text-white shadow-lg shadow-black/10"
          : "text-[#655b51] hover:bg-[#f5f3ee]"
      }`}
    >
      {children}
    </button>
  );
}

function MiniShootCard({ shoot, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-[28px] p-5 text-left transition hover:-translate-y-1 ${
        active
          ? "bg-[#15120f] text-white"
          : "border border-[#e8dfd2] bg-[#faf8f4]"
      }`}
    >
      <div className="mb-8 h-20 rounded-[22px] bg-gradient-to-br from-[#d8cbbb] to-white/40" />
      <p className="font-black">{shoot.title}</p>
      <p className="mt-1 text-sm opacity-60">{shoot.date} • {shoot.time}</p>
    </button>
  );
}

function LargeShootCard({ shoot, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-[26px] p-4 text-left shadow-sm transition hover:-translate-y-1 ${
        active ? "bg-[#15120f] text-white" : "bg-white"
      }`}
    >
      <div className="mb-4 h-24 rounded-[22px] bg-gradient-to-br from-[#d9ccbb] via-[#eee6dc] to-white" />
      <p className="font-black leading-tight">{shoot.title}</p>
      <p className="mt-1 text-xs opacity-60">{shoot.city}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-[#f5f3ee] px-3 py-1 text-xs font-black text-[#6d6257]">
          {shoot.date}
        </span>
        <span className="rounded-full bg-[#e8f1df] px-3 py-1 text-xs font-black text-[#39512d]">
          {shoot.weather}
        </span>
      </div>
    </button>
  );
}

function Info({ label, value }) {
  return (
    <div className="flex justify-between gap-4 border-t border-[#eee6dc] pt-3 text-sm">
      <span className="font-black text-[#9a8f82]">{label}</span>
      <span className="text-right font-bold text-[#15120f]">{value || "-"}</span>
    </div>
  );
}
