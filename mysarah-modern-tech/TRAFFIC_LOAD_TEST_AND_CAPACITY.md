# Traffic Load Test and Capacity Playbook

This document defines how to validate concurrent traffic before and after deployment.

## 1. Goals

- Confirm the website remains stable under expected peak load.
- Measure API reliability for lead generation and analytics endpoints.
- Identify upgrade thresholds before user-facing impact.

## 2. Quick Start

Run local load tests while app is running on localhost:

```bash
npm run loadtest:browse
npm run loadtest:api
npm run loadtest:mixed
```

To target production:

```bash
npm run loadtest:mixed -- --url https://your-domain.com --concurrency 80 --duration 60
```

## 3. Available Test Modes

- `browse`: Main pages only (`/`, `/about`, `/sectors`, `/contact`, `/privacy`, `/terms`)
- `api`: Core APIs only (`/api/health`, `/api/insights/solar`)
- `mixed`: Combination of page and API traffic

Optional synthetic lead write test:

```bash
npm run loadtest:mixed -- --includeLeadPost true
```

Use this only in test/staging environments to avoid polluting production leads.

## 4. Suggested Test Matrix

1. Baseline:
- `concurrency=30`, `duration=30`

2. Normal peak:
- `concurrency=60`, `duration=60`

3. Campaign spike:
- `concurrency=100`, `duration=60`

4. Stress boundary:
- `concurrency=150`, `duration=90`

## 5. Pass/Fail Targets

For `mixed` tests:

- Success rate: `>= 99%`
- p95 latency: `< 900ms`
- p99 latency: `< 1500ms`
- No sustained 5xx bursts

For lead write tests:

- Success rate: `>= 98%`
- p95 latency: `< 1200ms`

## 6. Upgrade Triggers

Move from Vercel free to Pro when one or more conditions persist:

- p95 latency exceeds targets for two consecutive peak tests.
- API failure rate rises above 1% during campaign traffic.
- You regularly exceed safe concurrency during marketing pushes.

## 7. Tracking and Monitoring Checklist

- `NEXT_PUBLIC_GA_ID` configured in environment variables.
- GA4 receives `page_view`, `web_vital`, and lead submit events.
- Keep `/api/insights/solar` cached and monitor degraded responses.
- Watch MongoDB connection limits and operation latency.

## 8. Rollout Notes

- Run the matrix before deployment.
- Re-run after major feature releases.
- Store test summary output in release notes for comparison.
