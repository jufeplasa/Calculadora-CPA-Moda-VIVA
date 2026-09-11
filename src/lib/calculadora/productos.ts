export interface ProductoCatalogo {
  id: string;
  nombre: string;
  precio: number;
  categoria?: string;
}
export const PRODUCTO_GENERICO_ID = "generico";

export const PRODUCTOS_CATALOGO: ProductoCatalogo[] = [
  {
    id: PRODUCTO_GENERICO_ID,
    nombre: "Producto Genérico / Personalizado",
    precio: 0,
    categoria: "Personalizado",
  },
  {
    id: "hiperecomomica",
    nombre: "Pijama Hiperecomomica",
    precio: 8000,
    categoria: "Pijama",
  },
  {
    id: "hiperecomomica-plus",
    nombre: "Pijama Hipereconomica Plus",
    precio: 10000,
    categoria: "Pijama",
  },
  {
    id: "enterizo-largo-esqueleto",
    nombre: "Enterizo Largo Esqueleto",
    precio: 20000,
    categoria: "Deportivo",
  },
  {
    id: "pantalon-bota-campana",
    nombre: "Pantalon Bota Campana",
    precio: 18000,
    categoria: "Deportivo",
  },
  {
    id: "enterizo-corto-manga-larga",
    nombre: "Enterizo Corto Manga Larga",
    precio: 20000,
    categoria: "Deportivo",
  },
  {
    id: "enterizo-largo-bota-campana",
    nombre: "Enterizo Largo Bota Campana",
    precio: 23000,
    categoria: "Deportivo",
  },
  {
    id: "enterizo-corto-esqueleto",
    nombre: "Enterizo Corto Esqueleto",
    precio: 17000,
    categoria: "Deportivo",
  },

  {
    id: "enterizo-corto-tira",
    nombre: "Enterizo Corto Tira",
    precio: 15000,
    categoria: "Deportivo",
  },
  {
    id: "leggins-push-up",
    nombre: "Leggins Push Up",
    precio: 16000,
    categoria: "Deportivo",
  },
  {
    id: "pantalon-bota-recta-piel-durazno",
    nombre: "Pantalon Bota Recta Piel Durazno",
    precio: 15000,
    categoria: "Deportivo",
  },
];
