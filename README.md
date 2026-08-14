# AI Patient Intake Assistant

An AI-powered prototype that structures unstructured patient intake information, identifies missing details, and drafts follow-up questions — before clinical review.

**[Live demo](#)** — you'll need to paste your own free [Anthropic API key](https://console.anthropic.com) to run an analysis; it's used client-side only and never stored or sent anywhere but api.anthropic.com. Please use the built-in sample data or fictional text only — do not enter real patient information.

## Why I built this

The idea came from a recurring lesson in clinical research and data management: downstream decisions are only as good as the information collected upstream. Before a clinician ever reviews it, a patient's own description of their symptoms — collected by phone, portal, or paper form — is often incomplete or inconsistent, and someone downstream — a clinician, a staff member — pays for that gap in time, follow-up, or missed context.

This prototype explores how AI could help close that gap in everyday clinic intake, without replacing clinical judgment.

## What it does

- **Structures** unstructured patient free-text into a clear summary
- **Flags** missing or inconsistent information
- **Drafts** a follow-up question a staff member could review and send

## What it deliberately does not do

- It does not diagnose or make clinical recommendations
- It does not send anything automatically — a human reviews every output first
- It stays in the information-quality and workflow-support lane

## Product decisions that mattered more than the model

1. **Human review is required, not optional** — nothing is actioned without a person reviewing it first
2. **Information quality over automation** — fewer, accurate flags matter more than many noisy ones
3. **Follow-up questions, not diagnosis** — this tool stays firmly in the administrative lane
4. **Transparency over polish** — outputs should be explainable, not just plausible-sounding

## Built with

- React + Vite
- Anthropic Claude API (bring-your-own key, client-side only — no backend, no stored keys)

## Run locally

```bash
npm install
npm run dev
```

## Status

This is a prototype built to explore a problem space — not a finished product. Built by [Jane Natividad](https://github.com/jane-natividad).
