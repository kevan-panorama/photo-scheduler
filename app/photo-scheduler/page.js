"use client";

import { useEffect, useState } from "react";

export default function PhotoSchedulerPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newProperty, setNewProperty] = useState({
    title: "",
    address: "",
    city: "",
    shoot_date: "",
    photographer: "",
  });

  async function loadProperties() {
    setLoading(true);

    const res = await fetch("/api/photo-properties");
    const data = await res.json();

    setProperties(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadProperties();
  }, []);

  async function createProperty() {
    if (!newProperty.title) return;

    await fetch("/api/photo-properties", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProperty),
    });

    setNewProperty({
      title: "",
      address: "",
      city: "",
      shoot_date: "",
      photographer: "",
    });

    loadProperties();
  }

  return (
    <main className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold">
              Photo Scheduler
            </h1>

            <p className="text-gray-500 mt-2">
              Weekly & Monthly Shoot Planning
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 mb-10">
          <h2 className="text-2xl font-semibold mb-6">
            Add Property Shoot
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <input
              placeholder="Property title"
              className="border p-3 rounded-xl"
              value={newProperty.title}
              onChange={(e) =>
                setNewProperty({
                  ...newProperty,
                  title: e.target.value,
                })
              }
            />

            <input
              placeholder="Address"
              className="border p-3 rounded-xl"
              value={newProperty.address}
              onChange={(e) =>
                setNewProperty({
                  ...newProperty,
                  address: e.target.value,
                })
              }
            />

            <input
              placeholder="City"
              className="border p-3 rounded-xl"
              value={newProperty.city}
              onChange={(e) =>
                setNewProperty({
                  ...newProperty,
                  city: e.target.value,
                })
              }
            />

            <input
              type="datetime-local"
              className="border p-3 rounded-xl"
              value={newProperty.shoot_date}
              onChange={(e) =>
                setNewProperty({
                  ...newProperty,
                  shoot_date: e.target.value,
                })
              }
            />

            <input
              placeholder="Photographer"
              className="border p-3 rounded-xl"
              value={newProperty.photographer}
              onChange={(e) =>
                setNewProperty({
                  ...newProperty,
                  photographer: e.target.value,
                })
              }
            />
          </div>

          <button
            onClick={createProperty}
            className="mt-6 bg-black text-white px-6 py-3 rounded-xl"
          >
            Create Shoot
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-3xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">
                    {property.title}
                  </h2>

                  <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
                    Scheduled
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <p>{property.address}</p>

                  <p>{property.city}</p>

                  <p>
                    <strong>Date:</strong>{" "}
                    {property.shoot_date
                      ? new Date(
                          property.shoot_date
                        ).toLocaleString()
                      : "-"}
                  </p>

                  <p>
                    <strong>Photographer:</strong>{" "}
                    {property.photographer || "-"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
