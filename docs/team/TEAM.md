# Tommy Roll Clone — Team Mode

## Goal
Bring the site as close as possible to a 1:1 clone of `https://tommyrollbar.co.il`, then keep it running with automatic CI/CD and review gates.

## Team Roles
- **Orchestrator (main)** — owns scope, state transitions, final decisions, deploy approval
- **Inspector** — compares original site vs clone and writes exact gap lists
- **Builder** — implements UI/code changes in `app/page.tsx`, `app/layout.tsx`, `app/globals.css`, assets if needed
- **Reviewer** — checks fidelity, RTL, accessibility, SEO, responsive behavior, and regressions
- **Ops** — owns deployment workflow, Railway status, smoke tests, and automation

## Workflow
1. **Inspect** → write findings to `docs/team/reports/`
2. **Build** → implement changes in code
3. **Review** → verify against original site
4. **Deploy** → GitHub Actions → Railway
5. **Smoke test** → production returns 200 and key sections render

## Rules
- Every non-trivial change must preserve RTL and mobile behavior
- Prefer exact original URLs / embeds / widget configs when known
- Keep deploy automation green at all times
- If a fix changes production behavior, ship only after successful build + smoke test

## Current Priorities
1. Improve 1:1 fidelity of Tommy Roll clone
2. Keep team-based workflow active on this repo
3. Avoid manual Railway deploy steps — GitHub Actions is now the source of truth
