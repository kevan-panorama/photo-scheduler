import { NextResponse } from "next/server";

function localIsoDateFromTime(value) {
  return value.slice(0, 10);
}

function hourFromTime(value) {
  return Number(value.slice(11, 13));
}

function scoreFromWeather({ cloudCover, rainProbability }) {
  if (rainProbability >= 35) return "Bad";
  if (cloudCover >= 65) return "Bad";
  if (cloudCover >= 35) return "OK";
  return "Good";
}

export async function GET() {
  try {
    const params = new URLSearchParams({
      latitude: "36.51",
      longitude: "-4.89",
      timezone: "Europe/Madrid",
      forecast_days: "16",
      hourly: [
        "cloud_cover",
        "precipitation_probability",
        "temperature_2m",
      ].join(","),
    });

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?${params.toString()}`,
      {
        next: { revalidate: 3600 },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: "Open-Meteo fetch failed", details: data },
        { status: 500 }
      );
    }

    const times = data.hourly?.time || [];
    const cloudCover = data.hourly?.cloud_cover || [];
    const rainProbability = data.hourly?.precipitation_probability || [];
    const temperature = data.hourly?.temperature_2m || [];

    const forecast = times.map((time, index) => {
      const totalClouds = cloudCover[index] ?? null;
      const precipProbability = rainProbability[index] ?? null;

      return {
        source: "Open-Meteo",
        isoDate: localIsoDateFromTime(time),
        hour: hourFromTime(time),
        score: scoreFromWeather({
          cloudCover: totalClouds ?? 100,
          rainProbability: precipProbability ?? 100,
        }),
        totalClouds,
        precipProbability,
        precipType: precipProbability >= 35 ? "Rain risk" : "None",
        temperature: temperature[index] ?? null,
      };
    });

    return NextResponse.json({
      source: "Open-Meteo",
      location: "Marbella",
      forecast,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Unexpected Open-Meteo error", details: error.message },
      { status: 500 }
    );
  }
}
