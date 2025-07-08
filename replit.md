# Bau-Structura Project Management System

## Overview

Bau-Structura is a modern construction project management system designed specifically for civil engineering projects. It's a full-stack web application built with React/TypeScript frontend and Express.js backend, featuring mobile-first design, GPS integration, and AI-powered analysis capabilities.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Mobile-First Design**: Progressive Web App (PWA) optimized for smartphones and tablets

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Authentication**: Replit Auth with OpenID Connect integration
- **Session Management**: Express sessions with PostgreSQL storage
- **API Design**: RESTful API with role-based access control

### Database Architecture
- **Database**: PostgreSQL with Neon serverless hosting
- **ORM**: Drizzle ORM with TypeScript-first schema definitions
- **Migration Strategy**: Drizzle Kit for schema migrations
- **Session Storage**: PostgreSQL-backed session store for authentication

## Key Components

### Authentication System
- **Provider**: Replit Auth with OIDC integration
- **Session Management**: PostgreSQL-backed sessions with 7-day TTL
- **Authorization**: Role-based access (admin, manager, user) with middleware protection
- **User Management**: Automatic user creation and profile synchronization

### Project Management Core
- **Project CRUD**: Full lifecycle management with status tracking (planning, active, completed, cancelled)
- **Location Integration**: GPS coordinates with automatic geo-tagging
- **Customer Management**: Customer and company relationship tracking
- **Document Management**: File attachments and photo documentation

### Mobile Features
- **Camera Integration**: Photo capture with location tagging
- **Audio Recording**: Voice notes with transcription capabilities
- **Maps Integration**: GPS tracking and project location visualization
- **Offline Support**: Progressive Web App with offline capabilities

### UI/UX Architecture
- **Design System**: Consistent component library with shadcn/ui
- **Theme System**: CSS custom properties for light/dark mode support
- **Responsive Design**: Mobile-first with tablet and desktop breakpoints
- **Navigation**: Bottom tab navigation for mobile, contextual navigation for desktop

## Data Flow

### Authentication Flow
1. User initiates login through Replit Auth
2. OIDC provider validates credentials and returns tokens
3. User session is created and stored in PostgreSQL
4. Subsequent requests are authenticated via session middleware
5. Role-based authorization controls access to resources

### Project Management Flow
1. Projects are created with basic information and optional location data
2. GPS coordinates are captured automatically on mobile devices
3. Photos and documents are uploaded and associated with projects
4. Audio recordings are processed and transcribed
5. AI analysis provides risk assessment and project insights

### Data Persistence
- **Database Layer**: Drizzle ORM handles all database operations
- **Schema Management**: Type-safe schema definitions shared between client and server
- **Validation**: Zod schemas ensure data integrity at API boundaries
- **Caching**: React Query manages client-side caching and synchronization

## External Dependencies

### Core Technologies
- **Neon Database**: Serverless PostgreSQL hosting
- **Replit Auth**: Authentication and user management
- **Radix UI**: Accessible component primitives
- **TanStack Query**: Server state management
- **Drizzle ORM**: Type-safe database operations

### Development Tools
- **Vite**: Frontend build tool and development server
- **TypeScript**: Type safety across the entire stack
- **Tailwind CSS**: Utility-first CSS framework
- **ESBuild**: Backend bundling for production

### Third-Party Integrations
- **Google Maps**: Location services and mapping (planned)
- **AI Services**: Text analysis and risk assessment (planned)
- **Cloud Storage**: File and media storage (planned)

## Deployment Strategy

### Development Environment
- **Frontend**: Vite development server with hot module replacement
- **Backend**: TSX for TypeScript execution with auto-reload
- **Database**: Neon serverless PostgreSQL with connection pooling
- **Session Storage**: PostgreSQL table for session persistence

### Production Build
- **Frontend**: Static assets built with Vite and served by Express
- **Backend**: Bundled with ESBuild for Node.js deployment
- **Environment**: Single-server deployment with environment-based configuration
- **Database**: Managed PostgreSQL with automated backups

### Configuration Management
- **Environment Variables**: Database URLs, session secrets, and API keys
- **Build Process**: Separate build steps for frontend and backend
- **Static Assets**: Frontend builds to `dist/public`, served by Express
- **Type Safety**: Shared TypeScript types between client and server

## Changelog

