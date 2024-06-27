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
import { IReservation } from 'services/room/reserve.service.types'
import PreviewToast from 'shared/previewToast/PreviewToast'

import { useReservationStore } from '../../store/reservation.store'

interface TProps {
  reserve: IReservation
}

const useReserve = ({ reserve }: TProps) => {
  const [loading, setLoading] = useState(false)
  const refReservePrint = useRef<HTMLElement>(null)
  const { setReservation } = useReservationStore()

  const handleReservationSelected = (): void => {
    setReservation(reserve)
  }

  const handlePrint = async (): Promise<void> => {
    setLoading(true)
    if (!refReservePrint.current || loading) return
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
        const imgWidth = img.width
        const imgHeight = img.height

        const pdfWidth = 60
        const pdfHeight = (imgHeight * pdfWidth) / imgWidth

        const pdf = new JsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: [pdfWidth, pdfHeight]
        })

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)

        PreviewToast({
          buttonTitle: 'Descargar',
          src: imgData,
          title: 'Su archivo está listo para descargarse',
          id: toastId,
          onClick() {
            pdf.save(`Reserva-${reserve.idReserva}.SmartPro.pdf`)
            toast.success('PDF generado con éxito! 🎉', { id: toastId })
          }
        })
      }
    } catch (error) {
      toast.error('Error al generar PDF 😞', { id: toastId })
      console.error('Error generating PDF', error)
    } finally {
      setLoading(false)
    }
  }

  const littleBoxData = () => {
    const { total, igv, subtotal, totalDias } = reserve

    return [
      {
        title: 'Total:',
        subtitle: total,
        Icon: PiggyBankIcon,
        active: true
      },
      {
        title: 'Sub Total:',
        subtitle: subtotal,
        Icon: BanknoteIcon
      },
      {
        title: 'IGV:',
        subtitle: igv,
        Icon: SquirrelIcon
      },
      {
        title: 'Servicios:',
        subtitle: reserve.montoServicios ?? 0,
        Icon: ShowerHeadIcon
      },
      {
        title: 'Cuartos:',
        subtitle: 2,
        Icon: HotelIcon
      },
      {
        title: 'Días:',
        subtitle: totalDias,
        Icon: MoonStarIcon
      }
    ]
  }

  return {
    loading,
    refReservePrint,
    handlePrint,
    handleReservationSelected,
    littleBoxData
  }
}

export default useReserve
