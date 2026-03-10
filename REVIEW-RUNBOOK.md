# Consentext AI Gateway Review Runbook

## Purpose
Use this runbook for the final browser pass and the internal walkthrough.

## Start
1. Run `npm run review-ready`.
2. Start the local server with `npm run dev` or `.\start-dev.ps1`.
3. Open `http://localhost:3000` in Chrome or Edge.
4. If prior state appears, use `Reset session`.

`review-ready` now runs:
- preflight
- smoke
- Playwright end-to-end

## Browser QA
Check these first:
- The hero, lane grid, composer, review, result, compare view, and checklist all render without overlap on desktop.
- The layout stays readable on a narrow/mobile-width window.
- The top context bar stays understandable and does not wrap into visual noise.
- Presenter tools open and close cleanly.
- Help, speaker notes, and demo script panels close with `Esc`.
- Toast feedback appears for copy/export/reset/scene actions.
- `Print summary` opens a clean print view without the decorative presenter UI.

## Interaction QA
Check these flows:
- Switch tasks and lanes; confirm prompt drafts persist until `Reset session`.
- Use `Use recommended lane` and the context-bar recommended-lane shortcut.
- Open `Private+` and `Max Intelligence`; confirm approval gating works.
- Change provider mode in external lanes and confirm it appears in review, result, and summary.
- Load at least one demo scene and confirm the active scene is shown in the context bar and summary.
- Copy a share link and reopen it; confirm task, lane, step, and scene restore correctly.
- Use `Export summary` and `Copy summary`; confirm the text matches the current state.

## Demo Flow
Recommended live sequence:
1. Start with `Private anchor`.
2. Explain the four lanes and the off-board direct outside AI UI handoff.
3. Open boundary review and explain what stays inside vs what may leave.
4. Run the result and show provenance plus audit.
5. Switch to `Bridge lane` to show reduced payload and approval.
6. Switch to `Broad mode` to show the weakest supported boundary.
7. End on `Fact first` to reinforce that deterministic is a real product lane, not a fallback.

## Failure Points
Watch for these during the live pass:
- Presenter controls feeling louder than the product itself.
- Review/result sections feeling too dense on smaller screens.
- Confusion between `Private+` and `Max Intelligence`.
- Copy that sounds too technical for the intended audience.
- Any state mismatch between context bar, summary, and actual selected lane/task.

## Decision Rule
If something feels visually noisy in the browser, prefer hiding or simplifying it over adding another explanation.
