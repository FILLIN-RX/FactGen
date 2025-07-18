// ✅ CORRECTION : Utiliser XOF partout comme devise par défaut
export function formatCurrency(value, currencyCode = 'XOF') {
  if (!value || isNaN(value)) return '0 FCFA';
  
  const currencyConfig = {
    'XOF': { locale: 'fr-FR', symbol: 'FCFA' },
    'EUR': { locale: 'fr-FR', symbol: '€' },
    'USD': { locale: 'en-US', symbol: '$' },
    'GBP': { locale: 'en-GB', symbol: '£' },
    'CAD': { locale: 'en-CA', symbol: 'C$' }
  };

  const config = currencyConfig[currencyCode] || currencyConfig['XOF'];

  try {
    let formatted = new Intl.NumberFormat(config.locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);

    // ✅ Remplacer XOF par FCFA pour l'affichage
    if (currencyCode === 'XOF') {
      formatted = formatted.replace('XOF', 'FCFA');
    }

    return formatted;
  } catch (error) {
    console.error('Erreur formatage devise:', error);
    return `${value} ${config.symbol}`;
  }
}

// ✅ AMÉLIORATION : Fonction pour formater sans symbole
export function formatNumber(value, locale = 'fr-FR') {
  if (!value || isNaN(value)) return '0';
  
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

// ✅ CORRECTION : Fonction utilitaire pour convertir symbole → code ISO
export function getCodeFromSymbol(symbol) {
  const symbolToCode = {
    'FCFA': 'XOF',  // ✅ Correction XOF au lieu de XAF
    '€': 'EUR',
    '$': 'USD',
    '£': 'GBP',
    'C$': 'CAD'
  };
  return symbolToCode[symbol] || 'XOF';
}

// ✅ CORRECTION : Fonction utilitaire pour convertir code ISO → symbole
export function getSymbolFromCode(code) {
  const codeToSymbol = {
    'XOF': 'FCFA',  // ✅ Correction
    'EUR': '€',
    'USD': '$',
    'GBP': '£',
    'CAD': 'C$'
  };
  return codeToSymbol[code] || 'FCFA';
}

// ✅ NOUVEAU : Fonction pour obtenir les devises supportées
export function getSupportedCurrencies() {
  return [
    { code: 'XOF', symbol: 'FCFA', name: 'Franc CFA Ouest-Africain' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'USD', symbol: '$', name: 'Dollar Américain' },
    { code: 'GBP', symbol: '£', name: 'Livre Sterling' },
    { code: 'CAD', symbol: 'C$', name: 'Dollar Canadien' }
  ];
}

// ✅ NOUVEAU : Validation de devise
export function isValidCurrency(code) {
  const validCurrencies = ['XOF', 'EUR', 'USD', 'GBP', 'CAD'];
  return validCurrencies.includes(code);
}