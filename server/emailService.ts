import * as nodemailer from 'nodemailer';
import { storage } from './storage';
import { InsertSupportTicket } from '@shared/schema';

interface EmailConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  senderEmail: string;
  senderName: string;
}

class EmailService {
  private transporter: nodemailer.Transporter;
  private config: EmailConfig;

  constructor() {
    this.config = {
      host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || '',
      senderEmail: process.env.SENDER_EMAIL || 'support@bau-structura.de',
      senderName: process.env.SENDER_NAME || 'Bau-Structura Support'
    };

    // Nodemailer setup with BREVO SMTP - Enhanced configuration
    console.log('BREVO SMTP Konfiguration:', {
      host: this.config.host,
      port: this.config.port,
      user: this.config.user,
      passLength: this.config.pass?.length || 0,
      senderEmail: this.config.senderEmail
    });

    this.transporter = nodemailer.createTransport({
      host: this.config.host,
      port: this.config.port,
      secure: false, // Use STARTTLS
      requireTLS: true,
      auth: {
        user: this.config.user,
        pass: this.config.pass,
      },
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
      },
      debug: true, // Enable debug for troubleshooting
      logger: true
    });
  }

  async sendSupportTicketEmail(ticketData: {
    to: string;
    subject: string;
    description: string;
    ticketId: number;
    priority: string;
  }) {
    const mailOptions = {
      from: `"${this.config.senderName}" <${this.config.senderEmail}>`,
      to: ticketData.to,
      subject: `Support Ticket #${ticketData.ticketId}: ${ticketData.subject}`,
      html: this.generateTicketEmailHtml(ticketData),
      text: this.generateTicketEmailText(ticketData)
    };

    try {
      const response = await this.transporter.sendMail(mailOptions);
      console.log('E-Mail erfolgreich versendet:', response.messageId);
      return response;
    } catch (error) {
      console.error('Fehler beim E-Mail Versand:', error);
      throw error;
    }
  }

  async sendTicketUpdateEmail(ticketData: {
    to: string;
    ticketId: number;
    subject: string;
    status: string;
    updateMessage: string;
    assignedTo?: string;
  }) {
    const mailOptions = {
      from: `"${this.config.senderName}" <${this.config.senderEmail}>`,
      to: ticketData.to,
      subject: `Support Ticket #${ticketData.ticketId} Update: ${ticketData.status}`,
      html: this.generateUpdateEmailHtml(ticketData),
      text: this.generateUpdateEmailText(ticketData)
    };

    try {
      const response = await this.transporter.sendMail(mailOptions);
      console.log('Update E-Mail erfolgreich versendet:', response.messageId);
      return response;
    } catch (error) {
      console.error('Fehler beim Update E-Mail Versand:', error);
      throw error;
    }
  }

  async sendWelcomeEmail(userData: {
    to: string;
    firstName: string;
    role: string;
    password?: string;
  }) {
    const mailOptions = {
      from: `"${this.config.senderName}" <${this.config.senderEmail}>`,
      to: userData.to,
      subject: 'Willkommen bei Bau-Structura!',
      html: this.generateWelcomeEmailHtml(userData),
      text: this.generateWelcomeEmailText(userData)
    };

    try {
      const response = await this.transporter.sendMail(mailOptions);
      console.log('Willkommens-E-Mail erfolgreich versendet:', response.messageId);
      return response;
    } catch (error) {
      console.error('Fehler beim Willkommens-E-Mail Versand:', error);
      throw error;
    }
  }

  async sendFloodProtectionEmail(emailData: {
    to: string;
    subject: string;
    message: string;
    checklist: any;
    schieber: any[];
    schaeden?: any[];
    wachen?: any[];
    includePdf?: boolean;
  }) {
    const { to, subject, message, checklist, schieber, schaeden, wachen } = emailData;

    // E-Mail-Inhalt zusammenstellen
    const emailContent = `
${message}

--- Checklisten-Details ---
Titel: ${checklist.titel}
Typ: ${checklist.typ}
Status: ${checklist.status}
Erstellt von: ${checklist.erstellt_von}
Fortschritt: ${checklist.aufgaben_erledigt || 0}/${checklist.aufgaben_gesamt || 11} Aufgaben
${checklist.beginn_pegelstand_cm ? `Pegelstand: ${checklist.beginn_pegelstand_cm} cm` : ''}

Absperrschieber-Status:
${schieber.map((s: any) => `- Nr. ${s.nummer}: ${s.bezeichnung} (${s.status})`).join('\n')}

${schaeden && schaeden.length > 0 ? `
Schadensfälle:
${schaeden.map((schaden: any) => `- Schieber ${schaden.absperrschieber_nummer}: ${schaden.problem_beschreibung} (${schaden.status})`).join('\n')}
` : ''}

${wachen && wachen.length > 0 ? `
Deichwachen:
${wachen.map((wache: any) => `- ${wache.name} (${wache.bereich}): ${wache.telefon}`).join('\n')}
` : ''}

---
Diese E-Mail wurde automatisch generiert vom Bau-Structura Hochwasserschutz-System.
Support: ${this.config.senderEmail}
    `;

    const htmlContent = this.generateFloodProtectionEmailHtml({
      to, subject, message, checklist, schieber, schaeden, wachen
    });

    const mailOptions = {
      from: `"${this.config.senderName}" <${this.config.senderEmail}>`,
      to: to,
      subject: subject,
      html: htmlContent,
      text: emailContent
    };

    try {
      const response = await this.transporter.sendMail(mailOptions);
      console.log('Hochwasserschutz-E-Mail erfolgreich versendet:', response.messageId);
      return response;
    } catch (error) {
      console.error('Fehler beim Hochwasserschutz-E-Mail Versand:', error);
      throw error;
    }
  }

  private generateTicketEmailHtml(ticketData: any): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #22C55E, #16A34A); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; }
            .ticket-info { background: white; padding: 15px; border-radius: 6px; margin: 15px 0; }
            .priority-high { border-left: 4px solid #ef4444; }
            .priority-medium { border-left: 4px solid #f97316; }
            .priority-low { border-left: 4px solid #22c55e; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🚧 Bau-Structura Support</h1>
                <p>Neues Support Ticket erstellt</p>
            </div>
            <div class="content">
                <div class="ticket-info priority-${ticketData.priority}">
                    <h3>Ticket #${ticketData.ticketId}</h3>
                    <p><strong>Betreff:</strong> ${ticketData.subject}</p>
                    <p><strong>Priorität:</strong> ${this.getPriorityLabel(ticketData.priority)}</p>
                    <p><strong>Status:</strong> Offen</p>
                </div>
                
                <h4>Beschreibung:</h4>
                <div style="background: white; padding: 15px; border-radius: 6px; white-space: pre-wrap;">${ticketData.description}</div>
                
                <p style="margin-top: 20px;">
                    Unser Support-Team wird sich schnellstmöglich um Ihr Anliegen kümmern. 
                    Sie erhalten automatisch Updates zu diesem Ticket.
                </p>
            </div>
            <div class="footer">
                <p>Bau-Structura - Revolutionäres Projektmanagement für den Bau</p>
                <p>Bei Fragen antworten Sie einfach auf diese E-Mail.</p>
            </div>
        </div>
    </body>
    </html>`;
  }

  private generateTicketEmailText(ticketData: any): string {
    return `
BAU-STRUCTURA SUPPORT

Neues Support Ticket erstellt

Ticket #${ticketData.ticketId}
Betreff: ${ticketData.subject}
Priorität: ${this.getPriorityLabel(ticketData.priority)}
Status: Offen

Beschreibung:
${ticketData.description}

Unser Support-Team wird sich schnellstmöglich um Ihr Anliegen kümmern.
Sie erhalten automatisch Updates zu diesem Ticket.

Bau-Structura - Revolutionäres Projektmanagement für den Bau
Bei Fragen antworten Sie einfach auf diese E-Mail.`;
  }

  private generateUpdateEmailHtml(ticketData: any): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3B82F6, #1D4ED8); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; }
            .update-info { background: white; padding: 15px; border-radius: 6px; margin: 15px 0; }
            .status-open { border-left: 4px solid #f97316; }
            .status-in-progress { border-left: 4px solid #3b82f6; }
            .status-resolved { border-left: 4px solid #22c55e; }
            .status-closed { border-left: 4px solid #6b7280; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🔄 Ticket Update</h1>
                <p>Status-Änderung für Ihr Support Ticket</p>
            </div>
            <div class="content">
                <div class="update-info status-${ticketData.status}">
                    <h3>Ticket #${ticketData.ticketId}</h3>
                    <p><strong>Betreff:</strong> ${ticketData.subject}</p>
                    <p><strong>Neuer Status:</strong> ${this.getStatusLabel(ticketData.status)}</p>
                    ${ticketData.assignedTo ? `<p><strong>Bearbeitet von:</strong> ${ticketData.assignedTo}</p>` : ''}
                </div>
                
                <h4>Update-Nachricht:</h4>
                <div style="background: white; padding: 15px; border-radius: 6px; white-space: pre-wrap;">${ticketData.updateMessage}</div>
            </div>
        </div>
    </body>
    </html>`;
  }

  private generateUpdateEmailText(ticketData: any): string {
    return `
BAU-STRUCTURA SUPPORT - TICKET UPDATE

Ticket #${ticketData.ticketId}
Betreff: ${ticketData.subject}
Neuer Status: ${this.getStatusLabel(ticketData.status)}
${ticketData.assignedTo ? `Bearbeitet von: ${ticketData.assignedTo}` : ''}

Update-Nachricht:
${ticketData.updateMessage}

Bau-Structura Support Team`;
  }

  private generateWelcomeEmailHtml(userData: any): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #22C55E, #16A34A); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
            .role-badge { display: inline-block; padding: 8px 16px; background: #3b82f6; color: white; border-radius: 20px; font-size: 14px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🚧 Willkommen bei Bau-Structura!</h1>
                <p>Ihr Account wurde erfolgreich erstellt</p>
            </div>
            <div class="content">
                <p>Hallo ${userData.firstName},</p>
                
                <p>herzlich willkommen bei Bau-Structura! Ihr Account wurde erfolgreich erstellt.</p>
                
                <p><strong>Ihre Rolle:</strong> <span class="role-badge">${this.getRoleLabel(userData.role)}</span></p>
                
                ${userData.password ? `
                <div style="background: #fee2e2; border: 1px solid #fecaca; border-radius: 6px; padding: 20px; margin: 20px 0;">
                    <h3 style="color: #dc2626; margin-top: 0;">🔐 Ihre Anmeldedaten</h3>
                    <p><strong>Benutzername:</strong> ${userData.firstName}</p>
                    <p><strong>Temporäres Passwort:</strong> <code style="background: #f3f4f6; padding: 4px 8px; border-radius: 4px; font-family: monospace;">${userData.password}</code></p>
                    <p style="color: #dc2626; font-size: 14px;"><strong>⚠️ Wichtig:</strong> Bitte ändern Sie Ihr Passwort bei der ersten Anmeldung!</p>
                </div>
                ` : ''}
                
                <h3>🎯 Nächste Schritte:</h3>
                <ol>
                    <li>Loggen Sie sich in Ihr Dashboard ein</li>
                    <li>Vervollständigen Sie Ihr Profil</li>
                    <li>Erstellen Sie Ihr erstes Projekt</li>
                    <li>Entdecken Sie die KI-gestützten Features</li>
                </ol>
                
                <h3>🆘 Benötigen Sie Hilfe?</h3>
                <p>Unser Support-Team steht Ihnen gerne zur Verfügung. Erstellen Sie einfach ein Support-Ticket in der App oder antworten Sie auf diese E-Mail.</p>
                
                <p>Viel Erfolg mit Bau-Structura!</p>
            </div>
        </div>
    </body>
    </html>`;
  }

  private generateWelcomeEmailText(userData: any): string {
    return `
WILLKOMMEN BEI BAU-STRUCTURA!

Hallo ${userData.firstName},

herzlich willkommen bei Bau-Structura! Ihr Account wurde erfolgreich erstellt.

Ihre Rolle: ${this.getRoleLabel(userData.role)}

${userData.password ? `
IHRE ANMELDEDATEN:
Benutzername: ${userData.firstName}
Temporäres Passwort: ${userData.password}

⚠️ WICHTIG: Bitte ändern Sie Ihr Passwort bei der ersten Anmeldung!
` : ''}

Nächste Schritte:
1. Loggen Sie sich in Ihr Dashboard ein
2. Vervollständigen Sie Ihr Profil  
3. Erstellen Sie Ihr erstes Projekt
4. Entdecken Sie die KI-gestützten Features

Benötigen Sie Hilfe?
Unser Support-Team steht Ihnen gerne zur Verfügung. Erstellen Sie einfach ein Support-Ticket in der App oder antworten Sie auf diese E-Mail.

Viel Erfolg mit Bau-Structura!`;
  }

  private getPriorityLabel(priority: string): string {
    switch (priority) {
      case 'high': return '🔴 Hoch';
      case 'medium': return '🟡 Mittel';
      case 'low': return '🟢 Niedrig';
      default: return priority;
    }
  }

  private getStatusLabel(status: string): string {
    switch (status) {
      case 'open': return '📋 Offen';
      case 'in-progress': return '⚙️ In Bearbeitung';
      case 'resolved': return '✅ Gelöst';
      case 'closed': return '🔒 Geschlossen';
      default: return status;
    }
  }

  private generateFloodProtectionEmailHtml(emailData: any): string {
    const { message, checklist, schieber, schaeden, wachen } = emailData;
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3B82F6, #1E40AF); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; }
            .checklist-info { background: white; padding: 15px; border-radius: 6px; margin: 15px 0; }
            .status-active { border-left: 4px solid #22c55e; }
            .status-warning { border-left: 4px solid #f97316; }
            .status-danger { border-left: 4px solid #ef4444; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            .data-table { width: 100%; border-collapse: collapse; margin: 10px 0; }
            .data-table th, .data-table td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
            .data-table th { background-color: #f1f5f9; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🌊 Hochwasserschutz-Checkliste</h1>
                <p>Automatischer E-Mail-Export</p>
            </div>
            <div class="content">
                <div class="checklist-info status-active">
                    <h2>${checklist.titel}</h2>
                    <p><strong>Typ:</strong> ${checklist.typ}</p>
                    <p><strong>Status:</strong> ${checklist.status}</p>
                    <p><strong>Erstellt von:</strong> ${checklist.erstellt_von}</p>
                    <p><strong>Fortschritt:</strong> ${checklist.aufgaben_erledigt || 0}/${checklist.aufgaben_gesamt || 11} Aufgaben</p>
                    ${checklist.beginn_pegelstand_cm ? `<p><strong>Pegelstand:</strong> ${checklist.beginn_pegelstand_cm} cm</p>` : ''}
                </div>
                
                <div style="margin: 20px 0; padding: 15px; background: white; border-radius: 6px;">
                    <h3>💬 Nachricht</h3>
                    <p>${message}</p>
                </div>

                <div style="margin: 20px 0;">
                    <h3>🔧 Absperrschieber-Status</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Nr.</th>
                                <th>Bezeichnung</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${schieber.map((s: any) => `
                                <tr>
                                    <td>${s.nummer}</td>
                                    <td>${s.bezeichnung}</td>
                                    <td>${s.status}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>

                ${schaeden && schaeden.length > 0 ? `
                <div style="margin: 20px 0;">
                    <h3>⚠️ Schadensfälle</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Schieber</th>
                                <th>Problem</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${schaeden.map((schaden: any) => `
                                <tr>
                                    <td>Nr. ${schaden.absperrschieber_nummer}</td>
                                    <td>${schaden.problem_beschreibung}</td>
                                    <td>${schaden.status}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                ` : ''}

                ${wachen && wachen.length > 0 ? `
                <div style="margin: 20px 0;">
                    <h3>👥 Deichwachen</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Bereich</th>
                                <th>Telefon</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${wachen.map((wache: any) => `
                                <tr>
                                    <td>${wache.name}</td>
                                    <td>${wache.bereich}</td>
                                    <td>${wache.telefon}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                ` : ''}

                <div class="footer">
                    <p>Diese E-Mail wurde automatisch vom Bau-Structura Hochwasserschutz-System generiert.</p>
                    <p>Support: ${this.config.senderEmail}</p>
                </div>
            </div>
        </div>
    </body>
    </html>`;
  }

  private getRoleLabel(role: string): string {
    switch (role) {
      case 'admin': return 'Administrator';
      case 'manager': return 'Manager';
      case 'user': return 'Benutzer';
      default: return role;
    }
  }
}

export const emailService = new EmailService();