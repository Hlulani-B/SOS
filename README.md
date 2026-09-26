# Safe — Covert Safety for Survivors of Gender-Based Violence

**Safe** looks like three everyday apps — a calculator, a weather app, and a clothing boutique. Underneath, it is a covert emergency alert system that lets a victim of gender-based violence (GBV) summon help and capture evidence **without the perpetrator ever knowing the app exists**.

---

## The Problem

### The scale of it

Gender-based violence is one of the most under-reported and most lethal crimes on earth. The WHO estimates that nearly **1 in 3 women worldwide** — about 736 million — experience physical or sexual violence in their lifetime, most often at the hands of an intimate partner. In South Africa the picture is even starker: femicide rates run at roughly five times the global average, and a woman is murdered every few hours — very often by someone she lives with.

Behind every statistic is the same crushing reality: the victim shares a home, a table, a bedroom with the person who hurts her. **The most dangerous place she can be is the place she cannot leave — and the person watching her screen is the person she needs to escape.**

### Why existing safety apps fail her

Almost every safety product on the market shares one fatal assumption: *that the victim can openly reach for her phone and use a visible emergency app*. In a coercive, controlling environment that assumption collapses:

- **A panic-button app is a neon sign.** An abuser who monitors the victim's phone finds "SOS – Women Safety" on the home screen in seconds. Its presence doesn't just fail — it **escalates** the danger, triggers device confiscation, and closes off the victim's one channel to the outside world.
- **Visible help-seeking is punished.** A phone call, a text to a friend, a helpline chat — every one of them is a visible act the perpetrator can walk in on. Victims learn to stop trying.
- **Evidence is nearly impossible to gather.** Protection orders and prosecutions need proof, but openly holding up a phone to record an incident is interpreted as aggression and can provoke the very violence it was meant to document.
- **Wearables and paid services exclude the most at-risk.** Panic pendants and subscription safety services cost money, need charging, and are physical objects an abuser will find and destroy.

### The real problem statement

> **Victims of GBV need a way to alert trusted contacts and document abuse in real time, using a device the abuser can inspect at any moment, without any visible sign that the device is anything other than an ordinary phone doing ordinary things.**

The barrier is not technology — it is *cover*. A safety tool only works if it survives inspection by the very person it is hiding from.

---

## The Solution

Safe is a single web app that presents **three fully functional disguises**. There is no "emergency mode" screen, no special gesture, nothing to hide when someone looks over her shoulder. Each disguise is a real, working app; the safety triggers are woven into its normal interface.

### The three disguises

| Disguise | What it really is |
|---|---|
| **Calculator** | A working calculator. Three of its keys are triggers (see below). |
| **Weather** | A real weather app with search and conditions. The same triggers are styled as ordinary interface elements. |
| **Maison (Clothing Boutique)** | A chic storefront. Triggers appear as shopping interface buttons. |

### The trigger system

Each disguise page exposes three triggers, colour-coded to look like deliberate UI design:

- **Olive green** — captures **video**
- **Clear yellow** — captures **audio**
- **Pink** — sends an **SOS alert** with live GPS location

Tap once to start. Tap again to stop — the capture is saved to the device **and emailed to her emergency contacts**.

**Red is the only indicator.** When a trigger is active, the button turns red — nothing else changes. The label never changes ("Record", "Sending", "Active" text would be a death sentence for the disguise). No popups, no alerts, no sounds. Someone glancing at the screen sees a person using a calculator whose designer liked red.

Even the browser tab is part of the cover: the page title always shows the current view ("Calculator", "Weather", "Maison"), never the app's real name.

### What reaches the contacts

- **SOS** — an email with her name, her pre-written message, and a **Google Maps pin of her live GPS location**.
- **Audio / Video** — an email with the recording **attached as a playable file** (MP4/M4A — chosen deliberately because mail apps cannot open the webm format browsers record by default), alongside her message. The file is also saved on the device.
- All alerts go to **contacts she chose and stored herself** — nothing is hardcoded, nothing leaves the device except the alert itself.

### Privacy architecture

- **No accounts. No server. No database.** Profile and contacts live in the device's `localStorage` only. There is nothing to hack, nothing to subpoena, and nothing linking her to the service.
- **No visible trace.** No installation artefact, no splash screen, no notification that an alert was sent — the alert fires silently while the disguise stays on screen.

---

## Third-Party Dependencies

### Runtime

| Package | Role |
|---|---|
| `react` / `react-dom` (v19) | UI framework — all disguise pages and shared trigger components |
| `vite` (v8) | Dev server, production build, **and the API proxy that keeps the email key server-side** |
| `resend` | Declared for the Resend email service. The browser talks to Resend's REST API through the dev-server proxy; the SDK itself is server-oriented and is not imported by the client bundle |
| `twilio` | **Dormant.** The original SMS delivery path, kept installed (with `phoneUtils.js`) so SMS can be restored by rewiring three wrapper functions |
| `sqlite3` | **Legacy.** An early local-database experiment, superseded by `localStorage`; not imported by the running app |

### Development

