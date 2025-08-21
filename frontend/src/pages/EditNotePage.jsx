import { NotepadTextIcon } from 'lucide-react'
import React, { useState } from 'react'
import Button from '../components/Button'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../utils/AxiosInstance'
import toast from 'react-hot-toast'

const EditNotePage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { id } = useParams()
    const { note } = location.state || {}
    const [inputValue, setInputValue] = useState(note || "")
    const [loading, setLoading] = useState(false)

    const editNote = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await axiosInstance.put(`/api/notes/${id}`, { "note": inputValue })
            navigate('/api/notes')
        } catch (error) {
            console.log(error)
            toast.error("Failed to load note")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='h-screen flex items-center justify-center '>
            <form
                onSubmit={editNote}
                className='border border-gray-300 rounded-md w-[600px] p-5 grid gap-5 place-items-center hover:scale-105 hover:shadow-lg transition ease-in-out duration-300'>
                <h1 className='text-4xl font-medium'>Edit your note😉</h1>
                <div className='grid gap-3 w-full'>
                    <span>Note</span>
                    <div className='border border-gray-300 rounded-full flex item-center gap-5 p-2'>
                        <NotepadTextIcon className='text-gray-600' />
                        <input
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                            type="text" className='w-full border-0 outline-0' />
                    </div>
                </div>
                <div className='flex items-center gap-5'>
                    <Button loading={loading} text={`${loading ? 'Editing...' : 'Edit'}`} />
                    <button
                        className='border py-1 px-2 rounded-full border-gray-300 cursor-pointer hover:bg-green-500
                         hover:text-white transition ease-in-out
                         duration-300'
                        onClick={() => navigate('/api/notes')}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default EditNotePage