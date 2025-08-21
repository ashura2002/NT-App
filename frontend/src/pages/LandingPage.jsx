import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MoonIcon, SunDimIcon } from 'lucide-react'
import themeContext from '../context/ThemeContext'

const LandingPage = ({ isShow, setIsShow }) => {
    const { theme, setTheme } = useContext(themeContext)
    useEffect(() => {
        setIsShow(false) // pang control sa sidebar
    }, [isShow])
    const navigate = useNavigate()

    const switchTheme = () => {
        setTheme(theme === 'dark' ? "light" : 'dark')
    }

    return (
        <div className='h-screen flex flex-col-reverse md:flex-row gap-8 md:gap-12 items-center justify-center px-4 sm:px-8 lg:px-16'>

            {/* Left Section */}
            <div className='text-center md:text-left max-w-lg'>
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                    className='flex flex-col gap-5'
                >
                    <h1 className='text-2xl sm:text-3xl lg:text-4xl font-semibold'>
                        Welcome to <span className='font-bold text-3xl sm:text-4xl lg:text-5xl text-indigo-600'>NT</span>
                    </h1>
                    <p className='text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed'>
                        Organize your thoughts, jot down ideas, and keep track of everything that matters. <br />
                        Need help? Ask Gemini AI for summaries, suggestions, or answers—right inside your notes.
                    </p>
                </motion.div>

                <div className='flex items-center gap-10'>
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: 'easeInOut' }}
                        onClick={() => navigate('/auth/login')}
                        className='rounded-full cursor-pointer px-6 py-2 sm:px-8 sm:py-3 duration-300 
                               transition ease-in-out bg-[#0F0F1A] hover:bg-slate-300 
                               hover:text-[#0F0F1A] text-[#F5F5F7] mt-6 text-sm sm:text-base lg:text-lg'
                    >
                        Get Started
                    </motion.button>

                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: 'easeInOut' }}
                        onClick={switchTheme}
                        className='mt-6 rounded-full px-6 py-2 sm:px-8 sm:py-3 cursor-pointer
                        bg-[#0F0F1A] hover:bg-slate-300 hover:text-[#0F0F1A] text-[#F5F5F7]
                        duration-300 transition ease-in-out                  
                        '>
                        {theme === 'dark' ? <SunDimIcon /> :
                            <MoonIcon />}
                    </motion.button>
                </div>

            </div>

            {/* Right Section */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
                className='p-3 sm:p-5 w-[220px] sm:w-[300px] lg:w-[400px]'
            >
                <img src={'/public/images/request.png'} alt="illustration" className='w-full object-contain' />
            </motion.div>
        </div>
    )
}

export default LandingPage
