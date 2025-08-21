import { Edit, Trash2Icon } from 'lucide-react'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import themeContext from '../context/ThemeContext'

const NoteCard = ({ note, noteId }) => {
    const navigate = useNavigate()
    const { theme } = useContext(themeContext)

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeIn', delay: 0.2 }}
            className={`flex flex-col gap-5 
                ${theme === 'dark' ? 'text-gray-50 border border-slate-600' : 'text-slate-800 border border-gray-300 bg-slate-300'} 
              hover:shadow-xl hover:scale-105 p-5 rounded-md 
             transition-transform duration-300 ease-in-out min-w-[250px]`}
        >
            <h1>{note}</h1>

            <div className="flex justify-end gap-2">
                <Trash2Icon
                    className="text-gray-500 cursor-pointer size-5 hover:text-red-600 transition-colors duration-200"
                    onClick={() => navigate(`/notes/${noteId}/delete`, { state: { note } })}
                />
                <Edit
                    className="text-gray-500 cursor-pointer size-5 hover:text-green-600 transition-colors duration-200"
                    onClick={() => navigate(`/notes/${noteId}/edit`, { state: { note } })}
                />
            </div>
        </motion.div>

    )
}

export default NoteCard