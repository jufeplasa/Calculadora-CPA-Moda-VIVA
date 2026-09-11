import { MonedaConfig } from "./types";
import { MONEDAS_DISPONIBLES } from "./defaults";

export function formatMoneda(
  monto: number,
  moneda: MonedaConfig = MONEDAS_DISPONIBLES.COP
): string {
  if (isNaN(monto) || !isFinite(monto)) return `${moneda.simbolo} 0`;

  const valorFormateado = new Intl.NumberFormat(moneda.locale, {
    minimumFractionDigits: moneda.decimales,
    maximumFractionDigits: moneda.decimales,
  }).format(monto);

  return `${moneda.simbolo} ${valorFormateado}`;
}

export function formatPorcentaje(valor: number, decimales = 1): string {
  if (isNaN(valor) || !isFinite(valor)) return "0%";
  return `${valor.toFixed(decimales)}%`;
}
