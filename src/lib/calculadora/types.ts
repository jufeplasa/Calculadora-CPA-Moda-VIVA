export interface Producto {
  nombre: string;
  precio: number; // costo de adquisición/producción del producto
}

export interface MonedaConfig {
  codigo: string;       // ej. 'COP', 'USD', 'MXN'
  simbolo: string;      // ej. '$', 'US$'
  locale: string;       // ej. 'es-CO', 'en-US'
  decimales: number;    // ej. 0 para COP, 2 para USD
  factorCambio: number; // multiplicador base
}

export interface ParametrosCalculadora {
  producto: Producto;
  costoEnvio: number;
  otrosCostos: number;
  cpa: number;                 // costo por adquisición en marketing
  margenObjetivo: number;      // 0-1, ej. 0.35 (35%)
  precioVenta: number;
  tasaConfirmacion: number;    // 0-1, ej. 0.90 (90%)
  tasaEntrega: number;         // 0-1, ej. 0.80 (80%)
  moneda?: MonedaConfig;
}

export interface ResultadoCalculo {
  costoProducto: number;
  costoEnvioRealPorVenta: number;     // envío / tasaEntrega
  costoMarketingRealPorVenta: number;   // cpa / (confirmación * entrega)
  costosFijosTotales: number;         // producto + envío + otros (sin ajustar)
  costosFijosRealesPorVenta: number;   // costosFijosTotales / tasaEntrega

  cpaBreakeven: number;
  margenGananciaConMarketing: number;   // porcentaje %
  gananciaNetaPorVenta: number;
  precioRecomendado: number;
  
  // Métricas adicionales útiles
  roiMarketing: number;               // (Ganancia Neta / CPA Real) * 100
  esRentable: boolean;                // cpaBreakeven >= cpa
  diferenciaCpaVsBreakeven: number;   // cpaBreakeven - cpa
  porcentajeBreakevenUsado: number;   // (cpa / cpaBreakeven) * 100
  porcentajeCpaRecomendado: number;   // 30% de costos fijos
}

export interface ProyeccionVolumen {
  ordenesGeneradas: number;
  ordenesConfirmadas: number;
  ordenesEntregadas: number;
  ingresosTotales: number;
  costosTotales: number;
  costoMarketingTotal: number;
  gananciaNetaTotal: number;
}
