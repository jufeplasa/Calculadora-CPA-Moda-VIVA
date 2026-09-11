"use client";

import React from "react";
import { ResultadoCalculo, ParametrosCalculadora, MonedaConfig } from "@/lib/calculadora/types";
import { formatMoneda, formatPorcentaje } from "@/lib/calculadora/utils";
import { Calculator, ArrowRight, HelpCircle } from "lucide-react";

interface DesgloseCostosProps {
  resultado: ResultadoCalculo;
  params: ParametrosCalculadora;
  moneda: MonedaConfig;
}

export const DesgloseCostos: React.FC<DesgloseCostosProps> = ({
  resultado,
  params,
  moneda,
}) => {
  const margenBrutoBase = params.precioVenta - resultado.costosFijosTotales;

  return (
    <div className="bg-white rounded-2xl p-5 border border-[#ece4e4] shadow-xs hover-card-shadow">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#ece4e4]">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-[#f6e3e2] flex items-center justify-center text-[#c98d8a]">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#1f1a1a]">Desglose de Costos Paso a Paso</h2>
            <p className="text-[11px] text-[#6b6363]">Explicación detallada de cómo se calcula tu Breakeven</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#ece4e4] text-[#6b6363] bg-[#fdfbfb]">
              <th className="py-2.5 px-3 font-semibold">Paso / Concepto</th>
              <th className="py-2.5 px-3 font-semibold text-center">Operación</th>
              <th className="py-2.5 px-3 font-semibold text-right">Monto / Valor</th>
              <th className="py-2.5 px-3 font-semibold text-right">Explicación</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#ece4e4]">
            {/* Precio Venta */}
            <tr className="hover:bg-[#fdfbfb]">
              <td className="py-2.5 px-3 font-bold text-[#1f1a1a]">Precio de Venta Público</td>
              <td className="py-2.5 px-3 text-center text-[#6b6363]">Base</td>
              <td className="py-2.5 px-3 font-bold text-right text-[#1f1a1a]">
                {formatMoneda(params.precioVenta, moneda)}
              </td>
              <td className="py-2.5 px-3 text-right text-[11px] text-[#6b6363]">
                Valor cobrado al cliente al entregar
              </td>
            </tr>

            {/* Costo Producto */}
            <tr className="hover:bg-[#fdfbfb]">
              <td className="py-2.5 px-3 text-[#1f1a1a] pl-6">− Costo del Producto</td>
              <td className="py-2.5 px-3 text-center text-[#d9534f] font-semibold font-mono">−</td>
              <td className="py-2.5 px-3 font-semibold text-right text-[#d9534f]">
                {formatMoneda(resultado.costoProducto, moneda)}
              </td>
              <td className="py-2.5 px-3 text-right text-[11px] text-[#6b6363]">
                Costo del proveedor por unidad
              </td>
            </tr>

            {/* Costo Envío */}
            <tr className="hover:bg-[#fdfbfb]">
              <td className="py-2.5 px-3 text-[#1f1a1a] pl-6">− Costo Envío Base</td>
              <td className="py-2.5 px-3 text-center text-[#d9534f] font-semibold font-mono">−</td>
              <td className="py-2.5 px-3 font-semibold text-right text-[#d9534f]">
                {formatMoneda(params.costoEnvio, moneda)}
              </td>
              <td className="py-2.5 px-3 text-right text-[11px] text-[#6b6363]">
                Tarifa estándar de transportadora
              </td>
            </tr>

            {/* Otros Costos */}
            <tr className="hover:bg-[#fdfbfb]">
              <td className="py-2.5 px-3 text-[#1f1a1a] pl-6">− Otros Costos Operativos</td>
              <td className="py-2.5 px-3 text-center text-[#d9534f] font-semibold font-mono">−</td>
              <td className="py-2.5 px-3 font-semibold text-right text-[#d9534f]">
                {formatMoneda(params.otrosCostos, moneda)}
              </td>
              <td className="py-2.5 px-3 text-right text-[11px] text-[#6b6363]">
                Empaque, insumos, bodega
              </td>
            </tr>

            {/* Subtotal Margen Bruto */}
            <tr className="bg-[#f6e3e2]/40 font-bold border-y border-[#ece4e4]">
              <td className="py-2.5 px-3 text-[#1f1a1a]">= Margen Bruto por Despacho</td>
              <td className="py-2.5 px-3 text-center text-[#c98d8a] font-mono">=</td>
              <td className="py-2.5 px-3 text-right text-[#1f1a1a]">
                {formatMoneda(margenBrutoBase, moneda)}
              </td>
              <td className="py-2.5 px-3 text-right text-[11px] text-[#6b6363]">
                Margen antes de factor de conversión
              </td>
            </tr>

            {/* Factor Confirmación */}
            <tr className="hover:bg-[#fdfbfb]">
              <td className="py-2.5 px-3 text-[#1f1a1a] pl-6">× Tasa de Confirmación</td>
              <td className="py-2.5 px-3 text-center text-[#6b6363] font-mono">×</td>
              <td className="py-2.5 px-3 font-semibold text-right text-[#1f1a1a]">
                {formatPorcentaje(params.tasaConfirmacion * 100)}
              </td>
              <td className="py-2.5 px-3 text-right text-[11px] text-[#6b6363]">
                Pedidos confirmados para despacho
              </td>
            </tr>

            {/* Factor Entrega */}
            <tr className="hover:bg-[#fdfbfb]">
              <td className="py-2.5 px-3 text-[#1f1a1a] pl-6">× Tasa de Entrega</td>
              <td className="py-2.5 px-3 text-center text-[#6b6363] font-mono">×</td>
              <td className="py-2.5 px-3 font-semibold text-right text-[#1f1a1a]">
                {formatPorcentaje(params.tasaEntrega * 100)}
              </td>
              <td className="py-2.5 px-3 text-right text-[11px] text-[#6b6363]">
                Flete efectivo cobrado
              </td>
            </tr>

            {/* CPA Breakeven Final */}
            <tr className="bg-[#eaf7f1]/70 font-extrabold text-sm border-t-2 border-[#4caf82]">
              <td className="py-3 px-3 text-[#2c7a56] flex items-center">
                <ArrowRight className="w-4 h-4 mr-1 text-[#4caf82]" />
                = CPA Breakeven Final
              </td>
              <td className="py-3 px-3 text-center text-[#4caf82] font-mono">=</td>
              <td className="py-3 px-3 text-right text-[#2c7a56]">
                {formatMoneda(resultado.cpaBreakeven, moneda)}
              </td>
              <td className="py-3 px-3 text-right text-xs text-[#2c7a56]">
                Límite de costo por anuncio (Ads)
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
