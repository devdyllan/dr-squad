# Autopilot

This folder contains local automation helpers to run DR Squad without manual prompting.

## CEO Cycle

Run:

```bash
bash tools/autopilot/ceo-cycle.sh
```

What it does:
- checks research deliverables and RQS gates
- decides if Research -> Copy phase gate is ready
- writes a decision inbox item to `data/ceo/inbox/`

## Schedule Every 4 Hours (cron)

```bash
crontab -e
```

Add:

```cron
0 */4 * * * cd /Users/elcaptain/Documents/GitHub/dr-squad && bash tools/autopilot/ceo-cycle.sh >> /tmp/dr-squad-autopilot.log 2>&1
```

