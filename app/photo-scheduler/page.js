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

const agentContacts = [
  { name: "Alejandro Romera PRRE", email: "romera@puenteromanorealestate.com", phone: "+34649651757" },
  { name: "Alex Clover", email: "alex@panorama.es", phone: "+34677548903" },
  { name: "Alfonso Muñoz", email: "alfonso@panorama.es", phone: "+34606082226" },
  { name: "Ash Rasoulian", email: "ash@panorama.es", phone: "+34684402790" },
  { name: "Beatrice Pittá", email: "beatrice@panorama.es", phone: "+34639196674" },
  { name: "Beatriz Garvayo", email: "garvayo@panorama.es", phone: "+34687916578" },
  { name: "Carolina Alaniz", email: "carolina@panorama.es", phone: "+34686124709" },
  { name: "Christopher Clover", email: "clover@panorama.es", phone: "+34609801885" },
  { name: "C. Lawton", email: "lawton@panorama.es", phone: "+34609344355" },
  { name: "David Montero", email: "david@panorama.es", phone: "+34615101460" },
  { name: "Dominik Maroszek", email: "dominik@panorama.es", phone: "+34639161546" },
  { name: "Eva Kiepel", email: "eva@panorama.es", phone: "+34648136105" },
  { name: "Evi Tinno", email: "evi@panorama.es", phone: "+34607841921" },
  { name: "Gonzalo Ruiz", email: "gonzalo@panorama.es", phone: "+34634547716" },
  { name: "Johan Olson", email: "johan@panorama.es", phone: "+34625617268" },
  { name: "Jo Borda", email: "jo@panorama.es", phone: "+34664225667" },
  { name: "Jovita Vicuña", email: "jovita@panorama.es", phone: "+34609947996" },
  { name: "Jules Franken", email: "jules@panorama.es", phone: "+34629589964" },
  { name: "Katinka Clover", email: "katinka@panorama.es", phone: "+34630156599" },
  { name: "Kevan Martial", email: "kevan@panorama.es", phone: "+34611269723" },
  { name: "Lindsey Medina PRRE", email: "lindsey@puenteromanorealestate.com", phone: "+34687916455" },
  { name: "Loli Vazquez", email: "loli@panorama.es", phone: "+34629992011" },
  { name: "Lorena Alaniz", email: "lorena@panorama.es", phone: "+34677293057" },
  { name: "Luca Solari", email: "luca@panorama.es", phone: "+34650159605" },
  { name: "Marco Dalli", email: "marco@panorama.es", phone: "+34678648765" },
  { name: "Natividad Muñoz", email: "natividad@panorama.es", phone: "+34614048389" },
  { name: "Samia Mohamdi", email: "samia@panorama.es", phone: "+34633881858" },
  { name: "Sarina Garber", email: "sarina@panorama.es", phone: "+34677548902" },
  { name: "Sean Cannon", email: "sean@panorama.es", phone: "+34656705781" },
  { name: "Sian Luijke-Roskott", email: "sianellen@panorama.es", phone: "+34618023939" },
  { name: "Silvina Rigada", email: "silvina@panorama.es", phone: "+34619675041" },
  { name: "Steve Barre", email: "steve@panorama.es", phone: "+34659669425" },
  { name: "Vanesa Mena", email: "vanesa@panorama.es", phone: "+34645695551" },
  { name: "Walter Fernandez", email: "walter@panorama.es", phone: "+34607846041" },
];

const agents = agentContacts.map((agent) => agent.name);

function getAgentByName(name) {
  return agentContacts.find((agent) => agent.name === name) || null;
}

const photographers = [
  {
    id: "e45a94ec-c733-49e7-8513-709202bf7652",
    name: "Kevan",
    email: "kevan@panorama.es",
    color: "#123e63",
  },
  {
    id: "9dc6ee67-f9ca-4ae2-aa0d-9c4eb0bf11c2",
    name: "Marcos",
    email: "marcos@panorama.es",
    color: "#2f7898",
  },
  {
    id: "976e90b6-fa1b-4e06-be04-acf358273136",
    name: "Cauana",
    email: "cauana@panorama.es",
    color: "#e7d39a",
  },
];

const photographerNames = photographers.map((photographer) => photographer.name);

function getPhotographerByName(name) {
  return photographers.find((photographer) => photographer.name === name);
}

const propertyTypes = ["Villa", "Apartment", "Townhouse", "Property"];

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

const initialShoots = [];

const availabilityEvents = [];
function buildTimeSlots() {
  const slots = [];
  for (let hour = 8; hour <= 19; hour += 1) {
    slots.push(`${String(hour).padStart(2, "0")}:00`);
    slots.push(`${String(hour).padStart(2, "0")}:30`);
  }
  return slots;
}

const timeSlots = buildTimeSlots();
const LOCAL_STORAGE_KEY = "panorama_photo_scheduler_shoots";
const LEGACY_LOCAL_STORAGE_KEY = "panorama-photo-shoots";

function statusLabel(status) {
  return pipelineColumns.find((column) => column.key === status)?.label || status;
}

function normalizeStatus(status) {
  if (!status) return "new_request";

  const map = {
    "New Request": "new_request",
    "Needs Confirmation": "needs_confirmation",
    "Awaiting Schedule": "needs_confirmation",
    "Scheduled": "scheduled",
    "Shoot Done": "shoot_done",
    "Delivered": "delivered",
    "Billed": "billed",
    needs_scheduling: "needs_confirmation",
    awaiting_schedule: "needs_confirmation",
    editing: "shoot_done",
  };

  return map[status] || status;
}

function startOfWeek(date) {
  const result = new Date(date);
  const currentDay = result.getDay();
  const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
  result.setHours(0, 0, 0, 0);
  result.setDate(result.getDate() + mondayOffset);
  return result;
}

