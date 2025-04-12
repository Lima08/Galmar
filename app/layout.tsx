import type React from "react"
import "@/app/globals.css"
import { Inter, Poppins } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["400", "700"]
})


export const metadata = {
  title: "Galmar - Produtos de Limpeza em Campinas",
  description:
    "Soluções de limpeza eficientes e ecológicas para sua casa ou empresa. Entrega rápida em toda região de Campinas.",
    icons: {
      icon: "/logo-galmar.png",
    },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={poppins.className}>
        <ThemeProvider attribute="class" defaultTheme="light"  disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'