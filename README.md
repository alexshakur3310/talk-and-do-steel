# Talk and Do Steel Company Ltd

Marketing website for a steel and structural-metals supplier at Kofar Ruwa
Market, Kano, Nigeria — beams, sheets and plates, pipes and tubes, flat bars
and angles, channels and purlins.

Built as a static site (no build step) from a Claude Design mockup
("Talk and Do Steel Website.dc.html").

## Structure

| Path             | Purpose                                              |
| ---------------- | --------------------------------------------------- |
| `index.html`     | The single-page site                                |
| `css/styles.css` | Design tokens, layout, responsive rules             |
| `js/main.js`     | Mobile nav, scroll-spy, reveal-on-scroll, quote form |
| `images/`        | Product photos and the AGABA company crest          |

## Run locally

Open `index.html` directly, or serve the folder:

```bash
npx serve .
# or
python -m http.server 8000
```

## Design

- **Colour** — ink `#12203d`, structural blue `#1e3a8f`, signal red `#e03127`
- **Type** — Archivo (display), Barlow / Barlow Condensed (body, labels)
- **Motif** — ribbed "steel fluting" on dark sections and icon chips

## Before going live

Replace the placeholder content carried over from the mockup:

- Phone numbers (`0803 000 0000`, `0703 000 0000`) and the WhatsApp number in
  `js/main.js` (`wa.me/2348030000000`)
- Yard address (`Shop 00, Steel Line`), `RC 0000000`, `sales@talkanddosteel.com`
- Product pricing (currently "Today's rate on request")
- Social media links (currently `#`)
