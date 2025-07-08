# Bau-Structura - Projektmanagement-System

## Übersicht

Bau-Structura ist ein modernes Projektmanagement-System speziell für Bauprojekte und Hochwasserschutz. Die Anwendung bietet eine vollständige Lösung für die Verwaltung von Bauprojekten, Kunden, Firmen und Hochwasserschutz-Maßnahmen.

## Hauptfunktionen

### 🏗️ Projektmanagement
- Vollständige Projektverwaltung mit Status-Tracking
- GPS-Integration für Standortdaten
- Foto- und Dokument-Upload
- Audio-Aufnahmen mit Transkription
- KI-gestützte Projektbeschreibungen und Risikobewertung

### 🌊 Hochwasserschutz-Modul
- Professionelle Checklisten nach Wasserwirtschaftsamt-Standards
- Wartungsanleitungen für Hochwasserschutz-Anlagen
- PDF-Export für Dokumentation
- E-Mail-Versand von Berichten

### 👥 Benutzerverwaltung
- Rollenbasierte Zugriffskontrolle (Admin, Manager, User)
- Lizenzverwaltung (Basic, Professional, Enterprise)
- Lokales Authentifizierungssystem
- Passwort-Reset-Funktionalität

### 📧 E-Mail-System
- BREVO SMTP-Integration
- Automatische Willkommens-E-Mails
- Support-Ticket-Benachrichtigungen
- Hochwasserschutz-Report-Versand

### 🗺️ Karten-Integration
- Google Maps-Integration
- Adresssuche mit automatischem Kartensprung
- Marker-System für Projekte
- Distanz- und Flächenmessung
- Fachgeoportale-Verlinkungen

### 💰 Zahlungssystem
- Stripe-Integration für Lizenz-Zahlungen
- Automatische Lizenz-Aktivierung
- Payment-Success-Handling
- Admin-Zahlungsübersicht

## Technischer Stack

### Frontend
- **Framework**: React 18 mit TypeScript
- **Build Tool**: Vite
- **UI Library**: shadcn/ui (Radix UI + Tailwind CSS)
- **State Management**: TanStack Query (React Query)
- **Routing**: Wouter
- **Styling**: Tailwind CSS mit Custom Properties

### Backend
- **Runtime**: Node.js mit Express.js
- **Sprache**: TypeScript
- **Authentifizierung**: Passport.js mit lokaler Strategie
- **Session Management**: Express Sessions mit PostgreSQL-Speicher

### Datenbank
- **Database**: PostgreSQL (Neon Serverless)
- **ORM**: Drizzle ORM mit TypeScript-Schema
- **Migrationen**: Drizzle Kit (`npm run db:push`)

### Externe Services
- **E-Mail**: BREVO SMTP
- **Zahlungen**: Stripe
- **Karten**: Google Maps API
- **AI**: OpenAI (geplant)
- **Cloud Storage**: Azure Blob Storage (Backups)

## Installation

1. **Dependencies installieren:**
```bash
npm install
```

2. **Umgebungsvariablen konfigurieren:**
```bash
# Database
DATABASE_URL=postgresql://...

# E-Mail (BREVO SMTP)
SMTP_HOST=smtp-relay.brevo.com
SMTP_USER=...
SMTP_PASS=...

# Stripe (optional)
STRIPE_SECRET_KEY=sk_...

# Azure (optional)
AZURE_STORAGE_CONNECTION_STRING=...
```

3. **Datenbank-Schema push:**
```bash
npm run db:push
```

4. **Entwicklungsserver starten:**
```bash
npm run dev
```

## Deployment

### Replit Deployment
Die Anwendung ist für Replit Deployments optimiert:
- Automatische Domain-Konfiguration
- Environment Secrets Management
- One-Click Deployment

### Custom Domain Setup
- DNS A-Record: 34.111.179.208
- TXT-Record: replit-verify=...
- Domain: www.bau-structura.de

## Projektstruktur

```
bau-structura/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # UI-Komponenten
│   │   ├── pages/          # Seiten-Komponenten
│   │   ├── lib/            # Utilities
│   │   └── hooks/          # Custom Hooks
├── server/                 # Express Backend
│   ├── routes.ts           # API-Routen
│   ├── storage.ts          # Datenbank-Interface
│   ├── localAuth.ts        # Authentifizierung
│   ├── emailService.ts     # E-Mail-Funktionalität
│   └── openai.ts           # KI-Integration
├── shared/                 # Geteilte Typen/Schema
│   └── schema.ts           # Drizzle-Schema
├── docs/                   # Dokumentation
└── essential_assets/       # Statische Assets
```

## Lizenzmodell

### Basic Lizenz (21€/Monat)
- Grundfunktionen
- 5 Projekte
- Standard Support

### Professional Lizenz (39€/Monat)
- Erweiterte Features
- Unbegrenzte Projekte
- Hochwasserschutz-Modul
- Priority Support

### Enterprise Lizenz (Preis auf Anfrage)
- Alle Features
- Custom Integrations
- Dedicated Support

## Support

- **E-Mail**: support@bau-structura.de
- **Support-Tickets**: Über Admin-Panel
- **Dokumentation**: /docs Verzeichnis

## Changelog

Siehe `replit.md` für detaillierte Änderungshistorie.

## Entwicklungsrichtlinien

1. **TypeScript-First**: Alle Komponenten typisiert
2. **Mobile-First**: Responsive Design prioritär
3. **Performance**: Lazy Loading und Code Splitting
4. **Security**: Verschlüsselte Passwörter, HTTPS-Only
5. **EU AI Act Compliance**: KI-Interaktionen protokolliert

## Status

- ✅ Grundfunktionalität komplett
- ✅ Authentifizierung implementiert
- ✅ E-Mail-System funktional
- ✅ Hochwasserschutz-Modul einsatzbereit
- ✅ Admin-Panel vollständig
- 🔄 Domain-Propagation läuft
- 📋 Bereit für Produktionseinsatz

Letztes Update: Juli 2025
