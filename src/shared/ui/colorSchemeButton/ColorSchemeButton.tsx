'use client'

import { useLocalStorage } from 'hooks/useLocalStorage'
import { type JSX, useEffect } from 'react'
import { DarkModeSwitch } from 'react-toggle-dark-mode'

import themes from './themes.json'

const ColorSchemeButton = (): JSX.Element => {
  const [theme, setTheme] = useLocalStorage('theme', false)

  useEffect(() => {
    document.body.classList.toggle('dark', !theme)
    setRoot(theme)
  }, [theme])

  const setRoot = checked => {
    const newTheme = checked ? 'light' : 'dark'
    Object.entries(themes[newTheme]).forEach(([color, value]) => {
      document.documentElement.style.setProperty(`--${color}`, value)
    })
  }

  return (
    <DarkModeSwitch
      checked={theme}
      onChange={checked => {
        setTheme(checked)
      }}
      size={120}
      sunColor='#F5B027'
      moonColor='#705335'
    />
  )
}

export default ColorSchemeButton
