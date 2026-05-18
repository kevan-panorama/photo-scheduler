"use client";

import { useEffect, useMemo, useState } from "react";

const statuses = {
  needs_scheduling: "Needs scheduling",
  scheduled: "Scheduled",
  completed: "Completed",
  delivered: "Delivered",
  billed: "Billed",
};

export default function PhotoSchedulerPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [newProperty, setNewProperty] = useState({
    title: "",
    address: "",
    city: "",
    shoot_date: "",
    photographer: "",
  });

  async function loadProperties() {
    setLoading(true);

    try {
      const res = await fetch("/api/photo-properties");
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Could not load properties");
        return;
      }

      setProperties(data || []);
    } catch (err) {
      alert("Could not connect to API");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProperties();
  }, []);

  async function createProperty() {
    if (!newProperty.title.trim()) {
      alert("Please add a property title.");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch("/api/photo-properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newProperty,
          shoot_date: newProperty.shoot_date || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Could not create property");
        return;
      }

      setNewProperty({
        title: "",
        address: "",
        city: "",
        shoot_date: "",
        photographer: "",
      });

      await loadProperties();
    } catch (err) {
      alert("Could not connect to API");
    } finally {
      setSaving(false);
    }
  }

  const scheduledCount = properties.filter((p) => p.status === "scheduled").length;
  const completedCount = properties.filter((p) => p.status === "completed").length;

  return (
    <main className="min-h-screen bg-[#f5f1e8] p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-stone-500">
              Panorama
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-stone-950 md:text-5xl">
              Photo Scheduler
            </h1>
            <p className="mt-3 text-stone-600">
              Plan property shoots, photographer availability, weather, and billing.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Stat label="Shoots" value={properties.length} />
            <Stat label="Scheduled" value={scheduledCount} />
            <Stat label="Completed" value={completedCount} />
          </div>
        </header>

        <section className="mb-8 rounded-[2rem] bg-white p-6 shadow-xl shadow-stone-300/40">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-stone-950">
                Add Property Shoot
              </h2>
              <p className="mt-1 text-sm text-stone-500">
                Create a standalone shoot card for now.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
            <Field
              label="Property"
              placeholder="Villa in Nueva Andalucía"
              value={newProperty.title}
              onChange={(value) =>
                setNewProperty({ ...newProperty, title: value })
              }
            />

            <Field
              label="Address"
              placeholder="Street / Urbanisation"
              value={newProperty.address}
              onChange={(value) =>
                setNewProperty({ ...newProperty, address: value })
              }
            />

            <Field
              label="City"
              placeholder="Marbella"
              value={newProperty.city}
              onChange={(value) =>
                setNewProperty({ ...newProperty, city: value })
              }
            />

            <Field
              label="Shoot date"
              type="datetime-local"
              value={newProperty.shoot_date}
              onChange={(value) =>
                setNewProperty({ ...newProperty, shoot_date: value })
              }
            />

            <Field
              label="Photographer"
              placeholder="Name"
              value={newProperty.photographer}
              onChange={(value) =>
                setNewProperty({ ...newProperty, photographer: value })
              }
            />
          </div>

          <button
            onClick={createProperty}
            disabled={saving}
            className="mt-6 rounded-2xl bg-stone-950 px-6 py-3 font-semibold text-white transition hover:bg-stone-800 disabled:opacity-50"
          >
            {saving ? "Creating..." : "Create Shoot"}
          </button>
        </section>

        <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-stone-300/40">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-stone-950">
                Shoot Board
              </h2>
              <p className="mt-1 text-sm text-stone-500">
                Property cards will appear here.
              </p>
            </div>

            <button
              onClick={loadProperties}
              className="rounded-xl border border-stone-200 px-4 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-50"
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <p className="text-stone-500">Loading shoots...</p>
          ) : properties.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-stone-300 bg-stone-50 p-10 text-center">
              <p className="text-lg font-semibold text-stone-800">
                No shoots yet
              </p>
              <p className="mt-2 text-sm text-stone-500">
                Create your first property shoot above.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl bg-white px-5 py-4 text-center shadow-lg shadow-stone-300/30">
      <p className="text-2xl font-bold text-stone-950">{value}</p>
      <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
        {label}
      </p>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-stone-700">
        {label}
      </span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-stone-900 outline-none transition focus:border-stone-900 focus:bg-white"
      />
    </label>
  );
}

function PropertyCard({ property }) {
  return (
    <article className="rounded-3xl border border-stone-100 bg-[#fbfaf7] p-5 transition hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-stone-950">
            {property.title}
          </h3>
          <p className="mt-1 text-sm text-stone-500">
            {property.city || "No city added"}
          </p>
        </div>

        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
          {statuses[property.status] || property.status || "Scheduled"}
        </span>
      </div>

      <div className="space-y-3 text-sm text-stone-700">
        <Info label="Address" value={property.address || "-"} />
        <Info
          label="Date"
          value={
            property.shoot_date
              ? new Date(property.shoot_date).toLocaleString()
              : "Not scheduled"
          }
        />
        <Info label="Photographer" value={property.photographer || "-"} />
        <Info label="Weather" value="Coming soon" />
      </div>
    </article>
  );
}

function Info({ label, value }) {
  return (
    <div className="flex justify-between gap-4 border-t border-stone-200 pt-3">
      <span className="font-semibold text-stone-500">{label}</span>
      <span className="text-right text-stone-900">{value}</span>
    </div>
  );
}
