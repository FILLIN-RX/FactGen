import puppeteer from 'puppeteer';

export async function createPDF(req, res) {
  const factureId = req.params.id;
  const url = `http://localhost:5173/facture/${factureId}/pdf`;

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' },
    });

    await browser.close();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=facture-${factureId}.pdf`,
    });

    res.send(pdfBuffer);
  } catch (err) {
    console.error('Erreur PDF:', err);
    res.status(500).send('Erreur lors de la génération du PDF');
  }
}
export default createPDF;