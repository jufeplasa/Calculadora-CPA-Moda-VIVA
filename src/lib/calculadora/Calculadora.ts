import { Producto, ParametrosCalculadora, ResultadoCalculo, ProyeccionVolumen } from "./types";
import { DEFAULT_PARAMS } from "./defaults";

export class Calculadora {
  private params: ParametrosCalculadora;

  constructor(
    producto: Producto = DEFAULT_PARAMS.producto,
    overrides: Partial<Omit<ParametrosCalculadora, "producto">> = {}
  ) {
    this.params = {
      producto: { ...producto },
      costoEnvio: overrides.costoEnvio ?? DEFAULT_PARAMS.costoEnvio,
      otrosCostos: overrides.otrosCostos ?? DEFAULT_PARAMS.otrosCostos,
      cpa: overrides.cpa ?? DEFAULT_PARAMS.cpa,
      margenObjetivo: overrides.margenObjetivo ?? DEFAULT_PARAMS.margenObjetivo,
      precioVenta: overrides.precioVenta ?? DEFAULT_PARAMS.precioVenta,
      tasaConfirmacion: overrides.tasaConfirmacion ?? DEFAULT_PARAMS.tasaConfirmacion,
      tasaEntrega: overrides.tasaEntrega ?? DEFAULT_PARAMS.tasaEntrega,
      moneda: overrides.moneda ?? DEFAULT_PARAMS.moneda,
    };
  }

  /** Permite ir actualizando campos individualmente (método encadenable) */
  set<K extends keyof Omit<ParametrosCalculadora, "producto">>(
    campo: K,
    valor: ParametrosCalculadora[K]
  ): this {
    this.params[campo] = valor;
    return this;
  }

  /** Actualiza los datos del producto */
  setProducto(producto: Partial<Producto>): this {
    this.params.producto = {
      ...this.params.producto,
      ...producto,
    };
    return this;
  }

  /** Obtiene una copia de los parámetros actuales */
  getParams(): ParametrosCalculadora {
    return { ...this.params };
  }

  get costoProducto(): number {
    return Math.max(0, this.params.producto.precio || 0);
  }

  /** Calcula y retorna la métricas financieras completas */
  calcular(): ResultadoCalculo {
    const {
      costoEnvio = 0,
      otrosCostos = 0,
      cpa = 0,
      margenObjetivo = 0.30,
      precioVenta = 0,
      tasaConfirmacion = 0.9,
      tasaEntrega = 0.8,
    } = this.params;

    const cEnvio = Math.max(0, costoEnvio);
    const cOtros = Math.max(0, otrosCostos);
    const cCpa = Math.max(0, cpa);
    const pVenta = Math.max(0, precioVenta);
    const tConfirmacion = Math.min(1, Math.max(0, tasaConfirmacion));
    const tEntrega = Math.min(1, Math.max(0, tasaEntrega));

    const costoProducto = this.costoProducto;
    const costosFijosTotales = costoProducto + cOtros + cEnvio;

    // Ajuste por tasa de entrega (el flete y producto se despachan en cada pedido confirmado)
    const costoEnvioRealPorVenta = tEntrega > 0 ? cEnvio / tEntrega : 0;
    const costosFijosRealesPorVenta = tEntrega > 0 ? costoProducto + cOtros + costoEnvioRealPorVenta : 0;

    // Marketing ajustado a conversión total (confirmación * entrega)
    const tasaExito = tConfirmacion * tEntrega;
    const costoMarketingRealPorVenta = tasaExito > 0 ? cCpa / tasaExito : 0;

    // Breakeven CPA exacto
    const cpaBreakeven = tConfirmacion * (tEntrega * ((pVenta - costoProducto - cOtros)) - cEnvio);

    // Ganancia neta por venta entregada
    const gananciaNetaPorVenta = pVenta - costosFijosRealesPorVenta - costoMarketingRealPorVenta;

    // % de margen de ganancia final con marketing
    const margenGananciaConMarketing = pVenta > 0 ? (gananciaNetaPorVenta / pVenta) * 100 : 0;

    // Precio recomendado para lograr el margen objetivo especificado
    const precioRecomendado =
      margenObjetivo < 1
        ? (costosFijosRealesPorVenta + costoMarketingRealPorVenta) / (1 - margenObjetivo)
        : Infinity;

    // ROI sobre inversión publicitaria real
    const roiMarketing =
      costoMarketingRealPorVenta > 0
        ? (gananciaNetaPorVenta / costoMarketingRealPorVenta) * 100
        : 0;

    const esRentable = cpaBreakeven >= cCpa;
    const diferenciaCpaVsBreakeven = cpaBreakeven - cCpa;
    const porcentajeBreakevenUsado =
      cpaBreakeven > 0 ? (cCpa / cpaBreakeven) * 100 : cCpa > 0 ? 999 : 0;

    // CPA recomendado por defecto (30% de costos fijos)
    const porcentajeCpaRecomendado = costosFijosTotales * 0.30;

    return {
      costoProducto,
      costoEnvioRealPorVenta,
      costoMarketingRealPorVenta,
      costosFijosTotales,
      costosFijosRealesPorVenta,
      cpaBreakeven,
      margenGananciaConMarketing,
      gananciaNetaPorVenta,
      precioRecomendado,
      roiMarketing,
      esRentable,
      diferenciaCpaVsBreakeven,
      porcentajeBreakevenUsado,
      porcentajeCpaRecomendado,
    };
  }

  /** Genera proyecciones de volumen según la cantidad de pedidos capturados */
  proyectarVolumen(ordenesGeneradas: number): ProyeccionVolumen {
    const ordenes = Math.max(0, ordenesGeneradas);
    const { tasaConfirmacion, tasaEntrega, precioVenta, cpa } = this.params;

    const ordenesConfirmadas = Math.round(ordenes * tasaConfirmacion);
    const ordenesEntregadas = Math.round(ordenesConfirmadas * tasaEntrega);

    const res = this.calcular();
    const ingresosTotales = ordenesEntregadas * precioVenta;
    const costoMarketingTotal = ordenes * cpa;
    const costosFijosTotalesOperacion = ordenesConfirmadas * res.costosFijosTotales;
    const costosTotales = costosFijosTotalesOperacion + costoMarketingTotal;
    const gananciaNetaTotal = ingresosTotales - costosTotales;

    return {
      ordenesGeneradas: ordenes,
      ordenesConfirmadas,
      ordenesEntregadas,
      ingresosTotales,
      costosTotales,
      costoMarketingTotal,
      gananciaNetaTotal,
    };
  }
}
