import { Mada, Roboto_Flex, Sansita_Swashed, Whisper, Yeseva_One } from 'next/font/google'

export const yesevaOne = Yeseva_One({
  subsets: ['latin'],
  weight: ['400']
})

export const mada = Mada({
  subsets: ['latin'],
  weight: ['300']
})

export const robotoFlex = Roboto_Flex({
  subsets: ['latin'],
  weight: ['900', '800', '700', '600', '500', '400', '300'],
  variable: '--roboto-flex'
})

export const sansitaSwashed = Sansita_Swashed({
  subsets: ['latin'],
  weight: ['900']
})

export const whisper = Whisper({
  subsets: ['latin'],
  weight: ['400']
})

export const bodyFonts = `${yesevaOne.className} ${mada.className} ${robotoFlex.variable} ${sansitaSwashed.className} ${whisper.className}`
