import { NotepadTextIcon } from 'lucide-react'
import React, { useContext, useState } from 'react'
import Button from '../components/Button'
import axiosInstance from '../utils/AxiosInstance'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import themeContext from '../context/ThemeContext'

const AddNote = () => {
  const [loading, setLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const { theme } = useContext(themeContext)

  const addYourNote = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axiosInstance.post('/api/notes', {
        note: inputValue,
      })
      toast.success(res.data.message)
      setInputValue('')
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeIn', delay: 0.2 }}
      className="min-h-screen flex items-center justify-center px-4"
    >
      <form
        onSubmit={addYourNote}
        className={`rounded-xl w-full max-w-lg p-6 sm:p-8 grid gap-6 place-items-center
          ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-300 text-slate-800'} shadow-md
        hover:scale-[1.02] hover:shadow-lg transition ease-in-out duration-300`}
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center">
          List down what you think!😉
        </h1>

        <div className="grid gap-3 w-full">
          <span className="font-medium text-sm sm:text-base">Note</span>
          <div className={`rounded-full ${theme === 'dark' ? 'border border-gray-200' : 'border border-slate-600'} 
          flex items-center gap-3 sm:gap-4 p-2 sm:p-3`}>
            <NotepadTextIcon className="text-gray-600" />
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              type="text"
              className={`w-full ${theme === 'dark' ? 'text-gray-50' : 'text-slate-800'}
                 border-0 outline-0 text-sm sm:text-base`}
              placeholder="Write your note here..."
            />
          </div>
        </div>

        <Button
          loading={loading}
          text={loading ? 'Creating note...' : 'Create note'}
        />
      </form>
    </motion.div>
  )
}

export default AddNote
