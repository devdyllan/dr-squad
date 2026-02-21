#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT_DIR"

INBOX_DIR="data/ceo/inbox"
mkdir -p "$INBOX_DIR"

MIB_FILE="data/research/outputs/mib/2026-02-19_MIB-DACH-LU-NUTRACEUTICAL.md"
BPP_WL_FILE="data/research/outputs/BPP-001_WL-DACH-LU.md"
BPP_ED_FILE="data/research/outputs/BPP-002_ED-DACH-LU.md"
CIR_FILE="data/research/outputs/CIR-001_WL-ED-DACH-LU.md"

extract_rqs() {
  local file="$1"
  if [[ ! -f "$file" ]]; then
    echo "MISSING"
    return
  fi

  local line
  line="$(rg -m1 "Weighted Final Score: [0-9]{2,3}/100|Total RQS: [0-9]{2,3}/100|RQS Self-Assessment.*[0-9]{2,3}/100" "$file" || true)"
  if [[ -z "$line" ]]; then
    echo "UNKNOWN"
    return
  fi

  local score
  score="$(echo "$line" | rg -o "[0-9]{1,3}" | head -n1 || true)"
  if [[ -z "$score" ]]; then
    echo "UNKNOWN"
    return
  fi

  echo "$score"
}

is_pass() {
  local score="$1"
  if [[ "$score" =~ ^[0-9]+$ ]] && (( score >= 75 )); then
    echo "PASS"
  else
    echo "FAIL"
  fi
}

mib_rqs="$(extract_rqs "$MIB_FILE")"
bpp_wl_rqs="$(extract_rqs "$BPP_WL_FILE")"
bpp_ed_rqs="$(extract_rqs "$BPP_ED_FILE")"
cir_rqs="$(extract_rqs "$CIR_FILE")"

mib_gate="$(is_pass "$mib_rqs")"
bpp_wl_gate="$(is_pass "$bpp_wl_rqs")"
bpp_ed_gate="$(is_pass "$bpp_ed_rqs")"
cir_gate="$(is_pass "$cir_rqs")"

missing_or_blockers=()
[[ "$mib_rqs" == "MISSING" ]] && missing_or_blockers+=("MIB missing")
[[ "$bpp_wl_rqs" == "MISSING" ]] && missing_or_blockers+=("BPP-WL missing")
[[ "$bpp_ed_rqs" == "MISSING" ]] && missing_or_blockers+=("BPP-ED missing")
[[ "$cir_rqs" == "MISSING" ]] && missing_or_blockers+=("CIR missing")
[[ "$mib_gate" == "FAIL" && "$mib_rqs" != "MISSING" ]] && missing_or_blockers+=("MIB below gate (RQS $mib_rqs)")
[[ "$bpp_wl_gate" == "FAIL" && "$bpp_wl_rqs" != "MISSING" ]] && missing_or_blockers+=("BPP-WL below gate (RQS $bpp_wl_rqs)")
[[ "$bpp_ed_gate" == "FAIL" && "$bpp_ed_rqs" != "MISSING" ]] && missing_or_blockers+=("BPP-ED below gate (RQS $bpp_ed_rqs)")
[[ "$cir_gate" == "FAIL" && "$cir_rqs" != "MISSING" ]] && missing_or_blockers+=("CIR below gate (RQS $cir_rqs)")

timestamp="$(date +"%Y-%m-%d %H:%M:%S %Z")"
outfile="$INBOX_DIR/$(date +"%Y-%m-%d_%H%M")_CEO-AUTOPILOT-CYCLE.md"

{
  echo "# CEO Autopilot Cycle"
  echo "**Generated at:** $timestamp"
  echo "**Mode:** delegated"
  echo
  echo "## Phase Gate Snapshot"
  echo "- MIB: $mib_gate (RQS: $mib_rqs)"
  echo "- BPP-WL: $bpp_wl_gate (RQS: $bpp_wl_rqs)"
  echo "- BPP-ED: $bpp_ed_gate (RQS: $bpp_ed_rqs)"
  echo "- CIR: $cir_gate (RQS: $cir_rqs)"
  echo

  if (( ${#missing_or_blockers[@]} == 0 )); then
    echo "## Decision"
    echo "- Phase gate complete for Research -> Copy."
    echo "- Next required human action: issue SDB-002 authorizing Copy Phase."
    echo
    echo "## CEO Recommendation"
    echo "- Notify owner via WhatsApp with the 4 deliverables summary and approval request for SDB-002."
  else
    echo "## Decision"
    echo "- Phase gate not complete."
    echo
    echo "## Blockers"
    for blocker in "${missing_or_blockers[@]}"; do
      echo "- $blocker"
    done
    echo
    echo "## CEO Recommendation"
    echo "- Keep Research phase active until all deliverables pass RQS >= 75."
  fi
} > "$outfile"

echo "Autopilot cycle completed."
echo "Inbox item: $outfile"
