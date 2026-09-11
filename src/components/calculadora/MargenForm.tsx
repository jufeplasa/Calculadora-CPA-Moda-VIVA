"use client";

import React from "react";
import { ParametrosCalculadora, ResultadoCalculo, MonedaConfig } from "@/lib/calculadora/types";
import { PRESETS_MARGEN } from "@/lib/calculadora/defaults";
import { formatMoneda, formatPorcentaje } from "@/lib/calculadora/utils";
import { Percent, Sparkles, SlidersHorizontal, CheckCircle2, ShieldCheck } from "lucide-react";

interface MargenFormProps {
  params: ParametrosCalculadora;
  resultado: ResultadoCalculo;
  moneda: MonedaConfig;
  onChange: <K extends keyof Omit<ParametrosCalculadora, "producto">>(
    campo: K,
    valor: ParametrosCalculadora[K]
  ) => void;
}

export const MargenForm: React.FC<MargenFormProps> = ({
  params,
  resultado,
  moneda,
  onChange,
}) => {
  const handleUsarPrecioRecomendado = () => {
    if (isFinite(resultado.precioRecomendado) && resultado.precioRecomendado > 0) {
      onChange("precioVenta", Math.round(resultado.precioRecomendado));
    }
  };

  const confirmacionPct = Math.round(params.tasaConfirmacion * 100);
  const entregaPct = Math.round(params.tasaEntrega * 100);
  const tasaExitoPct = Math.round(params.tasaConfirmacion * params.tasaEntrega * 100);

  return (
    <div className="bg-white rounded-2xl p-5 border border-[#ece4e4] shadow-xs hover-card-shadow">
      <div className="flex items-center space-x-2 pb-3 mb-4 border-b border-[#ece4e4]">
        <div className="w-8 h-8 rounded-lg bg-[#f6e3e2] flex items-center justify-center text-[#c98d8a]">
          <SlidersHorizontal className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-[#1f1a1a]">3. Margen & Tasas de Operación</h2>
          <p className="text-[11px] text-[#6b6363]">Margen objetivo, precio de venta y embudo de conversión</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Margen Objetivo con Presets */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-[#1f1a1a]">
              Margen de ganancia objetivo
            </label>
            <span className="text-xs font-bold text-[#c98d8a]">
              {formatPorcentaje(params.margenObjetivo * 100)}
            </span>
          </div>

          {/* Presets */}
          <div className="flex items-center gap-1.5 mb-2">
            {PRESETS_MARGEN.map((pct) => {
              const isSelected = Math.abs(params.margenObjetivo - pct) < 0.001;
              return (
                <button
                  key={pct}
                  type="button"
                  onClick={() => onChange("margenObjetivo", pct)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#e7b5b3] text-[#1f1a1a] border-[#c98d8a] shadow-xs"
                      : "bg-[#fdfbfb] text-[#6b6363] border-[#ece4e4] hover:bg-[#f6e3e2]"
                  }`}
                >
                  {pct * 100}%
                </button>
              );
            })}
          </div>
        </div>

        {/* Precio de Venta con Botón Recomendado */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="margen-precio-venta" className="text-xs font-semibold text-[#1f1a1a]">
              Precio de Venta al Público
            </label>
            {isFinite(resultado.precioRecomendado) && (
              <button
                type="button"
                onClick={handleUsarPrecioRecomendado}
                className="text-[10px] font-bold text-[#c98d8a] hover:text-[#1f1a1a] bg-[#f6e3e2] hover:bg-[#e7b5b3] px-2 py-0.5 rounded-md transition-colors flex items-center cursor-pointer"
              >
                <Sparkles className="w-3 h-3 mr-1" />
                Usar rec. ({formatMoneda(resultado.precioRecomendado, moneda)})
              </button>
            )}
          </div>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-xs font-bold text-[#6b6363]">
              {moneda.simbolo}
            </span>
            <input
              id="margen-precio-venta"
              type="number"
              min="0"
              step="any"
              value={params.precioVenta || ""}
              onChange={(e) => onChange("precioVenta", parseFloat(e.target.value) || 0)}
              placeholder="0"
              className="w-full pl-8 pr-3 py-2 bg-[#fdfbfb] border border-[#ece4e4] rounded-xl text-xs font-bold text-[#1f1a1a] focus:outline-hidden focus:border-[#c98d8a] focus:ring-1 focus:ring-[#c98d8a] transition-all"
            />
          </div>
        </div>

        {/* Tasa de Confirmación */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-[#1f1a1a]">
              Tasa de Confirmación (Call Center / WhatsApp)
            </label>
            <span className="text-xs font-bold text-[#1f1a1a]">
              {confirmacionPct}%
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            step="1"
            value={confirmacionPct}
            onChange={(e) => onChange("tasaConfirmacion", parseFloat(e.target.value) / 100)}
            className="w-full h-1.5 bg-[#ece4e4] rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-[10px] text-[#6b6363] block mt-0.5">
            % de leads/pedidos que confirman la compra antes del despacho.
          </span>
        </div>

        {/* Tasa de Entrega */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-[#1f1a1a]">
              Tasa de Entrega (Efectividad de Transportadora)
            </label>
            <span className="text-xs font-bold text-[#1f1a1a]">
              {entregaPct}%
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            step="1"
            value={entregaPct}
            onChange={(e) => onChange("tasaEntrega", parseFloat(e.target.value) / 100)}
            className="w-full h-1.5 bg-[#ece4e4] rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-[10px] text-[#6b6363] block mt-0.5">
            % de despachos confirmados que son efectivamente cobrados y entregados.
          </span>
        </div>

        {/* Tasa Efectiva de Éxito Global */}
        <div className="p-2.5 bg-[#fdfbfb] border border-[#ece4e4] rounded-xl flex items-center justify-between">
          <span className="text-xs font-semibold text-[#6b6363] flex items-center">
            <ShieldCheck className="w-4 h-4 text-[#4caf82] mr-1.5" />
            Efectividad Global (Conf. × Entrega):
          </span>
          <span className="text-xs font-extrabold text-[#1f1a1a]">
            {tasaExitoPct}% de ventas efectivas
          </span>
        </div>
      </div>
    </div>
  );
};
