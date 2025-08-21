import React from 'react'

const MainLayout = ({ children }) => {
    return (
        <main className='h-screen flex flex-col overflow-y-auto w-full'>
            {children}
        </main>
    )
}

export default MainLayout