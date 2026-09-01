# Lydia & Rueben — invitation site

React + Vite. All wording and dates live in `src/data/wedding.js`;
the components read from it, so you edit content in one place.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
```

## Structure

```
├── index.html                  entry + hidden form for Netlify's build bot
├── netlify.toml                build command and publish dir
├── public/
│   └── images/                 rose cut-outs (referenced as /images/...)
└── src/
    ├── main.jsx
    ├── App.jsx                 section order
    ├── data/wedding.js         ← every name, date and string
    ├── hooks/
    │   ├── useCountdown.js     ticks to the ceremony, returns null after
    │   └── useReveal.js        one-off scroll fade, respects reduced-motion
    ├── styles/
    │   ├── tokens.css          colour, type and rhythm variables
    │   └── global.css          reset + shared type roles
    └── components/             one .jsx + one .module.css each
        ├── SealGate            tap-to-open wax seal
        ├── SiteHeader          sticky name bar
        ├── Hero                names, blooms, date
        ├── CalendarStrip       <table>, dotted heart on the day
        ├── Countdown           <dl>, days/hours/minutes/seconds
        ├── EventDetails        <dl> + <address> + maps link
        ├── RsvpForm            fetch POST, no page reload
        └── SiteFooter
```

## Markup notes

Each element was chosen for what the content is: `<table>` for the
calendar, `<dl>` for label/value pairs, `<fieldset>`/`<legend>` for the
attendance choice, `<address>` for the venue.

## RSVP

Deploy to Netlify and the form works with no backend:

1. Push to GitHub, then in Netlify choose "Import an existing project".
2. `netlify.toml` already sets the build command and publish directory.
3. Replies land under the **Forms** tab. Add your email under
   Forms → Form notifications.

The hidden `<form>` in `index.html` is what Netlify's bot scans at build
time — it never executes React, so deleting that form silently breaks
RSVP. Field names there must match `RsvpForm.jsx`.

Hosting elsewhere? Point the fetch in `RsvpForm.jsx` at Formspree instead:

```js
const response = await fetch('https://formspree.io/f/YOUR_ID', {
  method: 'POST',
  headers: { Accept: 'application/json' },
  body: new FormData(event.target)
})
```
