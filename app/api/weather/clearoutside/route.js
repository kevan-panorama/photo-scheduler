import { NextResponse } from "next/server";

const DAY_NAMES = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]*>/g, "\n")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function localIsoDatePlus(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function numbersAfter(section, label) {
  const i = section.indexOf(label);
  if (i === -1) return [];
  const chunk = section.slice(i, i + 2200);
  return (chunk.match(/-?\d+(\.\d+)?/g) || []).slice(0, 24).map(Number);
}

function wordsAfter(section, label) {
  const i = section.indexOf(label);
  if (i === -1) return [];
  const chunk = section.slice(i, i + 2200);
  return chunk.match(/\b(None|Rain|Snow|Sleet|Hail|Drizzle)\b/gi)?.slice(0, 24) || [];
}

function hoursAndScores(section) {
  const matches = section.match(/\b([01]?\d|2[0-3])\s+(Good|OK|Bad)\b/g) || [];
  return matches.slice(0, 24).map((item) => {
    const [hour, score] = item.split(/\s+/);
    return { hour: Number(hour), score };
  });
}

export async function GET() {
  try {
    const response = await fetch("https://clearoutside.com/forecast/36.51/-4.89", {
      headers: { "User-Agent": "Panorama Photo Scheduler" },
      next: { revalidate: 3600 },
    });

    const html = await response.text();
    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch Clear Outside" }, { status: 500 });
    }

    const text = stripHtml(html);
    const dayRegex = new RegExp(`\\b(${DAY_NAMES.join("|")})\\s+\\d+\\b`, "g");
    const dayMatches = [...text.matchAll(dayRegex)];

    const forecast = [];

    dayMatches.forEach((match, dayIndex) => {
      const start = match.index;
      const end = dayMatches[dayIndex + 1]?.index || text.length;
      const section = text.slice(start, end);

      const hours = hoursAndScores(section);
      const totalClouds = numbersAfter(section, "Total Clouds (% Sky Obscured)");
      const rainChance = numbersAfter(section, "Precipitation Probability (%)");
      const temperature = numbersAfter(section, "Temperature (°C)");
      const precipType = wordsAfter(section, "Precipitation Type");
      const isoDate = localIsoDatePlus(dayIndex);

      hours.forEach((item, index) => {
        forecast.push({
          isoDate,
          hour: item.hour,
          score: item.score,
          totalClouds: totalClouds[index] ?? null,
          precipProbability: rainChance[index] ?? null,
          precipType: precipType[index] ?? "None",
          temperature: temperature[index] ?? null,
        });
      });
    });

    return NextResponse.json({
      source: "Clear Outside",
      location: "Marbella",
      forecast,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