| Package | Role |
|---|---|
| `@vitejs/plugin-react` | React fast-refresh and JSX transform |
| `oxlint` | Linting (`npm run lint`) |
| `@types/react`, `@types/react-dom` | Editor type intelligence |

### External services and browser APIs

- **Resend email API** — delivers alerts with attachments (free tier: sends from `onboarding@resend.dev` to the account's signup email until a custom domain is verified)
- **MediaRecorder API** — audio/video capture with record-time compression
- **Geolocation API** — live coordinates for the SOS email
- **localStorage** — profile, contacts, and current-view state
- **Google Maps** — location rendered as a plain `maps.google.com` link (no API key required)

---

## Getting Started

### Prerequisites

- Node.js 18+
- A free [Resend](https://resend.com) account (for email delivery)

### Setup

```bash
git clone https://github.com/Hlulani-B/SOS.git
cd SOS
npm install
```

Create a `.env` file in the project root (it is git-ignored and must **never** be committed):

```
RESEND_API_KEY=re_your_key_here
```

Get the key from the Resend dashboard → API Keys. Because the key has no `VITE_` prefix, Vite never injects it into the browser bundle — it exists only on the server side.

### Run

```bash
npm run dev
```

### First-run flow

1. **Setup** — the app opens on a first-run page collecting her first name, surname, and a custom message ("I need help." by default). This is stored on-device only.
2. **Emergency contact** — add a contact's **email address** (Setup page → Emergency Contacts).
3. **Guide** — a walkthrough explains the colour code and the red indicator, then drops her into the landing page.

> **Free-tier note:** until a custom domain is verified in Resend, alerts deliver **only to the email address the Resend account was created with**. Use that address as your test contact.

### Sending a test alert (Calculator disguise)

| Key | Colour | Action |
|---|---|---|
| `7` | Pink | SOS with GPS location |
| `9` | Yellow | Audio recording |
| `3` | Olive | Video recording |

Tap the key once to start (it turns **red**), tap it again to stop. Within seconds the alert email — with attachment and map link — arrives in the contact's inbox.

### Build & lint

```bash
npm run build   # production build to dist/
npm run lint    # oxlint
npm run preview # serve the production build
```

---

## Challenges Faced

**1. SMS delivery died behind a paywall.**
The first delivery channel was Twilio SMS. Trial accounts refused the South African destination number (error 572002 — "add the 'to' number as a verified recipient"), and verifying it required upgrading to a paid plan. Rather than pay for an unproven feature, the alert channel was rebuilt on **Resend email — free tier** — by rewriting the three send modules as thin wrappers with identical signatures, so no component or lock logic had to change.

**2. The email API cannot be called from a browser.**
Resend (like most transactional mail APIs) blocks browser calls with CORS: the preflight response carries no `Access-Control-Allow-Origin`, so `fetch` fails before any request is sent. The fix: a **Vite dev-server proxy** — the browser posts to same-origin `/api/emails`, and the proxy forwards to `api.resend.com` while **injecting the API key server-side**. One fix solved two problems: CORS disappeared, and the API key stopped existing in client code entirely.

**3. Keeping the disguise airtight.**
Halfway through, the browser tab read **"sos"** — a total cover failure the user caught before anyone else could. Fixes: the static `<title>` became "Safe", a `document.title` effect maps every view to its disguise name, the favicon was audited, and a previous "Active"/"Sent" label swap on the trigger buttons was removed — **labels are now frozen and colour is the only state signal**. The rule that emerged: *if a piece of UI state would survive a screenshot landing in the wrong hands, it must be invisible.*

**4. The mobile layout was silently broken.**
Media queries in every page targeted classNames that no element carried — so not one responsive rule had ever fired. And even with classes attached, inline styles would override query rules. The fix became a house pattern: **matching className + `!important` in the query**, plus a fluid `repeat(4, minmax(0, 1fr))` grid for the calculator keys (fixed pixel tracks overflow 360px phones).

**5. Email attachments refused to open.**
Two compounding causes. First, browsers record **webm**, which Gmail/iPhone Mail/Outlook simply cannot play — a perfectly valid file that "fails to open" on tap. Second, a real corruption bug: the base64 helper parsed a data-URL and sliced at the first comma, but MediaRecorder's video MIME type (`video/webm;codecs=vp8,opus`) *contains a comma inside the codec list*, so every video attachment shipped with garbage welded to its bytes. Fixes: recordings now negotiate **MP4/M4A first** (H.264/AAC, which every mail app previews inline) with webm as fallback, and `blobToBase64` was rewritten to encode the raw `ArrayBuffer` in 32KB chunks — no URL parsing, no commas, no failure mode.

**6. "It must always send" — size limits vs. reliability.**
Resend caps attachments at 40MB after base64 encoding. A panic tool cannot lose the alert because a recording ran long. Three guarantees were engineered in: record-time compression (audio: 24kbps mono ≈ 180KB/min; video: 320×240 @15fps ≈ 1MB/min), a 30MB guard that drops an oversized attachment and **says so in the email body**, and a send path where one failing recipient never blocks the others.

**7. Three triggers, one microphone.**
Audio, video, and SOS share device hardware and must never run in parallel — a racing pair of MediaRecorders would wedge the stream. A **promise-chain ownership lock** (`recordingManager`) serialises them: a new trigger stops the active one and *awaits its full pipeline* (stop → save → send) before starting. A subtle race surfaced where the SOS path signalled "done" on its first status callback — releasing the lock while the email was still in flight — fixed by making the callback completion-only.

**8. A privacy model with no backend.**
Every natural design (accounts, a contacts database, message history) would create a server-side trail linking victims to a safety tool. The final architecture stores everything in `localStorage` — nothing to hack, nothing to subpoena — with the honest trade-off that the app is single-device.

---

## How It Was Implemented

### Architecture

- **No router.** A single React 19 entry (`src/main.jsx` → `App.jsx`) switches views on a `view` key in `localStorage`, so navigation leaves no URL trail and survives refresh.
- **One set of trigger components, three disguises.** `AudioRecorder` (`audioButton.jsx`), `VideoRecorder` (`videoButton.jsx`), and `SOSButton` are the only places recording logic exists. Every disguise page imports and styles these three — pages never contain their own MediaRecorder code.
- **Mutual exclusion** — `recordingManager.js` exposes `requestOwnership` / `releaseOwnership` / `isActiveOwner`, with ownership re-checked after every `await` gap (permissions prompts are async takeover windows).

### The recording pipeline

1. `getUserMedia` with compression-first constraints (mono channel, capped resolution/framerate).
2. `MediaRecorder` with a negotiated MIME type — `pickRecorderMime()` in `recorderFormats.js` tries MP4 variants first and falls back to webm, checking `isTypeSupported`.
3. On stop: the blob is typed with the recorder's actual MIME, saved to the device (`audioDownload` / `videoDownload`, extension matched to the real format), then handed to the send wrapper.
4. `blobToBase64()` encodes the raw bytes in 32KB chunks (data-URL parsing is avoided by design — see Challenge 5).
5. `sendAlertEmail(subject, text, attachments)` in `sendAlert.js` is the single dispatcher for all three alert types: reads contacts from `localStorage`, validates email recipients, enforces the attachment size guard, and POSTs to `/api/emails`.

### The delivery path

```
browser → POST /api/emails (same origin)
        → Vite proxy attaches Authorization: Bearer RESEND_API_KEY
        → api.resend.com/emails → contact's inbox
```

The key is loaded via `loadEnv()` in `vite.config.js` and exists only in server memory. Errors from Resend are parsed by `explainResendError()`, which appends plain-English `-> FIX:` hints to the console for the common failure modes (free-tier recipient restriction, invalid key).

### The disguise layer

- Frozen labels + red-only activation state on all triggers.
- `document.title` follows the active view; static title "Safe".
- A first-run flow (Setup → Guide) that teaches the colour code and shows the red indicator *visually* (an olive key flipping to red) rather than describing it.
- Contacts and profile exclusively in `localStorage` (`sa_sos_contacts`, `user_profile`) — never hardcoded.

### Restorable SMS

The Twilio path was not deleted: `.env` vars remain, `phoneUtils.js` still holds `toE164()` and `explainTwilioError()`, and the three send wrappers kept their signatures. Restoring SMS is a rewire of three functions, not a rewrite.

---

## Project Structure

```
sos/
├── index.html                  # Vite host page (title: "Safe")
├── vite.config.js              # build + the /api/emails proxy (key stays server-side)
├── .env                        # RESEND_API_KEY (git-ignored — never commit)
└── src/
    ├── App.jsx                 # view switch (localStorage 'view') + per-view tab title
    ├── main.jsx
    ├── Components/
    │   ├── LandingPage.jsx     # dark-pink hub (post-setup)
    │   ├── SetupPage.jsx       # first-run profile + email emergency contacts
    │   ├── GuidePage.jsx       # colour-code walkthrough incl. live red-indicator demo
    │   ├── CalculatorPage.jsx  # disguise 1 — trigger keys 3 / 7 / 9
    │   ├── WeatherPage.jsx     # disguise 2
    │   ├── ClothingPage.jsx    # disguise 3 ("Maison")
    │   ├── AboutPage.jsx / SupportPage.jsx / SideMenu.jsx
    │   ├── audioButton.jsx     # AudioRecorder component (shared trigger)
    │   ├── videoButton.jsx     # VideoRecorder component (shared trigger)
    │   ├── SOSButton.jsx       # SOS trigger component
    │   ├── recordingManager.js # promise-chain mutual-exclusion lock
    │   └── sosHelper.js        # SOSsend: geolocation → email dispatcher
    └── functions/
        ├── sendAlert.js        # shared email dispatcher + blobToBase64 + error explainer
        ├── recorderFormats.js  # MP4-first MIME negotiation
        ├── audioSend.js / videoSend.js    # thin alert wrappers (attachments)
        ├── audioDownload.js / videoDownload.js  # device save
        └── phoneUtils.js       # dormant Twilio helpers (toE164, explainTwilioError)
```

---

## License

All rights reserved. This project addresses the safety of real people; treat its design constraints (covertness, no hardcoded contacts, no server-side victim data) as requirements, not suggestions.