function startOfMonth(date) {
  const result = new Date(date);
  result.setDate(1);
  result.setHours(0, 0, 0, 0);
  return result;
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function buildCalendarRange(view, anchorDate) {
  if (view === "day") {
    const date = new Date(anchorDate);
    date.setHours(0, 0, 0, 0);
    return [toCalendarDay(date)];
  }

  if (view === "month") {
    const firstOfMonth = startOfMonth(anchorDate);
    const gridStart = startOfWeek(firstOfMonth);
    return Array.from({ length: 35 }, (_, index) => toCalendarDay(addDays(gridStart, index)));
  }

  const monday = startOfWeek(anchorDate);
  return Array.from({ length: 7 }, (_, index) => toCalendarDay(addDays(monday, index)));
}

function toLocalIsoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function toCalendarDay(date) {
  return {
    day: date.toLocaleDateString("en-US", { weekday: "short" }),
    date: date.toLocaleDateString("en-US", { day: "2-digit" }),
    month: date.toLocaleDateString("en-US", { month: "short" }),
    isoDate: toLocalIsoDate(date),
    monthIndex: date.getMonth(),
    year: date.getFullYear(),
  };
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

function formatDateLabel(isoDate) {
  if (!isoDate) return "Unscheduled";
  const date = new Date(`${isoDate}T00:00:00`);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
}

function buildDateLabel(calendarDay) {
  if (!calendarDay) return "Unscheduled";
  return `${calendarDay.day} ${calendarDay.date} ${calendarDay.month}`;
}

function parseStoredShoots(key) {
  try {
    const stored = window.localStorage.getItem(key);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error(`Could not parse ${key}`, error);
    return [];
  }
}

function mapSupabaseRowToShoot(row, index) {
  const shootDate = row.shoot_date ? new Date(row.shoot_date) : null;
  const isoDate = shootDate ? toLocalIsoDate(shootDate) : "";

  return {
    id: row.id,
    source: "supabase",
    ref: `PS-${String(index + 1).padStart(3, "0")}`,
    title: row.title || "Untitled Property",
    propertyType: row.property_type || "Property",
    address: row.address || "",
    googlePin: row.google_pin || "",
    city: row.city || "",
    agent: row.agent || "",
    photographer: row.photographer || photographerNames[0],
    status: normalizeStatus(row.status),
    date: isoDate ? formatDateLabel(isoDate) : "Unscheduled",
    day: shootDate ? shootDate.toLocaleDateString("en-US", { weekday: "short" }) : "",
    isoDate,
    time: shootDate
      ? shootDate.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      : "Pending",
    weather: row.weather_summary || "Pending",
    priority: row.priority || "normal",
    deliveryLink: row.delivery_link || "",
    services: row.services?.length ? row.services : ["photos"],
    notes: row.notes || "",
    billingStatus: row.billing_status || "pending",
    googleEventId: row.google_event_id || "",
    googleCalendarId: row.google_calendar_id || "primary",
    googleEventLink: row.google_event_link || "",
  };
}

function mergeShoots(localShoots, supabaseShoots) {
  const seen = new Set();
  const merged = [];

  [...localShoots, ...supabaseShoots].forEach((shoot) => {
    const key = String(shoot.id);
    if (seen.has(key)) return;
    seen.add(key);
    merged.push(shoot);
  });

  return merged;
}

export default function PhotoSchedulerPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [shoots, setShoots] = useState(initialShoots);
  const [hasLoadedStoredShoots, setHasLoadedStoredShoots] = useState(false);
  const [selectedShoot, setSelectedShoot] = useState(null);
  const [modal, setModal] = useState(null);
  const [filter, setFilter] = useState("This week");
  const [bookingSlot, setBookingSlot] = useState(null);
  const [draggedShootId, setDraggedShootId] = useState(null);
  const [googleAvailability, setGoogleAvailability] = useState([]);
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(false);
  const [clearOutsideWeather, setClearOutsideWeather] = useState([]);
  const [calendarView, setCalendarView] = useState("week");
  const [calendarAnchorDate, setCalendarAnchorDate] = useState(new Date());
  const [rescheduleRequest, setRescheduleRequest] = useState(null);

  const visibleDays = useMemo(
    () => buildCalendarRange(calendarView, calendarAnchorDate),
    [calendarView, calendarAnchorDate]
  );

  const calendarTitle = useMemo(() => {
    if (calendarView === "day") {
      return calendarAnchorDate.toLocaleDateString("en-US", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    }

    if (calendarView === "month") {
      return calendarAnchorDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
    }

    const first = visibleDays[0];
    const last = visibleDays[visibleDays.length - 1];
    return `${first?.date} ${first?.month} - ${last?.date} ${last?.month}`;
  }, [calendarAnchorDate, calendarView, visibleDays]);

  useEffect(() => {
    async function loadShootsFromSources() {
      try {
        const localShoots = mergeShoots(
          parseStoredShoots(LOCAL_STORAGE_KEY),
          parseStoredShoots(LEGACY_LOCAL_STORAGE_KEY)
        );

        const response = await fetch("/api/photo-properties");
        const rows = await response.json();
        const supabaseShoots = Array.isArray(rows)
          ? rows.map((row, index) => mapSupabaseRowToShoot(row, index))
          : [];

        const mergedShoots = mergeShoots(localShoots, supabaseShoots);

        if (mergedShoots.length) {
          setShoots(mergedShoots);
          setSelectedShoot(mergedShoots[0]);
        }
      } catch (error) {
        console.error("Could not load shoots", error);
      } finally {
        setHasLoadedStoredShoots(true);
      }
    }

    loadShootsFromSources();
  }, []);

  useEffect(() => {
    if (!hasLoadedStoredShoots) return;

    try {
      const localOnlyShoots = shoots.filter((shoot) => shoot.source !== "supabase");
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localOnlyShoots));
    } catch (error) {
      console.error("Could not save local photo scheduler shoots", error);
    }
  }, [shoots, hasLoadedStoredShoots]);

  useEffect(() => {
    async function loadAvailability() {
      try {
        setIsLoadingAvailability(true);

        const rangeStart = new Date(`${visibleDays[0].isoDate}T00:00:00`);
        const rangeEnd = new Date(`${visibleDays[visibleDays.length - 1].isoDate}T23:59:59`);

        const response = await fetch(
          `/api/google/availability?start=${encodeURIComponent(rangeStart.toISOString())}&end=${encodeURIComponent(rangeEnd.toISOString())}`
        );
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

    if (!visibleDays.length) return;

    loadAvailability();
    const interval = setInterval(loadAvailability, 60000);
    return () => clearInterval(interval);
  }, [visibleDays]);

  useEffect(() => {
    async function loadClearOutsideWeather() {
      try {
        const response = await fetch("/api/weather/clearoutside");
        const data = await response.json();

        if (Array.isArray(data.forecast)) {
          setClearOutsideWeather(data.forecast);
        }
      } catch (error) {
        console.error("Clear Outside weather load failed", error);
      }
    }

    loadClearOutsideWeather();
    const interval = setInterval(loadClearOutsideWeather, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function refreshShootsFromSupabase() {
      try {
        const response = await fetch("/api/photo-properties");
        const rows = await response.json();

        if (!Array.isArray(rows)) {
          console.error("Unexpected photo-properties refresh response", rows);
          return;
        }

        const supabaseShoots = rows.map((row, index) => mapSupabaseRowToShoot(row, index));

        setShoots((current) => {
          const localOnlyShoots = current.filter((shoot) => shoot.source !== "supabase");
          return mergeShoots(localOnlyShoots, supabaseShoots);
        });

        setSelectedShoot((current) => {
          if (!current) return supabaseShoots[0] || null;
          return supabaseShoots.find((shoot) => String(shoot.id) === String(current.id)) || current;
        });
      } catch (error) {
        console.error("Could not refresh Supabase shoots", error);
      }
    }

    refreshShootsFromSupabase();
    const interval = setInterval(refreshShootsFromSupabase, 60000);
    return () => clearInterval(interval);
  }, []);

  const filteredShoots = useMemo(() => {
    if (filter === "Today") {
      const todayIso = toLocalIsoDate(new Date());
      return shoots.filter((shoot) => shoot.isoDate === todayIso);
    }

    if (filter === "This week") {
      const weekDays = buildCalendarRange("week", new Date()).map((day) => day.isoDate);
      return shoots.filter((shoot) => !shoot.isoDate || weekDays.includes(shoot.isoDate));
    }

    if (filter === "This month") {
      const now = new Date();
      return shoots.filter((shoot) => {
        if (!shoot.isoDate) return true;
        const shootDate = new Date(`${shoot.isoDate}T00:00:00`);
        return shootDate.getMonth() === now.getMonth() && shootDate.getFullYear() === now.getFullYear();
      });
    }

    return shoots;
  }, [shoots, filter]);

  const stats = useMemo(() => {
    return {
      total: filteredShoots.length,
      pending: filteredShoots.filter((s) => ["new_request", "needs_confirmation"].includes(s.status)).length,
      scheduled: filteredShoots.filter((s) => s.status === "scheduled").length,
      completed: filteredShoots.filter((s) => ["shoot_done", "delivered", "billed"].includes(s.status)).length,
    };
  }, [filteredShoots]);

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

  async function saveShootToSupabase(shoot) {
    if (!shoot?.id) return;

    try {
      const shootDate = shoot.isoDate && shoot.time && shoot.time !== "Pending"
        ? `${shoot.isoDate}T${shoot.time}:00`
        : null;

      const response = await fetch("/api/photo-properties", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: shoot.id,
          title: shoot.title,
          address: shoot.address,
          city: shoot.city,
          shoot_date: shootDate,
          photographer: shoot.photographer,
          agent: shoot.agent,
          status: shoot.status,
          priority: shoot.priority,
          weather_summary: shoot.weather,
          billing_status: shoot.billingStatus || "pending",
          property_type: shoot.propertyType,
          google_pin: shoot.googlePin,
          services: shoot.services,
          notes: shoot.notes,
          delivery_link: shoot.deliveryLink,
          google_event_id: shoot.googleEventId,
          google_event_link: shoot.googleEventLink,
          google_calendar_id: shoot.googleCalendarId || "primary",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Failed to save shoot to Supabase", data);
        alert(data.error || "This change was not saved to Supabase.");
      }
    } catch (error) {
      console.error("Supabase save error", error);
      alert("This change was not saved to Supabase.");
    }
  }

  function moveShootToStatus(shootId, nextStatus) {
    let changedShoot = null;

    setShoots((old) =>
      old.map((shoot) => {
        if (shoot.id !== shootId) return shoot;

        const shouldStayOnCalendar = ["needs_confirmation", "scheduled", "shoot_done", "delivered", "billed"].includes(nextStatus);

        const updated = {
          ...shoot,
          status: nextStatus,
          isoDate: shouldStayOnCalendar ? shoot.isoDate : "",
          day: shouldStayOnCalendar ? shoot.day : "",
          date: shouldStayOnCalendar ? shoot.date : "Unscheduled",
          time: shouldStayOnCalendar ? shoot.time : "Pending",
          deliveryLink: nextStatus === "delivered" && !shoot.deliveryLink ? "https://drive.google.com/" : shoot.deliveryLink,
        };

        changedShoot = updated;
        setSelectedShoot((current) => (current?.id === shootId ? updated : current));
        return updated;
      })
    );

    setTimeout(() => {
      if (changedShoot) saveShootToSupabase(changedShoot);
    }, 0);
  }

  function createShootFromData(data) {
    const newShoot = {
      id: Date.now(),
      source: "local",
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
      isoDate: data.isoDate || "",
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

  function scheduleExistingShoot({ shootId, calendarDay, time, photographer, googleEventId, googleEventLink }) {
    const weatherInsight = getWeatherInsight(calendarDay.day, time);

    setShoots((old) =>
      old.map((shoot) => {
        if (String(shoot.id) !== String(shootId)) return shoot;

        const updated = {
          ...shoot,
          status: "needs_confirmation",
          day: calendarDay.day,
          isoDate: calendarDay.isoDate,
          time,
          date: buildDateLabel(calendarDay),
          photographer: photographer || shoot.photographer,
          weather: weatherInsight ? `${weatherInsight.label} · ${weatherInsight.detail}` : "Forecast pending",
          googleEventId: googleEventId || shoot.googleEventId,
          googleCalendarId: shoot.googleCalendarId || "primary",
          googleEventLink: googleEventLink || shoot.googleEventLink,
          notes: shoot.notes || `Scheduled from calendar for ${buildDateLabel(calendarDay)} at ${time}.`,
        };

        setSelectedShoot(updated);
        return updated;
      })
    );

    setBookingSlot(null);
    setModal("details");
  }

  function requestReschedule(shootId, slot) {
    const shoot = shoots.find((item) => String(item.id) === String(shootId));
    if (!shoot) return;

    if (!shoot.googleEventId) {
      alert("This shoot does not have a linked Google Calendar event yet. Only events created from the scheduler can be moved and updated automatically.");
      return;
    }

    setRescheduleRequest({
      shoot,
      calendarDay: slot.calendarDay,
      time: slot.time,
    });
  }

  async function confirmReschedule() {
    if (!rescheduleRequest) return;

    const { shoot, calendarDay, time } = rescheduleRequest;
    const photographer = getPhotographerByName(shoot.photographer);

    if (!photographer || !calendarDay) {
      alert("Could not find photographer or calendar day.");
      return;
    }

    if (photographer.id.includes("REPLACE_WITH")) {
      alert("This photographer does not have a real Supabase UUID yet. Replace the placeholder UUID first.");
      return;
    }

    const start = new Date(`${calendarDay.isoDate}T${time}:00`);
    const end = new Date(start.getTime() + 90 * 60 * 1000);

    try {
      const response = await fetch("/api/microsoft/create-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reschedule",
          shootId: shoot.id,
          photographerId: photographer.id,
          photographerName: photographer.name,
          photographerEmail: photographer.email,
          existingEventId: shoot.googleEventId,
          googleEventId: shoot.googleEventId,
          googleCalendarId: shoot.googleCalendarId || "primary",
          start: start.toISOString(),
          end: end.toISOString(),
          localDate: calendarDay.isoDate,
          localTime: time,
          propertyTitle: shoot.title,
          ref: shoot.ref,
          address: shoot.address,
          googlePin: shoot.googlePin,
          services: shoot.services,
          notes: shoot.notes,
          agent: shoot.agent,
          agentEmail: getAgentByName(shoot.agent)?.email || "",
          agentPhone: getAgentByName(shoot.agent)?.phone || "",
          eventTitle: `Photos - ${shoot.title || "Property"}`,
        }),
      });

      let data = {};

      try {
        data = await response.json();
      } catch (jsonError) {
        console.warn("Update event response was not JSON", jsonError);
      }

      if (!response.ok) {
        alert(data.error || data.details || "Failed to send Outlook booking update through Microsoft Flow.");
        return;
      }

      setShoots((old) =>
        old.map((item) => {
          if (String(item.id) !== String(shoot.id)) return item;

          const updated = {
            ...item,
            day: calendarDay.day,
            isoDate: calendarDay.isoDate,
            time,
            date: buildDateLabel(calendarDay),
            googleEventLink: data.outlookEventLink || data.htmlLink || data.flowResponse?.webLink || item.googleEventLink,
            status: "needs_confirmation",
          };

          setSelectedShoot((current) => (String(current?.id) === String(shoot.id) ? updated : current));
          return updated;
        })
      );

      setGoogleAvailability((current) =>
        current.map((item) => {
          if (item.photographerId !== photographer.id) return item;

          return {
            ...item,
            busy: [
              ...(item.busy || []),
              { start: start.toISOString(), end: end.toISOString() },
            ],
          };
        })
      );

      setRescheduleRequest(null);
      alert("Outlook booking update sent through Microsoft Flow.");
    } catch (error) {
      console.error(error);
      alert("Unexpected reschedule error.");
    }
  }

  function moveCalendar(amount) {
    setCalendarAnchorDate((current) => {
      const next = new Date(current);
      if (calendarView === "day") next.setDate(next.getDate() + amount);
      if (calendarView === "week") next.setDate(next.getDate() + amount * 7);
      if (calendarView === "month") next.setMonth(next.getMonth() + amount);
      return next;
    });
  }

  return (
    <main className="min-h-screen bg-[#f5f3ee] text-[#123e63]">
      <div className="flex min-h-screen p-5">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} setModal={setModal} />

        <section className="flex-1 pl-5">
          <Topbar activeTab={activeTab} filter={filter} setFilter={setFilter} setModal={setModal} />

          {activeTab === "overview" && (
            <Overview stats={stats} shoots={filteredShoots} setActiveTab={setActiveTab} openShoot={openShoot} />
          )}

          {activeTab === "pipeline" && (
            <Pipeline
              shoots={filteredShoots}
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
              shoots={filteredShoots}
              openBookingModal={openBookingModal}
              onDropShootToSlot={requestReschedule}
              googleAvailability={googleAvailability}
              isLoadingAvailability={isLoadingAvailability}
              calendarView={calendarView}
              setCalendarView={setCalendarView}
              visibleDays={visibleDays}
              calendarTitle={calendarTitle}
              calendarAnchorDate={calendarAnchorDate}
              moveCalendar={moveCalendar}
              setCalendarAnchorDate={setCalendarAnchorDate}
              clearOutsideWeather={clearOutsideWeather}
            />
          )}

          {activeTab === "notes" && selectedShoot && (
            <NotesView shoots={filteredShoots} selectedShoot={selectedShoot} setSelectedShoot={setSelectedShoot} updateSelected={updateSelected} />
          )}

          {activeTab === "notes" && !selectedShoot && (
            <div className="rounded-[34px] border border-[#d7e1e7] bg-white p-8 text-sm font-semibold text-[#6d8ca0] shadow-[0_20px_60px_rgba(18,62,99,0.08)]">
              No properties loaded yet.
            </div>
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
            const selectedShootForBooking = shoots.find((shoot) => String(shoot.id) === String(form.shootId));
            const photographer = getPhotographerByName(form.photographer);

            if (!selectedShootForBooking || !photographer) {
              alert("Please select a property and a connected photographer.");
              return;
            }

            if (photographer.id.includes("REPLACE_WITH")) {
              alert("This photographer does not have a real Supabase UUID yet. Replace the placeholder UUID first.");
              return;
            }

            const start = new Date(`${form.calendarDay.isoDate}T${form.time}:00`);
            const end = new Date(start.getTime() + 90 * 60 * 1000);

            try {
              const response = await fetch("/api/microsoft/create-booking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  action: "create",
                  shootId: selectedShootForBooking.id,
                  photographerId: photographer.id,
                  photographerName: photographer.name,
                  photographerEmail: photographer.email,
                  start: start.toISOString(),
                  end: end.toISOString(),
                  localDate: form.calendarDay.isoDate,
                  localTime: form.time,
                  propertyTitle: selectedShootForBooking.title,
                  ref: selectedShootForBooking.ref,
                  address: selectedShootForBooking.address,
                  googlePin: selectedShootForBooking.googlePin,
                  services: selectedShootForBooking.services,
                  notes: selectedShootForBooking.notes,
                  agent: selectedShootForBooking.agent,
                  agentEmail: getAgentByName(selectedShootForBooking.agent)?.email || "",
                  agentPhone: getAgentByName(selectedShootForBooking.agent)?.phone || "",
                  eventTitle: `Photos - ${selectedShootForBooking.title || "Property"}`,
                }),
              });

              const data = await response.json();

              if (!response.ok) {
                alert(data.error || "Failed to send booking to Microsoft Flow.");
                return;
              }

              scheduleExistingShoot({
                ...form,
                googleEventId: data.outlookEventId || data.googleEventId || data.flowResponse?.eventId || "",
                googleEventLink: data.outlookEventLink || data.htmlLink || data.flowResponse?.webLink || "",
              });

              setGoogleAvailability((current) =>
                current.map((item) => {
                  if (item.photographerId !== photographer.id) return item;
                  return {
                    ...item,
                    busy: [...(item.busy || []), { start: start.toISOString(), end: end.toISOString() }],
                  };
                })
              );

              alert("Booking sent to Microsoft Flow. The card is now waiting for photographer confirmation.");
            } catch (error) {
              console.error(error);
              alert("Unexpected scheduling error.");
            }
          }}
        />
      )}

      {modal === "calendar" && <CalendarShareModal onClose={() => setModal(null)} />}

      {rescheduleRequest && (
        <BasicModal title="Confirm Calendar Change" onClose={() => setRescheduleRequest(null)}>
          <div className="rounded-[26px] bg-[#f8fbfc] p-4">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#2f7898]">Move booking</p>
            <p className="mt-2 text-[22px] font-semibold tracking-[-0.03em] text-[#123e63]">
              Do you want to change {propertyDisplayTitle(rescheduleRequest.shoot)} to {buildDateLabel(rescheduleRequest.calendarDay)} at {rescheduleRequest.time}?
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#46667b]">
              If you click Yes, the Google Calendar event will be updated and an updated invitation will be sent automatically to the photographer.
            </p>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <button onClick={() => setRescheduleRequest(null)} className="rounded-2xl border border-[#d7e1e7] bg-[#f8fbfc] px-5 py-4 text-sm font-semibold text-[#123e63]">
              No
            </button>
            <button onClick={confirmReschedule} className="rounded-2xl bg-[#123e63] px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-[#123e63]/20">
              Yes, update invite
            </button>
          </div>
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

            if (item === "Today") {
              setCalendarView("day");
              setCalendarAnchorDate(new Date());
            }

            if (item === "This week") {
              setCalendarView("week");
              setCalendarAnchorDate(new Date());
            }

            if (item === "This month") {
              setCalendarView("month");
              setCalendarAnchorDate(new Date());
            }

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
                    onConfirm={() => moveShootToStatus(shoot.id, "scheduled")}
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
  onDropShootToSlot,
  googleAvailability,
  isLoadingAvailability,
  calendarView,
  setCalendarView,
  visibleDays,
  calendarTitle,
  calendarAnchorDate,
  moveCalendar,
  setCalendarAnchorDate,
  clearOutsideWeather,
}) {
  const visibleIsoDates = new Set(visibleDays.map((day) => day.isoDate));

  function getShootForSlot(calendarDay, time) {
    return shoots.find(
      (shoot) =>
        ["needs_confirmation", "scheduled"].includes(shoot.status) &&
        shoot.isoDate === calendarDay.isoDate &&
        shoot.time === time
    );
  }

  function isSlotCoveredByExistingShoot(calendarDay, time) {
    const slotStart = new Date(`${calendarDay.isoDate}T${time}:00`);

    return shoots.some((shoot) => {
      if (!["needs_confirmation", "scheduled"].includes(shoot.status)) return false;
      if (shoot.isoDate !== calendarDay.isoDate) return false;
      if (!shoot.time || shoot.time === time || shoot.time === "Pending") return false;

      const shootStart = new Date(`${shoot.isoDate}T${shoot.time}:00`);
      const shootEnd = new Date(shootStart.getTime() + 90 * 60 * 1000);

      return slotStart > shootStart && slotStart < shootEnd;
    });
  }

  function getShootsForDay(calendarDay) {
    return shoots.filter(
      (shoot) =>
        ["needs_confirmation", "scheduled"].includes(shoot.status) &&
        shoot.isoDate === calendarDay.isoDate
    );
  }

  function slotDateRange(calendarDay, time) {
    const start = new Date(`${calendarDay.isoDate}T${time}:00`);
    const end = new Date(start.getTime() + 30 * 60 * 1000);
    return { start, end };
  }

  function isOwnBookingBusy(calendarDay, time, photographer) {
    return shoots.some((shoot) => {
      if (!["needs_confirmation", "scheduled"].includes(shoot.status)) return false;
      if (shoot.isoDate !== calendarDay.isoDate) return false;
      if (shoot.photographer !== photographer.photographerName) return false;
      if (!shoot.time || shoot.time === "Pending") return false;

      const shootStart = new Date(`${shoot.isoDate}T${shoot.time}:00`);
      const shootEnd = new Date(shootStart.getTime() + 90 * 60 * 1000);
      const { start: slotStart, end: slotEnd } = slotDateRange(calendarDay, time);

      return slotStart < shootEnd && slotEnd > shootStart;
    });
  }

  function busyPhotographersForSlot(calendarDay, time) {
    const { start: slotStart, end: slotEnd } = slotDateRange(calendarDay, time);

    return (googleAvailability || []).filter((photographer) => {
      return (photographer.busy || []).some((busy) => {
        const busyStart = new Date(busy.start);
        const busyEnd = new Date(busy.end);

        const overlapsThisSlot = slotStart < busyEnd && slotEnd > busyStart;
        if (!overlapsThisSlot) return false;

        // Do not double-render our own 90-minute photo bookings as external Google busy blocks.
        // The app booking card already owns that visual block.
        if (isOwnBookingBusy(calendarDay, time, photographer)) return false;

        return true;
      });
    });
  }

  function busyPhotographersStartingAtSlot(calendarDay, time) {
    const { start: slotStart, end: slotEnd } = slotDateRange(calendarDay, time);

    return (googleAvailability || []).filter((photographer) => {
      return (photographer.busy || []).some((busy) => {
        const busyStart = new Date(busy.start);
        const startsInsideThisSlot = busyStart >= slotStart && busyStart < slotEnd;
        if (!startsInsideThisSlot) return false;

        // Same rule: external busy blocks only. Our app bookings are rendered by photo_properties.
        if (isOwnBookingBusy(calendarDay, time, photographer)) return false;

        return true;
      });
    });
  }

  function getClearOutsideForSlot(calendarDay, time) {
    const hour = Number(String(time).split(":")[0]);
    return (clearOutsideWeather || []).find(
      (item) => item.isoDate === calendarDay.isoDate && Number(item.hour) === hour
    );
  }

  function weatherIcon(weather) {
    if (!weather) return "·";
    if (weather.precipProbability > 40 || weather.precipType !== "None") return "🌧️";
    if (weather.totalClouds >= 70) return "☁️";
    if (weather.totalClouds >= 35) return "⛅";
    return "☀️";
  }

  function getClearOutsideDaySummary(calendarDay) {
    const dayForecast = (clearOutsideWeather || []).filter((item) => {
      const hour = Number(item.hour);
      return item.isoDate === calendarDay.isoDate && hour >= 8 && hour <= 19;
    });

    if (!dayForecast.length) return null;

    const scoreRank = { Good: 0, OK: 1, Bad: 2 };
    const sorted = [...dayForecast].sort((a, b) => {
      const scoreDifference = (scoreRank[a.score] ?? 9) - (scoreRank[b.score] ?? 9);
      if (scoreDifference !== 0) return scoreDifference;
      return (a.totalClouds ?? 100) - (b.totalClouds ?? 100);
    });

    const best = sorted[0];
    const averageClouds = Math.round(
      dayForecast.reduce((sum, item) => sum + Number(item.totalClouds || 0), 0) / dayForecast.length
    );

    return {
      ...best,
      averageClouds,
    };
  }

  function isOutsideMonth(calendarDay) {
    return calendarView === "month" && calendarDay.monthIndex !== calendarAnchorDate.getMonth();
  }

  return (
    <div className="rounded-[34px] border border-[#d7e1e7] bg-white p-6 shadow-[0_20px_60px_rgba(18,62,99,0.08)]">
      <div className="mb-5 flex items-center justify-between gap-5">
        <div>
          <h3 className="text-[34px] font-semibold tracking-[-0.03em] text-[#123e63]">Photographer Calendar</h3>
          <p className="mt-1 text-sm text-[#46667b]">Drag calendar bookings to move them. Empty slots are available.</p>
          <p className="mt-2 text-xs font-semibold text-[#6d8ca0]">{isLoadingAvailability ? "Refreshing Google availability..." : "Google availability refreshes every minute."}</p>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2">
          <button onClick={() => moveCalendar(-1)} className="rounded-2xl border border-[#d7e1e7] bg-[#f8fbfc] px-4 py-3 text-sm font-semibold text-[#123e63]">←</button>
          <button onClick={() => setCalendarAnchorDate(new Date())} className="rounded-2xl border border-[#d7e1e7] bg-[#f8fbfc] px-4 py-3 text-sm font-semibold text-[#123e63]">Today</button>
          <button onClick={() => moveCalendar(1)} className="rounded-2xl border border-[#d7e1e7] bg-[#f8fbfc] px-4 py-3 text-sm font-semibold text-[#123e63]">→</button>

          {["day", "week", "month"].map((view) => (
            <button
              key={view}
              onClick={() => setCalendarView(view)}
              className={`rounded-2xl px-5 py-3 text-sm font-semibold capitalize ${calendarView === view ? "bg-[#123e63] text-white" : "border border-[#d7e1e7] bg-[#f8fbfc] text-[#123e63]"}`}
            >
              {view}
            </button>
          ))}

          <button onClick={() => setModal("calendar")} className="rounded-2xl border border-[#d7e1e7] bg-[#f8fbfc] px-5 py-3 text-sm font-semibold text-[#123e63]">Sync Google</button>
        </div>
      </div>

      <div className="mb-5 flex items-center justify-between rounded-[26px] bg-[#f8fbfc] px-5 py-4">
        <h4 className="text-[26px] font-semibold tracking-[-0.03em] text-[#123e63]">{calendarTitle}</h4>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#2f7898]">{calendarView} view</p>
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
            <p className="mt-3 text-xs font-semibold text-[#2f7898]">{(photographer.busy || []).length} busy block{(photographer.busy || []).length === 1 ? "" : "s"} found</p>
          </div>
        ))}
      </div>

      {calendarView === "month" ? (
        <div className="grid grid-cols-7 overflow-hidden rounded-[28px] border border-[#d7e1e7]">
          {visibleDays.map((calendarDay) => {
            const dayShoots = getShootsForDay(calendarDay);
            const outside = isOutsideMonth(calendarDay);
            const dayWeather = getClearOutsideDaySummary(calendarDay);

            return (
              <div
                key={calendarDay.isoDate}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();
                  const draggedShootId = event.dataTransfer.getData("text/plain");
                  if (draggedShootId) onDropShootToSlot(draggedShootId, { calendarDay, time: "10:00" });
                }}
                className={`min-h-[170px] border-l border-t border-[#d7e1e7] p-3 ${outside ? "bg-[#f8fbfc] opacity-55" : "bg-white"}`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2f7898]">{calendarDay.day}</p>
                  <p className="text-[22px] font-semibold text-[#123e63]">{calendarDay.date}</p>
                </div>

                <button onClick={() => openBookingModal({ calendarDay, time: "10:00" })} className="mb-2 w-full rounded-2xl border border-dashed border-[#c9dbe5] px-3 py-2 text-left text-[11px] font-semibold text-[#6d8ca0] hover:bg-[#f8fbfc]">
                  + Schedule
                  {dayWeather && (
                    <span
                      className="mt-2 block text-[10px] text-[#6d8ca0]"
                      title={`Best ${String(dayWeather.hour).padStart(2, "0")}:00 · ${dayWeather.score} · ${dayWeather.totalClouds ?? "—"}% cloud · Avg ${dayWeather.averageClouds}% cloud · Rain ${dayWeather.precipProbability ?? "—"}%`}
                    >
                      {weatherIcon(dayWeather)} Best {String(dayWeather.hour).padStart(2, "0")}:00 · {dayWeather.totalClouds ?? "—"}% cloud · {dayWeather.score}
                    </span>
                  )}
                </button>

                <div className="space-y-2">
                  {dayShoots.slice(0, 4).map((shoot) => (
                    <button
                      key={shoot.id}
                      draggable
                      onDragStart={(event) => event.dataTransfer.setData("text/plain", String(shoot.id))}
                      onClick={() => openShoot(shoot)}
                      className="w-full cursor-grab rounded-2xl bg-[#123e63] p-2 text-left text-white active:cursor-grabbing"
                    >
                      <p className="text-[10px] font-bold">{shoot.time}</p>
                      <p className="mt-1 line-clamp-1 text-xs font-semibold">{propertyDisplayTitle(shoot)}</p>
                    </button>
                  ))}
                  {dayShoots.length > 4 && <p className="text-xs font-semibold text-[#6d8ca0]">+{dayShoots.length - 4} more</p>}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={`grid ${calendarView === "day" ? "grid-cols-[90px_1fr]" : "grid-cols-[90px_repeat(7,1fr)]"} overflow-hidden rounded-[28px] border border-[#d7e1e7]`}>
          <div className="bg-[#f8fbfc]" />
          {visibleDays.map((calendarDay) => (
            <div key={calendarDay.isoDate} className="border-l border-[#d7e1e7] bg-[#f8fbfc] p-4 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#2f7898]">{calendarDay.day}</p>
              <p className="mt-1 text-[30px] font-semibold text-[#123e63]">{calendarDay.date}</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6d8ca0]">{calendarDay.month}</p>
            </div>
          ))}

          {timeSlots.map((time) => (
            <div key={`row-${time}`} className="contents">
              <div className="border-t border-[#d7e1e7] bg-[#f8fbfc] p-3 text-xs font-semibold text-[#2f7898]">{time}</div>

              {visibleDays.map((calendarDay) => {
                const shoot = getShootForSlot(calendarDay, time);
                const availability = availabilityEvents.find((event) => event.day === calendarDay.day && event.time === time);
                const weather = getWeatherInsight(calendarDay.day, time);
                const clearWeather = getClearOutsideForSlot(calendarDay, time);
                const busyPhotographers = busyPhotographersForSlot(calendarDay, time);
                const busyStartsHere = busyPhotographersStartingAtSlot(calendarDay, time);
                const coveredByShoot = isSlotCoveredByExistingShoot(calendarDay, time);

                return (
                  <div
                    key={`${calendarDay.isoDate}-${time}`}
                    onDragOver={(event) => {
                      if (!busyPhotographers.length && !shoot && !coveredByShoot) event.preventDefault();
                    }}
                    onDrop={(event) => {
                      event.preventDefault();
                      if (busyPhotographers.length || shoot || coveredByShoot) return;
                      const draggedShootId = event.dataTransfer.getData("text/plain");
                      if (draggedShootId) onDropShootToSlot(draggedShootId, { calendarDay, time });
                    }}
                    className="relative min-h-[128px] border-l border-t border-[#d7e1e7] bg-white p-2"
                  >
                    {shoot ? (
                      <button
                        draggable
                        onDragStart={(event) => event.dataTransfer.setData("text/plain", String(shoot.id))}
                        onClick={() => openShoot(shoot)}
                        className={`absolute left-2 right-2 top-2 z-10 min-h-[290px] cursor-grab rounded-[20px] p-3 text-left text-white shadow-sm transition hover:scale-[1.02] active:cursor-grabbing ${shoot.status === "needs_confirmation" ? "bg-[#b8872f]" : "bg-[#123e63]"}`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-bold">{shoot.time}</p>
                          <span className="rounded-full bg-white/15 px-2 py-1 text-[10px] font-semibold">{shoot.photographer}</span>
                        </div>
                        <p className="mt-1 text-sm font-semibold leading-tight">{propertyDisplayTitle(shoot)}</p>
                        {shoot.status === "needs_confirmation" && (
                          <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/80">
                            Awaiting confirmation
                          </p>
                        )}
                        <p className="mt-1 text-[11px] text-white/70">{serviceLabels(shoot.services)}</p>
                        {shoot.googleEventLink && (
                          <a href={shoot.googleEventLink} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()} className="mt-2 inline-block text-[10px] font-bold text-[#e7d39a] underline">
                            Open Google event
                          </a>
                        )}
                      </button>
                    ) : coveredByShoot ? (
                      <div className="h-full min-h-[106px] w-full rounded-[20px] bg-white p-3 text-left text-xs font-semibold text-[#d7e1e7]">
                        {clearWeather && <span title={`${clearWeather.score} · Clouds ${clearWeather.totalClouds}% · Rain ${clearWeather.precipProbability}% · ${clearWeather.temperature ?? "—"}°C`>{weatherIcon(clearWeather)} {clearWeather.totalClouds ?? "—"}%</span>}
                      </div>
                    ) : busyStartsHere.length ? (
                      <div className="w-full rounded-[20px] bg-[#f2d6d2] p-3 text-left">
                        <p className="text-xs font-bold text-[#9f3d2f]">Busy</p>
                        <p className="mt-1 text-sm font-semibold text-[#123e63]">{busyStartsHere.map((photographer) => photographer.photographerName).join(" · ")}</p>
                        <p className="mt-1 text-[11px] text-[#6d8ca0]">Google Calendar blocked</p>
                      </div>
                    ) : busyPhotographers.length ? (
                      <div className="h-full min-h-[106px] w-full rounded-[20px] bg-[#fff7f5] p-3 text-left text-xs font-semibold text-[#c28b83]">
                        Blocked by Google Calendar
                      </div>
                    ) : availability ? (
                      <button
                        onClick={() => (availability.type === "busy" ? null : openBookingModal({ calendarDay, time }))}
                        className={`w-full rounded-[20px] p-3 text-left shadow-sm transition hover:scale-[1.02] ${availability.type === "available" ? "bg-[#dcebf2] text-[#123e63]" : "bg-[#e7d39a] text-[#123e63]"}`}
                      >
                        <p className="text-xs font-bold">{time}</p>
                        <p className="mt-1 text-sm font-semibold leading-tight">{availability.title}</p>
                        {weather && <p className="mt-1 text-[10px] font-semibold opacity-70">{weather.label}</p>}
                      </button>
                    ) : (
                      <button onClick={() => openBookingModal({ calendarDay, time })} className="h-full min-h-[106px] w-full rounded-[20px] border border-dashed border-transparent p-3 text-left text-xs font-semibold text-[#9ab0bd] transition hover:border-[#c9dbe5] hover:bg-[#f8fbfc] hover:text-[#2f7898]">
                        + Schedule property
                        {clearWeather && (
                          <span
                            className="mt-2 block text-[13px]"
                            title={`${clearWeather.score} · Clouds ${clearWeather.totalClouds}% · Rain ${clearWeather.precipProbability}% · ${clearWeather.temperature ?? "—"}°C`}
                          >
                            {weatherIcon(clearWeather)} <span className="text-[10px] text-[#6d8ca0]">{clearWeather.totalClouds ?? "—"}% cloud · {clearWeather.score}</span>
                          </span>
                        )}
                        {!clearWeather && weather && <span className="mt-2 block text-[10px] text-[#6d8ca0]">{weather.score}: {weather.label}</span>}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
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

function ShootCard({ shoot, onClick, draggable = false, onDragStart, onDragEnd, onConfirm }) {
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

      {shoot.status === "needs_confirmation" && onConfirm && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onConfirm();
          }}
          className="mt-4 w-full rounded-2xl bg-[#123e63] px-3 py-2 text-center text-xs font-bold text-white hover:bg-[#164d73]"
        >
          Confirm → Scheduled
        </button>
      )}

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
    calendarDay: slot.calendarDay,
    time: slot.time,
  });

  const selectedShoot = shoots.find((shoot) => String(shoot.id) === String(form.shootId));
  const weather = getWeatherInsight(form.calendarDay.day, form.time);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <BasicModal title="Book Calendar Slot" onClose={onClose} wide>
      <div className="mb-5 rounded-[26px] bg-[#f8fbfc] p-4">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#2f7898]">Selected slot</p>
        <p className="mt-2 text-[24px] font-semibold tracking-[-0.03em] text-[#123e63]">{buildDateLabel(form.calendarDay)} · {form.time}</p>
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
          <input value={buildDateLabel(form.calendarDay)} disabled className="rounded-2xl border border-[#d7e1e7] bg-[#eef4f7] px-4 py-3 text-sm outline-none" />

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
