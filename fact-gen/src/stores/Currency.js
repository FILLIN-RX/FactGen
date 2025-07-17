import { defineStore } from "pinia";
import { ref } from "vue";

export const useCurrencyStore = defineStore("currency", () => {
  const selectedCurrency = ref("XAF");
  const exchangeRates = ref({ XAF: 1 }); // toujours 1 pour XAF

  // Méthode pour changer la devise et récupérer les taux
  const setCurrency = async (newCurrency) => {
    selectedCurrency.value = newCurrency;

    if (newCurrency === "XAF") {
      exchangeRates.value = { XAF: 1 };
      return;
    }

    try {
      const res = await fetch(`https://api.exchangerate.host/latest?base=XAF&symbols=${newCurrency}`);
      const data = await res.json();
      exchangeRates.value = {
        [newCurrency]: data.rates[newCurrency]
      };
    } catch (error) {
      console.error("Erreur récupération taux front:", error);
    }
  };

  const convert = (montantXaf) => {
    const rate = exchangeRates.value[selectedCurrency.value] || 1;
    return montantXaf * rate;
  };

  return {
    selectedCurrency,
    exchangeRates,
    setCurrency,
    convert,
  };
});
