"use client";

import React, { useMemo } from "react";
import { ResultadoCalculo, MonedaConfig, ParametrosCalculadora } from "@/lib/calculadora/types";
import { formatMoneda, formatPorcentaje } from "@/lib/calculadora/utils";
import { PieChart as PieIcon, Info } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface DistribucionChartProps {
  resultado: ResultadoCalculo;
  params: ParametrosCalculadora;
  moneda: MonedaConfig;
}

export const DistribucionChart: React.FC<DistribucionChartProps> = ({
  resultado,
  params,
  moneda,
}) => {
  const data = useMemo(() => {
    const costoProd = resultado.costoProducto;
    const costoEnvioReal = resultado.costoEnvioRealPorVenta;
    const costoOtrosReal = params.tasaEntrega > 0 ? params.otrosCostos / params.tasaEntrega : 0;
    const cpaReal = resultado.costoMarketingRealPorVenta;
    const ganancia = Math.max(0, resultado.gananciaNetaPorVenta);

    return [
      { name: "Costo Producto", value: costoProd, color: "#c98d8a" },
      { name: "Envío Real (Fletes + Devolución)", value: costoEnvioReal, color: "#e7b5b3" },
      { name: "CPA Marketing Real", value: cpaReal, color: "#e67e22" },
      { name: "Otros Costos Operativos", value: costoOtrosReal, color: "#95a5a6" },
      { name: "Ganancia Neta", value: ganancia, color: "#4caf82" },
    ].filter((item) => item.value > 0);
  }, [resultado, params]);

  const totalIngreso = params.precioVenta;

  return (
    <div className="bg-white rounded-2xl p-5 border border-[#ece4e4] shadow-xs hover-card-shadow">
      <div className="flex items-center space-x-2 pb-3 mb-4 border-b border-[#ece4e4]">
        <div className="w-8 h-8 rounded-lg bg-[#f6e3e2] flex items-center justify-center text-[#c98d8a]">
          <PieIcon className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-[#1f1a1a]">Distribución Porcentual de Costos</h2>
          <p className="text-[11px] text-[#6b6363]">
            Cómo se divide cada venta realizada de {formatMoneda(totalIngreso, moneda)}
          </p>
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#ffffff" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip
              formatter={(val: any) => {
                const numVal = Number(val) || 0;
                return [
                  formatMoneda(numVal, moneda),
                  totalIngreso > 0
                    ? ` (${formatPorcentaje((numVal / totalIngreso) * 100)})`
                    : "",
                ];
              }}
              contentStyle={{
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                border: "1px solid #ece4e4",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                fontSize: "12px",
              }}
            />
            <Legend
              formatter={(value, entry: any) => (
                <span className="text-xs font-semibold text-[#1f1a1a]">
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Cards de desglose porcentual */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4 pt-4 border-t border-[#ece4e4]">
        {data.map((item) => {
          const pct = totalIngreso > 0 ? (item.value / totalIngreso) * 100 : 0;
          return (
            <div
              key={item.name}
              className="p-2.5 rounded-xl border border-[#ece4e4] bg-[#fdfbfb] flex flex-col justify-between"
            >
              <div className="flex items-center space-x-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[11px] font-medium text-[#6b6363] truncate">
                  {item.name}
                </span>
              </div>
              <div className="mt-1.5 flex items-baseline justify-between">
                <span className="text-xs font-bold text-[#1f1a1a]">
                  {formatMoneda(item.value, moneda)}
                </span>
                <span className="text-[10px] font-extrabold text-[#c98d8a]">
                  {formatPorcentaje(pct)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
