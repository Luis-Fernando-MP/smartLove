import { MapPinned } from 'lucide-react'
import { type JSX } from 'react'
import { getCharacteristics } from 'services/getCharacteristics'
import Characteristics from 'shared/ui/characteristics/Characteristics'
import MapComponent from 'shared/ui/map/MapComponent'

import './style.scss'

const Resume = async (): Promise<JSX.Element> => {
  const characteristics = await getCharacteristics()

  return (
    <article className='resume'>
      <div className='resume-title'>
        <h2>HOTEL SMART PRO</h2>
        <p>
          Hotel de lujo con habitaciones LED, sensores, Rooftop, Bar y mucho
          más…
        </p>
      </div>
      <Characteristics characteristics={characteristics} />
      <section className='resume-about'>
        <h3>Acerca de Nosotros</h3>
        <p>
          Nos ubicamos en San Juan Miraflores, en el sector Alipio Ponce lote 6,
          somos un centro de encanto tecnológico, el cual cuenta con
          habitaciones luminosas equipadas con tecnología LED y sensores; que
          permiten controlar la iluminación según las preferencias del huésped,
          y con conectividad gratuita a servicios de streaming como: HBO,
          Netflix y Prime video. Además, contamos con una terraza Rooftop, el
          cual es nuestro escenario celestial donde la música se fusiona con la
          noche y las luces bailan al ritmo de la diversión. Nuestro espacio
          está diseñado para eventos inolvidables, donde cada detalle, desde la
          iluminación hasta el sonido, crean una atmósfera única de celebración
          y alegría.
        </p>
      </section>
      <section className='resume-moreDetails'>
        <section className='resume-facilities'>
          <h3>Facilidades de acceso</h3>
          <h5>
            Si tienes solicitudes de acceso especial, contactados mediante
            nuestras redes sociales: puedes emplear WhatsApp, Facebook o Tik
            tok, estaremos al pendiente de ti.
          </h5>
          <ul>
            <li>Accesible en silla de ruedas (puede tener limitaciones)</li>
            <li>Acceso a la entrada bien iluminado</li>
            <li>Aparcamiento accesible en silla de ruedas</li>
            <li>Aparcamiento para furgonetas accesible en silla de ruedas</li>
            <li>Ascensor</li>
            <li>Centro de negocios accesible en silla de ruedas</li>
            <li>Conserjería accesible en silla de ruedas</li>
            <li>Dispositivos de asistencia auditiva</li>
            <li>Entrada sin escaleras</li>
            <li>Gimnasio accesible en silla de ruedas</li>
            <li>Lounge accesible en silla de ruedas</li>
            <li>Piscina accesible en silla de ruedas</li>
            <li>Recepción accesible en silla de ruedas</li>
            <li>Restaurante accesible en silla de ruedas</li>
            <li>Ruta accesible en silla de ruedas al ascensor</li>
          </ul>
        </section>
        <article className='resume-map'>
          <MapComponent />
          <aside className='resume-map__information'>
            <div>
              <MapPinned />
              <h4>
                SMART LOVE, San Juan de Miraflores 15058, en el sector Alipio
                Ponce lote 6
              </h4>
            </div>
            <ul className='resume-map__social'>
              <li>WhatsApp</li>
              <li>Facebook</li>
              <li>TikTok</li>
            </ul>
          </aside>
        </article>
      </section>
    </article>
  )
}

export default Resume
