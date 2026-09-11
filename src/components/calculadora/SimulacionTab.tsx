"use client";

import React, { useState, useMemo } from "react";
import { Calculadora } from "@/lib/calculadora/Calculadora";
import { MonedaConfig, ParametrosCalculadora } from "@/lib/calculadora/types";
import { formatMoneda } from "@/lib/calculadora/utils";
import { BarChart2, TrendingUp, Layers, ShoppingBag } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface SimulacionTabProps {
  calculadora: Calculadora;
  params: ParametrosCalculadora;
  moneda: MonedaConfig;
}

export const SimulacionTab: React.FC<SimulacionTabProps> = ({
  calculadora,
  params,
  moneda,
}) => {
  const [volumenCustom, setVolumenCustom] = useState<number>(100);

  const nivelesVolumen = [10, 50, 100, 250, 500, 1000];

  const proyecciones = useMemo(() => {
    return nivelesVolumen.map((vol) => {
      const proy = calculadora.proyectarVolumen(vol);
      return {
        volumen: `${vol} ped.`,
        ordenes: vol,
        entregadas: proy.ordenesEntregadas,
        ingresos: proy.ingresosTotales,
        costos: proy.costosTotales,
        gastoMkt: proy.costoMarketingTotal,
        gananciaNeta: proy.gananciaNetaTotal,
      };
    });
  }, [calculadora, params]);

  const proyeccionCustom = useMemo(() => {
    return calculadora.proyectarVolumen(volumenCustom);
  }, [calculadora, volumenCustom, params]);

  return (
    <div className="space-y-4">
      {/* 1. Header & Custom Slider */}
      <div className="bg-white rounded-2xl p-5 border border-[#ece4e4] shadow-xs hover-card-shadow">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#ece4e4]">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[#f6e3e2] flex items-center justify-center text-[#c98d8a]">
              <BarChart2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#1f1a1a]">Simulador de Escalabilidad & Volumen</h2>
              <p className="text-[11px] text-[#6b6363]">Proyecta tu flujo de caja y ganancias netas según la escala</p>
            </div>
          </div>

          {/* Control de volumen custom */}
          <div className="flex items-center space-x-3 bg-[#fdfbfb] p-2 rounded-xl border border-[#ece4e4]">
            <ShoppingBag className="w-4 h-4 text-[#c98d8a]" />
            <span className="text-xs font-semibold text-[#1f1a1a]">Volumen Mensual:</span>
            <input
              type="number"
              min="1"
              max="10000"
              value={volumenCustom}
              onChange={(e) => setVolumenCustom(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 px-2 py-1 bg-white border border-[#ece4e4] rounded-lg text-xs font-bold text-[#1f1a1a] text-center focus:outline-hidden"
            />
            <span className="text-xs font-semibold text-[#6b6363]">órdenes</span>
          </div>
        </div>

        {/* Custom Volume Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          <div className="p-3 bg-[#fdfbfb] border border-[#ece4e4] rounded-xl">
            <span className="text-[11px] text-[#6b6363] block">Órdenes Entregadas</span>
            <span className="text-lg font-extrabold text-[#1f1a1a]">
              {proyeccionCustom.ordenesEntregadas} <span className="text-xs font-normal">/ {proyeccionCustom.ordenesGeneradas}</span>
            </span>
          </div>

          <div className="p-3 bg-[#fdfbfb] border border-[#ece4e4] rounded-xl">
            <span className="text-[11px] text-[#6b6363] block">Gasto en Ads (Meta/TikTok)</span>
            <span className="text-lg font-extrabold text-[#e67e22]">
              {formatMoneda(proyeccionCustom.costoMarketingTotal, moneda)}
            </span>
          </div>

          <div className="p-3 bg-[#fdfbfb] border border-[#ece4e4] rounded-xl">
            <span className="text-[11px] text-[#6b6363] block">Facturación Bruta</span>
            <span className="text-lg font-extrabold text-[#1f1a1a]">
              {formatMoneda(proyeccionCustom.ingresosTotales, moneda)}
            </span>
          </div>

          <div className={`p-3 rounded-xl border ${proyeccionCustom.gananciaNetaTotal >= 0 ? "bg-[#eaf7f1] border-[#bfe7d3]" : "bg-[#fdf0f0] border-[#f8cbcb]"}`}>
            <span className="text-[11px] text-[#6b6363] block">Ganancia Neta en Bolsillo</span>
            <span className={`text-lg font-black ${proyeccionCustom.gananciaNetaTotal >= 0 ? "text-[#4caf82]" : "text-[#d9534f]"}`}>
              {formatMoneda(proyeccionCustom.gananciaNetaTotal, moneda)}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Chart Section */}
      <div className="bg-white rounded-2xl p-5 border border-[#ece4e4] shadow-xs">
        <h3 className="text-xs font-bold text-[#1f1a1a] mb-3 flex items-center">
          <TrendingUp className="w-4 h-4 text-[#4caf82] mr-1.5" />
          Curva de Crecimiento: Ingresos vs Ganancia Neta
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={proyecciones} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#e7b5b3" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#e7b5b3" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorGanancia" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4caf82" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#4caf82" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0ecec" />
              <XAxis dataKey="volumen" tick={{ fontSize: 11, fill: "#6b6363" }} />
              <YAxis tick={{ fontSize: 11, fill: "#6b6363" }} tickFormatter={(val) => `${val >= 1000 ? (val/1000).toFixed(0) + 'k' : val}`} />
              <Tooltip
                formatter={(val: any) => [formatMoneda(Number(val) || 0, moneda)]}
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  border: "1px solid #ece4e4",
                  fontSize: "12px",
                }}
              />
              <Area type="monotone" dataKey="ingresos" name="Ingresos Totales" stroke="#c98d8a" fillOpacity={1} fill="url(#colorIngresos)" strokeWidth={2} />
              <Area type="monotone" dataKey="gananciaNeta" name="Ganancia Neta" stroke="#4caf82" fillOpacity={1} fill="url(#colorGanancia)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Table Scale */}
      <div className="bg-white rounded-2xl p-5 border border-[#ece4e4] shadow-xs">
        <h3 className="text-xs font-bold text-[#1f1a1a] mb-3">Tabla Comparativa de Escalas</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#ece4e4] text-[#6b6363] bg-[#fdfbfb]">
                <th className="py-2.5 px-3 font-semibold">Órdenes</th>
                <th className="py-2.5 px-3 font-semibold text-center">Entregadas</th>
                <th className="py-2.5 px-3 font-semibold text-right">Inversión Ads</th>
                <th className="py-2.5 px-3 font-semibold text-right">Ingresos</th>
                <th className="py-2.5 px-3 font-semibold text-right">Ganancia Neta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ece4e4]">
              {proyecciones.map((p) => (
                <tr key={p.ordenes} className="hover:bg-[#fdfbfb]">
                  <td className="py-2.5 px-3 font-bold text-[#1f1a1a]">{p.ordenes} ventas</td>
                  <td className="py-2.5 px-3 text-center text-[#6b6363]">{p.entregadas} efectivas</td>
                  <td className="py-2.5 px-3 text-right font-medium text-[#e67e22]">{formatMoneda(p.gastoMkt, moneda)}</td>
                  <td className="py-2.5 px-3 text-right font-semibold text-[#1f1a1a]">{formatMoneda(p.ingresos, moneda)}</td>
                  <td className={`py-2.5 px-3 text-right font-extrabold ${p.gananciaNeta >= 0 ? "text-[#4caf82]" : "text-[#d9534f]"}`}>
                    {formatMoneda(p.gananciaNeta, moneda)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
