"use client";

import React from "react";
import { ParametrosCalculadora, ResultadoCalculo, MonedaConfig } from "@/lib/calculadora/types";
import { formatMoneda } from "@/lib/calculadora/utils";
import { Truck, Sparkles, DollarSign, HelpCircle, Layers } from "lucide-react";

interface CostosFormProps {
  params: ParametrosCalculadora;
  resultado: ResultadoCalculo;
  moneda: MonedaConfig;
  onChange: <K extends keyof Omit<ParametrosCalculadora, "producto">>(
    campo: K,
    valor: ParametrosCalculadora[K]
  ) => void;
}

export const CostosForm: React.FC<CostosFormProps> = ({
  params,
  resultado,
  moneda,
  onChange,
}) => {
  const handleUsarCpaRecomendado = () => {
    onChange("cpa", Math.round(resultado.porcentajeCpaRecomendado));
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-[#ece4e4] shadow-xs hover-card-shadow">
      <div className="flex items-center space-x-2 pb-3 mb-4 border-b border-[#ece4e4]">
        <div className="w-8 h-8 rounded-lg bg-[#f6e3e2] flex items-center justify-center text-[#c98d8a]">
          <Truck className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-[#1f1a1a]">2. Costos Operativos & Marketing</h2>
          <p className="text-[11px] text-[#6b6363]">Fletes, logística, imprevistos y CPA objetivo</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Costo de Envío */}
        <div>
          <label htmlFor="costos-flete" className="block text-xs font-semibold text-[#1f1a1a] mb-1">
            Costo de envío (Flete base)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-xs font-bold text-[#6b6363]">
              {moneda.simbolo}
            </span>
            <input
              id="costos-flete"
              type="number"
              min="0"
              step="any"
              value={params.costoEnvio || ""}
              onChange={(e) => onChange("costoEnvio", parseFloat(e.target.value) || 0)}
              placeholder="0"
              className="w-full pl-8 pr-3 py-2 bg-[#fdfbfb] border border-[#ece4e4] rounded-xl text-xs font-semibold text-[#1f1a1a] focus:outline-hidden focus:border-[#c98d8a] focus:ring-1 focus:ring-[#c98d8a] transition-all"
            />
          </div>
          
          {/* Calculado Readonly: Envío Real Por Venta Entregada */}
          <div className="mt-1.5 p-2 bg-[#f9ecec]/60 rounded-lg flex items-center justify-between border border-[#ece4e4]">
            <span className="text-[10px] font-medium text-[#6b6363] flex items-center">
              <Layers className="w-3 h-3 mr-1 text-[#c98d8a]" />
              Flete real ajustado por devoluciones:
            </span>
            <span className="text-xs font-bold text-[#c98d8a]">
              {formatMoneda(resultado.costoEnvioRealPorVenta, moneda)}
            </span>
          </div>
        </div>

        {/* Otros Costos */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="costos-otros" className="text-xs font-semibold text-[#1f1a1a]">
              Otros costos por pedido
            </label>
            <span className="text-[10px] text-[#6b6363]" title="Empaque, comisiones de plataforma, bodegaje">
              Empaque / Comisiones
            </span>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-xs font-bold text-[#6b6363]">
              {moneda.simbolo}
            </span>
            <input
              id="costos-otros"
              type="number"
              min="0"
              step="any"
              value={params.otrosCostos || ""}
              onChange={(e) => onChange("otrosCostos", parseFloat(e.target.value) || 0)}
              placeholder="0"
              className="w-full pl-8 pr-3 py-2 bg-[#fdfbfb] border border-[#ece4e4] rounded-xl text-xs font-semibold text-[#1f1a1a] focus:outline-hidden focus:border-[#c98d8a] focus:ring-1 focus:ring-[#c98d8a] transition-all"
            />
          </div>
        </div>

        {/* CPA Marketing con Botón Usar Recomendado */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="costos-cpa" className="text-xs font-semibold text-[#1f1a1a] flex items-center">
              <DollarSign className="w-3.5 h-3.5 text-[#c98d8a] mr-1" />
              CPA Actual en Ads
            </label>
            <button
              type="button"
              onClick={handleUsarCpaRecomendado}
              className="text-[10px] font-bold text-[#c98d8a] hover:text-[#1f1a1a] bg-[#f6e3e2] hover:bg-[#e7b5b3] px-2 py-0.5 rounded-md transition-colors flex items-center cursor-pointer"
            >
              <Sparkles className="w-3 h-3 mr-1" />
              Usar recomendado (30%)
            </button>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-xs font-bold text-[#6b6363]">
              {moneda.simbolo}
            </span>
            <input
              id="costos-cpa"
              type="number"
              min="0"
              step="any"
              value={params.cpa || ""}
              onChange={(e) => onChange("cpa", parseFloat(e.target.value) || 0)}
              placeholder="0"
              className={`w-full pl-8 pr-3 py-2 bg-[#fdfbfb] border rounded-xl text-xs font-bold transition-all focus:outline-hidden ${
                resultado.esRentable
                  ? "border-[#ece4e4] text-[#1f1a1a] focus:border-[#c98d8a]"
                  : "border-[#f8cbcb] text-[#c0392b] bg-[#fdf0f0]/40"
              }`}
            />
          </div>
          <p className="text-[10px] text-[#6b6363] mt-1">
            Costo por adquisición por pedido recibido en tu tienda (Meta/TikTok Ads).
          </p>
        </div>
      </div>
    </div>
  );
};
