// app/layout.tsx
import { Toaster } from 'sonner'
import './globals.css'
import { Inter } from 'next/font/google'
import MouseEffect from '@/components/ui/mouse/MouseEffect'
import Provider from '@/components/providers/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Cris Shop',
  description: 'E-commerce de ejemplo con Next.js + Tailwind',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
          <Provider>
            <MouseEffect />
            {children}
            <Toaster position="top-right" richColors expand />
          </Provider>
      </body>
    </html>
  )
}
