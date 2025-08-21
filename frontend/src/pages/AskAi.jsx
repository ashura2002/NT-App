import { ArrowBigUp } from 'lucide-react'
import React, { useContext, useState } from 'react'
import AxiosInstance from '../utils/AxiosInstance'
import { motion } from 'framer-motion'
import themeContext from '../context/ThemeContext'

const AskAi = () => {
  const [questions, setQuestions] = useState('')
  const [messages, setMessages] = useState([]) //  history sa conversation
  const [isDisable, setIsDisable] = useState(false)
  const { theme } = useContext(themeContext)

  const handleAsk = async (e) => {
    e.preventDefault()

    if (!questions.trim()) return
    setIsDisable(true)

    // Add user message to conversation gikan sa inputvalue - user
    const newMessage = { sender: 'user', text: questions }
    setMessages((prev) => [...prev, newMessage])

    try {
      const res = await AxiosInstance.post(`/api/ask-ai`, { questions })
      // AI response
      const aiMessage = { sender: 'ai', text: res.data.answer }
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error(error)
      const errorMessage = { sender: 'ai', text: "⚠️ Something went wrong." }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsDisable(false)
    }

    setQuestions("")
  }

  return (
    <div className="h-screen flex flex-col px-3 sm:px-6 lg:px-10">
      {/* Header */}
      <div className="p-4 text-lg sm:text-xl lg:text-2xl font-bold text-center">
        Ask AI Powered by Gemini
      </div>

      {/* Chat window */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeIn', delay: 0.2 }}
        className={`flex-1 overflow-y-auto
            ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-300'}
          p-3 sm:p-4 space-y-3  rounded-lg`}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
          >
            <div
              className={`px-3 sm:px-4 py-2 rounded-2xl max-w-[85%] sm:max-w-[70%] shadow 
                ${msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
                }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Input box */}
      <form
        onSubmit={handleAsk}
        className="p-2 sm:p-3 flex items-center gap-2 sm:gap-3"
      >
        <input
          type="text"
          placeholder="Enter a message..."
          className="flex-1 border border-gray-400 rounded-full px-3 sm:px-4 py-2 text-sm sm:text-base outline-none"
          value={questions}
          onChange={(e) => setQuestions(e.target.value)}
        />
        <button
          disabled={isDisable}
          type="submit"
          className="p-2 sm:p-3 bg-blue-600 rounded-full hover:bg-blue-700 transition"
        >
          <ArrowBigUp className="text-white w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </form>
    </div>
  )
}

export default AskAi
