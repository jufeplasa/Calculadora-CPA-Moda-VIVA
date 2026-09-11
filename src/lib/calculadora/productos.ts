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
    id: "enterizo-largo-esqueleto",
    nombre: "Enterizo Largo Esqueleto",
    precio: 20000,
    categoria: "Deportivo",
  },
  {
    id: "enterizo-corto-esqueleto",
    nombre: "Enterizo Corto Esqueleto",
    precio: 20000,
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
    precio: 20000,
    categoria: "Deportivo",
  },
  {
    id: "enterizo-corto-tira",
    nombre: "Enterizo Corto Tira",
    precio: 20000,
    categoria: "Deportivo",
  },
  {
    id: "leggins-push-up",
    nombre: "Leggins Push Up",
    precio: 20000,
    categoria: "Deportivo",
  },
  {
    id: "pantalon-bota-campana",
    nombre: "Pantalon Bota Campana",
    precio: 20000,
    categoria: "Deportivo",
  },
];
