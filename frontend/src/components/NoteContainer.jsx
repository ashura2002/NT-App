import React from 'react'

const NoteContainer = ({ children }) => {
    return (
        <div className='w-full flex flex-wrap items-center justify-center gap-5 ] p-5'>
            {children}
        </div>
    )
}

export default NoteContainer