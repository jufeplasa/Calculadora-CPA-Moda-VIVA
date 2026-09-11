"use client";

import React from "react";
import { MonedaConfig, ResultadoCalculo } from "@/lib/calculadora/types";
import { MONEDAS_DISPONIBLES } from "@/lib/calculadora/defaults";
import { Calculator, DollarSign, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";

interface HeaderProps {
  moneda: MonedaConfig;
  onSelectMoneda: (moneda: MonedaConfig) => void;
  resultado: ResultadoCalculo;
}

export const Header: React.FC<HeaderProps> = ({
  moneda,
  onSelectMoneda,
  resultado,
}) => {
  return (
    <header className="w-full bg-white border-b border-[#ece4e4] sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-xl bg-[#e7b5b3] flex items-center justify-center text-[#1f1a1a] shadow-sm">
              <Calculator className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold text-[#1f1a1a] tracking-tight">
                  Calculadora de CPA MODA VIVA
                </h1>
                <span className="text-[10px] font-semibold tracking-wide bg-[#f6e3e2] text-[#c98d8a] px-2 py-0.5 rounded-full uppercase">
                  COD Dropshipping
                </span>
              </div>
              <p className="text-xs text-[#6b6363] mt-0.5">
                Calcula en tiempo real tu CPA Breakeven, margen neto y precio recomendado de Nuestros productos
              </p>
            </div>
          </div>

          {/* Right Controls: Status Badge + Currency Selector */}
          <div className="flex items-center space-x-3 self-start md:self-auto">
            {/* Status Badge */}
            <div
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${resultado.esRentable
                ? "bg-[#eaf7f1] text-[#2c7a56] border-[#bfe7d3]"
                : "bg-[#fdf0f0] text-[#c0392b] border-[#f8cbcb]"
                }`}
            >
              {resultado.esRentable ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#4caf82]" />
                  <span>Operación Rentable</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 text-[#d9534f]" />
                  <span>CPA por Encima de Breakeven</span>
                </>
              )}
            </div>

            {/* Currency Selector */}
            <div className="flex items-center space-x-1.5 bg-[#fdfbfb] border border-[#ece4e4] rounded-lg p-1">
              <DollarSign className="w-4 h-4 text-[#6b6363] ml-1" />
              <select
                value={moneda.codigo}
                onChange={(e) => onSelectMoneda(MONEDAS_DISPONIBLES[e.target.value])}
                className="bg-transparent text-xs font-semibold text-[#1f1a1a] focus:outline-hidden cursor-pointer pr-1"
                aria-label="Seleccionar moneda"
              >
                {Object.values(MONEDAS_DISPONIBLES).map((m) => (
                  <option key={m.codigo} value={m.codigo}>
                    {m.codigo} ({m.simbolo})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
