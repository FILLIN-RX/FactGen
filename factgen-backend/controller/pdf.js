i// controller/pdf.js
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class PDFGenerator {
  constructor() {
    this.browser = null;
  }

  async initBrowser() {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu',
          '--disable-extensions'
        ]
      });
    }
    return this.browser;
  }

  async generateFromURL(url, options = {}) {
    const browser = await this.initBrowser();
    const page = await browser.newPage();

    try {
      // Configuration de la page
      await page.setViewport({ width: 1200, height: 800 });
      
      // Headers personnalisés si nécessaire
      if (options.headers) {
        await page.setExtraHTTPHeaders(options.headers);
      }

      // Aller à l'URL avec timeout
      await page.goto(url, { 
        waitUntil: 'networkidle0',
        timeout: 30000 
      });

      // Attendre que la page soit complètement chargée
      await page.waitForSelector('body', { timeout: 10000 });

      // Attendre un délai supplémentaire pour les images/polices
      await page.waitForTimeout(2000);

      // Options par défaut pour le PDF
      const pdfOptions = {
        format: options.format || 'A4',
        landscape: options.landscape || false,
        printBackground: true,
        margin: options.margin || {
          top: '10mm',
          right: '10mm',
          bottom: '10mm',
          left: '10mm'
        },
        displayHeaderFooter: options.displayHeaderFooter || false,
        headerTemplate: options.headerTemplate || '',
        footerTemplate: options.footerTemplate || '',
        preferCSSPageSize: true
      };

      const pdfBuffer = await page.pdf(pdfOptions);
      return pdfBuffer;

    } finally {
      await page.close();
    }
  }

  async generateFromHTML(html, options = {}) {
    const browser = await this.initBrowser();
    const page = await browser.newPage();

    try {
      await page.setViewport({ width: 1200, height: 800 });
      await page.setContent(html, { waitUntil: 'networkidle0' });
      await page.waitForTimeout(1000);

      const pdfOptions = {
        format: options.format || 'A4',
        landscape: options.landscape || false,
        printBackground: true,
        margin: options.margin || {
          top: '10mm',
          right: '10mm',
          bottom: '10mm',
          left: '10mm'
        }
      };

      const pdfBuffer = await page.pdf(pdfOptions);
      return pdfBuffer;

    } finally {
      await page.close();
    }
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}

// Instance globale du générateur PDF
const pdfGenerator = new PDFGenerator();

// Nettoyer les ressources à l'arrêt du processus
process.on('SIGINT', async () => {
  await pdfGenerator.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await pdfGenerator.close();
  process.exit(0);
});

// Fonction principale pour créer un PDF depuis une URL
export async function createPDF(req, res) {
  const factureId = req.params.id;
  const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  const url = `${baseUrl}/facture/${factureId}`;

  try {
    console.log(`🔄 Génération PDF pour facture ${factureId} depuis ${url}`);

    const pdfBuffer = await pdfGenerator.generateFromURL(url, {
      margin: { 
        top: '5mm', 
        bottom: '5mm', 
        left: '5mm', 
        right: '5mm' 
      },
      displayHeaderFooter: false,
      format: 'A4'
    });

    // Headers de réponse
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=facture-${factureId}.pdf`,
      'Content-Length': pdfBuffer.length
    });

    console.log(`✅ PDF généré avec succès pour facture ${factureId}`);
    res.send(pdfBuffer);

  } catch (error) {
    console.error('❌ Erreur génération PDF:', error);
    res.status(500).json({ 
      error: 'Erreur lors de la génération du PDF',
      details: error.message 
    });
  }
}

// Fonction pour créer un PDF depuis du HTML directement
export async function createPDFFromHTML(req, res) {
  const { html, filename = 'document.pdf', options = {} } = req.body;

  if (!html) {
    return res.status(400).json({ error: 'Le contenu HTML est requis' });
  }

  try {
    console.log('🔄 Génération PDF depuis HTML');

    const pdfBuffer = await pdfGenerator.generateFromHTML(html, options);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=${filename}`,
      'Content-Length': pdfBuffer.length
    });

    console.log('✅ PDF généré avec succès depuis HTML');
    res.send(pdfBuffer);

  } catch (error) {
    console.error('❌ Erreur génération PDF depuis HTML:', error);
    res.status(500).json({ 
      error: 'Erreur lors de la génération du PDF',
      details: error.message 
    });
  }
}

// Fonction pour créer un PDF avec template personnalisé
export async function createPDFFromTemplate(req, res) {
  const { factureData, templateName = 'default' } = req.body;

  if (!factureData) {
    return res.status(400).json({ error: 'Les données de facture sont requises' });
  }

  try {
    console.log(`🔄 Génération PDF avec template ${templateName}`);

    // Charger le template HTML
    const templatePath = path.join(__dirname, '../templates', `${templateName}.html`);
    
    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template ${templateName} non trouvé`);
    }

    let htmlTemplate = fs.readFileSync(templatePath, 'utf8');

    // Remplacer les variables dans le template
    htmlTemplate = htmlTemplate
      .replace(/{{factureId}}/g, factureData.id || '')
      .replace(/{{dateEmission}}/g, formatDate(factureData.date_emission))
      .replace(/{{dateEcheance}}/g, formatDate(factureData.date_echeance))
      .replace(/{{clientNom}}/g, factureData.client_data?.nom || '')
      .replace(/{{clientEmail}}/g, factureData.client_data?.email || '')
      .replace(/{{clientAdresse}}/g, factureData.client_data?.address || '')
      .replace(/{{societeNom}}/g, factureData.societer?.nom || '')
      .replace(/{{societeEmail}}/g, factureData.societer?.email || '')
      .replace(/{{societeAdresse}}/g, factureData.societer?.adresse || '')
      .replace(/{{montantTotal}}/g, (factureData.montant_total || 0).toFixed(2))
      .replace(/{{supplement}}/g, factureData.suplement || '');

    // Générer le tableau des produits
    const produitsHTML = (factureData.produits || []).map(produit => `
      <tr>
        <td>${produit.nom}</td>
        <td class="text-center">${produit.quantite}</td>
        <td class="text-center">${(produit.prix || 0).toFixed(2)} €</td>
        <td class="text-right">${((produit.quantite || 0) * (produit.prix || 0)).toFixed(2)} €</td>
      </tr>
    `).join('');

    htmlTemplate = htmlTemplate.replace(/{{produitsTable}}/g, produitsHTML);

    const pdfBuffer = await pdfGenerator.generateFromHTML(htmlTemplate);

    const filename = `facture-${factureData.id || 'template'}.pdf`;

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=${filename}`,
      'Content-Length': pdfBuffer.length
    });

    console.log(`✅ PDF généré avec succès avec template ${templateName}`);
    res.send(pdfBuffer);

  } catch (error) {
    console.error('❌ Erreur génération PDF avec template:', error);
    res.status(500).json({ 
      error: 'Erreur lors de la génération du PDF avec template',
      details: error.message 
    });
  }
}

// Fonction utilitaire pour formater les dates
function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR');
}

export default createPDF;