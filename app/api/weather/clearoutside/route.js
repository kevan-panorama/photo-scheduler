import { NextResponse } from "next/server";

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

function getNumbersAfterLabel(text, label, count = 24) {
  const index = text.indexOf(label);

  if (index === -1) return [];

  const chunk = text.slice(index, index + 2500);

  const matches = chunk.match(/-?\d+(\.\d+)?/g) || [];

  return matches.slice(0, count).map((value) => Number(value));
}

function getWordsAfterLabel(text, label, count = 24) {
  const index = text.indexOf(label);

  if (index === -1) return [];

  const chunk = text.slice(index, index + 2500);

  const cleaned = chunk.replace(label, "");

  const matches =
    cleaned.match(/\b(None|Rain|Snow|Sleet|Hail|Drizzle)\b/gi) || [];

  return matches.slice(0, count);
}

function getHoursForFirstDay(text) {
  const startIndex = text.search(
    /\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\b/
  );

  if (startIndex === -1) return [];

  const chunk = text.slice(startIndex, startIndex + 1500);

  const matches =
    chunk.match(/\b([01]?\d|2[0-3])\s+(Good|OK|Bad)\b/g) || [];

  return matches.slice(0, 24).map((item) => {
    const [hour, score] = item.split(/\s+/);

    return {
      hour: Number(hour),
      score,
    };
  });
}

function localIsoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export async function GET() {
  try {
    const response = await fetch(
      "https://clearoutside.com/forecast/36.51/-4.89",
      {
        headers: {
          "User-Agent": "Panorama Photo Scheduler",
        },
        next: {
          revalidate: 3600,
        },
      }
    );

    const html = await response.text();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Failed to fetch Clear Outside",
        },
        {
          status: 500,
        }
      );
    }

    const text = stripHtml(html);

    const hours = getHoursForFirstDay(text);

    const clouds = getNumbersAfterLabel(
      text,
      "Total Clouds (% Sky Obscured)"
    );

    const rainChance = getNumbersAfterLabel(
      text,
      "Precipitation Probability (%)"
    );

    const temperatures = getNumbersAfterLabel(
      text,
      "Temperature (°C)"
    );

    const precipType = getWordsAfterLabel(
      text,
      "Precipitation Type"
    );

    const today = localIsoDate(new Date());

    const forecast = hours.map((item, index) => ({
      isoDate: today,
      hour: item.hour,
      score: item.score,
      totalClouds: clouds[index] ?? null,
      precipProbability: rainChance[index] ?? null,
      precipType: precipType[index] ?? "None",
      temperature: temperatures[index] ?? null,
    }));

    return NextResponse.json({
      source: "Clear Outside",
      location: "Marbella",
      forecast,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
