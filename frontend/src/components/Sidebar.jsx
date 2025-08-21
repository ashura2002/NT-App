import { LogOut, User2Icon } from 'lucide-react'
import { useContext, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import userContext from '../context/UserContext'
import themeContext from '../context/ThemeContext'



const Sidebar = ({ isShow, navlink, setIsLoggin }) => {
    const { theme } = useContext(themeContext)
    const navigate = useNavigate()
    const { user, setUser } = useContext(userContext)
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        setUser(localStorage.getItem('user'))
    }, [user])

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('userId')
        localStorage.removeItem('gmail')
        setIsLoggin(false)
        navigate('/')
    }

    return (
        <div className={`h-screen w-[230px] ${theme === 'dark' ? 'bg-slate-800 ' : 'bg-slate-300 text-slate-800'} shadow-md flex flex-col gap-7`}>
            <div className="p-5 flex items-center justify-center">
                <h1 className='font-medium text-2xl'>{isShow ? "NT" : ''}</h1>
            </div>

            <nav className="px-1 py-2 flex flex-col gap-5 h-[300px] text-[#111827]">
                {navlink.map(({ goto, text, icon: Icon, label }) => (
                    <Link key={goto} to={goto}
                        className={`flex items-center ${theme === 'dark' ? 'text-gray-50' : 'text-slate-800'} justify-baseline gap-5 p-3 rounded-full
                         hover:bg-black hover:text-white transition ease-in-out duration-500`}>
                        <Icon />{label}
                        {text}
                    </Link>
                ))}
            </nav>

            <div className='rounded-md cursor-pointer' onClick={() => navigate(`/auth/user-info/${userId}`)}>
                <h1 className='flex p-3 gap-5'>
                    <User2Icon />
                    {user}</h1>
            </div>

            <button
                className='flex items-center justify-baseline  gap-5 p-3 rounded-full
                 hover:bg-black hover:text-white transition ease-in-out duration-500 cursor-pointer'
                onClick={handleLogout}
            >
                <LogOut />
                Logout</button>
        </div>
    )
}

export default Sidebar
