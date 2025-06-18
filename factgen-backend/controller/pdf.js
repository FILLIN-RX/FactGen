import puppeteer from 'puppeteer';

const webUrl = (id)=> `http://localhost:5173/${id}`; // URL de la page à convertir en PDF
const optionsPDF = {width:1024, height: 768}; // Options pour la taille du PDF

async function puppeteerPDF(webUrl,optionsPDF) {
    const browser = await puppeteer.launch({
        headless:true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const coverpage = await browser.newPage();

    await coverpage.goto(webUrl,{waitUntil: 'networkidle0'}); // Chargement de la page

    const pdfbuffer = await coverpage.pdf({
        printBackground:true,
        width: optionsPDF.width,
        height:optionsPDF.height,
    });

    return pdfbuffer;
    
}
async function createPDF(req,res) {
    const {id}= req.params; // Récupération de l'ID depuis les paramètres de la requête
    await puppeteerPDF(webUrl(id),optionsPDF).then((pdfdata) =>{
        res.set('content-type', 'application/pdf');
        res.status(201).send(Buffer.from(pdfdata, 'binary'));

    }).catch((error)=>{
        console.log("Error generating PDF:", error);
        res.status(500).json({ error: "Failed to generate PDF" });
    })

    
}

export default createPDF