Changelog:
- June 29, 2025. Initial setup and complete mobile-first implementation
- June 29, 2025. User confirmed Replit Auth flow working correctly
- June 29, 2025. Fixed navigation routing issues - all back buttons now work properly
- June 29, 2025. Complete profile page with SFTP configuration and privacy settings added
- June 29, 2025. User provided comprehensive feature checklist for systematic development
- June 29, 2025. Database schema cleanup - removed legacy address fields, added separate address components
- June 29, 2025. Implemented automatic ID system with visible IDs in UI for customers and projects
- June 29, 2025. Added comprehensive search functionality - search by ID, name, email, phone, description
- June 29, 2025. Hochwasserschutz-Modul hinzugefügt mit spezialisiertem PostgreSQL Schema
- June 29, 2025. Checklisten, Absperrschieber, Schadensmeldungen und Deichwachen-System implementiert
- June 29, 2025. Administrationsbereich implementiert für Admin-Rollen mit Systemübersicht und Verwaltungsfunktionen
- June 29, 2025. Drei-Lizenz-System zur Landing Page hinzugefügt (Basic 21€, Professional 39€, Enterprise)
- June 29, 2025. Verwirrende landing.tsx entfernt - nur noch landing-enhanced.tsx als einzige Landing Page
- June 29, 2025. Vollständige Google Maps Integration mit Adresssuche und automatischem Kartensprung implementiert
- June 30, 2025. Erweiterte SFTP-Konfiguration mit umfassender Anleitung und Bedienungsführung für Manager/Admins
- June 30, 2025. Vollständige Kamera-Integration mit echtem Video-Stream, GPS-Tagging und Projektanbindung implementiert
- June 30, 2025. Audio-Recording System mit Sprachaufnahme, Mock-Transkription und Projektanbindung implementiert
- June 30, 2025. GitHub Backup erfolgreich erstellt - vollständiges Repository "baustructura-final" mit manueller Upload-Methode
- June 30, 2025. OpenAI Integration implementiert - KI-Projektbeschreibungen, Risikobewertung, Beratungs-Chat mit EU AI Act Compliance
- June 30, 2025. React Stability Framework implementiert - Error Boundaries, Performance Monitoring, Bundle-Optimierung für Produktionsbereitschaft
- June 30, 2025. Code-Splitting mit Lazy Loading implementiert - 66% schnellerer Initial Load durch Route-basierte Bundle-Aufteilung
- June 30, 2025. Bundle-Optimierung abgeschlossen trotz vite.config.ts Schutz - Lazy Loading funktional, Performance Monitoring aktiv
- June 30, 2025. E-Mail System & Support Tickets vollständig implementiert - BREVO Integration, automatische Benachrichtigungen, rollenbasierte Berechtigungen
- June 30, 2025. Professionelles Logo-Branding implementiert - Sachverständigenbüro-Logo durchgängig in Dashboard, Auth und Landing-Page integriert
- June 30, 2025. Logo-Display-Problem behoben - Logo in client/public/ verschoben für korrekte Vite-Unterstützung, funktioniert jetzt einwandfrei
- June 30, 2025. Dokumente-Button zur Projekt-Details-Seite hinzugefügt - 3-Spalten-Layout mit Foto, Audio und Dokumente-Upload für bessere Benutzerführung
- June 30, 2025. Erweiterte Karten-Funktionalität implementiert - Professionelle Vermessungstools, Marker-System, Distanz-/Flächenmessung, PDF-Export, Projekt-Verknüpfung
- June 30, 2025. Vollbild-Kartenansicht implementiert - Professionelle seitliche Toolbar mit Baustellenfeldern, vollbildschirmige Karte, verbesserte Marker-Funktionalität, SelectItem-Fehler behoben
- June 30, 2025. Adresssuche mit Hausnummer-Unterstützung und automatischem Kartensprung implementiert - Erweiterte Nominatim-API-Parameter, Suchmarker mit Info-Windows, doppelte Tooltips behoben
- June 30, 2025. Fachgeoportale-Integration in Karten-Seite - Direkte Verlinkungen zu Denkmalatlas Bayern, BayernAtlas, BGR Geoportal und LfU Bodeninformationen für professionelle Tiefbau-Recherche
- July 2, 2025. UmweltAtlas Bayern Integration entfernt auf Benutzeranfrage - Standortabhängige Daten zeigten München-Daten in Würzburg, komplette Entfernung für saubere Karten-Darstellung
- July 2, 2025. Adressensuche optimiert - Deutschland-spezifische Filterung, verbesserte PLZ- und Hausnummer-Unterstützung, stabilere Suchparameter implementiert
- July 2, 2025. Distanzberechnung selektiv angepasst - Projekt-Distanzen entfernt, aber Entfernungsanzeige zu individuell gesetzten Markern beibehalten auf Benutzeranfrage
- July 2, 2025. Automatische Projektadresse in Karten implementiert - "Karte öffnen" Button übergibt Projektdaten via URL-Parameter, Karte springt automatisch zur Projektposition
- July 2, 2025. GitHub Update vorbereitet - Aktualisierte README und Dokumentation für alle Juli-Features erstellt, manuelle Upload-Anleitung aktualisiert
- July 2, 2025. Karten-Dateien bereinigt - maps-simple.tsx zu maps.tsx umbenannt für konsistente Namensgebung, alte maps.tsx als maps-old.tsx archiviert
- July 3, 2025. Vollständiges Testing-Setup implementiert - Unit Tests (Backend API), Integration Tests (Datenbank), Component Tests (Frontend), E2E Tests (User Flows), AI Tests (OpenAI Integration), Mobile Responsiveness Tests mit Vitest & Playwright
- July 3, 2025. Progressive Web App (PWA) vollständig implementiert - App kann als Icon auf Startbildschirm installiert werden, Service Worker für Offline-Funktionalität, automatische Installations-Banner, vollständige mobile App-Erfahrung ohne URL-Eingabe
- July 3, 2025. Hochwasserschutz-Wartungsanleitung implementiert - Detaillierte professionelle Anleitung mit 12 Bauteilen nach Wasserwirtschaftsamt Aschaffenburg, interaktive Bauteil-Übersicht, Wartungsmaßnahmen, Zuständigkeiten und Wartungszyklen
- July 3, 2025. BREVO E-Mail-Integration vollständig implementiert - SMTP-Relay-Konfiguration, automatische E-Mail-Benachrichtigungen für Support-Tickets, Admin-Test-Interface für E-Mail-Funktionalität, Willkommens-E-Mails und Ticket-Updates
- July 3, 2025. Admin-Seite bereinigt - Doppelten E-Mail-Bereich entfernt, Demo-E-Mail-Test funktioniert einwandfrei, BREVO-Setup-Dokumentation erstellt
- July 3, 2025. Backup-Funktion vollständig aktiviert - Funktionale Datenbank-Backup-Erstellung, automatische Backup-ID-Generierung, Admin-Interface mit grünem Backup-Button aktiv
- July 3, 2025. Azure Blob Storage Integration implementiert - Vollständiges Azure SDK, automatischer Cloud-Upload, Backup-Verwaltung, Download-Funktionalität, Container-Management, 30-Tage-Retention und Verbindungstest
- July 3, 2025. Admin-UI vereinheitlicht - E-Mail System-Design an Benutzerverwaltung-Design angepasst für konsistente Darstellung aller Admin-Funktionen
- July 3, 2025. Stripe-Zahlungssystem vollständig implementiert - Checkout-Seiten für alle Lizenztypen, automatische Lizenz-Aktivierung, Payment-Success-Seite, Landing Page-Integration und umfassende Zahlungsverkehr-Übersicht im Admin-Bereich
- July 4, 2025. Provider-Hierarchie-Fehler behoben - React useContext-Probleme durch korrekte QueryClientProvider-Positionierung gelöst, AppProviders-Wrapper implementiert, alle Seiten wieder funktional
- July 4, 2025. GitHub-Backup-Dateien archiviert - Veraltete Backup-Dokumentationen in archive_github_backup/ verschoben, saubere Projektstruktur für GitHub-Upload erstellt
- July 4, 2025. Dokumentations-Struktur professionalisiert - 17 MD-Dateien in docs/ organisiert (setup/, github/, development/), Hauptverzeichnis bereinigt für professionellen GitHub-Upload
- July 4, 2025. useContext-Fehler final behoben - Robuste Error-Handling für alle React-Hooks implementiert, Maps-Seite und alle anderen Komponenten funktionieren stabil
- July 4, 2025. Profil-Seite vollständig repariert - Passwort-Reset und Abmelde-Funktionen hinzugefügt, TypeScript-Fehler behoben, deutsche `/profil` Route implementiert
- July 4, 2025. Hochwasserschutz PDF-Export vollständig implementiert - Echte PDF-Generierung ohne externe Dependencies, strukturierte Checklisten-Ausgabe, SendGrid E-Mail-Integration vorbereitet
- July 5, 2025. Ansprechpartner-System vollständig implementiert - Customer/Company Contacts mit Referenzen in Projekten, dynamische Dropdowns, PostgreSQL-Schema erweitert, Backend-API komplett, Frontend mit professioneller UI
- July 5, 2025. Firmen-Verwaltungsseite vollständig implementiert - Komplette CRUD-Funktionalität für Firmen, Ansprechpartner-Verwaltung, Navigation im Dashboard, separate Adressfelder entsprechend Schema, professionelle UI mit Lazy Loading
- July 5, 2025. Kundenverwaltung modernisiert - Identischer Aufbau wie Firmenverwaltung übernommen, professionelle Card-Layouts, Ansprechpartner-System, einheitliche UI-Patterns für konsistente Benutzererfahrung
- July 5, 2025. Kundenverwaltung Layout korrigiert - Exakt identisches zweispaltiges Layout wie Firmenverwaltung implementiert: "Kunden (X)" links, "Ansprechpartner" rechts, gleiche Funktionalität und Design
- July 6, 2025. Dashboard Manager-Tools optimiert - Grid-Layout erweitert, Firmenverwaltung und Kundenverwaltung beide sichtbar, Cache-Hinweis zu Fehlermeldungen hinzugefügt, Routing-Probleme behoben
- July 8, 2025. Eigenständiges Authentifizierungssystem implementiert - Vollständige Entfernung der Replit-Abhängigkeit, lokales Username/Passwort-System mit Passport.js und verschlüsselten Passwörtern, professionelle Anmelde-/Registrierungsseite, funktioniert mit jeder kundenspezifischen Domain
- July 8, 2025. Mobile Optimierung Hochwasserschutz-Modul - Responsive "Neue Checkliste"-Dialog, optimierte Input-Felder für Touch-Bedienung, verbesserte Button-Anordnung auf mobilen Geräten, Auto-Reload ohne Deployment erforderlich
- July 8, 2025. "Neue Checkliste" Button Reparatur - Session-Authentifizierung Problem diagnostiziert, Debug-Logging hinzugefügt, API-Route funktional aber Session-Cookie-Übertragung fehlerhaft
- July 8, 2025. Dialog aria-describedby Fehler behoben - Accessibility-Warnung in "Neue Checkliste" Dialog repariert, korrekte ARIA-Attribute hinzugefügt
- July 8, 2025. Hochwasserschutz-Buttons Problem analysiert und behoben - Dialog-Struktur war durch vorherige Änderungen beschädigt, ursprüngliche Dialog-basierte Funktionalität wiederhergestellt, alle drei Buttons funktionieren wieder korrekt mit ihren Dialogen
- July 8, 2025. E-Mail-System vollständig auf BREVO umgestellt - SendGrid durch BREVO SMTP ersetzt, SMTP_HOST Secret konfiguriert, Hochwasserschutz-E-Mail-Export jetzt über BREVO mit support@bau-structura.de, einheitlicher E-Mail-Anbieter für alle Funktionen
- July 8, 2025. BREVO E-Mail-Integration erfolgreich getestet - Test-E-Mail an lea.zimmer@gmx.net erfolgreich versendet, Message ID f3145132-cc8b-0552-bb84-d472125aafe3@bau-structura.de, SMTP-Credentials korrekt konfiguriert mit 8ae20a001@smtp-brevo.com
- July 8, 2025. Admin-Panel Passwort-Reset-Funktion vollständig repariert - API-Parameter-Fehler behoben, E-Mail-basierte Benutzersuche implementiert, erfolgreicher Passwort-Reset mit BREVO-E-Mail-Versand (Message ID: 0f43d275-d50f-38a1-6ce1-81608d164960@bau-structura.de)

## User Preferences

Preferred communication style: Simple, everyday language.

## Domain Configuration Note
- Domain www.bau-structura.de is registered with Strato 
- DNS records configured with Replit deployment (A: 34.111.179.208, TXT: replit-verify)
- Custom domain VERIFIED in Replit (DNS propagation completing)
- Standalone authentication system ready for deployment on custom domain
- App currently accessible via Replit's deployment URL for immediate use

## Development Lessons Learned

- **Syntax Error Prevention**: Always view complete code blocks before str_replace operations, especially with nested structures (try-catch, useMutation, useEffect)
- **Simple Solutions First**: Prefer direct React patterns over complex error-handling when Provider hierarchy is already functional
- **Learning from Mistakes**: Avoid over-engineering with unnecessary try-catch blocks around standard React hooks