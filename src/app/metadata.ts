import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://smart-love.vercel.app'),
  title: 'Smart Love Hotel',
  description:
    'Bienvenido a Smart Love Hotel, tu destino ideal en el corazón de la ciudad. Ofrecemos habitaciones modernas con tecnología de punta, servicio personalizado las 24 horas, y la mejor experiencia en hospedaje. Ubicados estratégicamente para tu comodidad.',
  keywords: [
    'Smart Love',
    'Smart Pro',
    'Hotel',
    'Reservaciones',
    'Habitaciones',
    'Hotel tecnológico',
    'Hospedaje Lima',
    'Alojamiento moderno',
    'Hotel en Lima',
    'Reservas online',
    'Hotel con tecnología',
    'Habitaciones inteligentes',
    'Mejor hotel Lima',
    'Hospedaje céntrico'
  ],
  authors: [
    { name: 'Shuni dev', url: 'https://luisjp.vercel.app' },
    { name: 'Arian reyes', url: 'https://github.com/arianr2014' }
  ],
  creator: 'Shun dev',
  publisher: 'Smart Love Hotel',
  icons: {
    icon: '/logo.svg'
  },
  openGraph: {
    title: 'Smart Love Hotel - Experiencia única en hospedaje en Lima',
    description:
      'Descubre el hotel más innovador de Lima. Habitaciones inteligentes equipadas con la última tecnología, ubicación privilegiada cerca de centros comerciales y zonas turísticas, servicio personalizado 24/7, y las mejores tarifas garantizadas. Nuestros huéspedes nos califican con 4.8 estrellas por nuestra excelente atención y modernas instalaciones.',
    url: 'https://smart-love.vercel.app',
    siteName: 'Smart Love Hotel',
    images: [
      {
        url: '/opengraph.png',
        alt: 'Smart Love Hotel - El hotel más innovador de Lima',
        width: 1200,
        height: 630
      }
    ],
    type: 'website',
    locale: 'es_PE'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smart Love Hotel - El mejor hospedaje inteligente en Lima',
    description:
      'Hotel premiado por su innovación y servicio excepcional. Ubicado en una zona estratégica de Lima, con acceso a principales atracciones. Habitaciones inteligentes, servicio 24/7, WiFi de alta velocidad y más. 4.8/5 en satisfacción del cliente.',
    images: [
      {
        url: '/opengraph.png',
        alt: 'Smart Love Hotel - Innovación y confort en Lima'
      }
    ]
  },
  alternates: {
    canonical: 'https://smart-love.vercel.app'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  }
}

export const viewport = {
  width: 'device-width',
  initialScale: 1
}
