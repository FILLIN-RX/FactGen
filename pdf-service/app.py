from flask import Flask, request, send_file, jsonify
from weasyprint import HTML
import io

app = Flask(__name__)

@app.route('/generate-pdf', methods=['POST'])
def generate_pdf():
    data = request.get_json()
    html_content = data.get('html')

    if not html_content:
        return jsonify({'error': 'Le contenu HTML est requis'}), 400

    pdf_file = io.BytesIO()
    HTML(string=html_content).write_pdf(pdf_file)
    pdf_file.seek(0)

    return send_file(pdf_file, mimetype='application/pdf', download_name='document.pdf')

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 8000))
    app.run(host='0.0.0.0', port=port)
