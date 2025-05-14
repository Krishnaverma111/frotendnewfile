import React from 'react';
import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import {
  Navbar, Home, About, Contact, Featured, Service, SignUp, Login, AdminHome,
  OtpVerification, ForgotPassword, PageNotFound, Footer, UserProfile, Setting
} from './AllComponets';
import { AuthProvider, useAuth } from './Components/context/AuthConetxt'; // adjust the path as needed

const AppRoutes = () => {
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  const HideFooterRoutes = [
    '/login', '/signup', '/otpverification', '/userprofile',
    '/setting', '/adminhome'
  ];

  const shouldHideFooter = HideFooterRoutes.some(route =>
    location.pathname.toLowerCase().startsWith(route)
  );

  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/featured' element={<Featured />} />
        <Route path='/service' element={<Service />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/otpverification/:type/:userId' element={<OtpVerification />} />

        {/* Protected Routes */}
        <Route path='/userprofile' element={isLoggedIn ? <UserProfile /> : <Navigate to="/login" />} />
        <Route path='/setting' element={isLoggedIn ? <Setting /> : <Navigate to="/login" />} />
        <Route path='/adminhome' element={isLoggedIn ? <AdminHome /> : <Navigate to="/login" />} />

        {/* Catch-all */}
        <Route path='/*' element={<PageNotFound />} />
      </Routes>
      {!shouldHideFooter && <Footer />}
    </>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
