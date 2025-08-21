import { Menu, MoonIcon, SunDimIcon, XIcon } from 'lucide-react'
import React from 'react'
import themeContext from '../context/ThemeContext'
import { useContext } from 'react'

const Header = ({ isShow, setIsShow }) => {
  const { theme, setTheme } = useContext(themeContext)
  const controlNav = () => {
    setIsShow(!isShow)
  }

  const switchTheme = () => {
    setTheme(theme === 'dark' ? "light" : 'dark')
  }

  return (
    <header className={`flex w-full p-5 justify-between shadow-sm`}>
      <div className='flex items-center justify-between gap-5'>
        {isShow ? <XIcon className='cursor-pointer' onClick={controlNav} /> :
          <Menu className='cursor-pointer' onClick={controlNav} />}
        <h1 className='font-medium'>{!isShow ? 'NT' : ''}</h1>
      </div>

      <div>
        {theme === 'dark' ? <SunDimIcon className='cursor-pointer' onClick={switchTheme} /> :
          <MoonIcon className='cursor-pointer' onClick={switchTheme} />}
      </div>
    </header>
  )
}

export default Header