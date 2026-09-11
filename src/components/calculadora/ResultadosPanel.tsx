"use client";

import React from "react";
import { ResultadoCalculo, MonedaConfig, ParametrosCalculadora } from "@/lib/calculadora/types";
import { formatMoneda, formatPorcentaje } from "@/lib/calculadora/utils";
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  PieChart,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Info,
} from "lucide-react";

interface ResultadosPanelProps {
  resultado: ResultadoCalculo;
  params: ParametrosCalculadora;
  moneda: MonedaConfig;
}

export const ResultadosPanel: React.FC<ResultadosPanelProps> = ({
  resultado,
  params,
  moneda,
}) => {
  const esRentable = resultado.esRentable;
  const breakevenDiferencia = resultado.diferenciaCpaVsBreakeven;

  return (
    <div className="space-y-4">
      {/* 1. HERO KPI: CPA BREAKEVEN */}
      <div
        className={`relative overflow-hidden rounded-3xl p-6 border transition-all shadow-md ${
          esRentable
            ? "bg-gradient-to-br from-white via-[#f6fcf8] to-[#eaf7f1] border-[#bfe7d3]"
            : "bg-gradient-to-br from-white via-[#fff8f8] to-[#fdf0f0] border-[#f8cbcb]"
        }`}
      >
        {/* Glow Accent */}
        <div
          className={`absolute -right-10 -top-10 w-40 h-40 rounded-full blur-2xl opacity-40 ${
            esRentable ? "bg-[#4caf82]" : "bg-[#d9534f]"
          }`}
        />

        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#6b6363] flex items-center">
              <DollarSign className="w-4 h-4 mr-1 text-[#c98d8a]" />
              CPA Breakeven (Punto de Equilibrio)
            </span>
            <div
              className={`px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 ${
                esRentable
                  ? "bg-[#4caf82] text-white"
                  : "bg-[#d9534f] text-white"
              }`}
            >
              {esRentable ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Seguro</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Pérdida</span>
                </>
              )}
            </div>
          </div>

          {/* Number Value */}
          <div className="mt-3 flex items-baseline space-x-2">
            <span
              className={`text-4xl sm:text-5xl font-black tracking-tight ${
                esRentable ? "text-[#1f1a1a]" : "text-[#c0392b]"
              }`}
            >
              {formatMoneda(resultado.cpaBreakeven, moneda)}
            </span>
            <span className="text-xs font-medium text-[#6b6363]">/ pedido en anuncios</span>
          </div>

          <p className="text-xs text-[#6b6363] mt-2">
            Máximo costo por adquisición que puedes pagar en Facebook/TikTok Ads para no perder dinero.
          </p>

          {/* Sub-status Alert Box */}
          <div
            className={`mt-4 p-3 rounded-2xl border text-xs font-medium flex items-start space-x-2 ${
              esRentable
                ? "bg-[#eaf7f1]/80 text-[#2c7a56] border-[#bfe7d3]"
                : "bg-[#fdf0f0]/90 text-[#c0392b] border-[#f8cbcb]"
            }`}
          >
            {esRentable ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-[#4caf82] shrink-0 mt-0.5" />
                <div>
                  <strong>¡Tu CPA actual ({formatMoneda(params.cpa, moneda)}) es saludable!</strong>{" "}
                  Estás {formatMoneda(breakevenDiferencia, moneda)} por debajo del Breakeven. Tienes margen para escalar presupuesto.
                </div>
              </>
            ) : (
              <>
                <AlertTriangle className="w-4 h-4 text-[#d9534f] shrink-0 mt-0.5" />
                <div>
                  <strong>¡Alerta de Pérdida!</strong> Tu CPA actual ({formatMoneda(params.cpa, moneda)}) supera tu Breakeven por{" "}
                  {formatMoneda(Math.abs(breakevenDiferencia), moneda)}. Cada venta te genera pérdidas.
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 2. GRID DE METRICAS PRINCIPALES (3 CARDS) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Margen de Ganancia Con Marketing */}
        <div className="bg-white rounded-2xl p-4 border border-[#ece4e4] shadow-xs hover-card-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#6b6363]">Margen Neto %</span>
            <div className="w-7 h-7 rounded-lg bg-[#f6e3e2] flex items-center justify-center text-[#c98d8a]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="my-2">
            <span
              className={`text-2xl sm:text-3xl font-extrabold ${
                resultado.margenGananciaConMarketing >= 0
                  ? "text-[#1f1a1a]"
                  : "text-[#d9534f]"
              }`}
            >
              {formatPorcentaje(resultado.margenGananciaConMarketing)}
            </span>
          </div>
          <span className="text-[10px] text-[#6b6363]">
            Objetivo: {formatPorcentaje(params.margenObjetivo * 100)}
          </span>
        </div>

        {/* Ganancia Neta por Venta */}
        <div className="bg-white rounded-2xl p-4 border border-[#ece4e4] shadow-xs hover-card-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#6b6363]">Ganancia / Venta</span>
            <div className="w-7 h-7 rounded-lg bg-[#eaf7f1] flex items-center justify-center text-[#4caf82]">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="my-2">
            <span
              className={`text-2xl sm:text-3xl font-extrabold ${
                resultado.gananciaNetaPorVenta >= 0
                  ? "text-[#4caf82]"
                  : "text-[#d9534f]"
              }`}
            >
              {formatMoneda(resultado.gananciaNetaPorVenta, moneda)}
            </span>
          </div>
          <span className="text-[10px] text-[#6b6363]">
            Dinero libre después de fletes, CPA y producto
          </span>
        </div>

        {/* Precio Recomendado */}
        <div className="bg-white rounded-2xl p-4 border border-[#ece4e4] shadow-xs hover-card-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#6b6363]">Precio Recomendado</span>
            <div className="w-7 h-7 rounded-lg bg-[#f6e3e2] flex items-center justify-center text-[#c98d8a]">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="my-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#1f1a1a]">
              {formatMoneda(resultado.precioRecomendado, moneda)}
            </span>
          </div>
          <span className="text-[10px] text-[#6b6363]">
            Para obtener el {formatPorcentaje(params.margenObjetivo * 100)} de margen
          </span>
        </div>
      </div>

      {/* 3. RESUMEN DE COSTOS REALES AJUSTADOS */}
      <div className="bg-white rounded-2xl p-4 border border-[#ece4e4] shadow-xs space-y-3">
        <h3 className="text-xs font-bold text-[#1f1a1a] flex items-center">
          <Info className="w-4 h-4 text-[#c98d8a] mr-1.5" />
          Ajuste Logístico & Publicitario por Venta Efectiva
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 bg-[#fdfbfb] border border-[#ece4e4] rounded-xl flex items-center justify-between">
            <span className="text-[#6b6363]">CPA Real por Venta Entregada:</span>
            <span className="font-bold text-[#1f1a1a]">
              {formatMoneda(resultado.costoMarketingRealPorVenta, moneda)}
            </span>
          </div>

          <div className="p-2.5 bg-[#fdfbfb] border border-[#ece4e4] rounded-xl flex items-center justify-between">
            <span className="text-[#6b6363]">Costos Fijos Reales / Entrega:</span>
            <span className="font-bold text-[#1f1a1a]">
              {formatMoneda(resultado.costosFijosRealesPorVenta, moneda)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
