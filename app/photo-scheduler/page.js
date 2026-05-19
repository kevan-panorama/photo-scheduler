"use client";

import { useEffect, useMemo, useState } from "react";

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

const photographers = [
  {
    id: "e45a94ec-c733-49e7-8513-709202bf7652",
    name: "Kevan",
    email: "kevan@panorama.es",
    color: "#123e63",
  },
  {
    id: "REPLACE_WITH_MARCOS_UUID",
    name: "Marcos",
    email: "marcos@panorama.es",
    color: "#2f7898",
  },
  {
    id: "REPLACE_WITH_CAUANA_UUID",
    name: "Cauana",
    email: "cauana@panorama.es",
    color: "#e7d39a",
  },
];

const photographerNames = photographers.map((photographer) => photographer.name);

function getPhotographerByName(name) {
  return photographers.find((photographer) => photographer.name === name);
}
const propertyTypes = ["Villa", "Apartment", "Townhouse"];

const serviceOptions = [
  { key: "photos", label: "Photos" },
  { key: "video", label: "Video" },
  { key: "drone", label: "Drone photos" },
];

const photographerCalendarLinks = {
  Kevan: "https://calendar.google.com/calendar/u/0/r",
  Marcos: "https://calendar.google.com/calendar/u/0/r?cid=panorama-marcos-calendar",
  Cauana: "https://calendar.google.com/calendar/u/0/r?cid=panorama-cauana-calendar",
};

