Deployment note — 2026-03-29 17:16 (Asia/Jerusalem)

- Commit: 655583c — "Improve 1:1 fidelity with real Instagram embeds, UserWay widget, and team workflow"
- GitHub Actions: workflow "Verify and Deploy to Railway" (run #4, id 23711023079) — status: in_progress
  - Run URL: https://github.com/darblex/tommy-roll-clone/actions/runs/23711023079
- Production URL: https://tommy-roll-clone-production.up.railway.app — responded 200 OK on check

Remaining automation risks / notes:
- Current GH Actions run is still in_progress — if it fails the deployment will be rolled back/not promoted; watch the run.
- The deploy job uses railway CLI inside a container and requires the RAILWAY_TOKEN secret. Confirm the repository secret exists and is valid (if deploys start failing, token expiry/permissions are the first suspect).
- Local workstation Railway CLI is known-broken here ("Unauthorized"); troubleshooting that locally is not reliable — inspect GH Actions logs for deploy problems instead.

Next steps (exact):
1. Monitor the running workflow at the Run URL above until it completes. If it succeeds, no action needed.
2. If the workflow fails: open the Jobs → Logs page, identify the failing step (verify/build/deploy/smoke-test) and paste the failing log snippet into an issue.
3. If deploy step fails with Railway auth errors: rotate the RAILWAY_TOKEN in repo secrets and re-run the workflow.
4. If smoke-test fails but production URL is healthy: investigate timing/health-check flakiness (increase retries/delay in smoke-test). If production is unhealthy, roll back via Railway console and investigate build output.

Status summary: build+deploy workflow currently running; production site is responding 200 OK at time of check.
