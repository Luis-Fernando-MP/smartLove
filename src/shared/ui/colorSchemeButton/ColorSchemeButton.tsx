'use client'

import { type JSX, useEffect } from 'react'
import { DarkModeSwitch } from 'react-toggle-dark-mode'

import themes from './themes.json'
import useStoreTheme, { ITheme } from './useStoreTheme'

const ColorSchemeButton = (): JSX.Element => {
  const { theme, setTheme } = useStoreTheme()

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark')
    setRoot(theme)
  }, [theme])

  const setRoot = (theme: ITheme) => {
    Object.entries(themes[theme]).forEach(([color, value]) => {
      document.documentElement.style.setProperty(`--${color}`, value)
    })
  }

  return (
    <DarkModeSwitch
      checked={theme !== 'dark'}
      onChange={checked => {
        setTheme(!checked ? 'dark' : 'light')
      }}
      size={120}
      sunColor='#F5B027'
      moonColor='#705335'
    />
  )
}

export default ColorSchemeButton
