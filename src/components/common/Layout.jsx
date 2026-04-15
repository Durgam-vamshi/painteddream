import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import MobileBottomNav from './MobileBottomNav';
import Footer from './Footer';
import CartModal from './CartModal';
import BackToTop from './BackToTop';

const Layout = ({ children }) => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname.startsWith('/login');

    return (
        <div className="flex flex-col min-h-screen">
            {!isAdminRoute && <Navbar />}
            {!isAdminRoute && <CartModal />}

            <main className="flex-grow pb-20 sm:pb-0">
                {children}
            </main>

            {!isAdminRoute && <Footer />}
            {!isAdminRoute && <MobileBottomNav />}
            {!isAdminRoute && <BackToTop />}
        </div>
    );
};

export default Layout;
