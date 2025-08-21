import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from '../components/Form'
import { toast } from 'react-hot-toast'
import axiosInstance from '../utils/AxiosInstance'
import { motion } from 'framer-motion'

const LoginPage = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!userName && !password) return alert("cant be blank")
        setLoading(true)
        try {
            const res = await axiosInstance.post(`/auth/login`, {
                "username": userName,
                "password": password
            })
            toast.success(res.data.message)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user', res.data.user.username)
            localStorage.setItem('userId', res.data.user._id)
            localStorage.setItem('gmail', res.data.user.email)
            navigate('/api/notes')
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='h-screen flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10 px-4 sm:px-6 md:px-10'>
            <motion.h1
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className='text-2xl sm:text-3xl md:text-4xl font-semibold text-center'
            >
                Sign In
            </motion.h1>

            <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="w-full max-w-sm sm:max-w-md md:max-w-lg"
            >
                <Form
                    userName={userName} setUserName={setUserName}
                    password={password} setPassword={setPassword}
                    loading={loading} onSubmit={handleSubmit}
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className='flex flex-col sm:flex-row gap-2 text-center sm:text-left'
            >
                <h1 className="text-sm sm:text-base">Don't have an account?</h1>
                <button
                    onClick={() => navigate('/auth/register')}
                    className='cursor-pointer text-blue-600 hover:underline text-sm sm:text-base'
                >
                    Register
                </button>
            </motion.div>
        </div>
    )
}

export default LoginPage
