import { TClientReservation } from '@/app/api/reservation/by-user/[idUser]/route'
import PreviewToast from '@/shared/previewToast/PreviewToast'
import html2canvas from 'html2canvas'
import JsPDF from 'jspdf'
import { BanknoteIcon, CalendarDaysIcon, PiggyBankIcon, SquirrelIcon } from 'lucide-react'
import { useCallback, useMemo, useRef, useState } from 'react'
import toast from 'react-hot-toast'

import { useReservationStore } from '../../store/reservation.store'

interface TProps {
  reserve: TClientReservation
}

const generateCanvas = async (element: HTMLElement) => {
  return await html2canvas(element, {
    scale: 4,
    useCORS: true,
    backgroundColor: 'black',
    logging: true
  })
}

const useReserve = ({ reserve }: TProps) => {
  const [loading, setLoading] = useState(false)
  const refReservePrint = useRef<HTMLButtonElement>(null)
  const { setReservation, reservation } = useReservationStore()

  const isReading = useMemo(() => reservation && reservation.id === reserve.id, [reservation?.id, reserve.id])

  const handlePrint = useCallback(async () => {
    if (loading || !refReservePrint.current) return

    setLoading(true)
    const toastId = toast.loading('Generando PDF... ⏳')

    try {
      const canvas = await generateCanvas(refReservePrint.current)
      const imgData = canvas.toDataURL('image/png')
      const img = new Image()
      img.src = imgData

      img.onload = () => {
        const height = (img.height * 60) / img.width
        const pdf = new JsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: [60, height]
        })

        pdf.addImage(imgData, 'PNG', 0, 0, 60, height)

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
  }, [loading, refReservePrint])

  const handleDownloadImage = useCallback(async () => {
    if (loading || !refReservePrint.current) return

    setLoading(true)
    const toastId = toast.loading('Descargando imagen... ⏳')

    try {
      const canvas = await generateCanvas(refReservePrint.current)
      const imgData = canvas.toDataURL('image/png')
      const img = new Image()
      img.src = imgData

      img.onload = () => {
        const link = document.createElement('a')
        link.href = imgData
        link.download = 'Reserva.SmartPro.png'
        link.click()

        toast.success('Imagen descargada con éxito! 🎉', { id: toastId })
      }
    } catch (error) {
      toast.error('Error al descargar imagen 😞', { id: toastId })
      console.error('Error downloading image', error)
    } finally {
      setLoading(false)
      toast.remove(toastId)
    }
  }, [loading, refReservePrint])

  return {
    handlePrint,
    handleDownloadImage,
    setReservation,
    isReading,
    loading,
    refReservePrint
  }
}

export default useReserve

export const littleBoxData = (reserve: TClientReservation) => {
  const { total, subtotal, tax, totalDays } = reserve

  return [
    { title: 'Total:', subtitle: `S/. ${total}`, Icon: BanknoteIcon },
    { title: 'Sub Total:', subtitle: `S/. ${subtotal}`, Icon: PiggyBankIcon },
    { title: 'IGV:', subtitle: `S/. ${tax}`, Icon: SquirrelIcon },
    { title: 'Noches:', subtitle: `${totalDays}N.`, Icon: CalendarDaysIcon }
  ] as const
}
