<template>
    <button
      class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      @click="exporter"
    >
      {{ label }}
    </button>
  </template>
  
  <script>
  import html2pdf from 'html2pdf.js'
  
  export default {
    name: 'PDFButton',
    props: {
      targetRef: { type: Object, required: true }, // Le ref HTML à exporter
      filename: { type: String, default: 'document.pdf' },
      label: { type: String, default: 'Télécharger en PDF' }
    },
    methods: {
      exporter() {
        try {
          const el = this.targetRef
          if (!el) {
            console.error('Élément cible manquant pour export PDF')
            alert('❌ Aucune section à exporter.')
            return
          }
  
          html2pdf()
            .from(el)
            .set({
              margin: 10,
              filename: this.filename,
              html2canvas: { scale: 2 },
              jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            })
            .save()
        } catch (err) {
          console.error('Erreur PDF export:', err)
          alert('Erreur lors de l’exportation du PDF.')
        }
      }
    }
  }
  </script>
  