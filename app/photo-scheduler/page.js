"use client";

import { useEffect, useMemo, useState } from "react";

const pipeline = [
  { key: "needs_scheduling", label: "Needs Scheduling" },
  { key: "scheduled", label: "Scheduled" },
  { key: "completed", label: "Shoot Completed" },
  { key: "delivered", label: "Delivered" },
  { key: "billed", label: "Billed" },
];

export default function PhotoSchedulerPage() {
  const [tab, setTab] = useState("overview");
  const [properties, setProperties] = useState([]);
  const [selected, setSelected] = useState(null);
  const [notes, setNotes] = useState([]);
  const [noteMessage, setNoteMessage] = useState("");

  const [form, setForm] = useState({
    title: "",
    address: "",
    city: "",
    shoot_date: "",
    photographer: "",
    agent: "",
    priority: "normal",
  });

  async function loadProperties() {
    const res = await fetch("/api/photo-properties");
    const data = await res.json();
    setProperties(data || []);
    if (!selected && data?.length) setSelected(data[0]);
  }

  async function loadNotes(propertyId) {
    if (!propertyId) return;
    const res = await fetch(`/api/photo-notes?property_id=${propertyId}`);
    const data = await res.json();
    setNotes(data || []);
  }

  useEffect(() => {
    loadProperties();
  }, []);

  useEffect(() => {
    if (selected?.id) loadNotes(selected.id);
  }, [selected?.id]);

  async function createShoot() {
    if (!form.title.trim()) return alert("Add a property title.");

    const res = await fetch("/api/photo-properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) return alert(data.error || "Could not create shoot.");

    setForm({
      title: "",
      address: "",
      city: "",
      shoot_date: "",
      photographer: "",
      agent: "",
      priority: "normal",
    });

    await loadProperties();
    setSelected(data);
  }

  async function updateStatus(property, status) {
    const res = await fetch(`/api/photo-properties/${property.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    const data = await res.json();

    if (!res.ok) return alert(data.error || "Could not update status.");

    setProperties((prev) =>
      prev.map((p) => (p.id === property.id ? data : p))
    );

    if (selected?.id === property.id) setSelected(data);
  }

  async function sendNote() {
    if (!selected?.id || !noteMessage.trim()) return;

    const res = await fetch("/api/photo-notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        property_id: selected.id,
        author: "Team",
        message: noteMessage,
      }),
    });

    const data = await res.json();

    if (!res.ok) return alert(data.error || "Could not save note.");

    setNoteMessage("");
    setNotes((prev) => [...prev, data]);
  }

  const stats = useMemo(() => {
    return {
      total: properties.length,
      needs: properties.filter((p) => p.status === "needs_scheduling").length,
      scheduled: properties.filter((p) => p.status === "scheduled").length,
      completed: properties.filter((p) => p.status === "completed").length,
      billed: properties.filter((p) => p.status === "billed").length,
    };
  }, [properties]);

  return (
    <main className="min-h-screen bg-[#f4f1ea] text-stone-950">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 border-r border-stone-200 bg-white/70 p-6 md:block">
          <div className="mb-10">
            <p className="text-xs font-bold tracking-[0.35em] text-stone-400">
              PANORAMA
            </p>
            <h1 className="mt-3 text-2xl font-black">Photo Scheduler</h1>
          </div>

          <nav className="space-y-2">
            <NavButton active={tab === "overview"} onClick={() => setTab("overview")}>
              Overview
            </NavButton>
            <NavButton active={tab === "pipeline"} onClick={() => setTab("pipeline")}>
              Pipeline
            </NavButton>
            <NavButton active={tab === "calendar"} onClick={() => setTab("calendar")}>
              Calendar
            </NavButton>
            <NavButton active={tab === "notes"} onClick={() => setTab("notes")}>
              Notes
            </NavButton>
          </nav>
        </aside>

        <section className="flex-1 p-5 md:p-10">
          <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-stone-500">
                Shoot operations dashboard
              </p>
              <h2 className="text-4xl font-black tracking-tight">
                {tab === "overview" && "Overview"}
                {tab === "pipeline" && "Pipeline"}
                {tab === "calendar" && "Calendar"}
                {tab === "notes" && "Notes"}
              </h2>
            </div>

            <div className="flex rounded-2xl bg-white p-1 shadow-sm md:hidden">
              {["overview", "pipeline", "calendar", "notes"].map((item) => (
                <button
                  key={item}
                  onClick={() => setTab(item)}
                  className={`rounded-xl px-3 py-2 text-sm font-bold ${
                    tab === item ? "bg-stone-950 text-white" : "text-stone-600"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </header>

          {tab === "overview" && (
            <Overview
              stats={stats}
              form={form}
              setForm={setForm}
              createShoot={createShoot}
              properties={properties}
              setSelected={setSelected}
              setTab={setTab}
            />
          )}

          {tab === "pipeline" && (
            <Pipeline
              properties={properties}
              updateStatus={updateStatus}
              setSelected={setSelected}
              setTab={setTab}
            />
          )}

          {tab === "calendar" && <Calendar properties={properties} />}

          {tab === "notes" && (
            <Notes
              properties={properties}
              selected={selected}
              setSelected={setSelected}
              notes={notes}
              noteMessage={noteMessage}
              setNoteMessage={setNoteMessage}
              sendNote={sendNote}
            />
          )}
        </section>
      </div>
    </main>
  );
}

function NavButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-2xl px-4 py-3 text-left font-bold transition ${
        active
          ? "bg-stone-950 text-white"
          : "text-stone-600 hover:bg-stone-100"
      }`}
    >
      {children}
    </button>
  );
}

function Overview({ stats, form, setForm, createShoot, properties, setSelected, setTab }) {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-5">
        <Stat label="Total" value={stats.total} />
        <Stat label="Needs Scheduling" value={stats.needs} />
        <Stat label="Scheduled" value={stats.scheduled} />
        <Stat label="Completed" value={stats.completed} />
        <Stat label="Billed" value={stats.billed} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-stone-300/30">
          <h3 className="text-2xl font-black">Create Shoot</h3>
          <p className="mb-6 mt-1 text-sm text-stone-500">
            Add a property manually. Later this will receive listings automatically.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Property title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
            <Field label="Address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} />
            <Field label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
            <Field label="Photographer" value={form.photographer} onChange={(v) => setForm({ ...form, photographer: v })} />
            <Field label="Agent" value={form.agent} onChange={(v) => setForm({ ...form, agent: v })} />
            <Field label="Shoot date" type="datetime-local" value={form.shoot_date} onChange={(v) => setForm({ ...form, shoot_date: v })} />
          </div>

          <button
            onClick={createShoot}
            className="mt-6 rounded-2xl bg-stone-950 px-6 py-3 font-bold text-white hover:bg-stone-800"
          >
            Create Shoot
          </button>
        </section>

        <section className="rounded-[2rem] bg-stone-950 p-6 text-white shadow-xl shadow-stone-300/30">
          <h3 className="text-2xl font-black">Upcoming Shoots</h3>
          <div className="mt-6 space-y-3">
            {properties.slice(0, 5).map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setSelected(p);
                  setTab("notes");
                }}
                className="w-full rounded-2xl bg-white/10 p-4 text-left hover:bg-white/15"
              >
                <p className="font-bold">{p.title}</p>
                <p className="text-sm text-white/60">
                  {p.shoot_date ? new Date(p.shoot_date).toLocaleString() : "Not scheduled"}
                </p>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function Pipeline({ properties, updateStatus, setSelected, setTab }) {
  return (
    <div className="grid gap-4 xl:grid-cols-5">
      {pipeline.map((col) => (
        <section key={col.key} className="rounded-[2rem] bg-white p-4 shadow-lg shadow-stone-300/20">
          <h3 className="mb-4 font-black">{col.label}</h3>

          <div className="space-y-3">
            {properties
              .filter((p) => p.status === col.key)
              .map((p) => (
                <div key={p.id} className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                  <p className="font-black">{p.title}</p>
                  <p className="text-sm text-stone-500">{p.city || "No city"}</p>

                  <button
                    onClick={() => {
                      setSelected(p);
                      setTab("notes");
                    }}
                    className="mt-3 text-sm font-bold text-stone-700 underline"
                  >
                    Open notes
                  </button>

                  <select
                    value={p.status}
                    onChange={(e) => updateStatus(p, e.target.value)}
                    className="mt-3 w-full rounded-xl border border-stone-200 bg-white p-2 text-sm"
                  >
                    {pipeline.map((s) => (
                      <option key={s.key} value={s.key}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function Calendar({ properties }) {
  const grouped = properties.reduce((acc, p) => {
    const date = p.shoot_date
      ? new Date(p.shoot_date).toLocaleDateString()
      : "Unscheduled";

    acc[date] = acc[date] || [];
    acc[date].push(p);
    return acc;
  }, {});

  return (
    <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-stone-300/30">
      <div className="mb-6">
        <h3 className="text-2xl font-black">Calendar View</h3>
        <p className="text-sm text-stone-500">
          Google Calendar availability will connect here later.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {Object.entries(grouped).map(([date, shoots]) => (
          <div key={date} className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
            <p className="mb-4 font-black">{date}</p>

            <div className="space-y-2">
              {shoots.map((p) => (
                <div key={p.id} className="rounded-xl bg-white p-3">
                  <p className="font-bold">{p.title}</p>
                  <p className="text-sm text-stone-500">
                    {p.photographer || "No photographer"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Notes({ properties, selected, setSelected, notes, noteMessage, setNoteMessage, sendNote }) {
  return (
    <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
      <section className="rounded-[2rem] bg-white p-4 shadow-xl shadow-stone-300/30">
        <h3 className="mb-4 text-xl font-black">Properties</h3>

        <div className="space-y-2">
          {properties.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p)}
              className={`w-full rounded-2xl p-4 text-left ${
                selected?.id === p.id
                  ? "bg-stone-950 text-white"
                  : "bg-stone-50 hover:bg-stone-100"
              }`}
            >
              <p className="font-bold">{p.title}</p>
              <p className="text-sm opacity-60">{p.city || "No city"}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-stone-300/30">
        {selected ? (
          <>
            <div className="mb-6 border-b border-stone-200 pb-4">
              <h3 className="text-2xl font-black">{selected.title}</h3>
              <p className="text-sm text-stone-500">
                {selected.address} {selected.city ? `• ${selected.city}` : ""}
              </p>
            </div>

            <div className="mb-6 max-h-[420px] space-y-3 overflow-y-auto">
              {notes.length === 0 ? (
                <p className="text-stone-500">No notes yet.</p>
              ) : (
                notes.map((note) => (
                  <div key={note.id} className="rounded-2xl bg-stone-50 p-4">
                    <p className="text-sm font-bold">{note.author}</p>
                    <p className="mt-1">{note.message}</p>
                    <p className="mt-2 text-xs text-stone-400">
                      {new Date(note.created_at).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>

            <div className="flex gap-3">
              <input
                value={noteMessage}
                onChange={(e) => setNoteMessage(e.target.value)}
                placeholder="Write an update..."
                className="flex-1 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 outline-none focus:border-stone-950"
              />
              <button
                onClick={sendNote}
                className="rounded-2xl bg-stone-950 px-6 py-3 font-bold text-white"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <p>Select a property to view notes.</p>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-[1.5rem] bg-white p-5 shadow-lg shadow-stone-300/30">
      <p className="text-3xl font-black">{value}</p>
      <p className="mt-1 text-xs font-bold uppercase tracking-wide text-stone-500">
        {label}
      </p>
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }) {
  return (
    <label>
      <span className="mb-2 block text-sm font-bold text-stone-700">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 outline-none focus:border-stone-950 focus:bg-white"
      />
    </label>
  );
}
