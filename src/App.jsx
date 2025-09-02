import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import PaymentManagement from "./pages/PaymentManagement";
import Settings from "./pages/Settings"; 
import UserManagement from "./pages/UserManagement";
import Sidebar from "./components/Sidebar";
import About from './pages/About';
import Footer from './components/Footer';
import HotelManagement from './pages/HotelManagement';
import { DarkModeProvider } from "./components/DarkModeContext";
import { useState, useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token'); 
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  const handleLogin = (userData) => {
    localStorage.setItem("token", userData.token);
    localStorage.setItem("fullName", userData.fullName);
    window.location.href = "/dashboard";
  };

  const isAuthenticated = localStorage.getItem("token");

  // Effect untuk mendeteksi perubahan ukuran layar
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Pada desktop, sidebar selalu terbuka
      if (!mobile) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Panggil sekali saat mount

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <DarkModeProvider>
      <Router>
        <div className="flex min-h-screen">
          {/* Sidebar hanya kalau login */}
          {isAuthenticated && (
            <>
              {/* Overlay untuk mobile saat sidebar terbuka */}
              {sidebarOpen && isMobile && (
                <div 
                  className="fixed inset-0 bg-black bg-opacity-50 z-20"
                  onClick={() => setSidebarOpen(false)}
                />
              )}
              
              <Sidebar 
                isOpen={sidebarOpen} 
                isMobile={isMobile}
                toggleSidebar={toggleSidebar} 
              />
            </>
          )}

          {/* Konten utama */}
          <div className={`flex-1 flex flex-col transition-all duration-300 ${
            isAuthenticated && !isMobile && sidebarOpen ? "md:ml-64" : "ml-0"
          }`}>
            {/* Header dengan tombol toggle untuk mobile */}
            {isAuthenticated && isMobile && (
              <div className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md z-10 p-4">
                <button 
                  onClick={toggleSidebar}
                  className="text-gray-600 dark:text-gray-300 focus:outline-none"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            )}

            {/* Routing */}
            <main className={`flex-1 p-6 ${isAuthenticated ? "pt-20 md:pt-24" : ""}`}> 
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />

                <Route 
                  path="/login" 
                  element={
                    <PublicRoute>
                      <LoginForm onLogin={handleLogin} />
                    </PublicRoute>
                  } 
                />
                {/* <Route 
                  path="/register" 
                  element={
                    <PublicRoute>
                      <RegisterForm />
                    </PublicRoute>
                  } 
                /> */}

                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
                <Route path="/payments" element={<ProtectedRoute><PaymentManagement /></ProtectedRoute>} />
                <Route path="/users" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
                <Route path="/Hotelmanagement" element={<ProtectedRoute><HotelManagement /></ProtectedRoute>} />

                {/* Redirect semua route yang gak dikenal */}
                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>
            </main>

            {/* Footer */}
            {isAuthenticated && <Footer />}
          </div>
        </div>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