const weatherInsights = [
  { day: "Mon", time: "10:00", label: "Soft light", detail: "Clear · 22° · low wind", score: "Best" },
  { day: "Tue", time: "10:00", label: "Bright sun", detail: "Sunny · 24° · strong contrast", score: "Good" },
  { day: "Wed", time: "16:00", label: "Golden approach", detail: "Partly cloudy · 22°", score: "Best" },
  { day: "Thu", time: "12:00", label: "Harsh midday", detail: "Clear · 25° · high sun", score: "Avoid" },
  { day: "Fri", time: "18:00", label: "Golden hour", detail: "Clear · sunset light", score: "Best" },
  { day: "Sat", time: "10:00", label: "Rain risk", detail: "Cloudy · possible rain", score: "Risk" },
];

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
    ref: "PS-001",
    title: "Villa Nueva Andalucía",
    propertyType: "Villa",
    address: "Nueva Andalucía",
    googlePin: "https://maps.google.com/?q=Nueva+Andalucia+Marbella",
    city: "Marbella",
    agent: "Kevan Martial",
    photographer: "Marcos",
    status: "new_request",
    date: "Unscheduled",
    day: "",
    time: "Pending",
    weather: "Pending",
    priority: "High",
    deliveryLink: "",
    services: ["photos", "drone"],
    notes: "Owner prefers late afternoon light.",
  },
  {
    id: 2,
    ref: "PS-002",
    title: "Penthouse Puente Romano",
    propertyType: "Apartment",
    address: "Golden Mile",
    googlePin: "https://maps.google.com/?q=Golden+Mile+Marbella",
    city: "Marbella",
    agent: "Alex Clover",
    photographer: "Cauana",
    status: "needs_confirmation",
    date: "Tue 21",
    day: "Tue",
    time: "10:00",
    weather: "☀️ 24°",
    priority: "Normal",
    deliveryLink: "",
    services: ["photos", "video"],
    notes: "Confirm access with concierge.",
  },
  {
    id: 3,
    ref: "PS-003",
    title: "Townhouse La Quinta",
    propertyType: "Townhouse",
    address: "La Quinta Golf",
    googlePin: "https://maps.google.com/?q=La+Quinta+Golf+Benahavis",
    city: "Benahavís",
    agent: "Sarina Garber",
    photographer: "Marcos",
    status: "scheduled",
    date: "Wed 22",
    day: "Wed",
    time: "16:00",
    weather: "🌤️ 22°",
    priority: "Normal",
    deliveryLink: "",
    services: ["photos", "video", "drone"],
    notes: "Terrace must be staged before arrival.",
  },
  {
    id: 4,
    ref: "PS-004",
    title: "Apartment Puerto Banús",
    propertyType: "Apartment",
    address: "Marina Banús",
    googlePin: "https://maps.google.com/?q=Marina+Banus+Marbella",
    city: "Marbella",
    agent: "Lindsey Medina PRRE",
    photographer: "Cauana",
    status: "shoot_done",
    date: "Fri 24",
    day: "Fri",
    time: "18:00",
    weather: "☀️ 25°",
    priority: "Urgent",
    deliveryLink: "",
    services: ["photos"],
    notes: "Send selects to editor today.",
  },
  {
    id: 5,
    ref: "PS-005",
    title: "Villa Cascada",
    propertyType: "Villa",
    address: "Cascada de Camoján",
    googlePin: "https://maps.google.com/?q=Cascada+de+Camojan+Marbella",
    city: "Marbella",
    agent: "Christopher Clover",
    photographer: "Marcos",
    status: "delivered",
    date: "Mon 20",
    day: "Mon",
    time: "12:00",
    weather: "☀️ 23°",
    priority: "Normal",
    deliveryLink: "https://drive.google.com/",
    services: ["photos", "drone"],
    notes: "Final gallery delivered to agent.",
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

const availabilityEvents = [
  { day: "Mon", time: "10:00", title: "Marcos available", type: "available" },
  { day: "Thu", time: "12:00", title: "Cauana available", type: "available" },
  { day: "Fri", time: "18:00", title: "Golden hour slot", type: "available" },
  { day: "Sat", time: "10:00", title: "Blocked", type: "busy" },
];

const timeSlots = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"];

function statusLabel(status) {
  return pipelineColumns.find((column) => column.key === status)?.label || status;
}

function dayLabel(day) {
  return calendarDays.find((calendarDay) => calendarDay.day === day);
}

function buildDateLabel(day) {
  const match = dayLabel(day);
  return match ? `${match.day} ${match.date}` : "Unscheduled";
}

function serviceLabels(services = []) {
  if (!services.length) return "Services pending";
  return services
    .map((service) => serviceOptions.find((option) => option.key === service)?.label)
    .filter(Boolean)
    .join(" · ");
}

function getWeatherInsight(day, time) {
  return weatherInsights.find((item) => item.day === day && item.time === time);
}

function propertyDisplayTitle(shoot) {
  if (!shoot) return "";
  return shoot.ref ? `${shoot.ref} - ${shoot.title}` : shoot.title;
}

function toggleArrayValue(values = [], value) {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

export default function PhotoSchedulerPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [shoots, setShoots] = useState(initialShoots);
  const [hasLoadedStoredShoots, setHasLoadedStoredShoots] = useState(false);
  const [selectedShoot, setSelectedShoot] = useState(initialShoots[0]);
  const [modal, setModal] = useState(null);
  const [filter, setFilter] = useState("This week");
  const [bookingSlot, setBookingSlot] = useState(null);
  const [draggedShootId, setDraggedShootId] = useState(null);
  const [googleAvailability, setGoogleAvailability] = useState([]);
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("panorama_photo_scheduler_shoots");
      if (stored) {
        const parsedShoots = JSON.parse(stored);
        if (Array.isArray(parsedShoots)) {
          setShoots(parsedShoots);
          setSelectedShoot(parsedShoots[0] || null);
        }
      }
    } catch (error) {
      console.error("Could not load stored photo scheduler shoots", error);
    } finally {
      setHasLoadedStoredShoots(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoadedStoredShoots) return;
    try {
      window.localStorage.setItem("panorama_photo_scheduler_shoots", JSON.stringify(shoots));
    } catch (error) {
      console.error("Could not save photo scheduler shoots", error);
    }
  }, [shoots, hasLoadedStoredShoots]);

  useEffect(() => {
    async function loadAvailability() {
      try {
        setIsLoadingAvailability(true);

        const response = await fetch("/api/google/availability");
        const data = await response.json();

        if (data.photographers) {
          setGoogleAvailability(data.photographers);
        }
      } catch (error) {
        console.error("Availability load failed", error);
      } finally {
        setIsLoadingAvailability(false);
      }
    }

    loadAvailability();

    const interval = setInterval(loadAvailability, 60000);

    return () => clearInterval(interval);
  }, []);

  const stats = useMemo(() => {
    return {
      total: shoots.length,
      pending: shoots.filter((s) => ["new_request", "needs_confirmation"].includes(s.status)).length,
      scheduled: shoots.filter((s) => s.status === "scheduled").length,
      completed: shoots.filter((s) => ["shoot_done", "delivered", "billed"].includes(s.status)).length,
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

  function deleteShoot(shootId) {
    setShoots((old) => {
      const nextShoots = old.filter((shoot) => shoot.id !== shootId);
      setSelectedShoot(nextShoots[0] || null);
      return nextShoots;
    });
    setModal(null);
  }

  function moveShootToStatus(shootId, nextStatus) {
    setShoots((old) =>
      old.map((shoot) => {
        if (shoot.id !== shootId) return shoot;

        const updated = {
          ...shoot,
          status: nextStatus,
          deliveryLink: nextStatus === "delivered" && !shoot.deliveryLink ? "https://drive.google.com/" : shoot.deliveryLink,
        };

        setSelectedShoot((current) => (current?.id === shootId ? updated : current));
        return updated;
      })
    );
  }

  function createShootFromData(data) {
    const newShoot = {
      id: Date.now(),
      ref: data.ref || `PS-${String(shoots.length + 1).padStart(3, "0")}`,
      title: data.title || "New Property Shoot",
      propertyType: data.propertyType || "Villa",
      address: data.address || "Address pending",
      googlePin: data.googlePin || "",
      city: data.city || "Marbella",
      agent: data.agent || agents[0],
      photographer: data.photographer || photographerNames[0],
      status: data.status || "new_request",
      services: data.services?.length ? data.services : ["photos"],
      date: data.date || "Unscheduled",
      day: data.day || "",
      time: data.time || "Pending",
      weather: data.weather || "Pending",
      priority: data.priority || "Normal",
      deliveryLink: data.deliveryLink || "",
      notes: data.notes || "",
    };

    setShoots((old) => [newShoot, ...old]);
    setSelectedShoot(newShoot);
    setActiveTab("pipeline");
    setModal("details");
  }

  function openBookingModal(slot) {
    setBookingSlot(slot);
    setModal("booking");
  }

  function scheduleExistingShoot({ shootId, day, time, photographer, googleEventId, googleEventLink }) {
    const weatherInsight = getWeatherInsight(day, time);

    setShoots((old) =>
      old.map((shoot) => {
        if (String(shoot.id) !== String(shootId)) return shoot;

        const updated = {
          ...shoot,
          status: "scheduled",
          day,
          time,
          date: buildDateLabel(day),
          photographer: photographer || shoot.photographer,
          weather: weatherInsight ? `${weatherInsight.label} · ${weatherInsight.detail}` : "Forecast pending",
          googleEventId: googleEventId || shoot.googleEventId,
          googleEventLink: googleEventLink || shoot.googleEventLink,
          notes: shoot.notes || `Scheduled from calendar for ${buildDateLabel(day)} at ${time}.`,
        };

        setSelectedShoot(updated);
        return updated;
      })
    );

    setBookingSlot(null);
    setModal("details");
  }

  return (
    <main className="min-h-screen bg-[#f5f3ee] text-[#123e63]">
      <div className="flex min-h-screen p-5">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} setModal={setModal} />

        <section className="flex-1 pl-5">
          <Topbar activeTab={activeTab} filter={filter} setFilter={setFilter} setModal={setModal} />

          {activeTab === "overview" && (
            <Overview stats={stats} shoots={shoots} setActiveTab={setActiveTab} openShoot={openShoot} />
          )}

          {activeTab === "pipeline" && (
            <Pipeline
              shoots={shoots}
              openShoot={openShoot}
              draggedShootId={draggedShootId}
              setDraggedShootId={setDraggedShootId}
              moveShootToStatus={moveShootToStatus}
            />
          )}

          {activeTab === "calendar" && (
            <CalendarView
              setModal={setModal}
              openShoot={openShoot}
              shoots={shoots}
              openBookingModal={openBookingModal}
              googleAvailability={googleAvailability}
              isLoadingAvailability={isLoadingAvailability}
            />
          )}

          {activeTab === "notes" && (
            <NotesView shoots={shoots} selectedShoot={selectedShoot} setSelectedShoot={setSelectedShoot} updateSelected={updateSelected} />
          )}
        </section>
      </div>

      {modal === "new" && <NewShootModal onClose={() => setModal(null)} onCreate={createShootFromData} />}

      {modal === "booking" && bookingSlot && (
        <BookingModal
          slot={bookingSlot}
          shoots={shoots}
          onClose={() => {
            setBookingSlot(null);
            setModal(null);
          }}
          onSchedule={async (form) => {
            const selectedShootForBooking = shoots.find(
              (shoot) => String(shoot.id) === String(form.shootId)
            );

            const photographer = getPhotographerByName(form.photographer);

            if (!selectedShootForBooking || !photographer) {
              alert("Please select a property and a connected photographer.");
              return;
            }

            if (photographer.id.includes("REPLACE_WITH")) {
              alert("This photographer does not have a real Supabase UUID yet. Replace the placeholder UUID first.");
              return;
            }

            const currentYear = new Date().getFullYear();
            const calendarDay = calendarDays.find((day) => day.day === form.day);

            if (!calendarDay) {
              alert("Invalid calendar day.");
              return;
            }

            const start = new Date(`${currentYear}-05-${calendarDay.date}T${form.time}:00`);
            const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);

            try {
              const response = await fetch("/api/google/create-event", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  shootId: selectedShootForBooking.id,
                  photographerId: photographer.id,
                  start: start.toISOString(),
                  end: end.toISOString(),
                  propertyTitle: selectedShootForBooking.title,
                  ref: selectedShootForBooking.ref,
                  address: selectedShootForBooking.address,
                  googlePin: selectedShootForBooking.googlePin,
                  services: selectedShootForBooking.services,
                  notes: selectedShootForBooking.notes,
                  agent: selectedShootForBooking.agent,
                }),
              });

              const data = await response.json();

              if (!response.ok) {
                alert(data.error || "Failed to create Google Calendar event.");
                return;
              }

              scheduleExistingShoot({
                ...form,
                googleEventId: data.googleEventId,
                googleEventLink: data.htmlLink,
              });

              setGoogleAvailability((current) =>
                current.map((item) => {
                  if (item.photographerId !== photographer.id) return item;

                  return {
                    ...item,
                    busy: [
                      ...(item.busy || []),
                      {
                        start: start.toISOString(),
                        end: end.toISOString(),
                      },
                    ],
                  };
                })
              );

              alert("Google Calendar event created and photographer invited.");
            } catch (error) {
              console.error(error);
              alert("Unexpected scheduling error.");
            }
          }}
        />
      )}

      {modal === "calendar" && <CalendarShareModal onClose={() => setModal(null)} />}

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
        <ShootDetailsDrawer shoot={selectedShoot} onClose={() => setModal(null)} updateSelected={updateSelected} onDelete={deleteShoot} />
      )}
    </main>
  );
}

