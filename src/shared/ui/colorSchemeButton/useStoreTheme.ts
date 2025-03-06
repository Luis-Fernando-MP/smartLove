import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ITheme = 'dark' | 'light'

interface IUseStoreTheme {
  theme: ITheme
  setTheme: (theme: IUseStoreTheme['theme']) => void
}

const useStoreTheme = create(
  persist<IUseStoreTheme>(
    set => ({
      theme: getUserThemePreferences(),
      setTheme: theme => {
        set(prevState => ({ ...prevState, theme }))
      }
    }),
    { name: 'theme' }
  )
)

function getUserThemePreferences(): ITheme {
  try {
    let mediaPreferenceDark = false
    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      mediaPreferenceDark = true
    }
    const preference = mediaPreferenceDark ? 'dark' : 'light'
    const localTheme = window.localStorage.getItem('theme')
    if (!localTheme) return preference
    const parseLocalTheme = JSON.parse(localTheme) as ITheme
    return parseLocalTheme === 'light' ? 'light' : 'dark'
  } catch (error) {
    console.error(error)
    return 'dark'
  }
}

export default useStoreTheme
