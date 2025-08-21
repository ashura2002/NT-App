import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../utils/AxiosInstance'
import toast from 'react-hot-toast'
import Button from '../components/Button'

const DeleteNotePage = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const location = useLocation()
    const { note } = location.state || {}


    const deleteNote = async () => {
        try {
            const res = await axiosInstance.delete(`/api/notes/${id}`)
            toast.success(res.data.message)
            navigate('/api/notes')
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className='h-screen flex flex-col items-center justify-center'>
            <div className='bg-slate-700 rounded-md shadow-md  p-5 flex flex-col gap-5'>
                <div>
                    <h1 className='text-3xl'>Are you sure you want to delete this note?</h1>
                </div>

                <div>
                    <h1 className='text-2xl'>Note: {note}</h1>
                </div>

                <div className='flex gap-2'>
                    <button
                        className=' p-1 rounded-md  cursor-pointer
                         hover:bg-red-500 hover:text-white transition ease-in-out
                         duration-300
                        '
                        onClick={deleteNote}>Delete</button>
                    <button
                        className='p-1 rounded-md cursor-pointer hover:bg-green-500
                         hover:text-white transition ease-in-out
                         duration-300
                        '
                        onClick={() => navigate('/api/notes')}>Cancel</button>
                </div>
            </div>

        </div>
    )
}

export default DeleteNotePage