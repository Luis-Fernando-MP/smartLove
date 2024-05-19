'use client'

import { Loader } from '@googlemaps/js-api-loader'
import Image from 'next/image'
import { type JSX, type ReactNode, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

interface IMap {
  children?: Readonly<ReactNode[]> | null
  position?: google.maps.LatLng | null | google.maps.LatLngLiteral
}

const defaultPosition = {
  lat: -12.170758097005582,
  lng: -76.97982649101804
}

function MapComponent({ position = defaultPosition }: IMap): JSX.Element {
  const [loading, setLoading] = useState(true)
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
          version: 'weekly'
        })
        const mapLibrary = await loader.importLibrary('maps')

        const mapOptions: google.maps.MapOptions = {
          center: position,
          zoom: 15,
          mapId: 'SmartProID'
        }

        const map = new mapLibrary.Map(mapRef.current as HTMLDivElement, mapOptions)

        const Marker = (await loader.importLibrary('marker')).AdvancedMarkerElement

        const marker = new Marker({
          map,
          position,
          title: 'SmartPro'
        })

        const infoWindow = new google.maps.InfoWindow({
          content: '<p>Marker Location:' + '</p>'
        })

        google.maps.event.addListener(marker, 'click', () => {
          infoWindow.open(map, marker)
        })
        setLoading(false)
      } catch (error) {
        console.error(error)
        toast.error('No se pudo cargar el mapa en la pagina', {
          position: 'bottom-right'
        })
      }
    }

    initMap()
  }, [position])

  return (
    <>
      {!loading ? (
        <div style={{ height: '600px' }} ref={mapRef} />
      ) : (
        <Image src='/map.png' alt='Smart Love map' width={486} height={291} />
      )}
    </>
  )
}

export default MapComponent
