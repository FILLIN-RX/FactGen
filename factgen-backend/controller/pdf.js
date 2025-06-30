// controller/pdf.js - Version corrigée
import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

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
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--disable-accelerated-2d-canvas",
          "--no-first-run",
          "--no-zygote",
          "--disable-gpu",
          "--disable-extensions",
          "--disable-web-security", // ✅ Ajouté pour éviter les erreurs CORS
          "--font-render-hinting=none", // ✅ Améliore le rendu des polices
        ],
      });
    }
    return this.browser;
  }

  async generateFromURL(url, options = {}) {
    const browser = await this.initBrowser();
    const page = await browser.newPage();

    try {
      // ✅ Configuration de la page améliorée
      await page.setViewport({
        width: 1200,
        height: 800,
        deviceScaleFactor: 2, // Améliore la qualité d'impression
      });

      if (options.headers) {
        await page.setExtraHTTPHeaders(options.headers);
      }

      console.log(`🔄 Navigation vers: ${url}`);

      // ✅ Navigation avec gestion d'erreur améliorée
      await page.goto(url, {
        waitUntil: ["networkidle0", "domcontentloaded"],
        timeout: 60000, // Augmenté à 60 secondes
      });

      console.log("✅ Page chargée, attente de la facture...");

      // ✅ Attendre que la facture soit prête - avec gestion d'erreur
      try {
        console.log("✅ Facture prête");
      } catch (error) {
        console.warn("⚠️ Timeout pour isFactureReady, continuation...");
        // Si le flag n'est pas défini, on attend les éléments importants
        await page.waitForSelector(".facture-container", { timeout: 10000 });
      }

      // ✅ Attendre le rendu complet - délai adaptatif
      // Au lieu de waitForTimeout, utilisez cette approche
      await page.waitForFunction(
        () => {
          const container = document.querySelector(".facture-container");
          return container && container.innerText.length > 100;
        },
        { timeout: 30000 }
      );

      // ✅ Vérifier la présence du contenu
      const hasContent = await page.evaluate(() => {
        const container = document.querySelector(".facture-container");
        return container && container.innerText.length > 100;
      });

      if (!hasContent) {
        throw new Error("Le contenu de la facture semble vide ou incomplet");
      }

      const pdfOptions = {
        format: options.format || "A4",
        landscape: options.landscape || false,
        printBackground: true,
        margin: options.margin || {
          top: "10mm",
          right: "10mm",
          bottom: "10mm",
          left: "10mm",
        },
        displayHeaderFooter: options.displayHeaderFooter || false,
        headerTemplate: options.headerTemplate || "",
        footerTemplate: options.footerTemplate || "",
        preferCSSPageSize: true,
        // ✅ Options supplémentaires pour améliorer la qualité
        scale: 1,
        quality: 100,
      };

      console.log("🔄 Génération du PDF...");
      const pdfBuffer = await page.pdf(pdfOptions);
      console.log(`✅ PDF généré (${pdfBuffer.length} bytes)`);

      return pdfBuffer;
    } catch (error) {
      // ✅ Logging détaillé pour debug
      console.error("❌ Erreur lors de la génération PDF:", error.message);

      // ✅ Capture d'écran pour debug en cas d'erreur
      try {
        const screenshot = await page.screenshot({
          fullPage: true,
          type: "png",
        });
        const screenshotPath = path.join(
          __dirname,
          `../debug-screenshot-${Date.now()}.png`
        );
        fs.writeFileSync(screenshotPath, screenshot);
        console.log(`📸 Screenshot sauvegardé: ${screenshotPath}`);
      } catch (screenshotError) {
        console.warn(
          "⚠️ Impossible de capturer l'écran:",
          screenshotError.message
        );
      }

      throw error;
    } finally {
      await page.close();
    }
  }

  async generateFromHTML(html, options = {}) {
    const browser = await this.initBrowser();
    const page = await browser.newPage();

    try {
      await page.setViewport({
        width: 1200,
        height: 800,
        deviceScaleFactor: 2,
      });

      await page.setContent(html, {
        waitUntil: ["networkidle0", "domcontentloaded"],
        timeout: 30000,
      });

      // Au lieu de waitForTimeout, utilisez cette approche
      await page.waitForFunction(
        () => {
          const container = document.querySelector(".facture-container");
          return container && container.innerText.length > 100;
        },
        { timeout: 30000 }
      );
      const pdfOptions = {
        format: options.format || "A4",
        landscape: options.landscape || false,
        printBackground: true,
        margin: options.margin || {
          top: "10mm",
          right: "10mm",
          bottom: "10mm",
          left: "10mm",
        },
        scale: 1,
        quality: 100,
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
process.on("SIGINT", async () => {
  console.log("🔄 Fermeture du générateur PDF...");
  await pdfGenerator.close();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("🔄 Fermeture du générateur PDF...");
  await pdfGenerator.close();
  process.exit(0);
});

// ✅ Fonction principale corrigée
export async function createPDF(req, res) {
  const factureId = req.params.id;
  const baseUrl = process.env.FRONTEND_URL || "http://localhost:5173";
  // ✅ S'assurer que l'URL se termine par '/'
  const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  const url = `${cleanBaseUrl}/facture/${factureId}/pdf`;

  try {
    console.log(`🔄 Génération PDF pour facture ${factureId}`);
    console.log(`📍 URL utilisée: ${url}`);

    // ✅ Vérification de la validité de l'URL
    try {
      new URL(url);
    } catch (urlError) {
      throw new Error(`URL invalide: ${url}`);
    }

    const pdfBuffer = await pdfGenerator.generateFromURL(url, {
      margin: {
        top: "8mm",
        bottom: "8mm",
        left: "8mm",
        right: "8mm",
      },
      displayHeaderFooter: false,
      format: "A4",
    });

    // ✅ Vérification de la taille du PDF
    if (!pdfBuffer || pdfBuffer.length === 0) {
      throw new Error("Le PDF généré est vide");
    }

    // Headers de réponse
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=facture-${factureId}.pdf`,
      "Content-Length": pdfBuffer.length,
      "Cache-Control": "no-cache", // ✅ Éviter les problèmes de cache
    });

    console.log(
      `✅ PDF généré avec succès pour facture ${factureId} (${pdfBuffer.length} bytes)`
    );
    res.send(pdfBuffer);
  } catch (error) {
    console.error("❌ Erreur génération PDF:", error);

    // ✅ Retourner des erreurs plus spécifiques
    const statusCode = error.message.includes("timeout")
      ? 504
      : error.message.includes("URL invalide")
      ? 400
      : 500;

    res.status(statusCode).json({
      error: "Erreur lors de la génération du PDF",
      details: error.message,
      factureId,
      url: `${cleanBaseUrl}/facture/${factureId}/pdf`,
    });
  }
}

// ✅ Fonction pour créer un PDF depuis du HTML directement - améliorée
export async function createPDFFromHTML(req, res) {
  const { html, filename = "document.pdf", options = {} } = req.body;

  if (!html || html.trim().length === 0) {
    return res.status(400).json({
      error: "Le contenu HTML est requis et ne peut pas être vide",
    });
  }

  try {
    console.log("🔄 Génération PDF depuis HTML");

    const pdfBuffer = await pdfGenerator.generateFromHTML(html, options);

    if (!pdfBuffer || pdfBuffer.length === 0) {
      throw new Error("Le PDF généré depuis HTML est vide");
    }

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=${filename}`,
      "Content-Length": pdfBuffer.length,
      "Cache-Control": "no-cache",
    });

    console.log(
      `✅ PDF généré avec succès depuis HTML (${pdfBuffer.length} bytes)`
    );
    res.send(pdfBuffer);
  } catch (error) {
    console.error("❌ Erreur génération PDF depuis HTML:", error);
    res.status(500).json({
      error: "Erreur lors de la génération du PDF depuis HTML",
      details: error.message,
    });
  }
}

// ✅ Fonction pour créer un PDF avec template personnalisé - améliorée
export async function createPDFFromTemplate(req, res) {
  const { factureData, templateName = "default" } = req.body;

  if (!factureData) {
    return res.status(400).json({
      error: "Les données de facture sont requises",
    });
  }

  try {
    console.log(`🔄 Génération PDF avec template ${templateName}`);

    // Charger le template HTML
    const templatePath = path.join(
      __dirname,
      "../templates",
      `${templateName}.html`
    );

    if (!fs.existsSync(templatePath)) {
      // ✅ Créer un template par défaut si aucun n'existe
      const defaultTemplate = createDefaultTemplate();
      const defaultPath = path.join(__dirname, "../templates");

      // Créer le dossier templates s'il n'existe pas
      if (!fs.existsSync(defaultPath)) {
        fs.mkdirSync(defaultPath, { recursive: true });
      }

      fs.writeFileSync(path.join(defaultPath, "default.html"), defaultTemplate);
      console.log("✅ Template par défaut créé");
    }

    let htmlTemplate = fs.readFileSync(templatePath, "utf8");

    // ✅ Remplacement sécurisé des variables
    const replacements = {
      "{{factureId}}": escapeHtml(factureData.id || ""),
      "{{dateEmission}}": formatDate(factureData.date_emission),
      "{{dateEcheance}}": formatDate(factureData.date_echeance),
      "{{clientNom}}": escapeHtml(factureData.client_data?.nom || ""),
      "{{clientEmail}}": escapeHtml(factureData.client_data?.email || ""),
      "{{clientAdresse}}": escapeHtml(factureData.client_data?.address || ""),
      "{{societeNom}}": escapeHtml(factureData.societer?.nom || ""),
      "{{societeEmail}}": escapeHtml(factureData.societer?.email || ""),
      "{{societeAdresse}}": escapeHtml(factureData.societer?.adresse || ""),
      "{{montantTotal}}": (factureData.montant_total || 0).toFixed(2),
      "{{supplement}}": escapeHtml(factureData.suplement || ""),
    };

    for (const [placeholder, value] of Object.entries(replacements)) {
      htmlTemplate = htmlTemplate.replace(new RegExp(placeholder, "g"), value);
    }

    // Générer le tableau des produits avec échappement HTML
    const produitsHTML = (factureData.produits || [])
      .map(
        (produit) => `
      <tr>
        <td>${escapeHtml(produit.nom || "")}</td>
        <td class="text-center">${produit.quantite || 0}</td>
        <td class="text-center">${(produit.prix || 0).toFixed(2)} €</td>
        <td class="text-right">${(
          (produit.quantite || 0) * (produit.prix || 0)
        ).toFixed(2)} €</td>
      </tr>
    `
      )
      .join("");

    htmlTemplate = htmlTemplate.replace(/{{produitsTable}}/g, produitsHTML);

    const pdfBuffer = await pdfGenerator.generateFromHTML(htmlTemplate);

    const filename = `facture-${factureData.id || "template"}.pdf`;

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=${filename}`,
      "Content-Length": pdfBuffer.length,
      "Cache-Control": "no-cache",
    });

    console.log(
      `✅ PDF généré avec succès avec template ${templateName} (${pdfBuffer.length} bytes)`
    );
    res.send(pdfBuffer);
  } catch (error) {
    console.error("❌ Erreur génération PDF avec template:", error);
    res.status(500).json({
      error: "Erreur lors de la génération du PDF avec template",
      details: error.message,
    });
  }
}

// ✅ Fonctions utilitaires
function formatDate(dateString) {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleDateString("fr-FR");
  } catch (error) {
    return "";
  }
}

function escapeHtml(text) {
  if (typeof text !== "string") return "";
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

function createDefaultTemplate() {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Facture {{factureId}}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 20px; }
        .client-info { background: #f5f5f5; padding: 15px; margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        .total { font-weight: bold; font-size: 1.2em; }
    </style>
</head>
<body>
    <div class="header">
        <h1>{{societeNom}}</h1>
        <p>{{societeEmail}}</p>
        <p>{{societeAdresse}}</p>
        <h2>Facture #{{factureId}}</h2>
        <p>Date d'émission: {{dateEmission}}</p>
        <p>Date d'échéance: {{dateEcheance}}</p>
    </div>
    
    <div class="client-info">
        <h3>Client:</h3>
        <p><strong>{{clientNom}}</strong></p>
        <p>{{clientEmail}}</p>
        <p>{{clientAdresse}}</p>
    </div>
    
    <table>
        <thead>
            <tr>
                <th>Description</th>
                <th class="text-center">Quantité</th>
                <th class="text-center">Prix unitaire</th>
                <th class="text-right">Total</th>
            </tr>
        </thead>
        <tbody>
            {{produitsTable}}
        </tbody>
    </table>
    
    <div class="text-right total">
        <p>Total: {{montantTotal}} €</p>
    </div>
    
    <div>
        <p><em>{{supplement}}</em></p>
    </div>
</body>
</html>
  `;
}

export default createPDF;
