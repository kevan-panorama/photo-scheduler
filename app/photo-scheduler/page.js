"use client";

import { useMemo, useState } from "react";

const COLORS = {
  cream: "#f5f3ee",
  navy: "#123e63",
  navy2: "#164d73",
  blue: "#2f7898",
  lightBlue: "#dcebf2",
  gold: "#e7d39a",
  border: "#d7e1e7",
};

const agents = [
  "Alejandro Romera PRRE",
  "Alex Clover",
  "Alfonso Muñoz",
  "Ash Rasoulian",
  "Beatrice Pittá",
  "Beatriz Garvayo",
  "Carolina Alaniz",
  "Christopher Clover",
  "C. Lawton",
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

const pipelineColumns = [
  { key: "new_request", label: "New Request" },
  { key: "needs_confirmation", label: "Needs Confirmation" },
  { key: "scheduled", label: "Scheduled" },
  { key: "shoot_done", label: "Shoot Done" },
  { key: "delivered", label: "Delivered" },
  { key: "billed", label: "Billed" },
];

const initialShoots = [
  {
    id: 1,
    title: "Villa Nueva Andalucía",
    address: "Nueva Andalucía",
    city: "Marbella",
    agent: "Kevan Martial",
    photographer: "Marcos",
    status: "new_request",
    date: "Unscheduled",
    time: "Pending",
    weather: "Pending",
    priority: "High",
    notes: "Owner prefers late afternoon light.",
  },
  {
    id: 2,
    title: "Penthouse Puente Romano",
    address: "Golden Mile",
    city: "Marbella",
    agent: "Alex Clover",
    photographer: "Cauana",
    status: "needs_confirmation",
    date: "Tue 21",
    time: "11:30",
    weather: "☀️ 24°",
    priority: "Normal",
    notes: "Confirm access with concierge.",
  },
  {
    id: 3,
    title: "Townhouse La Quinta",
    address: "La Quinta Golf",
    city: "Benahavís",
    agent: "Sarina Garber",
    photographer: "Marcos",
    status: "scheduled",
    date: "Wed 22",
    time: "16:00",
    weather: "🌤️ 22°",
    priority: "Normal",
    notes: "Terrace must be staged before arrival.",
  },
  {
    id: 4,
    title: "Apartment Puerto Banús",
    address: "Marina Banús",
    city: "Marbella",
    agent: "Lindsey Medina PRRE",
    photographer: "Cauana",
    status: "shoot_done",
    date: "Today",
    time: "18:30",
    weather: "☀️ 25°",
    priority: "Urgent",
    notes: "Send selects to editor today.",
  },
];

const calendarDays = [
  { day: "Mon", date: "20" },
  { day: "Tue", date: "21" },
  { day: "Wed", date: "22" },
  { day: "Thu", date: "23" },
  { day: "Fri", date: "24" },
  { day: "Sat", date: "25" },
  { day: "Sun", date: "26" },
];

const calendarEvents = [
  { day: "Mon", time: "10:00", title: "Marcos available", type: "available" },
  { day: "Tue", time: "11:30", title: "Penthouse Puente Romano", type: "shoot" },
  { day: "Wed", time: "16:00", title: "Townhouse La Quinta", type: "shoot" },
  { day: "Thu", time: "12:00", title: "Cauana available", type: "available" },
  { day: "Fri", time: "18:30", title: "Golden hour slot", type: "available" },
  { day: "Sat", time: "09:00", title: "Blocked", type: "busy" },
];

const timeSlots = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"];

export default function PhotoSchedulerPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [shoots, setShoots] = useState(initialShoots);
  const [selectedShoot, setSelectedShoot] = useState(initialShoots[0]);
  const [modal, setModal] = useState(null);
  const [filter, setFilter] = useState("This week");

  const stats = useMemo(() => {
    return {
      total: shoots.length,
      pending: shoots.filter((s) =>
        ["new_request", "needs_confirmation"].includes(s.status)
      ).length,
      scheduled: shoots.filter((s) => s.status === "scheduled").length,
      completed: shoots.filter((s) =>
        ["shoot_done", "delivered", "billed"].includes(s.status)
      ).length,
    };
  }, [shoots]);

  function updateSelected(field, value) {
    setSelectedShoot((prev) => {
      const updated = { ...prev, [field]: value };
      setShoots((old) => old.map((s) => (s.id === updated.id ? updated : s)));
      return updated;
    });
  }

  function openShoot(shoot) {
    setSelectedShoot(shoot);
    setModal("details");
  }

  function createMockShoot() {
    const newShoot = {
      id: shoots.length + 1,
      title: "New Property Shoot",
      address: "Address pending",
      city: "Marbella",
      agent: agents[0],
      photographer: "Marcos",
      status: "new_request",
      date: "Unscheduled",
      time: "Pending",
      weather: "Pending",
      priority: "Normal",
      notes: "New shoot created from mock modal.",
    };

    setShoots([newShoot, ...shoots]);
    setSelectedShoot(newShoot);
    setModal("details");
  }

  return (
    <main className="min-h-screen bg-[#f5f3ee] text-[#123e63]">
      <div className="flex min-h-screen p-5">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setModal={setModal}
        />

        <section className="flex-1 pl-5">
          <Topbar
            activeTab={activeTab}
            filter={filter}
            setFilter={setFilter}
            setModal={setModal}
          />

          {activeTab === "overview" && (
            <Overview
              stats={stats}
              shoots={shoots}
              setActiveTab={setActiveTab}
              openShoot={openShoot}
            />
          )}

          {activeTab === "pipeline" && (
            <Pipeline
              shoots={shoots}
              openShoot={openShoot}
            />
          )}

          {activeTab === "calendar" && (
            <CalendarView
              setModal={setModal}
              openShoot={openShoot}
              shoots={shoots}
            />
          )}

          {activeTab === "notes" && (
            <NotesView
              shoots={shoots}
              selectedShoot={selectedShoot}
              setSelectedShoot={setSelectedShoot}
            />
          )}
        </section>
      </div>

      {modal === "new" && (
        <NewShootModal
          onClose={() => setModal(null)}
          onCreate={createMockShoot}
        />
      )}

      {modal === "calendar" && (
        <BasicModal
          title="Google Calendar Sync"
          onClose={() => setModal(null)}
        >
          <p className="text-sm leading-relaxed text-[#46667b]">
            This button will later connect Marcos and Cauana’s Google calendars.
            For now it is a visual mock so we can agree the workflow.
          </p>
        </BasicModal>
      )}

      {modal === "filter" && (
        <BasicModal title="Date Filter" onClose={() => setModal(null)}>
          <div className="grid gap-3">
            {["Today", "This week", "This month", "Custom range"].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setFilter(item);
                  setModal(null);
                }}
                className="rounded-2xl border border-[#d7e1e7] bg-white px-4 py-3 text-left text-sm font-semibold text-[#123e63] hover:bg-[#dcebf2]"
              >
                {item}
              </button>
            ))}
          </div>
        </BasicModal>
      )}

      {modal === "details" && selectedShoot && (
        <ShootDetailsDrawer
          shoot={selectedShoot}
          onClose={() => setModal(null)}
          updateSelected={updateSelected}
        />
      )}
    </main>
  );
}

