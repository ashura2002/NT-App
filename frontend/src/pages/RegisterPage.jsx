import { KeyRoundIcon, MailIcon, User2Icon } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/AxiosInstance'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

const RegisterPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axiosInstance.post(`/auth/register`, {
        'username': userName,
        'email': email,
        'password': password
      })
      toast.success(res.data.message)
      navigate('/auth/login')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-6 px-4 sm:px-6 lg:px-8'>
      {/* Title */}
      <motion.h1
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.3 }}
        className='text-2xl sm:text-3xl md:text-4xl font-bold text-center'
      >
        Sign Up
      </motion.h1>

      {/* Form */}
      <motion.form
        initial={{ x: 50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.4 }}
        onSubmit={handleSubmit}
        className='flex flex-col w-full max-w-sm sm:max-w-md md:max-w-lg gap-3'
      >
        {/* Email */}
        <div className='border border-gray-300 flex items-center rounded-full px-3'>
          <MailIcon className='text-gray-500' />
          <input
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className='outline-0 w-full p-2 text-sm sm:text-base'
            placeholder='Email'
          />
        </div>

        {/* Username */}
        <div className='border border-gray-300 flex items-center rounded-full px-3'>
          <User2Icon className='text-gray-500' />
          <input
            type="text"
            value={userName}
            onChange={e => setUserName(e.target.value)}
            className='outline-0 w-full p-2 text-sm sm:text-base'
            placeholder='Username'
          />
        </div>

        {/* Password */}
        <div className='border border-gray-300 flex items-center rounded-full px-3'>
          <KeyRoundIcon className='text-gray-500' />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className='outline-0 w-full p-2 text-sm sm:text-base'
            placeholder='Password'
          />
        </div>

        {/* Submit Button */}
        <button
          className='rounded-full p-2 sm:p-3 text-sm sm:text-base 
          cursor-pointer bg-[#0F0F1A] hover:bg-[#F5F5F7] 
          hover:text-[#0F0F1A] text-[#F5F5F7] 
          transition ease-in-out duration-300'
        >
          {loading ? 'Registering...' : 'Sign Up'}
        </button>
      </motion.form>

      {/* Footer */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.5 }}
        className='flex flex-col sm:flex-row gap-1 sm:gap-2 text-center'
      >
        <h1 className='text-sm sm:text-base'>Already have an account?</h1>
        <button
          onClick={() => navigate('/auth/login')}
          className='cursor-pointer text-sm sm:text-base text-blue-600 hover:underline'
        >
          Sign in
        </button>
      </motion.div>
    </div>
  )
}

export default RegisterPage
