import puppeteer from 'puppeteer';

const webUrl = "http://localhost:3000/coverpage"; // URL de la page à convertir en PDF

const optionsPDF = {width:1024, height: 768}; // Options pour la taille du PDF

async function puppeteer(webUrl,optionsPDF) {
    const browser = await puppeteer.launch({
        headless:true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const coverpage = await browser.newPage();

    await coverpage.goto(webUrl);

    const pdfbuffer = await coverpage.pdf({
        printBackground:true,
        width: optionsPDF.width,
        height:optionsPDF.height,
    })

    return pdfbuffer;
    
}
async function createPDF(req,res) {
    await puppeteerPDF(webUrl,optionsPDF).then((pdfdata) =>{
        res.set('content-type', 'application/pdf');
        res.status(201).send(Buffer.from(pdfdata, 'binary'));

    }).catch((error)=>{
        console.log("Error generating PDF:", error);
    })

    
}

export default createPDF