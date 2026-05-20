await fetch("/api/photo-properties", {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    id: shoot.id,
    title: shoot.title,
    address: shoot.address,
    city: shoot.city,
    photographer: shoot.photographer,
    agent: shoot.agent,
    status: shoot.status,
    shoot_date: shoot.isoDate && shoot.time !== "Pending"
      ? `${shoot.isoDate}T${shoot.time}:00`
      : null,
    weather_summary: shoot.weather,
    billing_status: shoot.billingStatus,
    google_event_id: shoot.googleEventId,
    google_event_link: shoot.googleEventLink,
    google_calendar_id: shoot.googleCalendarId || "primary",
    notes: shoot.notes,
    services: shoot.services,
    google_pin: shoot.googlePin,
    delivery_link: shoot.deliveryLink,
    property_type: shoot.propertyType,
  }),
});
