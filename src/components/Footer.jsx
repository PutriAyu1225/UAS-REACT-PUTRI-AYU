import React from "react";
import { useDarkMode } from "../components/DarkModeContext"; 

const Footer = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <footer className={`${isDarkMode 
      ? "bg-gradient-to-r from-gray-900 via-slate-900 to-gray-900 text-gray-200 border-t border-gray-700" 
      : "bg-gradient-to-r from-gray-100 via-slate-100 to-gray-100 text-gray-800 border-t border-gray-300"} 
      py-12 mt-16 transition-colors duration-300`}>
      
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="md:col-span-2">
          <div className="flex items-center mb-4">
            <div className={`w-12 h-12 ${isDarkMode 
              ? "bg-gradient-to-r from-blue-500 to-purple-600" 
              : "bg-gradient-to-r from-blue-400 to-purple-500"} 
              rounded-xl flex items-center justify-center mr-3 shadow-lg`}>
              <span className="text-white font-bold text-xl">Z</span>
            </div>
            <h3 className={`text-2xl font-bold bg-gradient-to-r ${isDarkMode 
              ? "from-blue-400 to-purple-500" 
              : "from-blue-600 to-purple-700"} 
              bg-clip-text text-transparent`}>
              eZStay
            </h3>
          </div>
          <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} text-sm leading-relaxed max-w-md`}>
            eZStay adalah platform reservasi hotel yang memudahkan Anda
            menemukan dan memesan kamar dengan cepat dan mudah. Nikmati pengalaman
            reservasi yang tak terlupakan dengan layanan terbaik kami.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className={`px-3 py-1 ${isDarkMode 
              ? "bg-blue-500/10 text-blue-400 border-blue-500/20" 
              : "bg-blue-100 text-blue-600 border-blue-200"} 
              text-xs rounded-full border`}>
              Hotel Booking
            </span>
            <span className={`px-3 py-1 ${isDarkMode 
              ? "bg-purple-500/10 text-purple-400 border-purple-500/20" 
              : "bg-purple-100 text-purple-600 border-purple-200"} 
              text-xs rounded-full border`}>
              Easy Reservation
            </span>
            <span className={`px-3 py-1 ${isDarkMode 
              ? "bg-green-500/10 text-green-400 border-green-500/20" 
              : "bg-green-100 text-green-600 border-green-200"} 
              text-xs rounded-full border`}>
              24/7 Support
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Navigasi</h3>
          <ul className="space-y-3 text-sm">
            {['Beranda', 'Reservasi', 'Layanan', 'Kontak'].map((item, index) => (
              <li key={index}>
                <a href="#" className={`${isDarkMode 
                  ? "hover:text-white text-gray-400" 
                  : "hover:text-gray-900 text-gray-600"} 
                  transition-colors duration-200 flex items-center group`}>
                  <span className={`w-1 h-1 ${isDarkMode ? "bg-blue-500" : "bg-blue-400"} rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity`}></span>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Kontak Kami</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <div>
                <p className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>Email</p>
                <p className={`${isDarkMode 
                  ? "hover:text-white text-gray-400" 
                  : "hover:text-gray-900 text-gray-600"} 
                  transition-colors cursor-pointer`}>
                  support@ZStay.com
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <div>
                <p className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>Telepon</p>
                <p className={`${isDarkMode 
                  ? "hover:text-white text-gray-400" 
                  : "hover:text-gray-900 text-gray-600"} 
                  transition-colors cursor-pointer`}>
                  +62 812 3456 7890
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              <div>
                <p className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>Alamat</p>
                <p className={`${isDarkMode 
                  ? "hover:text-white text-gray-400" 
                  : "hover:text-gray-900 text-gray-600"} 
                  transition-colors`}>
                  Bandung, West Java
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className={`max-w-7xl mx-auto px-6 mt-8 pt-6 ${isDarkMode 
        ? "border-t border-gray-700/50" 
        : "border-t border-gray-300/50"}`}>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className={`text-center md:text-left text-sm ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
            © {new Date().getFullYear()} ZStay. Semua Hak Dilindungi.
          </div>
          <div className="flex space-x-6 mt-3 md:mt-0 text-xs">
            {['Kebijakan Privasi', 'Syarat & Ketentuan', 'FAQ'].map((item, index) => (
              <a 
                key={index}
                href="#" 
                className={`${isDarkMode 
                  ? "text-gray-500 hover:text-gray-300" 
                  : "text-gray-500 hover:text-gray-700"} 
                  transition-colors`}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;