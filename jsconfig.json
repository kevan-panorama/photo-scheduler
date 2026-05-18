"use client";

import { useEffect, useMemo, useState } from "react";

const STATUSES = [
  "needs_scheduling",
  "scheduled",
  "shot_completed",
  "delivered",
  "billed",
];

const STATUS_LABELS = {
  needs_scheduling: "Needs scheduling",
  scheduled: "Scheduled",
  shot_completed: "Shot completed",
  delivered: "Delivered",
  billed: "Billed",
};

function formatDate(dateString) {
  if (!dateString) return "Not scheduled";
  return new Date(dateString).toLocaleString();
}

function getWeekKey(dateString) {
  if (!dateString) return "Unscheduled";
  const date = new Date(dateString);
  const firstDay = new Date(date);
  firstDay.setDate(date.getDate() - date.getDay() + 1);
  return `Week of ${firstDay.toLocaleDateString()}`;
}

function getMonthKey(dateString) {
  if (!dateString) return "Unscheduled";
  const date = new Date(dateString);
  return date.toLocaleString("default", { month: "long", year: "numeric" });
}

export default function PhotoSchedulerPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("week");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [saving, setSaving] = useState(false);

  const [newProperty, setNewProperty] = useState({
    title: "",
    address: "",
    city: "",
    shoot_date: "",
    photographer: "",
    status: "scheduled",
  });

  async function loadProperties() {
    setLoading(true);
    const res = await fetch("/api/photo-properties");
    const data = await res.json();
    setProperties(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => {
    loadProperties();
  }, []);

  async function createProperty() {
    if (!newProperty.title.trim()) return;
    setSaving(true);

    await fetch("/api/photo-properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProperty),
    });

    setNewProperty({
      title: "",
      address: "",
      city: "",
      shoot_date: "",
      photographer: "",
      status: "scheduled",
    });

    await loadProperties();
    setSaving(false);
  }

  async function updateStatus(property, status) {
    await fetch(`/api/photo-properties/${property.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    await loadProperties();
  }

  const groupedProperties = useMemo(() => {
    const groups = {};
    for (const property of properties) {
      const key = view === "month" ? getMonthKey(property.shoot_date) : getWeekKey(property.shoot_date);
      if (!groups[key]) groups[key] = [];
      groups[key].push(property);
    }
    return groups;
  }, [properties, view]);

  return (
    <main className="min-h-screen p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold">Photo Scheduler</h1>
            <p className="text-gray-500 mt-2">Standalone real estate photography planning dashboard</p>
          </div>

          <div className="bg-white rounded-2xl p-1 shadow-sm border flex gap-1">
            <button
              onClick={() => setView("week")}
              className={`px-4 py-2 rounded-xl ${view === "week" ? "bg-black text-white" : "text-gray-600"}`}
            >
              Week
            </button>
            <button
              onClick={() => setView("month")}
              className={`px-4 py-2 rounded-xl ${view === "month" ? "bg-black text-white" : "text-gray-600"}`}
            >
              Month
            </button>
          </div>
        </header>

        <section className="bg-white rounded-3xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-5">Add Property Shoot</h2>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <input className="border p-3 rounded-xl" placeholder="Property title" value={newProperty.title} onChange={(e) => setNewProperty({ ...newProperty, title: e.target.value })} />
            <input className="border p-3 rounded-xl" placeholder="Address" value={newProperty.address} onChange={(e) => setNewProperty({ ...newProperty, address: e.target.value })} />
            <input className="border p-3 rounded-xl" placeholder="City" value={newProperty.city} onChange={(e) => setNewProperty({ ...newProperty, city: e.target.value })} />
            <input type="datetime-local" className="border p-3 rounded-xl" value={newProperty.shoot_date} onChange={(e) => setNewProperty({ ...newProperty, shoot_date: e.target.value })} />
            <input className="border p-3 rounded-xl" placeholder="Photographer" value={newProperty.photographer} onChange={(e) => setNewProperty({ ...newProperty, photographer: e.target.value })} />
            <button onClick={createProperty} disabled={saving} className="bg-black text-white px-5 py-3 rounded-xl disabled:opacity-50">
              {saving ? "Saving..." : "Create"}
            </button>
          </div>
        </section>

        {loading ? (
          <p>Loading...</p>
        ) : Object.keys(groupedProperties).length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center shadow-lg">
            <p className="text-gray-500">No shoots yet. Create your first property shoot above.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedProperties).map(([group, groupProperties]) => (
              <section key={group}>
                <h2 className="text-2xl font-bold mb-4">{group}</h2>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {groupProperties.map((property) => (
                    <article key={property.id} onClick={() => setSelectedProperty(property)} className="bg-white rounded-3xl p-6 shadow-lg cursor-pointer hover:shadow-xl transition">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <h3 className="text-xl font-semibold">{property.title}</h3>
                        <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full whitespace-nowrap">
                          {STATUS_LABELS[property.status] || property.status || "Scheduled"}
                        </span>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>{property.address || "No address"}</p>
                        <p>{property.city || "No city"}</p>
                        <p><strong>Date:</strong> {formatDate(property.shoot_date)}</p>
                        <p><strong>Photographer:</strong> {property.photographer || "Not assigned"}</p>
                        <p><strong>Weather:</strong> Placeholder forecast</p>
                      </div>
                      <select
                        className="mt-5 w-full border rounded-xl p-3"
                        value={property.status || "scheduled"}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => updateStatus(property, e.target.value)}
                      >
                        {STATUSES.map((status) => (
                          <option key={status} value={status}>{STATUS_LABELS[status]}</option>
                        ))}
                      </select>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>

      {selectedProperty && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4" onClick={() => setSelectedProperty(null)}>
          <div className="bg-white rounded-3xl p-8 max-w-xl w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="text-3xl font-bold">{selectedProperty.title}</h2>
                <p className="text-gray-500 mt-1">Shoot details</p>
              </div>
              <button onClick={() => setSelectedProperty(null)} className="text-gray-500 text-2xl">×</button>
            </div>
            <div className="space-y-3 text-gray-700">
              <p><strong>Address:</strong> {selectedProperty.address || "-"}</p>
              <p><strong>City:</strong> {selectedProperty.city || "-"}</p>
              <p><strong>Date:</strong> {formatDate(selectedProperty.shoot_date)}</p>
              <p><strong>Photographer:</strong> {selectedProperty.photographer || "-"}</p>
              <p><strong>Status:</strong> {STATUS_LABELS[selectedProperty.status] || selectedProperty.status || "-"}</p>
              <p><strong>Weather:</strong> Real forecast connection will be added later.</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
