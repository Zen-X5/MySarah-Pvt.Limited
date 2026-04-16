import { connectDb } from "@/lib/db";
import { TrafficEvent } from "@/lib/models/TrafficEvent";

interface TrafficEventInput {
  sessionId: string;
  eventType: "page_view" | "heartbeat";
  path?: string;
  userAgent?: string;
}

const summaryCache = {
  expiresAt: 0,
  value: null as null | {
    activeUsers5m: number;
    visitorsToday: number;
    pageViewsToday: number;
    activityEventsLastHour: number;
  },
};

function startOfTodayUtc() {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

export async function recordTrafficEvent(input: TrafficEventInput) {
  await connectDb();
  await TrafficEvent.create({
    sessionId: input.sessionId,
    eventType: input.eventType,
    path: input.path,
    userAgent: input.userAgent,
  });

  summaryCache.expiresAt = 0;
}

export async function getTrafficSummary() {
  const now = Date.now();
  if (summaryCache.value && summaryCache.expiresAt > now) {
    return summaryCache.value;
  }

  await connectDb();

  const fiveMinutesAgo = new Date(now - 5 * 60 * 1000);
  const oneHourAgo = new Date(now - 60 * 60 * 1000);
  const todayStart = startOfTodayUtc();

  const [activeSessions, todayVisitors, pageViewsToday, activityEventsLastHour] = await Promise.all([
    TrafficEvent.distinct("sessionId", { createdAt: { $gte: fiveMinutesAgo } }),
    TrafficEvent.distinct("sessionId", { createdAt: { $gte: todayStart } }),
    TrafficEvent.countDocuments({ eventType: "page_view", createdAt: { $gte: todayStart } }),
    TrafficEvent.countDocuments({ createdAt: { $gte: oneHourAgo } }),
  ]);

  const summary = {
    activeUsers5m: activeSessions.length,
    visitorsToday: todayVisitors.length,
    pageViewsToday,
    activityEventsLastHour,
  };

  summaryCache.value = summary;
  summaryCache.expiresAt = now + 30_000;

  return summary;
}
