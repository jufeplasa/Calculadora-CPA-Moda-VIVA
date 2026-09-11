"use client";

import React, { useState, useEffect } from "react";
import { Producto, MonedaConfig } from "@/lib/calculadora/types";
import { PRODUCTOS_CATALOGO, PRODUCTO_GENERICO_ID, ProductoCatalogo } from "@/lib/calculadora/productos";
import { formatMoneda } from "@/lib/calculadora/utils";
import { Package, Tag, ListFilter, Sparkles, Edit3 } from "lucide-react";

interface ProductoFormProps {
  producto: Producto;
  moneda: MonedaConfig;
  onChange: (producto: Partial<Producto>) => void;
}

export const ProductoForm: React.FC<ProductoFormProps> = ({
  producto,
  moneda,
  onChange,
}) => {
  // Encontrar si el producto actual coincide exactamente con uno del catálogo por nombre y precio
  const itemMatch = PRODUCTOS_CATALOGO.find(
    (item) => item.id !== PRODUCTO_GENERICO_ID && item.nombre === producto.nombre && item.precio === producto.precio
  );

  const [selectedId, setSelectedId] = useState<string>(itemMatch ? itemMatch.id : PRODUCTO_GENERICO_ID);

  // Mantener sincronizado selectedId si cambia el producto desde fuera
  useEffect(() => {
    const matched = PRODUCTOS_CATALOGO.find(
      (item) => item.id !== PRODUCTO_GENERICO_ID && item.nombre === producto.nombre && item.precio === producto.precio
    );
    setSelectedId(matched ? matched.id : PRODUCTO_GENERICO_ID);
  }, [producto.nombre, producto.precio]);

  const handleSelectProduct = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedId(id);

    if (id === PRODUCTO_GENERICO_ID) {
      // No modificamos los valores actuales para permitir edición manual limpia
      return;
    }

    const itemEncontrado = PRODUCTOS_CATALOGO.find((item) => item.id === id);
    if (itemEncontrado) {
      onChange({
        nombre: itemEncontrado.nombre,
        precio: itemEncontrado.precio,
      });
    }
  };

  const handleNombreManualChange = (nombre: string) => {
    setSelectedId(PRODUCTO_GENERICO_ID);
    onChange({ nombre });
  };

  const handlePrecioManualChange = (precio: number) => {
    setSelectedId(PRODUCTO_GENERICO_ID);
    onChange({ precio });
  };

  const esGenerico = selectedId === PRODUCTO_GENERICO_ID;

  return (
    <div className="bg-white rounded-2xl p-5 border border-[#ece4e4] shadow-xs hover-card-shadow">
      <div className="flex items-center space-x-2 pb-3 mb-4 border-b border-[#ece4e4]">
        <div className="w-8 h-8 rounded-lg bg-[#f6e3e2] flex items-center justify-center text-[#c98d8a]">
          <Package className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-[#1f1a1a]">1. Datos del Producto</h2>
          <p className="text-[11px] text-[#6b6363]">Selecciona de tu lista de recursos o ingresa uno genérico</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Desplegable de Productos */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="producto-select" className="text-xs font-semibold text-[#1f1a1a] flex items-center">
              <ListFilter className="w-3.5 h-3.5 text-[#c98d8a] mr-1" />
              Seleccionar de la lista de productos
            </label>
            {!esGenerico ? (
              <span className="text-[10px] bg-[#f6e3e2] text-[#c98d8a] font-bold px-2 py-0.5 rounded-full flex items-center">
                <Sparkles className="w-3 h-3 mr-1" />
                Costo cargado automáticamente
              </span>
            ) : (
              <span className="text-[10px] bg-[#f2eded] text-[#6b6363] font-medium px-2 py-0.5 rounded-full flex items-center">
                <Edit3 className="w-3 h-3 mr-1" />
                Modo manual
              </span>
            )}
          </div>

          <select
            id="producto-select"
            value={selectedId}
            onChange={handleSelectProduct}
            className="w-full px-3 py-2 bg-[#fdfbfb] border border-[#ece4e4] rounded-xl text-xs font-medium text-[#1f1a1a] focus:outline-hidden focus:border-[#c98d8a] focus:ring-1 focus:ring-[#c98d8a] transition-all cursor-pointer"
          >
            {PRODUCTOS_CATALOGO.map((item) => (
              <option key={item.id} value={item.id}>
                {item.id === PRODUCTO_GENERICO_ID
                  ? "📦 Producto Genérico / Personalizado (Ingresar manual)"
                  : `${item.nombre} — Costo: ${formatMoneda(item.precio, moneda)}`}
              </option>
            ))}
          </select>
        </div>

        {/* Nombre del Producto */}
        <div>
          <label htmlFor="producto-nombre" className="block text-xs font-semibold text-[#1f1a1a] mb-1">
            Nombre del producto
          </label>
          <div className="relative">
            <input
              id="producto-nombre"
              type="text"
              value={producto.nombre}
              onChange={(e) => handleNombreManualChange(e.target.value)}
              placeholder="Ej. Reloj Inteligente FitPro"
              className="w-full pl-9 pr-3 py-2 bg-[#fdfbfb] border border-[#ece4e4] rounded-xl text-xs text-[#1f1a1a] focus:outline-hidden focus:border-[#c98d8a] focus:ring-1 focus:ring-[#c98d8a] transition-all"
            />
            <Tag className="w-4 h-4 text-[#6b6363] absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Costo del Producto (Adquisición / Producción) */}
        <div>
          <label htmlFor="producto-precio-costo" className="block text-xs font-semibold text-[#1f1a1a] mb-1">
            Costo del producto (Adquisición)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-xs font-bold text-[#6b6363]">
              {moneda.simbolo}
            </span>
            <input
              id="producto-precio-costo"
              type="number"
              min="0"
              step="any"
              value={producto.precio || ""}
              onChange={(e) => handlePrecioManualChange(parseFloat(e.target.value) || 0)}
              placeholder="0"
              className="w-full pl-8 pr-3 py-2 bg-[#fdfbfb] border border-[#ece4e4] rounded-xl text-xs font-semibold text-[#1f1a1a] focus:outline-hidden focus:border-[#c98d8a] focus:ring-1 focus:ring-[#c98d8a] transition-all"
            />
          </div>
          <span className="text-[10px] text-[#6b6363] mt-1 block">
            {esGenerico
              ? "Ingresa manualmente el precio que te cobra tu proveedor por unidad."
              : "Costo importado del producto seleccionado en tu recurso de productos."}
          </span>
        </div>
      </div>
    </div>
  );
};

