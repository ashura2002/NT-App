import React, { useEffect, useState, useContext } from 'react'
import NoData from '../components/NoData'
import NoteContainer from '../components/NoteContainer'
import NoteCard from '../components/NoteCard'
import axiosInstance from '../utils/AxiosInstance'
import loginContext from '../context/LoginContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Homepage = () => {
    const [loading, setLoading] = useState(false)
    const [noteStorage, setNoteStorage] = useState([])
    const { setIsLoggin } = useContext(loginContext)
    const navigate = useNavigate()

    useEffect(() => {
        const getAllNotes = async () => {
            try {
                const res = await axiosInstance.get('/api/notes')
                setLoading(true)
                setNoteStorage(res.data.notes)
                setIsLoggin(true)
            } catch (error) {
                toast.error(error.response?.data?.message || "Something went wrong")
                navigate('/')
            } finally {
                setLoading(false)
            }
        }
        getAllNotes()
    }, [])

    return (
        <div className="min-h-screen flex flex-col gap-6 sm:gap-10 items-center px-4 sm:px-6 lg:px-12 py-6">
            {/* Page Title */}
            <div className="text-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium">
                    Your All Notes
                </h1>
            </div>

            {/* Notes Container */}
            <NoteContainer>
                {noteStorage.length === 0 || loading ? (
                    <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
                        <NoData />
                        <h1 className="text-lg sm:text-xl md:text-2xl text-blue-900 font-medium">
                            Loading...
                        </h1>
                    </div>
                ) : (
                    noteStorage.map((note) => (
                        <NoteCard 
                            key={note._id} 
                            note={note.note} 
                            noteId={note._id} 
                        />
                    ))
                )}
            </NoteContainer>
        </div>
    )
}

export default Homepage