function Sidebar({ activeTab, setActiveTab, setModal }) {
  return (
    <aside className="w-[280px] shrink-0 rounded-[34px] border border-[#d7e1e7] bg-white p-5 shadow-[0_20px_60px_rgba(18,62,99,0.08)]">
      <div className="rounded-[30px] bg-gradient-to-br from-[#123e63] to-[#2f7898] p-6 text-white">
        <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#e7d39a]">Panorama</p>
        <h1 className="mt-3 text-[30px] font-semibold leading-[1.08]">Photo Scheduler</h1>
        <p className="mt-4 text-sm leading-relaxed text-white/75">Photography bookings, confirmations, calendar and production notes.</p>
      </div>

      <nav className="mt-8 space-y-2">
        {["overview", "pipeline", "calendar", "notes"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`w-full rounded-2xl px-4 py-3 text-left text-[15px] font-semibold capitalize transition ${
              activeTab === tab ? "bg-[#123e63] text-white shadow-lg shadow-[#123e63]/15" : "text-[#46667b] hover:bg-[#dcebf2]"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      <div className="mt-8 rounded-[28px] border border-[#d7e1e7] bg-[#f8fbfc] p-5">
        <p className="text-[15px] font-semibold text-[#123e63]">Google Calendar</p>
        <p className="mt-2 text-sm leading-relaxed text-[#46667b]">Share photographer calendar links and plan availability.</p>
        <button onClick={() => setModal("calendar")} className="mt-5 w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-[#123e63] shadow-sm hover:bg-[#dcebf2]">
          Share calendars
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
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#2f7898]">Panorama Photography</p>
          <h2 className="mt-2 text-[44px] font-semibold tracking-[-0.04em] text-[#123e63] capitalize">{activeTab}</h2>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setModal("filter")} className="rounded-2xl border border-[#d7e1e7] bg-[#f8fbfc] px-5 py-3 text-sm font-semibold text-[#123e63]">
            {filter}
          </button>
          <button onClick={() => setModal("new")} className="rounded-2xl bg-[#123e63] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#123e63]/20">
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
              <h3 className="text-[30px] font-semibold tracking-[-0.03em] text-[#123e63]">Production Board</h3>
              <p className="mt-1 text-sm text-[#46667b]">Click any card to open its details, assignments and status.</p>
            </div>
            <button onClick={() => setActiveTab("pipeline")} className="rounded-2xl bg-[#dcebf2] px-5 py-3 text-sm font-semibold text-[#123e63]">Open pipeline</button>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {shoots.slice(0, 3).map((shoot) => <ShootCard key={shoot.id} shoot={shoot} onClick={() => openShoot(shoot)} />)}
          </div>
        </div>

        <div className="rounded-[34px] bg-gradient-to-br from-[#123e63] to-[#2f7898] p-7 text-white shadow-[0_20px_60px_rgba(18,62,99,0.15)]">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#e7d39a]">Confirmation flow</p>
          <h3 className="mt-2 text-[30px] font-semibold tracking-[-0.03em]">Bookings confirmed through calendar.</h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/75">Select an existing pipeline property from a calendar slot to schedule it without duplicating the card.</p>
        </div>
      </section>

      <OverviewRightPanel shoots={shoots} openShoot={openShoot} />
    </div>
  );
}

function OverviewRightPanel({ shoots, openShoot }) {
  const upcoming = shoots.filter((shoot) => shoot.status === "scheduled");

  return (
    <aside className="rounded-[34px] border border-[#d7e1e7] bg-white p-6 shadow-[0_20px_60px_rgba(18,62,99,0.08)]">
      <h3 className="text-[28px] font-semibold tracking-[-0.03em] text-[#123e63]">Upcoming Shoots</h3>
      <div className="mt-5 space-y-3">
        {(upcoming.length ? upcoming : shoots).map((shoot) => (
          <button key={shoot.id} onClick={() => openShoot(shoot)} className="w-full rounded-[26px] border border-[#d7e1e7] bg-[#f8fbfc] p-4 text-left transition hover:bg-[#dcebf2]">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[17px] font-semibold text-[#123e63]">{propertyDisplayTitle(shoot)}</p>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#2f7898]">{shoot.time}</span>
            </div>
            <p className="mt-2 text-sm text-[#46667b]">{shoot.agent} · {shoot.photographer}</p>
          </button>
        ))}
      </div>
    </aside>
  );
}

function Pipeline({ shoots, openShoot, draggedShootId, setDraggedShootId, moveShootToStatus }) {
  return (
    <div className="overflow-x-auto rounded-[34px] border border-[#d7e1e7] bg-white p-5 shadow-[0_20px_60px_rgba(18,62,99,0.08)]">
      <div className="mb-4 flex items-center justify-between px-1">
        <div>
          <h3 className="text-[28px] font-semibold tracking-[-0.03em] text-[#123e63]">Visual Production Pipeline</h3>
          <p className="mt-1 text-sm text-[#46667b]">Drag cards between stages to update the shoot status instantly.</p>
        </div>
        <span className="rounded-full bg-[#dcebf2] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#123e63]">Drag enabled</span>
      </div>

      <div className="flex min-w-[1400px] gap-4">
        {pipelineColumns.map((column) => {
          const columnShoots = shoots.filter((shoot) => shoot.status === column.key);

          return (
            <div
              key={column.key}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => {
                if (draggedShootId) moveShootToStatus(draggedShootId, column.key);
                setDraggedShootId(null);
              }}
              className="min-h-[720px] w-[300px] shrink-0 rounded-[30px] bg-[#f8fbfc] p-4 transition hover:bg-[#eef6f9]"
            >
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-[16px] font-semibold text-[#123e63]">{column.label}</h3>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#2f7898]">{columnShoots.length}</span>
              </div>

              <div className="space-y-3">
                {columnShoots.map((shoot) => (
                  <ShootCard
                    key={shoot.id}
                    shoot={shoot}
                    draggable
                    onDragStart={() => setDraggedShootId(shoot.id)}
                    onDragEnd={() => setDraggedShootId(null)}
                    onClick={() => openShoot(shoot)}
                  />
                ))}

                {columnShoots.length === 0 && <div className="rounded-[24px] border border-dashed border-[#c9dbe5] p-5 text-center text-sm font-semibold text-[#6d8ca0]">Drop cards here</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CalendarView({
  setModal,
  openShoot,
  shoots,
  openBookingModal,
  googleAvailability,
  isLoadingAvailability,
}) {
  function getShootForSlot(day, time) {
    return shoots.find((shoot) => shoot.day === day && shoot.time === time);
  }

  function busyPhotographersForSlot(day, time) {
    const currentYear = new Date().getFullYear();
    const calendarDay = calendarDays.find((item) => item.day === day);

    if (!calendarDay) return [];

    const slotStart = new Date(`${currentYear}-05-${calendarDay.date}T${time}:00`);
    const slotEnd = new Date(slotStart.getTime() + 2 * 60 * 60 * 1000);

    return (googleAvailability || []).filter((photographer) => {
      return (photographer.busy || []).some((busy) => {
        const busyStart = new Date(busy.start);
        const busyEnd = new Date(busy.end);

        return slotStart < busyEnd && slotEnd > busyStart;
      });
    });
  }

  return (
    <div className="rounded-[34px] border border-[#d7e1e7] bg-white p-6 shadow-[0_20px_60px_rgba(18,62,99,0.08)]">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-[34px] font-semibold tracking-[-0.03em] text-[#123e63]">Photographer Calendar</h3>
          <p className="mt-1 text-sm text-[#46667b]">
            Click a free slot, choose a property, then create a real Google Calendar booking.
          </p>
          <p className="mt-2 text-xs font-semibold text-[#6d8ca0]">
            {isLoadingAvailability ? "Refreshing Google availability..." : "Google availability refreshes every minute."}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-2xl bg-[#123e63] px-5 py-3 text-sm font-semibold text-white">Week</button>
          <button onClick={() => setModal("calendar")} className="rounded-2xl border border-[#d7e1e7] bg-[#f8fbfc] px-5 py-3 text-sm font-semibold text-[#123e63]">Sync Google</button>
        </div>
      </div>

      <div className="mb-5 grid gap-3 md:grid-cols-3">
        {(googleAvailability || []).map((photographer) => (
          <div key={photographer.photographerId} className="rounded-[24px] border border-[#d7e1e7] bg-[#f8fbfc] p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-[#123e63]">{photographer.photographerName}</p>
                <p className="mt-1 text-xs text-[#6d8ca0]">{photographer.email || "No email"}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase ${photographer.connected ? "bg-[#dcebf2] text-[#123e63]" : "bg-[#fff1ee] text-[#9f3d2f]"}`}>
                {photographer.connected ? "Connected" : "Needs sync"}
              </span>
            </div>
            <p className="mt-3 text-xs font-semibold text-[#2f7898]">
              {(photographer.busy || []).length} busy block{(photographer.busy || []).length === 1 ? "" : "s"} found
            </p>
          </div>
        ))}

        {!googleAvailability?.length && (
          <div className="rounded-[24px] border border-dashed border-[#c9dbe5] bg-[#f8fbfc] p-4 text-sm font-semibold text-[#6d8ca0]">
            No connected Google Calendars loaded yet.
          </div>
        )}
      </div>

      <div className="grid grid-cols-[90px_repeat(7,1fr)] overflow-hidden rounded-[28px] border border-[#d7e1e7]">
        <div className="bg-[#f8fbfc]" />
        {calendarDays.map((day) => (
          <div key={day.day} className="border-l border-[#d7e1e7] bg-[#f8fbfc] p-4 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#2f7898]">{day.day}</p>
            <p className="mt-1 text-[30px] font-semibold text-[#123e63]">{day.date}</p>
          </div>
        ))}

        {timeSlots.map((time) => (
          <div key={`row-${time}`} className="contents">
            <div className="border-t border-[#d7e1e7] bg-[#f8fbfc] p-3 text-xs font-semibold text-[#2f7898]">{time}</div>

            {calendarDays.map((day) => {
              const shoot = getShootForSlot(day.day, time);
              const availability = availabilityEvents.find((event) => event.day === day.day && event.time === time);
              const weather = getWeatherInsight(day.day, time);
              const busyPhotographers = busyPhotographersForSlot(day.day, time);

              return (
                <div key={`${day.day}-${time}`} className="relative min-h-[128px] border-l border-t border-[#d7e1e7] bg-white p-2">
                  {shoot ? (
                    <button onClick={() => openShoot(shoot)} className="w-full rounded-[20px] bg-[#123e63] p-3 text-left text-white shadow-sm transition hover:scale-[1.02]">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-bold">{shoot.time}</p>
                        <span className="rounded-full bg-white/15 px-2 py-1 text-[10px] font-semibold">{shoot.photographer}</span>
                      </div>
                      <p className="mt-1 text-sm font-semibold leading-tight">{propertyDisplayTitle(shoot)}</p>
                      <p className="mt-1 text-[11px] text-white/70">{serviceLabels(shoot.services)}</p>
                      {shoot.googleEventLink && (
                        <a href={shoot.googleEventLink} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()} className="mt-2 inline-block text-[10px] font-bold text-[#e7d39a] underline">
                          Open Google event
                        </a>
                      )}
                    </button>
                  ) : busyPhotographers.length ? (
                    <div className="w-full rounded-[20px] bg-[#f2d6d2] p-3 text-left">
                      <p className="text-xs font-bold text-[#9f3d2f]">Busy</p>
                      <p className="mt-1 text-sm font-semibold text-[#123e63]">
                        {busyPhotographers.map((photographer) => photographer.photographerName).join(" · ")}
                      </p>
                      <p className="mt-1 text-[11px] text-[#6d8ca0]">Google Calendar blocked</p>
                    </div>
                  ) : availability ? (
                    <button
                      onClick={() => (availability.type === "busy" ? null : openBookingModal({ day: day.day, time }))}
                      className={`w-full rounded-[20px] p-3 text-left shadow-sm transition hover:scale-[1.02] ${availability.type === "available" ? "bg-[#dcebf2] text-[#123e63]" : "bg-[#e7d39a] text-[#123e63]"}`}
                    >
                      <p className="text-xs font-bold">{time}</p>
                      <p className="mt-1 text-sm font-semibold leading-tight">{availability.title}</p>
                      {weather && <p className="mt-1 text-[10px] font-semibold opacity-70">{weather.label}</p>}
                    </button>
                  ) : (
                    <button onClick={() => openBookingModal({ day: day.day, time })} className="h-full min-h-[106px] w-full rounded-[20px] border border-dashed border-transparent p-3 text-left text-xs font-semibold text-[#9ab0bd] transition hover:border-[#c9dbe5] hover:bg-[#f8fbfc] hover:text-[#2f7898]">
                      + Schedule property
                      {weather && <span className="mt-2 block text-[10px] text-[#6d8ca0]">{weather.score}: {weather.label}</span>}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function NotesView({ shoots, selectedShoot, setSelectedShoot, updateSelected }) {
  return (
    <div className="grid gap-5 xl:grid-cols-[380px_1fr]">
      <aside className="rounded-[34px] border border-[#d7e1e7] bg-white p-5 shadow-[0_20px_60px_rgba(18,62,99,0.08)]">
        <h3 className="text-[28px] font-semibold tracking-[-0.03em] text-[#123e63]">Properties</h3>
        <div className="mt-5 space-y-3">
          {shoots.map((shoot) => (
            <button key={shoot.id} onClick={() => setSelectedShoot(shoot)} className={`w-full rounded-[28px] p-5 text-left transition ${selectedShoot?.id === shoot.id ? "bg-[#123e63] text-white" : "bg-[#f8fbfc] text-[#123e63]"}`}>
              <p className="text-[19px] font-semibold">{propertyDisplayTitle(shoot)}</p>
              <p className="mt-1 text-sm opacity-70">{shoot.city} · {serviceLabels(shoot.services)}</p>
            </button>
          ))}
        </div>
      </aside>

      <section className="rounded-[34px] border border-[#d7e1e7] bg-white p-6 shadow-[0_20px_60px_rgba(18,62,99,0.08)]">
        <h3 className="text-[42px] font-semibold tracking-[-0.04em] text-[#123e63]">{propertyDisplayTitle(selectedShoot)}</h3>
        <p className="mt-2 text-sm text-[#46667b]">Internal notes, confirmations and production updates.</p>

        <div className="mt-8 space-y-3">
          <Note author="Property Notes" text={selectedShoot.notes || "No notes added yet."} />
          <Note author="Services" text={serviceLabels(selectedShoot.services)} />
          <Note author="Team" text="Realtime notes/chat will be connected later with Supabase subscriptions." />
        </div>

        <label className="mt-6 block">
          <span className="mb-2 block text-sm font-semibold text-[#46667b]">Edit property notes</span>
          <textarea
            value={selectedShoot.notes || ""}
            onChange={(event) => updateSelected("notes", event.target.value)}
            rows={5}
            placeholder="Write internal production note..."
            className="w-full rounded-[28px] border border-[#d7e1e7] bg-[#f8fbfc] p-4 text-sm text-[#123e63] outline-none placeholder:text-[#6f8da0]"
          />
        </label>
      </section>
    </div>
  );
}

function ShootCard({ shoot, onClick, draggable = false, onDragStart, onDragEnd }) {
  return (
    <button draggable={draggable} onDragStart={onDragStart} onDragEnd={onDragEnd} onClick={onClick} className="w-full cursor-pointer rounded-[26px] border border-[#d7e1e7] bg-white p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg active:cursor-grabbing">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#2f7898]">{statusLabel(shoot.status)}</p>
          <h3 className="mt-2 text-[21px] font-semibold leading-tight tracking-[-0.03em] text-[#123e63]">{propertyDisplayTitle(shoot)}</h3>
        </div>
        <span className="rounded-full bg-[#f8fbfc] px-3 py-1 text-[11px] font-semibold text-[#46667b]">{shoot.propertyType}</span>
      </div>

      <p className="text-sm text-[#46667b]">{shoot.city} · {shoot.address}</p>
      <p className="mt-2 text-xs font-semibold text-[#2f7898]">{serviceLabels(shoot.services)}</p>

      <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-semibold">
        <span className="rounded-2xl bg-[#dcebf2] px-3 py-2 text-[#123e63]">{shoot.date}</span>
        <span className="rounded-2xl bg-[#f8fbfc] px-3 py-2 text-[#123e63]">{shoot.time}</span>
        <span className="rounded-2xl bg-[#e7d39a] px-3 py-2 text-[#123e63]">{shoot.weather}</span>
        <span className="rounded-2xl bg-[#f8fbfc] px-3 py-2 text-[#123e63]">{shoot.photographer}</span>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-[#6d8ca0]">Agent: {shoot.agent}</p>
      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#6d8ca0]">Notes: {shoot.notes || "No notes yet."}</p>

      {shoot.status === "delivered" && shoot.deliveryLink && (
        <a href={shoot.deliveryLink} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()} className="mt-4 block rounded-2xl border border-[#d7e1e7] bg-[#f8fbfc] px-3 py-2 text-center text-xs font-bold text-[#2f7898] hover:bg-[#dcebf2]">
          Open delivery folder
        </a>
      )}
    </button>
  );
}

function ShootDetailsDrawer({ shoot, onClose, updateSelected, onDelete }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/20 backdrop-blur-sm">
      <div className="h-full w-[560px] overflow-y-auto bg-white p-7 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#2f7898]">Property Card Details</p>
            <h2 className="mt-2 text-[42px] font-semibold leading-[1.02] tracking-[-0.05em] text-[#123e63]">{propertyDisplayTitle(shoot)}</h2>
          </div>
          <button onClick={onClose} className="rounded-2xl bg-[#f8fbfc] px-4 py-2 text-sm font-semibold text-[#123e63]">Close</button>
        </div>

        <div className="mt-7 space-y-4 rounded-[30px] border border-[#d7e1e7] bg-[#f8fbfc] p-5">
          <InfoRow label="Reference" value={shoot.ref} />
          <InfoRow label="Property type" value={shoot.propertyType} />
          <InfoRow label="Address" value={shoot.address} />
          <InfoRow label="Date" value={shoot.date} />
          <InfoRow label="Time" value={shoot.time} />
          <InfoRow label="Weather" value={shoot.weather} />
          <InfoRow label="Services" value={serviceLabels(shoot.services)} />
        </div>

        <div className="mt-8 grid gap-4">
          <label>
            <span className="mb-2 block text-sm font-semibold text-[#46667b]">Reference Number</span>
            <input value={shoot.ref || ""} onChange={(e) => updateSelected("ref", e.target.value)} placeholder="PS-001" className="w-full rounded-2xl border border-[#d7e1e7] bg-[#f8fbfc] px-4 py-3 text-sm text-[#123e63] outline-none" />
          </label>

          <label>
            <span className="mb-2 block text-sm font-semibold text-[#46667b]">Property Title</span>
            <input value={propertyDisplayTitle(shoot)} onChange={(e) => updateSelected("title", e.target.value)} className="w-full rounded-2xl border border-[#d7e1e7] bg-[#f8fbfc] px-4 py-3 text-sm text-[#123e63] outline-none" />
          </label>

          <label>
            <span className="mb-2 block text-sm font-semibold text-[#46667b]">Property Type</span>
            <select value={shoot.propertyType || "Villa"} onChange={(e) => updateSelected("propertyType", e.target.value)} className="w-full rounded-2xl border border-[#d7e1e7] bg-[#f8fbfc] px-4 py-3 text-sm text-[#123e63] outline-none">
              {propertyTypes.map((type) => <option key={type}>{type}</option>)}
            </select>
          </label>

          <label>
            <span className="mb-2 block text-sm font-semibold text-[#46667b]">Address</span>
            <input value={shoot.address || ""} onChange={(e) => updateSelected("address", e.target.value)} className="w-full rounded-2xl border border-[#d7e1e7] bg-[#f8fbfc] px-4 py-3 text-sm text-[#123e63] outline-none" />
          </label>

          <label>
            <span className="mb-2 block text-sm font-semibold text-[#46667b]">Google Pin Location</span>
            <input value={shoot.googlePin || ""} onChange={(e) => updateSelected("googlePin", e.target.value)} placeholder="https://maps.google.com/..." className="w-full rounded-2xl border border-[#d7e1e7] bg-[#f8fbfc] px-4 py-3 text-sm text-[#123e63] outline-none" />
            {shoot.googlePin && <a href={shoot.googlePin} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs font-bold text-[#2f7898]">Open Google pin</a>}
          </label>

          <ServiceSelector services={shoot.services || []} onChange={(services) => updateSelected("services", services)} />

          <label>
            <span className="mb-2 block text-sm font-semibold text-[#46667b]">Notes Section</span>
            <textarea value={shoot.notes || ""} onChange={(e) => updateSelected("notes", e.target.value)} rows={5} placeholder="Access notes, owner preferences, staging reminders..." className="w-full rounded-2xl border border-[#d7e1e7] bg-[#f8fbfc] px-4 py-3 text-sm text-[#123e63] outline-none" />
          </label>

          <label>
            <span className="mb-2 block text-sm font-semibold text-[#46667b]">Assign Agent</span>
            <select value={shoot.agent} onChange={(e) => updateSelected("agent", e.target.value)} className="w-full rounded-2xl border border-[#d7e1e7] bg-[#f8fbfc] px-4 py-3 text-sm text-[#123e63] outline-none">
              {agents.map((agent) => <option key={agent}>{agent}</option>)}
            </select>
          </label>

          <label>
            <span className="mb-2 block text-sm font-semibold text-[#46667b]">Assigned Photographer</span>
            <select value={shoot.photographer} onChange={(e) => updateSelected("photographer", e.target.value)} className="w-full rounded-2xl border border-[#d7e1e7] bg-[#f8fbfc] px-4 py-3 text-sm text-[#123e63] outline-none">
              {photographerNames.map((p) => <option key={p}>{p}</option>)}
            </select>
          </label>

          <label>
            <span className="mb-2 block text-sm font-semibold text-[#46667b]">Pipeline Status</span>
            <select value={shoot.status} onChange={(e) => updateSelected("status", e.target.value)} className="w-full rounded-2xl border border-[#d7e1e7] bg-[#f8fbfc] px-4 py-3 text-sm text-[#123e63] outline-none">
              {pipelineColumns.map((column) => <option key={column.key} value={column.key}>{column.label}</option>)}
            </select>
          </label>

          <label>
            <span className="mb-2 block text-sm font-semibold text-[#46667b]">Google / Dropbox Delivery Link</span>
            <input value={shoot.deliveryLink || ""} onChange={(e) => updateSelected("deliveryLink", e.target.value)} placeholder="https://drive.google.com/... or https://dropbox.com/..." className="w-full rounded-2xl border border-[#d7e1e7] bg-[#f8fbfc] px-4 py-3 text-sm text-[#123e63] outline-none" />
          </label>
        </div>

        <div className="mt-8 grid grid-cols-[1fr_auto] gap-3">
          <button onClick={onClose} className="rounded-2xl bg-[#123e63] px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-[#123e63]/20">Save Updates</button>
          <button
            onClick={() => {
              const confirmed = window.confirm(`Delete ${propertyDisplayTitle(shoot)} from the pipeline?`);
              if (confirmed) onDelete(shoot.id);
            }}
            className="rounded-2xl border border-[#e7c4bc] bg-[#fff7f5] px-5 py-4 text-sm font-semibold text-[#9f3d2f] hover:bg-[#ffe9e4]"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function NewShootModal({ onClose, onCreate }) {
  const [form, setForm] = useState({
    ref: "",
    title: "",
    propertyType: "Villa",
    address: "",
    googlePin: "",
    city: "Marbella",
    notes: "",
    services: ["photos"],
    agent: agents[0],
    photographer: photographerNames[0],
    status: "new_request",
    priority: "Normal",
    deliveryLink: "",
  });

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <BasicModal title="Create New Shoot" onClose={onClose} wide>
      <div className="grid gap-4">
        <input value={form.ref} onChange={(e) => update("ref", e.target.value)} placeholder="Reference number, e.g. PS-006" className="rounded-2xl border border-[#d7e1e7] bg-[#f8fbfc] px-4 py-3 text-sm outline-none" />
        <input value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="Property title" className="rounded-2xl border border-[#d7e1e7] bg-[#f8fbfc] px-4 py-3 text-sm outline-none" />

        <select value={form.propertyType} onChange={(e) => update("propertyType", e.target.value)} className="rounded-2xl border border-[#d7e1e7] bg-[#f8fbfc] px-4 py-3 text-sm outline-none">
          {propertyTypes.map((type) => <option key={type}>{type}</option>)}
        </select>

        <input value={form.address} onChange={(e) => update("address", e.target.value)} placeholder="Address" className="rounded-2xl border border-[#d7e1e7] bg-[#f8fbfc] px-4 py-3 text-sm outline-none" />
        <input value={form.googlePin} onChange={(e) => update("googlePin", e.target.value)} placeholder="Google pin location" className="rounded-2xl border border-[#d7e1e7] bg-[#f8fbfc] px-4 py-3 text-sm outline-none" />
        <input value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="City" className="rounded-2xl border border-[#d7e1e7] bg-[#f8fbfc] px-4 py-3 text-sm outline-none" />

        <ServiceSelector services={form.services} onChange={(services) => update("services", services)} />

        <textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} rows={4} placeholder="Notes section: access, owner preferences, staging reminders..." className="rounded-2xl border border-[#d7e1e7] bg-[#f8fbfc] px-4 py-3 text-sm outline-none" />

        <select value={form.agent} onChange={(e) => update("agent", e.target.value)} className="rounded-2xl border border-[#d7e1e7] bg-[#f8fbfc] px-4 py-3 text-sm outline-none">
          {agents.map((agent) => <option key={agent}>{agent}</option>)}
        </select>

        <select value={form.photographer} onChange={(e) => update("photographer", e.target.value)} className="rounded-2xl border border-[#d7e1e7] bg-[#f8fbfc] px-4 py-3 text-sm outline-none">
          {photographerNames.map((p) => <option key={p}>{p}</option>)}
        </select>

        <button onClick={() => onCreate(form)} className="mt-3 rounded-2xl bg-[#123e63] px-5 py-4 text-sm font-semibold text-white">Create card in pipeline</button>
      </div>
    </BasicModal>
  );
}

function BookingModal({ slot, shoots, onClose, onSchedule }) {
  const scheduleableShoots = shoots.filter((shoot) => !["scheduled", "shoot_done", "delivered", "billed"].includes(shoot.status));
  const fallbackShoot = scheduleableShoots[0] || shoots[0];
  const [form, setForm] = useState({
    shootId: fallbackShoot?.id || "",
    photographer: fallbackShoot?.photographer || photographerNames[0],
    day: slot.day,
    time: slot.time,
  });

  const selectedShoot = shoots.find((shoot) => String(shoot.id) === String(form.shootId));
  const weather = getWeatherInsight(form.day, form.time);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <BasicModal title="Book Calendar Slot" onClose={onClose} wide>
      <div className="mb-5 rounded-[26px] bg-[#f8fbfc] p-4">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#2f7898]">Selected slot</p>
        <p className="mt-2 text-[24px] font-semibold tracking-[-0.03em] text-[#123e63]">{buildDateLabel(form.day)} · {form.time}</p>
        {weather && <p className="mt-2 text-sm font-semibold text-[#46667b]">{weather.score}: {weather.label} · {weather.detail}</p>}
      </div>

      <div className="grid gap-4">
        <label>
          <span className="mb-2 block text-sm font-semibold text-[#46667b]">Select property from pipeline</span>
          <select value={form.shootId} onChange={(e) => {
            const nextShoot = shoots.find((shoot) => String(shoot.id) === e.target.value);
            setForm((prev) => ({ ...prev, shootId: e.target.value, photographer: nextShoot?.photographer || prev.photographer }));
          }} className="w-full rounded-2xl border border-[#d7e1e7] bg-[#f8fbfc] px-4 py-3 text-sm outline-none">
            {scheduleableShoots.map((shoot) => <option key={shoot.id} value={shoot.id}>{propertyDisplayTitle(shoot)} · {statusLabel(shoot.status)}</option>)}
            {!scheduleableShoots.length && shoots.map((shoot) => <option key={shoot.id} value={shoot.id}>{propertyDisplayTitle(shoot)}</option>)}
          </select>
        </label>

        {selectedShoot && (
          <div className="rounded-[26px] border border-[#d7e1e7] bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#2f7898]">Imported property card</p>
            <h4 className="mt-2 text-[22px] font-semibold tracking-[-0.03em] text-[#123e63]">{propertyDisplayTitle(selectedShoot)}</h4>
            <p className="mt-1 text-sm text-[#46667b]">{selectedShoot.propertyType} · {selectedShoot.address}</p>
            <p className="mt-2 text-xs font-semibold text-[#2f7898]">{serviceLabels(selectedShoot.services)}</p>
            <p className="mt-2 text-xs leading-relaxed text-[#6d8ca0]">{selectedShoot.notes || "No notes yet."}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <select value={form.day} onChange={(e) => update("day", e.target.value)} className="rounded-2xl border border-[#d7e1e7] bg-[#f8fbfc] px-4 py-3 text-sm outline-none">
            {calendarDays.map((day) => <option key={day.day} value={day.day}>{day.day} {day.date}</option>)}
          </select>

          <select value={form.time} onChange={(e) => update("time", e.target.value)} className="rounded-2xl border border-[#d7e1e7] bg-[#f8fbfc] px-4 py-3 text-sm outline-none">
            {timeSlots.map((time) => <option key={time} value={time}>{time}</option>)}
          </select>
        </div>

        <label>
          <span className="mb-2 block text-sm font-semibold text-[#46667b]">Assign / confirm photographer</span>
          <select value={form.photographer} onChange={(e) => update("photographer", e.target.value)} className="w-full rounded-2xl border border-[#d7e1e7] bg-[#f8fbfc] px-4 py-3 text-sm outline-none">
            {photographerNames.map((p) => <option key={p}>{p}</option>)}
          </select>
        </label>

        <button disabled={!form.shootId} onClick={() => onSchedule(form)} className="mt-3 rounded-2xl bg-[#123e63] px-5 py-4 text-sm font-semibold text-white disabled:opacity-40">Schedule selected property</button>
      </div>
    </BasicModal>
  );
}

function CalendarShareModal({ onClose }) {
  return (
    <BasicModal title="Photographer Calendar Sharing" onClose={onClose}>
      <div className="grid gap-4">
        {photographerNames.map((photographer) => (
          <div key={photographer} className="rounded-[26px] border border-[#d7e1e7] bg-[#f8fbfc] p-4">
            <p className="text-[18px] font-semibold text-[#123e63]">{photographer}</p>
            <p className="mt-1 text-sm text-[#46667b]">Share this Google Calendar link so availability can be managed externally.</p>
            <a href={photographerCalendarLinks[photographer]} target="_blank" rel="noreferrer" className="mt-3 inline-block rounded-2xl bg-white px-4 py-3 text-sm font-bold text-[#2f7898] hover:bg-[#dcebf2]">Open calendar link</a>
          </div>
        ))}
        <p className="text-xs leading-relaxed text-[#6d8ca0]">Backend is now connected to Google Calendar. Busy slots are pulled from Google and booking creates real Google Calendar events.</p>
      </div>
    </BasicModal>
  );
}

function ServiceSelector({ services, onChange }) {
  return (
    <div>
      <span className="mb-2 block text-sm font-semibold text-[#46667b]">What we need to do</span>
      <div className="grid grid-cols-3 gap-2">
        {serviceOptions.map((option) => {
          const active = services.includes(option.key);
          return (
            <button
              key={option.key}
              type="button"
              onClick={() => onChange(toggleArrayValue(services, option.key))}
              className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${active ? "border-[#123e63] bg-[#123e63] text-white" : "border-[#d7e1e7] bg-[#f8fbfc] text-[#123e63] hover:bg-[#dcebf2]"}`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function BasicModal({ title, children, onClose, wide = false }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-5 backdrop-blur-sm">
      <div className={`w-full ${wide ? "max-w-[620px]" : "max-w-[520px]"} max-h-[90vh] overflow-y-auto rounded-[34px] bg-white p-7 shadow-2xl`}>
        <div className="mb-5 flex items-center justify-between gap-4">
          <h3 className="text-[30px] font-semibold tracking-[-0.03em] text-[#123e63]">{title}</h3>
          <button onClick={onClose} className="rounded-2xl bg-[#f8fbfc] px-4 py-2 text-sm font-semibold text-[#123e63]">Close</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Note({ author, text }) {
  return (
    <div className="rounded-[28px] bg-[#f8fbfc] p-5">
      <p className="text-[16px] font-semibold text-[#123e63]">{author}</p>
      <p className="mt-2 text-sm leading-relaxed text-[#46667b]">{text}</p>
    </div>
  );
}

function StatCard({ title, value, dark }) {
  return (
    <div className={`rounded-[30px] p-6 ${dark ? "bg-gradient-to-br from-[#123e63] to-[#2f7898] text-white" : "border border-[#d7e1e7] bg-white"}`}>
      <p className="text-[54px] font-semibold tracking-[-0.05em]">{value}</p>
      <p className={`mt-2 text-[11px] uppercase tracking-[0.28em] ${dark ? "text-[#e7d39a]" : "text-[#2f7898]"}`}>{title}</p>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#e4edf2] pb-3 last:border-b-0 last:pb-0">
      <span className="text-sm font-semibold text-[#46667b]">{label}</span>
      <span className="text-right text-sm font-semibold text-[#123e63]">{value || "—"}</span>
    </div>
  );
}
