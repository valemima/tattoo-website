# Frenki's House of Ink - Premium Tattoo Studio Website

🎨 Profesionalni sajt za tattoo studio sa modernim, minimalističkim dizajnom u crno-zlatnoj temi.

## Features

✅ Premium dizajn sa modernim UI/UX  
✅ Profesionalni SVG logo sa simbolom kapi tinte
✅ 6 proizvoda sa ocenama i badge-ovima  
✅ Galerija radova sa lazy loading  
✅ Testimonials od kupaca  
✅ Kontakt forma  
✅ WhatsApp integracija  
✅ Potpuno responsive (desktop, tablet, mobile)
✅ SEO optimizovan sa meta tagovima
✅ ARIA atributi za pristupačnost
✅ Smooth scroll animacije
✅ Shopping korpa funkcionalnost
✅ **Sigurnosne mere (XSS, CSRF, spam protection)**

## 🔒 Sigurnost

Sajt uključuje osnovne sigurnosne mere:
- HTTP Security Headers (X-Frame-Options, XSS Protection, CSP)
- Form validation i sanitization
- Honeypot anti-spam zaštita
- Rate limiting za forme
- SRI (Subresource Integrity) za eksterne resurse
- .htaccess zaštita (Apache)

**Za detalje**: Pogledaj `SECURITY.md`

## Tech Stack

- HTML5 (Semantički markup)
- CSS3 (Grid, Flexbox, CSS Variables, Animacije)
- Vanilla JavaScript (ES6+)
- Font Awesome Icons
- Google Fonts (Oswald, Roboto)

## Struktura Projekta

```
tattoo-website/
├── index.html              # Glavna HTML stranica
├── css/
│   ├── style.css          # Glavni stilovi
│   ├── animations.css     # Animacije i tranzicije
│   └── responsive.css     # Media queries
├── js/
│   ├── main.js           # Glavna logika
│   ├── cart.js           # Shopping korpa
│   └── gallery.js        # Galerija i lazy loading
├── images/
│   ├── logo.svg          # Profesionalni SVG logo
│   └── gallery/          # Galerija slika
└── README.md
```

## Boje

- **Crna**: #121212 (pozadina)
- **Tamno siva**: #1E1E1E (sekundarna pozadina)
- **Zlatna**: #D4AF37 (akcenat)
- **Bela**: #EAEAEA (tekst)

## Live Demo

Otvori `index.html` u browseru ili pokreni lokalni server:

```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server
```

---

**© 2024 Frenki's House of Ink. Sva prava zadržana.**
