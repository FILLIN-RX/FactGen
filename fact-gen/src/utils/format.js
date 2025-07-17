export function formatCurrency(value, currencyCode = 'XOF') {
  const currencyConfig = {
    'XOF': { locale: 'fr-FR', symbol: 'FCFA' },
    'EUR': { locale: 'fr-FR', symbol: '€' },
    'USD': { locale: 'en-US', symbol: '$' }
  };

  const config = currencyConfig[currencyCode] || currencyConfig['XOF'];

  let formatted = new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);

  // Remplacer le code par un libellé lisible si FCFA
  if (currencyCode === 'XOF') {
    formatted = formatted.replace('XOF', 'FCFA');
  }

  return formatted;
}

// Fonction utilitaire pour convertir symbole → code ISO
export function getCodeFromSymbol(symbol) {
  const symbolToCode = {
    'FCFA': 'XOF',
    '€': 'EUR',
    '$': 'USD'
  };
  return symbolToCode[symbol] || 'XOF';
}

// Fonction utilitaire pour convertir code ISO → symbole
export function getSymbolFromCode(code) {
  const codeToSymbol = {
    'XOF': 'FCFA',
    'EUR': '€',
    'USD': '$'
  };
  return codeToSymbol[code] || 'FCFA';
}