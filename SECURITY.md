# 🔒 Sigurnosne Mere - Frenki's House of Ink

## ✅ Implementirane Sigurnosne Mere

### 1. **HTTP Security Headers**
- ✅ `X-Frame-Options: SAMEORIGIN` - Sprečava clickjacking napade
- ✅ `X-XSS-Protection: 1; mode=block` - Sprečava XSS napade
- ✅ `X-Content-Type-Options: nosniff` - Sprečava MIME type sniffing
- ✅ `Referrer-Policy` - Kontrola slanja referrer informacija
- ✅ `Permissions-Policy` - Blokira pristup kamerama, mikrofonu, geolokaciji

### 2. **Content Security Policy (CSP)**
- Definisana politika za učitavanje resursa
- Dozvoljeni izvori za script, style, font, slike
- Blokiranje inline script-ova (osim eksplicitno dozvoljenih)

### 3. **Forma - Anti-Spam i Validacija**
- ✅ **Honeypot polje** - Skriveno polje za hvatanje bot-ova
- ✅ **Rate limiting** - Sprečava spam (1 minuta između slanja)
- ✅ **Input sanitization** - Čišćenje unosa od XSS napada
- ✅ **Email validacija** - Regex provera email formata
- ✅ **Min/Max length** - Ograničenja dužine unosa
- ✅ **Pattern matching** - Validacija telefona
- ✅ **Double submit prevencija** - Onemogućen submit dugme tokom slanja

### 4. **XSS (Cross-Site Scripting) Zaštita**
```javascript
// Sanitizacija unosa
function sanitizeInput(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML.trim();
}
```

### 5. **.htaccess Zaštita** (Apache Server)
- ✅ Onemogućen directory listing
- ✅ Zaštita sensitive fajlova (.htaccess, README, config files)
- ✅ Blokiranje SQL injection pokušaja u URL-ovima
- ✅ GZIP kompresija za brže učitavanje
- ✅ Browser caching za performanse

### 6. **External Resources**
- ✅ Font Awesome učitan sa SRI hash-om (Subresource Integrity)
- ✅ `crossorigin="anonymous"` za CDN resurse
- ✅ `referrerpolicy="no-referrer"` za eksterne linkove

## 🚀 Dodatne Preporuke (Za Produkciju)

### 1. **SSL/HTTPS Certifikat**
```bash
# Preporučeni provideri:
- Let's Encrypt (besplatno)
- Cloudflare (besplatno)
- Commercial SSL (plaćeno)
```

**Kada aktiviraš SSL, odkomentariši u .htaccess:**
```apache
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
```

### 2. **Backend API Zaštita**
Kada implementiraš backend (PHP, Node.js, Python), dodaj:

```javascript
// CSRF Token
fetch('/api/contact', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': getCsrfToken()
    },
    body: JSON.stringify(data)
})
```

### 3. **Database Security**
Ako dodaješ bazu podataka:
- ✅ Koristi prepared statements (PDO/MySQLi)
- ✅ Nikada ne stavljaj kredencijale u kod
- ✅ Koristi environment varijable (.env fajl)
- ✅ Šifruj osetljive podatke
- ✅ Regular backup baze

### 4. **Environment Variables**
Kreiraj `.env` fajl (NE KOMITUJ GA u Git):
```env
DB_HOST=localhost
DB_USER=your_username
DB_PASS=your_password
SMTP_HOST=smtp.gmail.com
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

Dodaj u `.gitignore`:
```
.env
.env.local
*.log
node_modules/
```

### 5. **Regular Updates**
- 📦 Redovno ažuriraj Font Awesome i druge biblioteke
- 🔒 Prati sigurnosne ranjivosti (npm audit, Snyk)
- 🛡️ Koristi automatske security scanners

### 6. **Monitoring & Logging**
```javascript
// Log security events
function logSecurityEvent(type, details) {
    // Send to logging service (e.g., Sentry, LogRocket)
    console.warn(`[SECURITY] ${type}:`, details);
}
```

### 7. **WAF (Web Application Firewall)**
Preporučeni servisi:
- Cloudflare (besplatno za basic)
- Sucuri
- ModSecurity (open-source)

## 🔥 Firewall Pravila

Ako imaš pristup serveru, postavi:
```bash
# UFW (Ubuntu)
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw allow 22/tcp    # SSH (samo ako treba)
sudo ufw enable

# iptables
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT
```

## 🚨 Incident Response Plan

Ako dođe do napada:
1. **Odmah promeni sve lozinke**
2. **Preuzmi backup baze i fajlova**
3. **Skeniraj sajt antivirus alatima**
4. **Proveri access logs za sumnjive aktivnosti**
5. **Obavesti hosting provider**
6. **Proveri sve fajlove za malware**

## 📊 Security Checklist

- [x] HTTP Security Headers
- [x] XSS Protection
- [x] Form validation & sanitization
- [x] Rate limiting
- [x] Honeypot spam protection
- [x] .htaccess security rules
- [x] SRI for external resources
- [ ] SSL/HTTPS Certificate
- [ ] CSRF Token (kada dodaš backend)
- [ ] Database encryption
- [ ] Regular backups
- [ ] Security monitoring
- [ ] WAF implementacija

## 🔗 Korisni Alati za Testiranje

- **SSL Test**: https://www.ssllabs.com/ssltest/
- **Security Headers**: https://securityheaders.com/
- **XSS Test**: https://xss-game.appspot.com/
- **OWASP ZAP**: https://www.zaproxy.org/
- **Mozilla Observatory**: https://observatory.mozilla.org/

## 📞 Kontakt

Za dodatne sigurnosne preporuke ili pitanja, konsultuj se sa:
- Sigurnosnim ekspertom
- Hosting providerom
- OWASP dokumentacijom

---

**Napomena**: Ovo su osnovne mere za static website. Kada dodaš backend, database i user authentication, biće potrebne dodatne sigurnosne mere.

**Poslednje ažuriranje**: Decembar 2024
