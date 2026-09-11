import { Calculadora } from "../Calculadora";

function runTests() {
  console.log("=== Ejecutando pruebas unitarias de la Calculadora de CPA ===");

  // Caso 1: Ejemplo de referencia
  const calc1 = new Calculadora({ nombre: "Producto Demo", precio: 40 }, {
    costoEnvio: 10,
    otrosCostos: 5,
    cpa: 15,
    precioVenta: 100,
    tasaConfirmacion: 0.90,
    tasaEntrega: 0.85,
    margenObjetivo: 0.35,
  });

  const res1 = calc1.calcular();

  console.log("Caso 1 - Resultados:");
  console.log("  Costo Envío Real:", res1.costoEnvioRealPorVenta.toFixed(2), "(Esperado: 11.76)");
  console.log("  Costo Mkt Real:", res1.costoMarketingRealPorVenta.toFixed(2), "(Esperado: 19.61)");
  console.log("  CPA Breakeven:", res1.cpaBreakeven.toFixed(2), "(Esperado: 27.00)");
  console.log("  Ganancia Neta:", res1.gananciaNetaPorVenta.toFixed(2));
  console.log("  Margen %:", res1.margenGananciaConMarketing.toFixed(2) + "%");

  const errEnvio = Math.abs(res1.costoEnvioRealPorVenta - 11.7647);
  const errMkt = Math.abs(res1.costoMarketingRealPorVenta - 19.6078);
  const errBreakeven = Math.abs(res1.cpaBreakeven - 27.00);

  if (errEnvio < 0.01 && errMkt < 0.01 && errBreakeven < 0.01) {
    console.log("✅ CASO 1 PASADO EXITOSAMENTE!\n");
  } else {
    console.error("❌ CASO 1 FALLÓ METRICAS");
  }

  // Caso 2: Sensibilidad a Tasa de Entrega
  calc1.set("tasaEntrega", 0.70);
  const res2 = calc1.calcular();
  console.log("Caso 2 - Al reducir Tasa de Entrega a 70%:");
  console.log("  Nuevo CPA Breakeven:", res2.cpaBreakeven.toFixed(2), "(Debe ser menor a 27.00)");

  if (res2.cpaBreakeven < res1.cpaBreakeven) {
    console.log("✅ CASO 2 PASADO (CPA Breakeven disminuyó correctamente)!\n");
  } else {
    console.error("❌ CASO 2 FALLÓ");
  }

  // Caso 3: CPA > CPA Breakeven (Alerta de pérdida)
  calc1.set("cpa", 35); // Breakeven es menor a 35
  const res3 = calc1.calcular();
  console.log("Caso 3 - CPA ($35) superior a Breakeven ($" + res3.cpaBreakeven.toFixed(2) + "):");
  console.log("  Es Rentable:", res3.esRentable, "(Esperado: false)");
  console.log("  Ganancia Neta:", res3.gananciaNetaPorVenta.toFixed(2), "(Esperado: < 0)");

  if (!res3.esRentable && res3.gananciaNetaPorVenta < 0) {
    console.log("✅ CASO 3 PASADO (Se detectó pérdida correctamente)!\n");
  } else {
    console.error("❌ CASO 3 FALLÓ");
  }
}

runTests();
