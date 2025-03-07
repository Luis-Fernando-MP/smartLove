import { Quicksand, Sansita_Swashed, Zain } from 'next/font/google'

export const font1 = Zain({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font1'
})

export const font2 = Quicksand({
  subsets: ['latin'],
  weight: ['300', '500'],
  variable: '--font2'
})

export const sansitaSwashed = Sansita_Swashed({
  subsets: ['latin'],
  weight: ['900'],
  variable: '--font3'
})

export const bodyFonts = ` ${font2.variable} ${font1.variable} ${sansitaSwashed.variable}`
