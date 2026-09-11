import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Calculadora de CPA & Rentabilidad Dropshipping",
  description: "Calculadora interactiva en tiempo real para encontrar tu CPA Breakeven, margen de ganancia neto y precio recomendado en operaciones de e-commerce y COD.",
  keywords: ["Calculadora CPA", "Dropshipping", "Breakeven CPA", "Rentabilidad E-commerce", "Pago contra entrega", "Next.js"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning className={`${fontSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-[#fdfbfb]">
        {children}
      </body>
    </html>
  );
}
