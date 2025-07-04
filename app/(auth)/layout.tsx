import React from 'react'

const Layout = ({children} : {children: React.ReactNode}) => {
    return (
        <div className="bg-amber-100">
            <h1>AuthPage</h1>
            {children}
        </div>
    )
}
export default Layout
