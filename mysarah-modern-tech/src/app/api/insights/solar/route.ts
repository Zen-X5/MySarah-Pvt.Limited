import { NextResponse } from "next/server";
import { getSolarInsights } from "@/lib/lead-service";

export const runtime = "nodejs";

const INSIGHTS_CACHE_MS = 30_000;

let cachedInsights:
  | {
      data: Awaited<ReturnType<typeof getSolarInsights>>;
      expiresAt: number;
    }
  | null = null;

const emptyInsights = {
  totals: {
    installed: 0,
    visitConfirmed: 0,
    pipelineOpen: 0,
    completionRate: 0,
  },
  locations: [],
  recentInstallations: [],
};

export async function GET() {
  try {
    const now = Date.now();
    if (cachedInsights && cachedInsights.expiresAt > now) {
      return NextResponse.json(
        { ok: true, data: cachedInsights.data, degraded: false, cached: true },
        {
          headers: {
            "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120",
          },
        },
      );
    }

    const insights = await getSolarInsights();
    cachedInsights = {
      data: insights,
      expiresAt: now + INSIGHTS_CACHE_MS,
    };

    return NextResponse.json(
      { ok: true, data: insights, degraded: false, cached: false },
      {
        headers: {
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120",
        },
      },
    );
  } catch (error) {
    console.error("[api/insights/solar] failed to load insights", error);

    return NextResponse.json(
      {
        ok: true,
        data: emptyInsights,
        degraded: true,
        reason: process.env.NODE_ENV === "development" ? (error as Error).message : undefined,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=15, stale-while-revalidate=60",
        },
      },
    );
  }
}