function Sidebar({ activeTab, setActiveTab, setModal }) {
  return (
    <aside className="w-[280px] shrink-0 rounded-[34px] border border-[#d7e1e7] bg-white p-5 shadow-[0_20px_60px_rgba(18,62,99,0.08)]">
      <div className="rounded-[30px] bg-gradient-to-br from-[#123e63] to-[#2f7898] p-6 text-white">
        <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#e7d39a]">
          Panorama
        </p>

        <h1 className="mt-3 text-[30px] font-semibold leading-[1.08]">
          Photo Scheduler
        </h1>

        <p className="mt-4 text-sm leading-relaxed text-white/75">
          Photography bookings, confirmations, calendar and production notes.
        </p>
      </div>

      <nav className="mt-8 space-y-2">
        {["overview", "pipeline", "calendar", "notes"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`w-full rounded-2xl px-4 py-3 text-left text-[15px] font-semibold capitalize transition ${
              activeTab === tab
                ? "bg-[#123e63] text-white shadow-lg shadow-[#123e63]/15"
                : "text-[#46667b] hover:bg-[#dcebf2]"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      <div className="mt-8 rounded-[28px] border border-[#d7e1e7] bg-[#f8fbfc] p-5">
        <p className="text-[15px] font-semibold text-[#123e63]">
          Google Calendar
        </p>

        <p className="mt-2 text-sm leading-relaxed text-[#46667b]">
          Connect Marcos and Cauana availability.
        </p>

        <button
          onClick={() => setModal("calendar")}
          className="mt-5 w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-[#123e63] shadow-sm hover:bg-[#dcebf2]"
        >
          Connect calendar
        </button>
      </div>
    </aside>
  );
}

function Topbar({ activeTab, filter, setModal }) {
  return (
    <header className="mb-5 rounded-[34px] border border-[#d7e1e7] bg-white px-8 py-7 shadow-[0_20px_60px_rgba(18,62,99,0.08)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#2f7898]">
            Panorama Photography
          </p>

          <h2 className="mt-2 text-[44px] font-semibold tracking-[-0.04em] text-[#123e63] capitalize">
            {activeTab}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setModal("filter")}
            className="rounded-2xl border border-[#d7e1e7] bg-[#f8fbfc] px-5 py-3 text-sm font-semibold text-[#123e63]"
          >
            {filter}
          </button>

          <button
            onClick={() => setModal("new")}
            className="rounded-2xl bg-[#123e63] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#123e63]/20"
          >
            New shoot
          </button>
        </div>
      </div>
    </header>
  );
}

function Overview({ stats, shoots, setActiveTab, openShoot }) {
  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_390px]">
      <section className="space-y-5">
        <div className="grid grid-cols-4 gap-4">
          <StatCard title="Total shoots" value={stats.total} dark />
          <StatCard title="Pending" value={stats.pending} />
          <StatCard title="Scheduled" value={stats.scheduled} />
          <StatCard title="Completed" value={stats.completed} />
        </div>

        <div className="rounded-[34px] border border-[#d7e1e7] bg-white p-6 shadow-[0_20px_60px_rgba(18,62,99,0.08)]">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-[30px] font-semibold tracking-[-0.03em] text-[#123e63]">
                Production Board
              </h3>

              <p className="mt-1 text-sm text-[#46667b]">
                Click any card to open its details, assignments and status.
              </p>
            </div>

            <button
              onClick={() => setActiveTab("pipeline")}
              className="rounded-2xl bg-[#dcebf2] px-5 py-3 text-sm font-semibold text-[#123e63]"
            >
              Open pipeline
            </button>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {shoots.slice(0, 3).map((shoot) => (
              <ShootCard
                key={shoot.id}
                shoot={shoot}
                onClick={() => openShoot(shoot)}
              />
            ))}
          </div>
        </div>

        <div className="rounded-[34px] bg-gradient-to-br from-[#123e63] to-[#2f7898] p-7 text-white shadow-[0_20px_60px_rgba(18,62,99,0.15)]">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#e7d39a]">
            Confirmation flow
          </p>

          <h3 className="mt-2 text-[30px] font-semibold tracking-[-0.03em]">
            Bookings confirmed through calendar.
          </h3>

          <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/75">
            The calendar will show photographer availability, booking blocks,
            confirmations and conflicts.
          </p>
        </div>
      </section>

      <OverviewRightPanel shoots={shoots} openShoot={openShoot} />
    </div>
  );
}
function OverviewRightPanel({ shoots, openShoot }) {
  return (
    <aside className="rounded-[34px] border border-[#d7e1e7] bg-white p-6 shadow-[0_20px_60px_rgba(18,62,99,0.08)]">
      <h3 className="text-[28px] font-semibold tracking-[-0.03em] text-[#123e63]">
        Upcoming Shoots
      </h3>

      <div className="mt-5 space-y-3">
        {shoots.map((shoot) => (
          <button
            key={shoot.id}
            onClick={() => openShoot(shoot)}
            className="w-full rounded-[26px] border border-[#d7e1e7] bg-[#f8fbfc] p-4 text-left transition hover:bg-[#dcebf2]"
          >
            <div className="flex items-center justify-between">
              <p className="text-[17px] font-semibold text-[#123e63]">
                {shoot.title}
              </p>

              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#2f7898]">
                {shoot.time}
              </span>
            </div>

            <p className="mt-2 text-sm text-[#46667b]">
              {shoot.agent}
            </p>
          </button>
        ))}
      </div>
    </aside>
  );
}

function Pipeline({ shoots, openShoot }) {
  return (
    <div className="overflow-x-auto rounded-[34px] border border-[#d7e1e7] bg-white p-5 shadow-[0_20px_60px_rgba(18,62,99,0.08)]">
      <div className="flex min-w-[1400px] gap-4">
        {pipelineColumns.map((column) => {
          const columnShoots = shoots.filter(
            (shoot) => shoot.status === column.key
          );

          return (
            <div
              key={column.key}
              className="min-h-[720px] w-[300px] shrink-0 rounded-[30px] bg-[#f8fbfc] p-4"
            >
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-[16px] font-semibold text-[#123e63]">
                  {column.label}
                </h3>

                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#2f7898]">
                  {columnShoots.length}
                </span>
              </div>

              <div className="space-y-3">
                {columnShoots.map((shoot) => (
                  <ShootCard
                    key={shoot.id}
                    shoot={shoot}
                    onClick={() => openShoot(shoot)}
                  />
                ))}

                {columnShoots.length === 0 && (
                  <div className="rounded-[24px] border border-dashed border-[#c9dbe5] p-5 text-center text-sm font-semibold text-[#6d8ca0]">
                    Drop cards here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CalendarView({ setModal }) {
  return (
    <div className="rounded-[34px] border border-[#d7e1e7] bg-white p-6 shadow-[0_20px_60px_rgba(18,62,99,0.08)]">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-[34px] font-semibold tracking-[-0.03em] text-[#123e63]">
            Photographer Calendar
          </h3>

          <p className="mt-1 text-sm text-[#46667b]">
            Weekly booking overview connected to photographer availability.
          </p>
        </div>

        <div className="flex gap-2">
          <button className="rounded-2xl bg-[#123e63] px-5 py-3 text-sm font-semibold text-white">
            Week
          </button>

          <button
            onClick={() => setModal("calendar")}
            className="rounded-2xl border border-[#d7e1e7] bg-[#f8fbfc] px-5 py-3 text-sm font-semibold text-[#123e63]"
          >
            Sync Google
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[90px_repeat(7,1fr)] overflow-hidden rounded-[28px] border border-[#d7e1e7]">
        <div className="bg-[#f8fbfc]" />

        {calendarDays.map((day) => (
          <div
            key={day.day}
            className="border-l border-[#d7e1e7] bg-[#f8fbfc] p-4 text-center"
          >
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#2f7898]">
              {day.day}
            </p>

            <p className="mt-1 text-[30px] font-semibold text-[#123e63]">
              {day.date}
            </p>
          </div>
        ))}

        {timeSlots.map((time) => (
          <>
            <div
              key={`${time}-label`}
              className="border-t border-[#d7e1e7] bg-[#f8fbfc] p-3 text-xs font-semibold text-[#2f7898]"
            >
              {time}
            </div>

            {calendarDays.map((day) => {
              const event = calendarEvents.find(
                (e) => e.day === day.day && e.time === time
              );

              return (
                <div
                  key={`${day.day}-${time}`}
                  className="relative min-h-[110px] border-l border-t border-[#d7e1e7] bg-white p-2"
                >
                  {event && (
                    <button
                      className={`w-full rounded-[20px] p-3 text-left shadow-sm transition hover:scale-[1.02] ${
                        event.type === "shoot"
                          ? "bg-[#123e63] text-white"
                          : event.type === "available"
                          ? "bg-[#dcebf2] text-[#123e63]"
                          : "bg-[#e7d39a] text-[#123e63]"
                      }`}
                    >
                      <p className="text-xs font-bold">
                        {event.time}
                      </p>

                      <p className="mt-1 text-sm font-semibold leading-tight">
                        {event.title}
                      </p>
                    </button>
                  )}
                </div>
              );
            })}
          </>
        ))}
      </div>
    </div>
  );
}

function NotesView({
  shoots,
  selectedShoot,
  setSelectedShoot,
}) {
  return (
    <div className="grid gap-5 xl:grid-cols-[380px_1fr]">
      <aside className="rounded-[34px] border border-[#d7e1e7] bg-white p-5 shadow-[0_20px_60px_rgba(18,62,99,0.08)]">
        <h3 className="text-[28px] font-semibold tracking-[-0.03em] text-[#123e63]">
          Properties
        </h3>

        <div className="mt-5 space-y-3">
          {shoots.map((shoot) => (
            <button
              key={shoot.id}
              onClick={() => setSelectedShoot(shoot)}
              className={`w-full rounded-[28px] p-5 text-left transition ${
                selectedShoot?.id === shoot.id
                  ? "bg-[#123e63] text-white"
                  : "bg-[#f8fbfc] text-[#123e63]"
              }`}
            >
              <p className="text-[19px] font-semibold">
                {shoot.title}
              </p>

              <p className="mt-1 text-sm opacity-70">
                {shoot.city}
              </p>
            </button>
          ))}
        </div>
      </aside>

      <section className="rounded-[34px] border border-[#d7e1e7] bg-white p-6 shadow-[0_20px_60px_rgba(18,62,99,0.08)]">
        <h3 className="text-[42px] font-semibold tracking-[-0.04em] text-[#123e63]">
          {selectedShoot.title}
        </h3>

        <p className="mt-2 text-sm text-[#46667b]">
          Internal notes, confirmations and production updates.
        </p>

        <div className="mt-8 space-y-3">
          <Note
            author="Agent"
            text={selectedShoot.notes}
          />

          <Note
            author="Photographer"
            text="Golden hour recommended around 18:00."
          />

          <Note
            author="Team"
            text="Drone weather check pending."
          />
        </div>

        <div className="mt-6 flex gap-3 rounded-[28px] bg-[#f8fbfc] p-3">
          <input
            placeholder="Write internal production note..."
            className="flex-1 bg-transparent px-3 text-sm text-[#123e63] outline-none placeholder:text-[#6f8da0]"
          />

          <button className="rounded-2xl bg-[#123e63] px-5 py-3 text-sm font-semibold text-white">
            Send
          </button>
        </div>
      </section>
    </div>
  );
}

function ShootCard({ shoot, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-[30px] border border-[#d7e1e7] bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="mb-5 h-28 rounded-[24px] bg-gradient-to-br from-[#2f7898] to-[#123e63]" />

      <h3 className="text-[24px] font-semibold leading-tight tracking-[-0.03em] text-[#123e63]">
        {shoot.title}
      </h3>

      <p className="mt-2 text-sm text-[#46667b]">
        {shoot.city}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        <span className="rounded-full bg-[#dcebf2] px-3 py-1 text-xs font-semibold text-[#123e63]">
          {shoot.date}
        </span>

        <span className="rounded-full bg-[#e7d39a] px-3 py-1 text-xs font-semibold text-[#123e63]">
          {shoot.weather}
        </span>
      </div>
    </button>
  );
}

function ShootDetailsDrawer({
  shoot,
  onClose,
  updateSelected,
}) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/20 backdrop-blur-sm">
      <div className="h-full w-[520px] overflow-y-auto bg-white p-7 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#2f7898]">
              Shoot Details
            </p>

            <h2 className="mt-2 text-[42px] font-semibold leading-[1.02] tracking-[-0.05em] text-[#123e63]">
              {shoot.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-2xl bg-[#f8fbfc] px-4 py-2 text-sm font-semibold text-[#123e63]"
          >
            Close
          </button>
        </div>

        <div className="mt-6 h-56 rounded-[30px] bg-gradient-to-br from-[#2f7898] to-[#123e63]" />

        <div className="mt-7 space-y-4">
          <InfoRow label="Address" value={shoot.address} />
          <InfoRow label="City" value={shoot.city} />
          <InfoRow label="Date" value={shoot.date} />
          <InfoRow label="Time" value={shoot.time} />
          <InfoRow label="Weather" value={shoot.weather} />
          <InfoRow label="Priority" value={shoot.priority} />
        </div>

        <div className="mt-8 grid gap-4">
          <label>
            <span className="mb-2 block text-sm font-semibold text-[#46667b]">
              Assign Agent
            </span>

            <select
              value={shoot.agent}
              onChange={(e) =>
                updateSelected("agent", e.target.value)
              }
              className="w-full rounded-2xl border border-[#d7e1e7] bg-[#f8fbfc] px-4 py-3 text-sm text-[#123e63] outline-none"
            >
              {agents.map((agent) => (
                <option key={agent}>{agent}</option>
              ))}
            </select>
          </label>

          <label>
            <span className="mb-2 block text-sm font-semibold text-[#46667b]">
              Assign Photographer
            </span>

            <select
              value={shoot.photographer}
              onChange={(e) =>
                updateSelected("photographer", e.target.value)
              }
              className="w-full rounded-2xl border border-[#d7e1e7] bg-[#f8fbfc] px-4 py-3 text-sm text-[#123e63] outline-none"
            >
              {photographers.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </label>

          <label>
            <span className="mb-2 block text-sm font-semibold text-[#46667b]">
              Change Status
            </span>

            <select
              value={shoot.status}
              onChange={(e) =>
                updateSelected("status", e.target.value)
              }
              className="w-full rounded-2xl border border-[#d7e1e7] bg-[#f8fbfc] px-4 py-3 text-sm text-[#123e63] outline-none"
            >
              {pipelineColumns.map((column) => (
                <option key={column.key} value={column.key}>
                  {column.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button className="mt-8 w-full rounded-2xl bg-[#123e63] px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-[#123e63]/20">
          Save Updates
        </button>
      </div>
    </div>
  );
}

function NewShootModal({ onClose, onCreate }) {
  return (
    <BasicModal title="Create New Shoot" onClose={onClose}>
      <div className="grid gap-4">
        <input
          placeholder="Property title"
          className="rounded-2xl border border-[#d7e1e7] bg-[#f8fbfc] px-4 py-3 text-sm outline-none"
        />

        <input
          placeholder="Address"
          className="rounded-2xl border border-[#d7e1e7] bg-[#f8fbfc] px-4 py-3 text-sm outline-none"
        />

        <select className="rounded-2xl border border-[#d7e1e7] bg-[#f8fbfc] px-4 py-3 text-sm outline-none">
          {agents.map((agent) => (
            <option key={agent}>{agent}</option>
          ))}
        </select>

        <select className="rounded-2xl border border-[#d7e1e7] bg-[#f8fbfc] px-4 py-3 text-sm outline-none">
          {photographers.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>

        <button
          onClick={onCreate}
          className="mt-3 rounded-2xl bg-[#123e63] px-5 py-4 text-sm font-semibold text-white"
        >
          Create Shoot
        </button>
      </div>
    </BasicModal>
  );
}

function BasicModal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="w-[520px] rounded-[34px] bg-white p-7 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-[30px] font-semibold tracking-[-0.03em] text-[#123e63]">
            {title}
          </h3>

          <button
            onClick={onClose}
            className="rounded-2xl bg-[#f8fbfc] px-4 py-2 text-sm font-semibold text-[#123e63]"
          >
            Close
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

function Note({ author, text }) {
  return (
    <div className="rounded-[28px] bg-[#f8fbfc] p-5">
      <p className="text-[16px] font-semibold text-[#123e63]">
        {author}
      </p>

      <p className="mt-2 text-sm leading-relaxed text-[#46667b]">
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
          ? "bg-gradient-to-br from-[#123e63] to-[#2f7898] text-white"
          : "border border-[#d7e1e7] bg-white"
      }`}
    >
      <p className="text-[54px] font-semibold tracking-[-0.05em]">
        {value}
      </p>

      <p
        className={`mt-2 text-[11px] uppercase tracking-[0.28em] ${
          dark ? "text-[#e7d39a]" : "text-[#2f7898]"
        }`}
      >
        {title}
      </p>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-[#e4edf2] pb-3">
      <span className="text-sm font-semibold text-[#46667b]">
        {label}
      </span>

      <span className="text-sm font-semibold text-[#123e63]">
        {value}
      </span>
    </div>
  );
}
