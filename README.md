# gmerm.github.io

Personal academic website of Georgios Mermigkis, served by GitHub Pages at <https://gmerm.github.io>.

Plain static HTML/CSS/JS, no build step (`.nojekyll` disables Jekyll).

- `index.html` – all content (about, experience, publications, projects, service, contact)
- `assets/css/style.css` – styles; colors are CSS variables at the top (light + dark theme)
- `assets/js/main.js` – theme toggle, mobile menu, publication filters, copy-email
- `files/CV_Georgios_Mermigkis.pdf` – CV linked from the nav

To add a publication, copy an existing `<article class="paper-card">` block in `index.html`
and update the counts in the nav badge and filter buttons.

Local preview: `python3 -m http.server 8000` and open <http://localhost:8000>.
