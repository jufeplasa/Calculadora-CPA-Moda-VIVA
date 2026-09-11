"use client";

import React, { useState, useMemo } from "react";
import { Calculadora } from "@/lib/calculadora/Calculadora";
import { DEFAULT_PARAMS, MONEDAS_DISPONIBLES } from "@/lib/calculadora/defaults";
import { ParametrosCalculadora, MonedaConfig, Producto } from "@/lib/calculadora/types";
import { Header } from "./Header";
import { ProductoForm } from "./ProductoForm";
import { CostosForm } from "./CostosForm";
import { MargenForm } from "./MargenForm";
import { ResultadosPanel } from "./ResultadosPanel";
import { DesgloseCostos } from "./DesgloseCostos";
import { DistribucionChart } from "./DistribucionChart";
import { SimulacionTab } from "./SimulacionTab";
import { LayoutGrid, PieChart, BarChart2, RotateCcw, Share2, Sparkles } from "lucide-react";

export const CalculadoraApp: React.FC = () => {
  const [params, setParams] = useState<ParametrosCalculadora>({ ...DEFAULT_PARAMS });
  const [activeTab, setActiveTab] = useState<"principal" | "distribucion" | "simulacion">("principal");
  const [copied, setCopied] = useState<boolean>(false);

  // Instancia de la clase Calculadora memorizada para reactividad óptima
  const calculadora = useMemo(() => {
    return new Calculadora(params.producto, params);
  }, [params]);

  // Cálculo de resultados reactivo en tiempo real
  const resultado = useMemo(() => {
    return calculadora.calcular();
  }, [calculadora]);

  const moneda = params.moneda || MONEDAS_DISPONIBLES.COP;

  const handleSelectMoneda = (nuevaMoneda: MonedaConfig) => {
    setParams((prev) => ({
      ...prev,
      moneda: nuevaMoneda,
    }));
  };

  const handleProductoChange = (prodUpdate: Partial<Producto>) => {
    setParams((prev) => ({
      ...prev,
      producto: {
        ...prev.producto,
        ...prodUpdate,
      },
    }));
  };

  const handleParamChange = <K extends keyof Omit<ParametrosCalculadora, "producto">>(
    campo: K,
    valor: ParametrosCalculadora[K]
  ) => {
    setParams((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const handleReset = () => {
    setParams({ ...DEFAULT_PARAMS });
  };

  const handleShare = () => {
    const text = `📊 *Resumen Calculadora de CPA Dropshipping*\n\n` +
      `📦 Producto: ${params.producto.nombre}\n` +
      `💰 Precio Venta: ${moneda.simbolo}${params.precioVenta.toLocaleString()}\n` +
      `🎯 CPA Breakeven: ${moneda.simbolo}${resultado.cpaBreakeven.toLocaleString(undefined, { maximumFractionDigits: 0 })}\n` +
      `📈 Margen Neto: ${resultado.margenGananciaConMarketing.toFixed(1)}%\n` +
      `✨ Precio Rec.: ${moneda.simbolo}${resultado.precioRecomendado.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfbfb] flex flex-col font-sans">
      {/* Header Principal */}
      <Header
        moneda={moneda}
        onSelectMoneda={handleSelectMoneda}
        resultado={resultado}
      />

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Navigation Tabs & Reset Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-2 rounded-2xl border border-[#ece4e4] shadow-xs">
          {/* Tabs */}
          <div className="flex items-center space-x-1.5 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("principal")}
              className={`flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "principal"
                  ? "bg-[#e7b5b3] text-[#1f1a1a] shadow-xs"
                  : "text-[#6b6363] hover:text-[#1f1a1a] hover:bg-[#f6e3e2]/50"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Calculadora & Desglose</span>
            </button>

            <button
              onClick={() => setActiveTab("distribucion")}
              className={`flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "distribucion"
                  ? "bg-[#e7b5b3] text-[#1f1a1a] shadow-xs"
                  : "text-[#6b6363] hover:text-[#1f1a1a] hover:bg-[#f6e3e2]/50"
              }`}
            >
              <PieChart className="w-4 h-4" />
              <span>Distribución Costos</span>
            </button>

            <button
              onClick={() => setActiveTab("simulacion")}
              className={`flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "simulacion"
                  ? "bg-[#e7b5b3] text-[#1f1a1a] shadow-xs"
                  : "text-[#6b6363] hover:text-[#1f1a1a] hover:bg-[#f6e3e2]/50"
              }`}
            >
              <BarChart2 className="w-4 h-4" />
              <span>Simulador de Escala</span>
            </button>
          </div>

          {/* Actions: Reset & Share */}
          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
            <button
              onClick={handleShare}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#fdfbfb] hover:bg-[#f6e3e2] border border-[#ece4e4] rounded-xl text-xs font-semibold text-[#1f1a1a] transition-all cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-[#c98d8a]" />
              <span>{copied ? "¡Copiado!" : "Copiar Resumen"}</span>
            </button>

            <button
              onClick={handleReset}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#fdfbfb] hover:bg-[#f6e3e2] border border-[#ece4e4] rounded-xl text-xs font-semibold text-[#6b6363] hover:text-[#1f1a1a] transition-all cursor-pointer"
              title="Restablecer valores por defecto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Restablecer</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Calculadora & Desglose */}
        {activeTab === "principal" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Form Inputs (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <ProductoForm
                producto={params.producto}
                moneda={moneda}
                onChange={handleProductoChange}
              />

              <CostosForm
                params={params}
                resultado={resultado}
                moneda={moneda}
                onChange={handleParamChange}
              />

              <MargenForm
                params={params}
                resultado={resultado}
                moneda={moneda}
                onChange={handleParamChange}
              />
            </div>

            {/* Right Column: Key Results & Step-by-Step Table (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <ResultadosPanel
                resultado={resultado}
                params={params}
                moneda={moneda}
              />

              <DesgloseCostos
                resultado={resultado}
                params={params}
                moneda={moneda}
              />
            </div>
          </div>
        )}

        {/* Tab 2: Distribución de Costos */}
        {activeTab === "distribucion" && (
          <div className="max-w-4xl mx-auto">
            <DistribucionChart
              resultado={resultado}
              params={params}
              moneda={moneda}
            />
          </div>
        )}

        {/* Tab 3: Simulador de Escala */}
        {activeTab === "simulacion" && (
          <div className="max-w-5xl mx-auto">
            <SimulacionTab
              calculadora={calculadora}
              params={params}
              moneda={moneda}
            />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#ece4e4] py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-[#6b6363]">
          <p className="font-medium">Calculadora de CPA & Rentabilidad Dropshipping COD</p>
          <p className="mt-1 text-[11px]">
            Desarrollado en Next.js App Router con cálculos financieros en tiempo real para optimización de anuncios.
          </p>
        </div>
      </footer>
    </div>
  );
};
