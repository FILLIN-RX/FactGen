import { defineStore } from "pinia";
import { ref } from "vue";

export const useCurrencyStore = defineStore("currency", () => {
  // ✅ CORRECTION : Utiliser XOF comme devise par défaut partout
  const selectedCurrency = ref("XOF");
  const exchangeRates = ref({ XOF: 1 }); // XOF comme devise de base

  // ✅ AMÉLIORATION : Cache des taux avec expiration
  const ratesCache = ref({});
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  // ✅ CORRECTION : Méthode pour changer la devise et récupérer les taux
  const setCurrency = async (newCurrency) => {
    selectedCurrency.value = newCurrency;

    if (newCurrency === "XOF") {
      exchangeRates.value = { XOF: 1 };
      return;
    }

    // ✅ Vérifier le cache avant de faire un appel API
    const cacheKey = `XOF_${newCurrency}`;
    const cachedRate = ratesCache.value[cacheKey];
    
    if (cachedRate && Date.now() - cachedRate.timestamp < CACHE_DURATION) {
      exchangeRates.value = { [newCurrency]: cachedRate.rate };
      return;
    }

    try {
      // ✅ CORRECTION : Utiliser XOF comme base (pas XAF)
      const res = await fetch(
        `https://api.exchangerate.host/latest?base=XOF&symbols=${newCurrency}`
      );
      const data = await res.json();
      
      if (data.success && data.rates && data.rates[newCurrency]) {
        const rate = data.rates[newCurrency];
        
        // ✅ Mettre en cache
        ratesCache.value[cacheKey] = {
          rate,
          timestamp: Date.now()
        };
        
        exchangeRates.value = { [newCurrency]: rate };
      } else {
        throw new Error(`Taux de change non disponible pour ${newCurrency}`);
      }
    } catch (error) {
      console.error("Erreur récupération taux:", error);
      // ✅ Garder la devise précédente en cas d'erreur
      exchangeRates.value = { XOF: 1 };
      selectedCurrency.value = "XOF";
      throw error;
    }
  };

  // ✅ AMÉLIORATION : Conversion avec gestion d'erreur
  const convert = (montantXof) => {
    if (!montantXof || isNaN(montantXof)) return 0;
    
    const rate = exchangeRates.value[selectedCurrency.value];
    if (!rate) {
      console.warn(`Taux non disponible pour ${selectedCurrency.value}`);
      return montantXof;
    }
    
    return montantXof * rate;
  };

  // ✅ NOUVEAU : Conversion inverse (depuis devise sélectionnée vers XOF)
  const convertToXOF = (montant) => {
    if (!montant || isNaN(montant)) return 0;
    
    const rate = exchangeRates.value[selectedCurrency.value];
    if (!rate || rate === 0) return montant;
    
    return montant / rate;
  };

  // ✅ NOUVEAU : Formatage avec devise
  const formatAmount = (montant) => {
    const convertedAmount = convert(montant);
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: selectedCurrency.value,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(convertedAmount);
  };

  // ✅ NOUVEAU : Vérifier si une devise est supportée
  const isCurrencySupported = (currency) => {
    const supportedCurrencies = ['XOF', 'EUR', 'USD', 'GBP', 'CAD'];
    return supportedCurrencies.includes(currency);
  };

  return {
    selectedCurrency,
    exchangeRates,
    ratesCache,
    setCurrency,
    convert,
    convertToXOF,
    formatAmount,
    isCurrencySupported,
  };
});