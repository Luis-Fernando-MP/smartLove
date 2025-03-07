import type { JSX } from 'react'

import './style.scss'

const Polices = (): JSX.Element => {
  return (
    <article className='policies' id='section-view'>
      <h1>Políticas del Hotel Smart Love</h1>

      <div className='policies-wrapper'>
        <section className='policies-section'>
          <h2>Horarios</h2>
          <ul>
            <li>Check-in: 2:00 PM</li>
            <li>Check-out: 12:00 PM</li>
            <li>Atención 24/7</li>
          </ul>
        </section>

        <section className='policies-section'>
          <h2>Reservaciones</h2>
          <ul>
            <li>Se requiere identificación válida al momento del check-in</li>
            <li>La reserva se garantiza con el pago completo por adelantado</li>
            <li>Cancelaciones gratuitas hasta 24 horas antes del check-in</li>
          </ul>
        </section>

        <section className='policies-section'>
          <h2>Reglas Generales</h2>
          <ul>
            <li>No se permiten mascotas</li>
            <li>Prohibido fumar en las habitaciones</li>
            <li>Se debe mantener un ambiente tranquilo y respetuoso</li>
            <li>Los daños a la propiedad serán cobrados</li>
          </ul>
        </section>

        <section className='policies-section'>
          <h2>Servicios Incluidos</h2>
          <ul>
            <li>WiFi gratuito</li>
            <li>Aire acondicionado</li>
            <li>Servicio de limpieza diario</li>
            <li>TV con cable</li>
            <li>Artículos de aseo personal</li>
          </ul>
        </section>
      </div>
    </article>
  )
}

export default Polices
