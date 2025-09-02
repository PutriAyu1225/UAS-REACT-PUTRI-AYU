import { Building } from "lucide-react";
import { useDarkMode } from "../components/DarkModeContext";

import { 
  LayoutDashboard, 
  BarChart3, 
  CreditCard, 
  Users, 
  Settings, 
  Info,
  LogOut,
  ChevronRight,
  Sun,
  Moon,
  Menu,
  X
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ isCollapsed: propIsCollapsed, setIsCollapsed: propSetIsCollapsed }) => {
  const [isCollapsed, setIsCollapsed] = useState(propIsCollapsed || false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarRef = useRef(null);
  const mobileToggleRef = useRef(null);

  // Sync with parent component if props provided
  useEffect(() => {
    if (propIsCollapsed !== undefined) {
      setIsCollapsed(propIsCollapsed);
    }
  }, [propIsCollapsed]);

  const handleCollapse = useCallback(() => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    if (propSetIsCollapsed) {
      propSetIsCollapsed(newCollapsed);
    }
  }, [isCollapsed, propSetIsCollapsed]);

  // Check if screen is mobile size
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        setIsCollapsed(false);
        setIsMobileOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const path = location.pathname;
    const menuId = path.replace('/', '') || 'dashboard';
    setActiveMenu(menuId);
  }, [location.pathname]);

  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      setIsMobileOpen(false);
    }
  }, []);

  const clearCookies = useCallback(() => {
    console.log("Cookies would be cleared via API call");
  }, []);

  const handleLogout = useCallback(() => {
    if (window.confirm("Apakah Anda yakin ingin logout?")) {
      try {
        const itemsToRemove = [
          'token', 'fullName', 'userEmail', 'userId', 
          'isLoggedIn', 'userRole', 'authToken'
        ];
        
        itemsToRemove.forEach(item => {
          localStorage.removeItem(item);
        });
        
        sessionStorage.clear();
        
        clearCookies();
        
        navigate('/login', { replace: true });
        
        setTimeout(() => {
          window.location.reload();
        }, 100);
        
      } catch (error) {
        console.error('Error during logout:', error);
        navigate('/login', { replace: true });
      }
    }
  }, [navigate, clearCookies]);

  const menuItems = [
    {
      id: "dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
      color: "text-blue-400",
      path: "/dashboard"
    },
    {
      id: "analytics",
      icon: BarChart3,
      label: "Analytics",
      color: "text-green-400",
      path: "/analytics"
    },
    {
      id: "payments",
      icon: CreditCard,
      label: "Payments",
      color: "text-yellow-400",
      path: "/payments"
    },
    {
      id: "users",
      icon: Users,
      label: "User Management",
      color: "text-purple-400",
      path: "/users"
    },
    {
      id: "settings",
      icon: Settings,
      label: "Settings",
      color: "text-gray-400",
      path: "/settings"
    },
    {
      id: "about",
      icon: Info,
      label: "About",
      color: "text-indigo-400",
      path: "/about"
    },
    {
      id: "HotelManagement",
      icon: Building,
      label: "Hotel Management",
      color: "text-indigo-400",
      path: "/HotelManagement"
    }
  ];

  const isActive = useCallback((id) => activeMenu === id, [activeMenu]);

  const handleMenuClick = useCallback((item) => {
    setActiveMenu(item.id);
    navigate(item.path);
    setIsMobileOpen(false);
  }, [navigate]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileOpen(prev => !prev);
  }, []);

  return (
    <>
      {/* Mobile Menu Toggle Button - Fixed position */}
      <button
        ref={mobileToggleRef}
        onClick={toggleMobileMenu}
        className={`
          fixed top-4 left-4 z-50 md:hidden px-4 py-2 rounded-lg flex items-center
          transition-all duration-200 shadow-lg border font-medium text-sm
          ${isMobileOpen 
            ? isDarkMode 
              ? 'bg-red-600 hover:bg-red-700 border-red-500 text-white' 
              : 'bg-red-500 hover:bg-red-600 border-red-400 text-white'
            : 'bg-blue-500 hover:bg-blue-600 border-blue-400 text-white'
          }
        `}
      >
        {isMobileOpen ? (
          <>
            <X className="w-4 h-4 mr-2" />
            <span>Tutup Menu</span>
          </>
        ) : (
          <>
            <Menu className="w-4 h-4 mr-2" />
            <span>Buka Menu</span>
          </>
        )}
      </button>

      {/* Mobile Overlay - sekarang menangani click events langsung */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={handleOverlayClick}
        />
      )}

      {/* Sidebar */}
      <div 
        ref={sidebarRef}
        className={`
          h-screen fixed top-0 left-0 flex flex-col transition-all duration-300 ease-in-out shadow-2xl border-r z-40
          ${isDarkMode ? 'bg-slate-900 text-white border-slate-700' : 'bg-white text-slate-800 border-slate-200'}
          ${isCollapsed ? 'w-20' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        
        {/* Header */}
        <div className="relative">
          <div className={`
            ${isCollapsed ? '' : 'px-6'} py-6 border-b
            ${isDarkMode ? 'border-slate-700/50 bg-slate-800/50' : 'border-slate-200/50 bg-white/50'}
          `}>
            {!isCollapsed ? (
              <div className="text-center">
                <h2 className="text-2xl font-bold">
                  <span className="bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">
                    𝙚𝙕
                  </span>
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                    𝙨𝙩𝙖𝙮
                  </span>
                </h2>
                <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>𝓜𝓪𝓷𝓪𝓰𝓮𝓶𝓮𝓷𝓽 𝓢𝔂𝓼𝓽𝓮𝓶</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Desktop Toggle Button - Hidden on mobile */}
          <button
            onClick={handleCollapse}
            className={`
              absolute -right-3 top-8 w-6 h-6 rounded-full items-center justify-center transition-colors border group
              hidden md:flex
              ${isDarkMode 
                ? 'bg-slate-700 hover:bg-slate-600 border-slate-600' 
                : 'bg-slate-200 hover:bg-slate-300 border-slate-300'
              }
            `}
          >
            <ChevronRight 
              className={`
                w-3 h-3 transition-transform ${isCollapsed ? '' : 'rotate-180'} 
                ${isDarkMode ? 'text-slate-300 group-hover:text-white' : 'text-slate-600 group-hover:text-slate-800'}
              `} 
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.id);
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleMenuClick(item)}
                    className={`
                      group relative flex items-center px-3 py-3 rounded-xl transition-all duration-200 w-full text-left
                      ${active 
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30 shadow-lg transform scale-105' 
                        : isDarkMode 
                          ? 'hover:bg-slate-700/50 text-slate-300 hover:text-white hover:transform hover:scale-102' 
                          : 'hover:bg-slate-100/80 text-slate-600 hover:text-slate-800 hover:transform hover:scale-102'
                      }
                    `}
                    title={isCollapsed ? item.label : ''}
                  >
                    <div className="relative">
                      <Icon 
                        className={`w-5 h-5 ${active ? item.color : isDarkMode ? 'text-slate-400 group-hover:text-slate-200' : 'text-slate-500 group-hover:text-slate-700'} transition-colors`} 
                      />
                      {active && (
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
                      )}
                    </div>
                    
                    {!isCollapsed && (
                      <>
                        <span className="ml-3 font-medium">{item.label}</span>
                        {active && (
                          <div className="absolute right-3">
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse"></div>
                          </div>
                        )}
                      </>
                    )}
                    
                    {/* Hover tooltip for collapsed state - Only on desktop */}
                    {isCollapsed && (
                      <div className={`
                        absolute left-full ml-2 px-3 py-1 text-sm rounded-lg opacity-0 group-hover:opacity-100 
                        transition-opacity pointer-events-none whitespace-nowrap border shadow-lg z-50
                        hidden md:block
                        ${isDarkMode 
                          ? 'bg-slate-800 text-white border-slate-600' 
                          : 'bg-white text-slate-800 border-slate-200'
                        }
                      `}>
                        {item.label}
                      </div>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Dark Mode Toggle */}
        <div className="px-3 py-2">
          <button
            onClick={toggleDarkMode}
            className={`
              group w-full flex items-center px-3 py-3 rounded-xl transition-all duration-200
              hover:transform hover:scale-105 border
              ${isCollapsed ? 'justify-center' : 'justify-start'}
              ${isDarkMode 
                ? 'bg-slate-800/50 hover:bg-slate-700/50 border-slate-600/50 text-slate-300 hover:text-white' 
                : 'bg-slate-100/50 hover:bg-slate-200/50 border-slate-200/50 text-slate-600 hover:text-slate-800'
              }
            `}
            title={isCollapsed ? (isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode') : ''}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            
            {!isCollapsed && (
              <span className="ml-3 font-medium">
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </span>
            )}
            
            {/* Hover tooltip for collapsed state - Only on desktop */}
            {isCollapsed && (
              <div className={`
                absolute left-full ml-2 px-3 py-1 text-sm rounded-lg opacity-0 group-hover:opacity-100 
                transition-opacity pointer-events-none whitespace-nowrap border shadow-lg z-50
                hidden md:block
                ${isDarkMode 
                  ? 'bg-slate-800 text-white border-slate-600' 
                  : 'bg-white text-slate-800 border-slate-200'
                }
              `}>
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </div>
            )}
          </button>
        </div>

        {/* User Info & Logout */}
        <div className={`
          mt-auto px-3 py-4 border-t flex-shrink-0
          ${isDarkMode ? 'border-slate-700/50 bg-slate-800/30' : 'border-slate-200/50 bg-white/30'}
        `}>
          {/* Logout Button */}
          <div className="relative mb-3">
            <button
              onClick={handleLogout}
              className={`
                group w-full flex items-center px-3 py-3 rounded-xl transition-all duration-200
                bg-gradient-to-r from-red-500/10 to-red-600/10 hover:from-red-500/20 hover:to-red-600/20
                border hover:transform hover:scale-105 shadow-sm
                ${isCollapsed ? 'justify-center' : 'justify-start'}
                ${isDarkMode 
                  ? 'border-red-500/30 hover:border-red-500/50 text-red-400 hover:text-red-300 hover:bg-red-500/10' 
                  : 'border-red-300/50 hover:border-red-400/50 text-red-500 hover:text-red-600 hover:bg-red-50'
                }
              `}
              title={isCollapsed ? 'Logout' : ''}
            >
              <LogOut className="w-5 h-5 transition-transform group-hover:scale-110 flex-shrink-0" />
              {!isCollapsed && <span className="ml-3 font-medium">Logout</span>}
            </button>
            
            {/* Hover tooltip for collapsed state - Only on desktop */}
            {isCollapsed && (
              <div className={`
                absolute left-full ml-2 px-3 py-1 text-sm rounded-lg opacity-0 group-hover:opacity-100 
                transition-opacity pointer-events-none whitespace-nowrap border shadow-lg z-50 top-1/2 transform -translate-y-1/2
                hidden md:block
                ${isDarkMode 
                  ? 'bg-slate-800 text-white border-slate-600' 
                  : 'bg-white text-slate-800 border-slate-200'
                }
              `}>
                Logout
              </div>
            )}
          </div>
          
          {/* User Info */}
          {!isCollapsed && (
            <div className="px-3 pt-3 border-t border-slate-200/50 dark:border-slate-700/50">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold text-sm">PA</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-slate-800'} truncate`}>
                    Putri Ayu
                  </p>
                  <p className={`text-xs truncate ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Administrator</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;