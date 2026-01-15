export function formatCurrency(value, currency = 'XOF') {
  if (typeof value !== "number") {
    value = parseFloat(value);
  }
  if (isNaN(value)) {
    return "0 FCFA";
  }

  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value).replace("XOF", "FCFA");
}

export function formatDate(dateString) {
    if (!dateString) return "";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
}
