#!/usr/bin/env node

import { performance } from "node:perf_hooks";

function parseArgs() {
  const args = process.argv.slice(2);
  const values = new Map();

  for (let index = 0; index < args.length; index += 1) {
    const part = args[index];
    if (!part.startsWith("--")) {
      continue;
    }

    const key = part.slice(2);
    const next = args[index + 1];
    if (!next || next.startsWith("--")) {
      values.set(key, "true");
      continue;
    }

    values.set(key, next);
    index += 1;
  }

  return {
    baseUrl: values.get("url") || "http://localhost:3000",
    durationSec: Number(values.get("duration") || 30),
    concurrency: Number(values.get("concurrency") || 30),
    timeoutMs: Number(values.get("timeout") || 10000),
    scenario: values.get("scenario") || "mixed",
    includeLeadPost: values.get("includeLeadPost") === "true",
  };
}

function buildScenario(baseUrl, scenario, includeLeadPost) {
  const browse = [
    { name: "home", method: "GET", url: `${baseUrl}/` },
    { name: "about", method: "GET", url: `${baseUrl}/about` },
    { name: "sectors", method: "GET", url: `${baseUrl}/sectors` },
    { name: "contact", method: "GET", url: `${baseUrl}/contact` },
    { name: "privacy", method: "GET", url: `${baseUrl}/privacy` },
    { name: "terms", method: "GET", url: `${baseUrl}/terms` },
  ];

  const api = [
    { name: "health", method: "GET", url: `${baseUrl}/api/health` },
    { name: "insights", method: "GET", url: `${baseUrl}/api/insights/solar` },
  ];

  if (scenario === "browse") {
    return browse;
  }

  if (scenario === "api") {
    return api;
  }

  const mix = [...browse, ...api];

  if (includeLeadPost) {
    mix.push({
      name: "lead-post",
      method: "POST",
      url: `${baseUrl}/api/leads`,
      body: JSON.stringify({
        name: "Load Test",
        phone: "9000000000",
        location: "Guwahati",
        type: "quote",
        message: "Load test submission",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return mix;
}

async function run() {
  const options = parseArgs();
  const scenario = buildScenario(options.baseUrl, options.scenario, options.includeLeadPost);

  if (!Array.isArray(scenario) || scenario.length === 0) {
    throw new Error("No scenario endpoints were configured.");
  }

  const stopAt = Date.now() + options.durationSec * 1000;
  const latencies = [];
  const byEndpoint = new Map();

  let total = 0;
  let success = 0;
  let failed = 0;

  const createEndpointMetrics = () => ({
    total: 0,
    success: 0,
    failed: 0,
    latencies: [],
  });

  function record(endpointName, ok, latencyMs) {
    total += 1;
    if (ok) {
      success += 1;
    } else {
      failed += 1;
    }

    latencies.push(latencyMs);

    if (!byEndpoint.has(endpointName)) {
      byEndpoint.set(endpointName, createEndpointMetrics());
    }

    const metrics = byEndpoint.get(endpointName);
    metrics.total += 1;
    if (ok) {
      metrics.success += 1;
    } else {
      metrics.failed += 1;
    }
    metrics.latencies.push(latencyMs);
  }

  function percentile(values, p) {
    if (values.length === 0) {
      return 0;
    }

    const sorted = [...values].sort((a, b) => a - b);
    const index = Math.min(sorted.length - 1, Math.max(0, Math.ceil((p / 100) * sorted.length) - 1));
    return sorted[index];
  }

  async function worker() {
    while (Date.now() < stopAt) {
      const endpoint = scenario[Math.floor(Math.random() * scenario.length)];
      const controller = new AbortController();
      const started = performance.now();
      const timer = setTimeout(() => controller.abort(), options.timeoutMs);

      try {
        const response = await fetch(endpoint.url, {
          method: endpoint.method,
          headers: endpoint.headers,
          body: endpoint.body,
          signal: controller.signal,
        });

        record(endpoint.name, response.ok, performance.now() - started);
      } catch {
        record(endpoint.name, false, performance.now() - started);
      } finally {
        clearTimeout(timer);
      }
    }
  }

  const started = performance.now();
  await Promise.all(Array.from({ length: options.concurrency }, () => worker()));
  const elapsedSec = (performance.now() - started) / 1000;

  const rps = elapsedSec > 0 ? total / elapsedSec : 0;

  console.log("\n=== Load Test Summary ===");
  console.log(`Base URL      : ${options.baseUrl}`);
  console.log(`Scenario      : ${options.scenario}`);
  console.log(`Concurrency   : ${options.concurrency}`);
  console.log(`Duration      : ${options.durationSec}s`);
  console.log(`Total Requests: ${total}`);
  console.log(`Success       : ${success}`);
  console.log(`Failed        : ${failed}`);
  console.log(`RPS           : ${rps.toFixed(2)}`);
  console.log(`p50 Latency   : ${percentile(latencies, 50).toFixed(1)} ms`);
  console.log(`p95 Latency   : ${percentile(latencies, 95).toFixed(1)} ms`);
  console.log(`p99 Latency   : ${percentile(latencies, 99).toFixed(1)} ms`);

  console.log("\n=== By Endpoint ===");
  for (const [name, metrics] of byEndpoint.entries()) {
    const endpointSuccessRate = metrics.total > 0 ? (metrics.success / metrics.total) * 100 : 0;
    console.log(
      `${name.padEnd(12)} total=${String(metrics.total).padStart(6)} success=${endpointSuccessRate.toFixed(1)}% p95=${percentile(metrics.latencies, 95).toFixed(1)}ms`
    );
  }
}

run().catch((error) => {
  console.error("Load test failed:", error);
  process.exitCode = 1;
});
