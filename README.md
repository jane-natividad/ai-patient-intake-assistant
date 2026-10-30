# AI Patient Intake Assistant

Turns a patient's own description of their symptoms into a clear, gap checked summary before a clinician reads it.

**[Try the live demo](https://ai-patient-intake-assistant.vercel.app)**. To try the AI step, paste your own LLM API key. It works with any OpenAI compatible API (OpenAI, OpenRouter, Groq, Together, or Llama running on your own machine) or an Anthropic style API. Your key stays in your browser and is only sent to the endpoint you choose. Please use the sample data or your own fictional text.

## Why I built it

Years in clinical research taught me one lesson over and over: decisions downstream are only as good as the information gathered at the start. Watching clinicians chase missing details on intake forms, I wondered how much of that checking could happen earlier, while leaving every clinical judgement with the clinician.

## The problem

A patient's own account of their symptoms, collected by phone, portal or paper, is often incomplete or inconsistent. A nurse or doctor later pays for that gap in time, follow up calls and missed context.

## What I built

A tool that structures free text intake, flags what's missing or contradictory, and drafts one follow up question for staff to review. It never diagnoses, and nothing is sent unless a person decides to send it.

## Who it's for

Primary care and clinic intake teams who want patient reported information organised and checked before a clinician reviews it.

## What it does

- Structures a patient's free text into a short, readable summary
- Flags missing or inconsistent details, such as medications or allergies that weren't mentioned
- Drafts a single follow up question a staff member can review and send
- Stays out of diagnosis and treatment entirely

## Decisions that shaped it

1. **Human review is built in:** every output is a draft for a person to check.
2. **Fewer, better flags:** a short list of accurate gaps is easier to act on than a long, noisy one.
3. **Stays in its lane:** it helps with follow up questions and leaves diagnosis to clinicians.

## Key takeaway

Every output is a draft. A person always decides what happens next.

## Built with

- React and Vite
- Any LLM API through a small provider agnostic client (bring your own key, no backend)

## Run it locally

```bash
npm install
npm run dev
```

## About this project

This is a working prototype I built to explore a real problem space. It uses illustrative, fictional data and isn't connected to any organisation's systems. You can find more of my work at [jane-natividad.github.io](https://jane-natividad.github.io).

Built by [Jane Natividad](https://github.com/jane-natividad).
