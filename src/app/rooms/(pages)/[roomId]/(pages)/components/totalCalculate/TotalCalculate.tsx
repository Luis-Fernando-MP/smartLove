import { Calendar, CalendarClockIcon } from 'lucide-react'
import Link from 'next/link'
import type { JSX } from 'react'

import './style.scss'

const TotalCalculate = (): JSX.Element => {
  return (
    <section className='totalCalculate'>
      <article className='totalCalculate-days'>
        <div className='totalCalculate-separator'>
          <h3 className='gr'>Tiempo de hospedaje:</h3>
          <div className='totalCalculate-container time'>
            <button className='btn active'>1 noche</button>
            <button className='btn'>+de 1 noche</button>
          </div>
        </div>
        <div className='totalCalculate-separator'>
          <h5>Desde:</h5>
          <div className='totalCalculate-container'>
            <input type='date' className='totalCalculate-date btn' min='2017-04-01' />
          </div>
        </div>
        <div className='totalCalculate-separator'>
          <h5>Hasta:</h5>
          <div className='totalCalculate-container'>
            <input type='date' className='totalCalculate-date btn' min='2017-04-01' />
          </div>
        </div>
      </article>
      <article className='totalCalculate-total'>
        <div className='totalCalculate-separator subtotal'>
          <h3>Subtotal:</h3>
          <div className='totalCalculate-container subtotal'>
            <button className='btn'>
              <CalendarClockIcon />
              <p>2 Dias</p>
            </button>
            <h4>PEN 449.57</h4>
          </div>
        </div>
        <div className='totalCalculate-separator'>
          <h5>Costo final:</h5>
          <div className='totalCalculate-container igv'>
            <p>*ICV 18%</p>
            <h4>PEN 249.57</h4>
          </div>
          <div className='totalCalculate-container service'>
            <p>*Recargo x Servicio 10%</p>
            <h4>PEN 134.45</h4>
          </div>
          <div className='totalCalculate-container total'>
            <h3>TOTAL**</h3>
            <h2>PEN 575.4496</h2>
          </div>
        </div>

        <div className='totalCalculate-separator polices'>
          <Link href='/polices#taxes'>Ver detalles de impuestos</Link>
          <Link href='/polices#fees'>Ver detalles de tarifas flexibles</Link>
        </div>
      </article>
    </section>
  )
}

export default TotalCalculate
