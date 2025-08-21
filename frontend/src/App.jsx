import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import MainLayout from './components/MainLayout'
import { Route, Routes, useLocation } from 'react-router-dom'
import Homepage from './pages/Homepage'
import { HelpCircleIcon, Home, NotebookPenIcon } from 'lucide-react'
import AddNote from './pages/AddNote'
import AskAi from './pages/AskAi'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import loginContext from './context/LoginContext'
import EditNotePage from './pages/EditNotePage'
import DeleteNotePage from './pages/DeleteNotePage'
import userContext from './context/UserContext'
import UserInfo from './pages/UserInfo'
import ThemeContext from './context/ThemeContext'


const App = () => {
  const [isShow, setIsShow] = useState(false)
  const [isLoggin, setIsLoggin] = useState(localStorage.getItem('token') !== null)
  const [user, setUser] = useState(localStorage.getItem('user'))
  const [theme, setTheme] = useState('dark')
  const location = useLocation()
  const navData = [
    { text: 'All Notes', icon: Home, goto: '/api/notes' },
    { text: 'Add Note', icon: NotebookPenIcon, goto: '/api/add-note' },
    { text: 'Ask AI', icon: HelpCircleIcon, goto: '/api/ask-ai' }
  ]
  const hideNavPaths = ['/', '/auth/login', '/auth/register']
  const shouldShowNav = isLoggin && !hideNavPaths.includes(location.pathname) // kung ang pathname wala
  //  nag include sa pathname nga naa hideNavPaths array makita ang sidebar



  return (
    <div className={`flex ${theme === 'dark' ? 'bg-slate-900 text-gray-50' : 'bg-slate-200 text-slate-800'} `}>
      <loginContext.Provider value={{ setIsLoggin }}>
        <userContext.Provider value={{ user, setUser }}>
          <ThemeContext.Provider value={{ theme, setTheme }}>
            <aside>
              {shouldShowNav && isShow && (
                <Sidebar isShow={isShow} navlink={navData} setIsLoggin={setIsLoggin} />
              )}
            </aside>

            <MainLayout>
              {shouldShowNav && <Header isShow={isShow} setIsShow={setIsShow} />}
              <Routes>
                <Route path='/' element={<LandingPage setIsShow={setIsShow} isShow={isShow} />} />
                <Route path='/auth/login' element={<LoginPage />} />
                <Route path='/auth/register' element={<RegisterPage />} />
                {/* protected routes */}
                <Route path='/api/notes' element={<Homepage />} />
                <Route path='/api/add-note' element={<AddNote />} />
                <Route path='/notes/:id/edit' element={<EditNotePage />} />
                <Route path='/notes/:id/delete' element={<DeleteNotePage />} />
                <Route path='/api/ask-ai' element={<AskAi />} />
                <Route path='/auth/user-info/:id' element={<UserInfo />} />
              </Routes>
            </MainLayout>
          </ThemeContext.Provider>
        </userContext.Provider>
      </loginContext.Provider>
    </div>
  )
}

export default App


