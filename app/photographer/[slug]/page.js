"use client";

import { useEffect, useMemo, useState } from "react";

const photographers = {
  kevan: { name: "Kevan", email: "kevan@panorama.es" },
  marcos: { name: "Marcos", email: "marcos@panorama.es" },
  cauana: { name: "Cauana", email: "cauana@panorama.es" },
};

function propertyTitle(item) {
  return item?.title || "Untitled Property";
}

function formatDate(value) {
  if (!value) return "Unscheduled";

  const date = new Date(value);

  return date.toLocaleDateString("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
}

function formatTime(value) {
  if (!value) return "Pending";

  const date = new Date(value);

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export default function PhotographerPortalPage({ params }) {
  const [slug, setSlug] = useState("");
  const [properties, setProperties] = useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState("");
  const [deliveryLink, setDeliveryLink] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function resolveParams() {
      const resolvedParams = await params;
      setSlug(String(resolvedParams?.slug || "").toLowerCase());
    }

    resolveParams();
  }, [params]);

  const photographer = slug ? photographers[slug] : null;

  async function loadProperties() {
    if (!photographer) return;

    try {
      setIsLoading(true);

      const response = await fetch("/api/photo-properties");
      const data = await response.json();

      if (!Array.isArray(data)) {
        setProperties([]);
        return;
      }

      const assigned = data.filter(
        (item) =>
          String(item.photographer || "").toLowerCase() ===
          String(photographer.name || "").toLowerCase()
      );

      setProperties(assigned);

      if (assigned.length && !selectedPropertyId) {
        setSelectedPropertyId(assigned[0].id);
        setDeliveryLink(assigned[0].delivery_link || "");
      }
    } catch (error) {
      console.error("Could not load photographer properties", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!photographer) return;
    loadProperties();
  }, [photographer]);

  const selectedProperty = useMemo(() => {
    return properties.find((item) => String(item.id) === String(selectedPropertyId));
  }, [properties, selectedPropertyId]);

  async function submitDelivery() {
    if (!selectedProperty) {
      alert("Please select a property.");
      return;
    }

    if (!deliveryLink.trim()) {
      alert("Please paste the delivery link first.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/photographer/deliver", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedProperty.id,
          delivery_link: deliveryLink.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Could not submit delivery.");
        return;
      }

      alert("Delivery submitted. Thank you.");
      await loadProperties();
    } catch (error) {
      console.error(error);
      alert("Unexpected delivery error.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!slug) {
    return (
      <main className="min-h-screen bg-[#f5f3ee] p-6 text-[#123e63]">
        <section className="mx-auto max-w-xl rounded-[34px] bg-white p-8 shadow-xl">
          <h1 className="text-3xl font-semibold">Loading photographer portal...</h1>
        </section>
      </main>
    );
  }

  if (!photographer) {
    return (
      <main className="min-h-screen bg-[#f5f3ee] p-6 text-[#123e63]">
        <section className="mx-auto max-w-xl rounded-[34px] bg-white p-8 shadow-xl">
          <h1 className="text-3xl font-semibold">Photographer not found</h1>
          <p className="mt-3 text-sm text-[#46667b]">Please check the link.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f3ee] p-5 text-[#123e63]">
      <section className="mx-auto max-w-6xl">
        <div className="rounded-[38px] bg-gradient-to-br from-[#123e63] to-[#2f7898] p-8 text-white shadow-xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#e7d39a]">
            Panorama Photographer Portal
          </p>
          <h1 className="mt-3 text-[44px] font-semibold tracking-[-0.05em]">
            Hi {photographer.name}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75">
            Select one of your assigned shoots and submit the final delivery link.
          </p>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[390px_1fr]">
          <aside className="rounded-[34px] border border-[#d7e1e7] bg-white p-5 shadow-[0_20px_60px_rgba(18,62,99,0.08)]">
            <h2 className="text-[28px] font-semibold tracking-[-0.03em]">
              Assigned Properties
            </h2>

            {isLoading ? (
              <p className="mt-5 text-sm font-semibold text-[#6d8ca0]">Loading...</p>
            ) : properties.length ? (
              <div className="mt-5 space-y-3">
                {properties.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedPropertyId(item.id);
                      setDeliveryLink(item.delivery_link || "");
                    }}
                    className={`w-full rounded-[26px] p-4 text-left transition ${
                      String(selectedPropertyId) === String(item.id)
                        ? "bg-[#123e63] text-white"
                        : "bg-[#f8fbfc] text-[#123e63] hover:bg-[#dcebf2]"
                    }`}
                  >
                    <p className="text-[18px] font-semibold">{propertyTitle(item)}</p>
                    <p className="mt-1 text-xs opacity-70">
                      {formatDate(item.shoot_date)} · {formatTime(item.shoot_date)}
                    </p>
                    <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] opacity-70">
                      {item.status || "new_request"}
                    </p>
                  </button>
                ))}
              </div>
            ) : (
              <p className="mt-5 text-sm font-semibold text-[#6d8ca0]">
                No assigned properties yet.
              </p>
            )}
          </aside>

          <section className="rounded-[34px] border border-[#d7e1e7] bg-white p-6 shadow-[0_20px_60px_rgba(18,62,99,0.08)]">
            {selectedProperty ? (
              <>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#2f7898]">
                  Delivery
                </p>

                <h2 className="mt-2 text-[38px] font-semibold tracking-[-0.05em]">
                  {propertyTitle(selectedProperty)}
                </h2>

                <div className="mt-5 grid gap-3 rounded-[28px] bg-[#f8fbfc] p-5 text-sm">
                  <p>
                    <strong>Address:</strong> {selectedProperty.address || "—"}
                  </p>
                  <p>
                    <strong>City:</strong> {selectedProperty.city || "—"}
                  </p>
                  <p>
                    <strong>Date:</strong> {formatDate(selectedProperty.shoot_date)}
                  </p>
                  <p>
                    <strong>Time:</strong> {formatTime(selectedProperty.shoot_date)}
                  </p>
                  <p>
                    <strong>Agent:</strong> {selectedProperty.agent || "—"}
                  </p>
                </div>

                <label className="mt-6 block">
                  <span className="mb-2 block text-sm font-semibold text-[#46667b]">
                    Delivery link
                  </span>
                  <input
                    value={deliveryLink}
                    onChange={(event) => setDeliveryLink(event.target.value)}
                    placeholder="Paste Google Drive, Dropbox, WeTransfer, OneDrive link..."
                    className="w-full rounded-[24px] border border-[#d7e1e7] bg-[#f8fbfc] px-5 py-4 text-sm text-[#123e63] outline-none"
                  />
                </label>

                <button
                  onClick={submitDelivery}
                  disabled={isSubmitting}
                  className="mt-5 rounded-2xl bg-[#123e63] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#123e63]/20 disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit delivery"}
                </button>

                {selectedProperty.delivery_link && (
                  <a
                    href={selectedProperty.delivery_link}
                    target="_blank"
                    rel="noreferrer"
                    className="ml-3 inline-block rounded-2xl border border-[#d7e1e7] bg-[#f8fbfc] px-6 py-4 text-sm font-bold text-[#2f7898]"
                  >
                    Open current delivery
                  </a>
                )}
              </>
            ) : (
              <p className="text-sm font-semibold text-[#6d8ca0]">
                Select a property to submit delivery.
              </p>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}
