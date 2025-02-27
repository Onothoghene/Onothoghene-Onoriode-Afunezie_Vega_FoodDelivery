import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <>
            <Navbar />
            <div className="mt-2 mb-5 pb-5">
                <main className="container-xxl- pt-3">
                    <Outlet />
                </main>
            </div>
            <Footer />
        </>
    )
}

export default Layout