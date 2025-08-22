import { KeyRoundIcon, User2Icon } from 'lucide-react'
import React from 'react'

const Form = ({ userName, setUserName, password, setPassword, loading, onSubmit }) => {
    return (
        <form 
            className="flex flex-col w-full max-w-md gap-3 px-4 sm:px-0" 
            onSubmit={onSubmit}
        >
            {/* Username */}
            <div className="border border-gray-300 w-full flex items-center rounded-full px-2">
                <User2Icon className="text-gray-500" />
                <input 
                    type="text"
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                    className="outline-0 w-full p-2 text-sm sm:text-base"
                    placeholder="Username"
                    required
                />
            </div>

            {/* Password */}
            <div className="border border-gray-300 w-full flex items-center rounded-full px-2">
                <KeyRoundIcon className="text-gray-500" />
                <input 
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="outline-0 w-full p-2 text-sm sm:text-base"
                    placeholder="Password"
                    required
                />
            </div>

            {/* Submit Button */}
            <button
                className="rounded-full py-2 sm:py-2.5 cursor-pointer bg-[#0F0F1A] hover:bg-[#F5F5F7]
                 hover:text-[#0F0F1A] text-[#F5F5F7] transition ease-in-out duration-300 text-sm sm:text-base"
            >
                {loading ? 'Logging in...' : 'Login'}
            </button>
        </form>
    )
}

export default Form
