import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-dark text-light text-center py-3 mt-5 fixed-bottom">
            <p>&copy; {new Date().getFullYear()} Vega Food Delivery. All rights reserved.</p>
        </footer>
    );
}

export default Footer