import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ProductProvider } from './context/ProductContext'
import { CartProvider } from './context/CartContext'
import { ToastProvider } from './context/ToastContext'

import OneSignal from 'react-onesignal'
import { ONESIGNAL_APP_ID, DOMAIN_NAME } from './config/constants'

// Components
import Layout from './components/common/Layout'
import LoadingSpinner from './components/common/LoadingSpinner'

// Standard Lazy loading
const Home = React.lazy(() => import('./pages/Home'))
const Gallery = React.lazy(() => import('./pages/Gallery'))
const Customize = React.lazy(() => import('./pages/Customize'))
const ProductDetails = React.lazy(() => import('./pages/ProductDetails'))
const SearchResults = React.lazy(() => import('./pages/SearchResults'))
const NotFound = React.lazy(() => import('./pages/NotFound'))

// Component to handle navigation-based loading
const NavigationLoader = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show loading spinner on every location change
    setIsLoading(true);
    
    // Enforce a minimum 3-second duration
    const timer = setTimeout(() => {
      setIsLoading(false);
      window.scrollTo(0, 0); // Scroll to top on navigation
    }, 3000);

    return () => clearTimeout(timer);
  }, [location.pathname, location.search]); // Trigger on path or search change

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {children}
    </>
  );
};

const AppContent = () => {
  const oneSignalInitialized = React.useRef(false);

  useEffect(() => {
    // Only initialize OneSignal on the production domain (not localhost)
    const isProduction = window.location.hostname === DOMAIN_NAME;
    if (!isProduction || oneSignalInitialized.current) return;
    oneSignalInitialized.current = true;

    OneSignal.init({
      appId: ONESIGNAL_APP_ID,
      notifyButton: {
        enable: true,
      },
    }).then(() => {
      OneSignal.Slidedown.promptPush();
    }).catch(err => {
      console.error("OneSignal init error", err);
    });
  }, []);

  return (
    <Router>
      <NavigationLoader>
        <Layout>
          <React.Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/customize" element={<Customize />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </React.Suspense>
        </Layout>
      </NavigationLoader>
    </Router>
  );
};

const App = () => {
  return (
    <HelmetProvider>
      <ProductProvider>
        <ToastProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </ToastProvider>
      </ProductProvider>
    </HelmetProvider>
  )
}

export default App