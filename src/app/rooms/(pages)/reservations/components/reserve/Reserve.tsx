'use client'

import { IGV, SURCHARGE } from 'app/rooms/(pages)/[roomId]/(pages)/hooks/useTotalCalculate'
import html2canvas from 'html2canvas'
import JsPDF from 'jspdf'
import { LoaderCircle, NotepadText, Printer } from 'lucide-react'
import { type JSX, type ReactNode, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { IReservation } from 'services/room/reserve.service.types'
import { mada } from 'shared/fonts'
import { round } from 'shared/helpers/round'
import PreviewToast from 'shared/previewToast/PreviewToast'
import ToggleLogo from 'shared/ui/colorSchemeButton/ToggleLogo'

import './style.scss'

interface IReserve {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  reserve: IReservation
}

const Reserve = ({ reserve }: IReserve): JSX.Element => {
  const reservePrint = useRef<HTMLElement>(null)
  const [loading, setLoading] = useState(false)

  const handlePrint = async (): Promise<void> => {
    setLoading(true)
    if (!reservePrint.current || loading) return
    const toastId = toast.loading('Generando PDF... ⏳')
    try {
      const canvas = await html2canvas(reservePrint.current, {
        scale: 3.5,
        useCORS: true,
        backgroundColor: 'black',
        logging: true
      })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new JsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [52, 74]
      })
      pdf.addImage(imgData, 'PNG', 0, 0, 52, 74)
      PreviewToast({
        buttonTitle: 'Descargar',
        src: imgData,
        title: 'Su archivo esta listo para descargarse',
        id: toastId,
        onClick() {
          pdf.save(`Reserva-${reserve.idReserva}.SmartPro.pdf`)
          toast.success('PDF generado con éxito! 🎉', { id: toastId })
        }
      })
    } catch (error) {
      toast.error('Error al generar PDF 😞', { id: toastId })
      console.error('Error generating PDF', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <article className='reserve' ref={reservePrint}>
      <ToggleLogo />
      <button className='reserve-action details' title='Detalles'>
        <NotepadText />
      </button>
      <button className='reserve-action print' title='Imprimir' onClick={handlePrint}>
        {loading ? <LoaderCircle className='animate-spin' /> : <Printer />}
      </button>
      <section className='reserve-operations'>
        <div className='reserve-operation'>
          <h4>Ope.</h4>
          <p>{reserve.idReserva}</p>
        </div>
        <div className='reserve-operation'>
          <h4>Hora</h4>
          <p>{reserve.fechaIngreso.slice(0, 10)}</p>
        </div>
        <div className='reserve-operation'>
          <h4>Fecha</h4>
          <p>{reserve.fechaSalida.slice(0, 10)}</p>
        </div>
      </section>
      <span className='reserve-room'>
        Habitación:&nbsp;
        <h3 className='gr'>{reserve.habitacion.nombre}</h3>
      </span>
      <ul className='reserve-details'>
        <li className='reserve-detail'>
          <h5>Cant. días</h5>
          <p>
            : {reserve.totalDias} diá{reserve.totalDias > 1 && 's'}
          </p>
        </li>
        <li className='reserve-detail'>
          <h5>precio</h5>
          <p>: PEN {reserve.total}</p>
        </li>
        <li className='reserve-detail'>
          <h5>IGV 18%</h5>
          <p>: PEN {round(reserve.total * IGV)}</p>
        </li>
        <li className='reserve-detail'>
          <h5>Rec. Servicios</h5>
          <p>: PEN {round(reserve.total * SURCHARGE)}</p>
        </li>
        <li className='reserve-detail'>
          <h5>Tot. Pago</h5>
          <h4>: PEN {reserve.total}</h4>
        </li>
        <li className='reserve-detail'>
          <h5>Forma pago</h5>
          <p>: Presencial</p>
        </li>
      </ul>
      <div className='reserve-extra'>
        <h5 className={mada.className}>Cliente</h5>
      </div>
    </article>
  )
}

export default Reserve
