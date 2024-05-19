'use client'

import { type JSX, useEffect, useState } from 'react'
import { DarkModeSwitch } from 'react-toggle-dark-mode'

import themes from './themes.json'

const currentTheme = window.localStorage.getItem('theme') !== 'dark'
const matchTheme = window.matchMedia('(prefers-color-scheme: dark)').matches

const ColorSchemeButton = (): JSX.Element => {
  const [isActiveDarkMode, setIsActiveDarkMode] = useState(false)

  // useEffect(() => {
  //   setIsActiveDarkMode(currentTheme || matchTheme)
  // }, [])

  useEffect(() => {
    const newTheme = isActiveDarkMode ? 'light' : 'dark'
    window.localStorage.setItem('theme', newTheme)
    document.body.classList.toggle('dark', !isActiveDarkMode)
    setRoot(isActiveDarkMode)
  }, [isActiveDarkMode])

  const setRoot = checked => {
    const newTheme = checked ? 'light' : 'dark'
    Object.entries(themes[newTheme]).forEach(([color, value]) => {
      document.documentElement.style.setProperty(`--${color}`, value)
    })
  }

  return (
    <DarkModeSwitch
      checked={isActiveDarkMode}
      onChange={checked => {
        setIsActiveDarkMode(checked)
      }}
      size={120}
      sunColor='#F5B027'
      moonColor='#413F36'
    />
  )
}

export default ColorSchemeButton
