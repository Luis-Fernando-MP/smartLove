import html2canvas from 'html2canvas'
import JsPDF from 'jspdf'
import {
  BanknoteIcon,
  HotelIcon,
  MoonStarIcon,
  PiggyBankIcon,
  ShowerHeadIcon,
  SquirrelIcon
} from 'lucide-react'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { IReservation } from 'services/reserve/reserve.service.types'
import PreviewToast from 'shared/previewToast/PreviewToast'

import { useReservationStore } from '../../store/reservation.store'

interface TProps {
  reserve: IReservation
}

const useReserve = ({ reserve }: TProps) => {
  const [loading, setLoading] = useState(false)
  const refReservePrint = useRef<HTMLElement>(null)
  const { setReservation, selectedReservationId, selectReservation, deselectReservation } =
    useReservationStore()

  const isReading = selectedReservationId && selectedReservationId === String(reserve.idReserva)

  const handleReservationSelected = () => {
    selectReservation(String(reserve.idReserva))
    setReservation(reserve)
  }

  const handleReservationDeselected = () => {
    deselectReservation()
    setReservation(null)
  }

  const handlePrint = async () => {
    if (loading || !refReservePrint.current) return

    setLoading(true)
    const toastId = toast.loading('Generando PDF... ⏳')

    try {
      const canvas = await html2canvas(refReservePrint.current, {
        scale: 4,
        useCORS: true,
        backgroundColor: 'black',
        logging: true
      })

      const imgData = canvas.toDataURL('image/png')
      const img = new Image()
      img.src = imgData

      img.onload = () => {
        const pdf = new JsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: [60, (img.height * 60) / img.width]
        })

        pdf.addImage(imgData, 'PNG', 0, 0, 60, (img.height * 60) / img.width)

        PreviewToast({
          buttonTitle: 'Descargar',
          src: imgData,
          title: 'Su archivo está listo para descargarse',
          id: toastId,
          onClick() {
            pdf.save('Reserva.SmartPro.pdf')
            toast.success('PDF generado con éxito! 🎉', { id: toastId })
          }
        })
      }
    } catch (error) {
      toast.error('Error al generar PDF 😞', { id: toastId })
      console.error('Error generating PDF', error)
    } finally {
      setLoading(false)
      toast.remove(toastId)
    }
  }

  const littleBoxData = () => {
    const { total, igv, subtotal, totalDias, montoServicios = 0 } = reserve

    return [
      { title: 'Total:', subtitle: total, Icon: PiggyBankIcon, active: true },
      { title: 'Sub Total:', subtitle: subtotal, Icon: BanknoteIcon },
      { title: 'IGV:', subtitle: igv, Icon: SquirrelIcon },
      { title: 'Servicios:', subtitle: montoServicios, Icon: ShowerHeadIcon },
      { title: 'Cuartos:', subtitle: 2, Icon: HotelIcon },
      { title: 'Días:', subtitle: totalDias, Icon: MoonStarIcon }
    ]
  }

  return {
    handlePrint,
    handleReservationDeselected,
    handleReservationSelected,
    isReading,
    littleBoxData,
    loading,
    refReservePrint
  }
}

export default useReserve
