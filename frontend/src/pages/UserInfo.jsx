import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../utils/AxiosInstance'
import toast from 'react-hot-toast'

const UserInfo = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const userName = localStorage.getItem('user')
  const gmail = localStorage.getItem('gmail')
  const [loading, setLoading] = useState(false)

  const deleteAccount = async () => {
    setLoading(true)
    try {
      const res = await axiosInstance.delete(`/auth/user-info/${id}`)
      toast.success(res.data.message)
      navigate('/')
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-10 py-10">
      {/* User Details */}
      <div className="text-center space-y-4 sm:space-y-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
          User Id: <span className="text-indigo-600 text-xl sm:text-2xl md:text-3xl">{id}</span>
        </h1>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
          Name: <span className="text-indigo-600 text-xl sm:text-2xl md:text-3xl">{userName}</span>
        </h1>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
          Gmail: <span className="text-indigo-600 text-xl sm:text-2xl md:text-3xl">{gmail}</span>
        </h1>
      </div>

      {/* Delete Button */}
      <div className="mt-10">
        <button
          onClick={deleteAccount}
          disabled={loading}
          className="border border-gray-500 px-4 sm:px-6 md:px-8 py-2 sm:py-3 
          rounded-md cursor-pointer 
          text-sm sm:text-base md:text-lg 
          hover:bg-red-600 hover:text-white transition ease-in-out duration-300 hover:shadow-md
          disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Deleting...' : 'Delete Account'}
        </button>
      </div>
    </div>
  )
}

export default UserInfo
