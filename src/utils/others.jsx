export const formatDate = (date) => {
    if (!date || isNaN(new Date(date).getTime())) {
      return ""; // Retornar un string vacío si la fecha no es válida
    }
    return new Date(date).toISOString().split("T")[0];
  };

export const isValidRole = () => ["ADMIN", "Cliente"].includes(sessionStorage.getItem("rol"));

export const formatNumber = (value) => {
  const num = Number(value);
  return isNaN(num) ? "Valor inválido" : num.toLocaleString("de-DE");
};