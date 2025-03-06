'use client'

import { type JSX } from 'react'

import './style.scss'

const Resume = (): JSX.Element => {
  return (
    <article className='resume'>
      <section className='resume-card'>
        <h2>
          Acerca de <b className='gr'>nosotros</b>
        </h2>
        <p>
          Nos ubicamos en San Juan Miraflores, en el sector Alipio Ponce lote 6, somos un centro de encanto tecnológico, el cual
          cuenta con habitaciones luminosas equipadas con tecnología LED y sensores; que permiten controlar la iluminación según
          las preferencias del huésped, y con conectividad gratuita a servicios de streaming como: HBO, Netflix y Prime video.
          Además, contamos con una terraza Rooftop, el cual es nuestro escenario celestial donde la música se fusiona con la noche
          y las luces bailan al ritmo de la diversión. Nuestro espacio está diseñado para eventos inolvidables, donde cada
          detalle, desde la iluminación hasta el sonido, crean una atmósfera única de celebración y alegría.
        </p>
      </section>
      <section className='resume-card'>
        <h2>
          Facilidades de <b className='gr'>Acceso</b>
        </h2>
        <p>
          Si tienes solicitudes de acceso especial, contactanos mediante nuestras redes sociales: puedes emplear Whatsapp,
          Facebook o Tik tok, estaremos al pendiente de ti.
        </p>
        <ul className='resume-card__list'>
          <li className='resume-card__item'>
            <span>Accesible en silla de ruedas</span> <i> (puede tener limitaciones)</i>
          </li>
          <li className='resume-card__item'>
            <span>Acceso a la entrada bien iluminado</span>
          </li>
          <li className='resume-card__item'>
            <span>Aparcamiento accesible en silla de ruedas</span>
          </li>
          <li className='resume-card__item'>
            <span>Aparcamiento para furgonetas accesible en silla de ruedas</span>
          </li>
          <li className='resume-card__item'>
            <span>Ascensor</span>
          </li>
          <li className='resume-card__item'>
            <span>Centro de negocios accesible en silla de ruedas</span>
          </li>
          <li className='resume-card__item'>
            <span>Conserjería accesible en silla de ruedas</span>
          </li>
          <li className='resume-card__item'>
            <span>Dispositivos de asistencia auditiva</span>
          </li>
          <li className='resume-card__item'>
            <span>Entrada sin escaleras</span>
          </li>
          <li className='resume-card__item'>
            <span>Gimnasio accesible en silla de ruedas</span>
          </li>
          <li className='resume-card__item'>
            <span>Lounge accesible en silla de ruedas</span>
          </li>
          <li className='resume-card__item'>
            <span>Piscina accesible en silla de ruedas</span>
          </li>
          <li className='resume-card__item'>
            <span>Recepción accesible en silla de ruedas</span>
          </li>
          <li className='resume-card__item'>
            <span>Restaurante accesible en silla de ruedas</span>
          </li>
          <li className='resume-card__item'>
            <span>Ruta accesible en silla de ruedas al ascensor</span>
          </li>
        </ul>
      </section>
    </article>
  )
}

export default Resume
