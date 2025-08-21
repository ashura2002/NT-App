import { ArrowBigDownDashIcon, LucideLoaderCircle } from 'lucide-react'
import React from 'react'


const Button = ({ onClick, text, loading }) => {

    return (
        <div
            onClick={onClick}
            className='flex items-cente justify-center gap-5
            rounded-full p-2 cursor-pointer w-full bg-[#1C1C1C] transition ease-in-out duration-500
             hover:bg-gray-900'>
            {loading ? <LucideLoaderCircle className='text-white' /> : <ArrowBigDownDashIcon className='text-white' />}
            <button
                className='cursor-pointer text-white w-full flex justify-center'
            >{text}
            </button>
        </div>

    )
}

export default Button