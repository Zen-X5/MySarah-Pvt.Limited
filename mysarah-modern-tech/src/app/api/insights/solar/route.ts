import { NextResponse } from "next/server";
import { getSolarInsights } from "@/lib/lead-service";

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
    const insights = await getSolarInsights();
    return NextResponse.json({ ok: true, data: insights, degraded: false });
  } catch (error) {
    console.error("[api/insights/solar] failed to load insights", error);

    return NextResponse.json({
      ok: true,
      data: emptyInsights,
      degraded: true,
      reason: process.env.NODE_ENV === "development" ? (error as Error).message : undefined,
    });
  }
}
