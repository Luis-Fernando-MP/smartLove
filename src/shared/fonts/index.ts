import { Mada, Roboto_Flex, Sansita_Swashed } from 'next/font/google'

export const robotoFlex = Roboto_Flex({
  subsets: ['latin'],
  weight: ['900', '800', '700', '600', '500', '400', '300'],
  variable: '--font1'
})

export const mada = Mada({
  subsets: ['latin'],
  weight: ['300'],
  variable: '--font2'
})

export const sansitaSwashed = Sansita_Swashed({
  subsets: ['latin'],
  weight: ['900']
})

export const bodyFonts = ` ${mada.variable} ${robotoFlex.variable} ${sansitaSwashed.className}`
