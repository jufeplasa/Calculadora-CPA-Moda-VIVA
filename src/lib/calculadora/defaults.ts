import { ParametrosCalculadora, MonedaConfig } from "./types";

export const MONEDAS_DISPONIBLES: Record<string, MonedaConfig> = {
  COP: {
    codigo: "COP",
    simbolo: "$",
    locale: "es-CO",
    decimales: 0,
    factorCambio: 1,
  },
  USD: {
    codigo: "USD",
    simbolo: "$",
    locale: "en-US",
    decimales: 2,
    factorCambio: 1 / 4000,
  },
  MXN: {
    codigo: "MXN",
    simbolo: "$",
    locale: "es-MX",
    decimales: 2,
    factorCambio: 1 / 230,
  },
  CLP: {
    codigo: "CLP",
    simbolo: "$",
    locale: "es-CL",
    decimales: 0,
    factorCambio: 1 / 4.3,
  },
  PEN: {
    codigo: "PEN",
    simbolo: "S/",
    locale: "es-PE",
    decimales: 2,
    factorCambio: 1 / 1050,
  },
};

export const DEFAULT_PARAMS: ParametrosCalculadora = {
  producto: { nombre: "Mi Producto Star", precio: 25000 },
  costoEnvio: 12000,
  otrosCostos: 3000,
  cpa: 12000,
  margenObjetivo: 0.35,     // 35%
  precioVenta: 78000,       // 78.000 COP
  tasaConfirmacion: 0.90,   // 90%
  tasaEntrega: 0.80,        // 80%
  moneda: MONEDAS_DISPONIBLES.COP,
};

export const PRESETS_MARGEN = [0.20, 0.25, 0.30, 0.35, 0.40];
