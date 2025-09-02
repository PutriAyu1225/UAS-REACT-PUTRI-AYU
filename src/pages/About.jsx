/* eslint-disable no-unused-vars */
import { useDarkMode } from "../components/DarkModeContext";
import { 
  Calendar,
  Users,
  Settings,
  BarChart3,
  Code,
  Palette,
  Database,
  Shield,
  Globe,
  Heart,
  Award,
  Zap,
  CheckCircle,
  Github,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ImageIcon
} from 'lucide-react';
import { useEffect, useState } from 'react';

const hotelPlaceholders = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=300&fit=crop",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&h=300&fit=crop",
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=500&h=300&fit=crop",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=500&h=300&fit=crop"
];

const About = () => {
  const { isDarkMode } = useDarkMode();
  const [isMobile, setIsMobile] = useState(false);
  
  // Effect untuk mendeteksi ukuran layar
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  const features = [
    {
      icon: Calendar,
      title: 'Manajemen Reservasi',
      description: 'Sistem reservasi real-time dengan konfirmasi otomatis dan tracking status'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Dashboard analytics yang komprehensif dengan visualisasi data yang menarik'
    },
    {
      icon: Users,
      title: 'User Management',
      description: 'Manajemen user multi-level dengan sistem role dan permission yang fleksibel'
    },
    {
      icon: Shield,
      title: 'Payment Integration',
      description: 'Integrasi dengan multiple payment gateway untuk kemudahan transaksi'
    },
    {
      icon: Settings,
      title: 'Sistem Konfigurasi',
      description: 'Pengaturan sistem yang dapat disesuaikan dengan kebutuhan bisnis'
    },
    {
      icon: Globe,
      title: 'Multi-platform',
      description: 'Responsive design yang bekerja optimal di desktop, tablet, dan mobile'
    }
  ];

  const techStack = [
    { name: 'React 18', description: 'Modern JavaScript library dengan Hooks', color: 'text-blue-600 dark:text-blue-400' },
    { name: 'TailwindCSS', description: 'Utility-first CSS framework', color: 'text-teal-600 dark:text-teal-400' },
    { name: 'Lucide React', description: 'Beautiful & consistent icons', color: 'text-orange-600 dark:text-orange-400' },
    { name: 'JavaScript ES6+', description: 'Modern JavaScript features', color: 'text-yellow-600 dark:text-yellow-400' },
    { name: 'Component Architecture', description: 'Modular & reusable components', color: 'text-purple-600 dark:text-purple-400' },
    { name: 'Responsive Design', description: 'Mobile-first approach', color: 'text-green-600 dark:text-green-400' }
  ];

  const teamMembers = [
    {
      role: 'Full Stack Developer',
      responsibilities: ['Backend API Development', 'Database Design', 'Server Architecture'],
      icon: Code,
      color: 'from-blue-500 to-blue-600'
    },
    {
      role: 'Frontend Developer',
      responsibilities: ['UI/UX Implementation', 'Component Development', 'State Management'],
      icon: Palette,
      color: 'from-green-500 to-green-600'
    },
    {
      role: 'System Analyst',
      responsibilities: ['Business Logic', 'System Requirements', 'Quality Assurance'],
      icon: Database,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const systemStats = [
    { label: 'Version', value: '2.1.0', icon: Award },
    { label: 'Release Date', value: 'August 2024', icon: Calendar },
    { label: 'Components', value: '25+', icon: Code },
    { label: 'Uptime', value: '99.9%', icon: Zap }
  ];

  const supportChannels = [
    {
      title: 'Documentation',
      description: 'Comprehensive guides and API documentation',
      icon: ExternalLink,
      link: 'https://docs.reservasipro.com',
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      title: 'GitHub Repository',
      description: 'Source code, issues, and feature requests',
      icon: Github,
      link: 'https://github.com/reservasipro',
      color: 'text-gray-800 dark:text-gray-200'
    },
    {
      title: 'Email Support',
      description: 'Technical support and inquiries',
      icon: Mail,
      link: 'mailto:support@reservasipro.com',
      color: 'text-red-600 dark:text-red-400'
    },
    {
      title: 'Phone Support',
      description: '24/7 customer support hotline',
      icon: Phone,
      link: 'tel:+62-21-1234567',
      color: 'text-green-600 dark:text-green-400'
    }
  ];

  const hotelImages = [
    { src: hotelPlaceholders[0], alt: "Lobby Hotel Mewah", direction: "left" },
    { src: hotelPlaceholders[1], alt: "Kamar Hotel Nyaman", direction: "right" },
    { src: hotelPlaceholders[2], alt: "Fasilitas Kolam Renang", direction: "left" },
    { src: hotelPlaceholders[3], alt: "Restoran Hotel", direction: "right" }
  ];

  // Base classes for consistent dark mode styling
  const cardClass = isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900";
  const textClass = isDarkMode ? "text-gray-200" : "text-gray-600";
  const bgClass = isDarkMode ? "bg-gray-900" : "bg-gray-50";

  return (
    <div className={`space-y-8 ${bgClass} min-h-screen p-4 md:p-6 lg:p-8`}>
      {/* Header Section dengan Carousel */}
      <div className="relative rounded-2xl overflow-hidden shadow-xl h-60 md:h-80">
        <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center text-center text-white p-4 md:p-8 z-10">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4">Admin Sistem Reservasi</h1>
            <p className="text-base md:text-lg lg:text-xl mb-2">Solusi lengkap untuk manajemen reservasi modern</p>
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-xs md:text-sm">
              <span className="flex items-center">
                <Award className="w-3 h-3 md:w-4 md:h-4 mr-1" />
              </span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center">
                <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                Production Ready
              </span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center">
                <Heart className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                Made with Love
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 h-full">
          <img 
            src={hotelPlaceholders[0]} 
            alt="Hotel" 
            className="w-full h-full object-cover animate-slide-in-left" 
          />
          <img 
            src={hotelPlaceholders[1]} 
            alt="Hotel 1" 
            className="w-full h-full object-cover animate-slide-in-right" 
          />
          <img 
            src={hotelPlaceholders[2]} 
            alt="Hotel 2" 
            className="w-full h-full object-cover animate-slide-in-left" 
          />
          <img 
            src={hotelPlaceholders[3]} 
            alt="Hotel 3" 
            className="w-full h-full object-cover animate-slide-in-right" 
          />
        </div>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {systemStats.map((stat, index) => (
          <div key={index} className={`${cardClass} rounded-xl shadow-lg p-4 md:p-6 text-center animate-fade-in-up`} style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="flex justify-center mb-2 md:mb-3">
              <div className={`${isDarkMode ? 'bg-blue-900' : 'bg-gradient-to-r from-blue-100 to-purple-100'} p-2 md:p-3 rounded-full`}>
                <stat.icon className={`w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`} />
              </div>
            </div>
            <div className="text-lg md:text-xl lg:text-2xl font-bold mb-1">{stat.value}</div>
            <div className={`text-xs md:text-sm ${textClass}`}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Gallery Section */}
      <div className={`${cardClass} rounded-2xl shadow-xl p-4 md:p-6 lg:p-8`}>
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 lg:mb-8 text-center flex items-center justify-center">
          <ImageIcon className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 mr-2 md:mr-3 text-blue-600 dark:text-blue-400" />
          Fasilitas Hotel
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {hotelImages.map((image, index) => (
            <div 
              key={index} 
              className={`group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 animate-zoom-in ${
                image.direction === 'left' ? 'animate-slide-in-left' : 'animate-slide-in-right'
              } ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="h-36 md:h-40 lg:h-48 overflow-hidden">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
              <div className={`p-3 md:p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-xs md:text-sm text-center ${textClass}`}>{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Overview */}
      <div className={`${cardClass} rounded-2xl shadow-xl p-4 md:p-6 lg:p-8`}>
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 lg:mb-8 text-center">Fitur Utama</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`p-4 md:p-6 rounded-xl hover:${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} transition-colors group animate-fade-in-up ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center mb-3 md:mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 md:p-3 rounded-lg mr-3 md:mr-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-semibold">{feature.title}</h3>
              </div>
              <p className={`${textClass} text-xs md:text-sm leading-relaxed`}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className={`${cardClass} rounded-2xl shadow-xl p-4 md:p-6 lg:p-8`}>
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center">
            <Code className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 mr-2 md:mr-3 text-blue-600 dark:text-blue-400" />
            Technology Stack
          </h2>
          <div className="space-y-3 md:space-y-4">
            {techStack.map((tech, index) => (
              <div 
                key={index} 
                className={`flex items-start p-3 md:p-4 rounded-lg hover:${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} transition-colors animate-fade-in-right ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mt-2 mr-3 md:mr-4"></div>
                <div>
                  <h4 className={`font-semibold ${tech.color} text-base md:text-lg`}>{tech.name}</h4>
                  <p className={`${textClass} text-xs md:text-sm`}>{tech.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Information */}
        <div className={`${cardClass} rounded-2xl shadow-xl p-4 md:p-6 lg:p-8`}>
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center">
            <Users className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 mr-2 md:mr-3 text-purple-600 dark:text-purple-400" />
            Development Team
          </h2>
          <div className="space-y-4 md:space-y-6">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className={`p-3 md:p-4 rounded-lg animate-fade-in-left ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center mb-2 md:mb-3">
                  <div className={`bg-gradient-to-r ${member.color} p-2 md:p-3 rounded-lg mr-3 md:mr-4`}>
                    <member.icon className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold">{member.role}</h3>
                </div>
                <ul className={`${textClass} space-y-1 text-xs md:text-sm`}>
                  {member.responsibilities.map((responsibility, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                      {responsibility}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Architecture & Performance */}
      <div className={`${cardClass} rounded-2xl shadow-xl p-4 md:p-6 lg:p-8`}>
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">Architecture & Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className={`text-center p-4 md:p-6 rounded-xl animate-fade-in-up ${isDarkMode ? 'bg-blue-900/30' : 'bg-gradient-to-br from-blue-50 to-blue-100'}`} style={{ animationDelay: '0s' }}>
            <div className="bg-blue-500 w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <Database className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" />
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-2">Scalable Architecture</h3>
            <p className={`${textClass} text-xs md:text-sm`}>
              Modular component-based architecture yang mudah dikembangkan dan di-maintain
            </p>
          </div>
          
          <div className={`text-center p-4 md:p-6 rounded-xl animate-fade-in-up ${isDarkMode ? 'bg-green-900/30' : 'bg-gradient-to-br from-green-50 to-green-100'}`} style={{ animationDelay: '0.1s' }}>
            <div className="bg-green-500 w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <Zap className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" />
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-2">High Performance</h3>
            <p className={`${textClass} text-xs md:text-sm`}>
              Optimized untuk performa tinggi dengan loading time yang cepat dan responsive
            </p>
          </div>
          
          <div className={`text-center p-4 md:p-6 rounded-xl animate-fade-in-up ${isDarkMode ? 'bg-purple-900/30' : 'bg-gradient-to-br from-purple-50 to-purple-100'}`} style={{ animationDelay: '0.2s' }}>
            <div className="bg-purple-500 w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <Shield className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" />
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-2">Enterprise Security</h3>
            <p className={`${textClass} text-xs md:text-sm`}>
              Built-in security features dengan authentication dan authorization yang robust
            </p>
          </div>
        </div>
      </div>

      {/* System Requirements */}
      <div className={`${cardClass} rounded-2xl shadow-xl p-4 md:p-6 lg:p-8`}>
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">System Requirements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="animate-fade-in-left">
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 flex items-center">
              <Globe className="w-4 h-4 md:w-5 md:h-5 mr-2 text-blue-600 dark:text-blue-400" />
              Browser Compatibility
            </h3>
            <div className="space-y-2 md:space-y-3">
              {[
                'Chrome 90+ (Recommended)',
                'Firefox 88+',
                'Safari 14+',
                'Edge 90+',
                'Mobile browsers (iOS Safari, Chrome Mobile)'
              ].map((browser, index) => (
                <div key={index} className={`flex items-center ${textClass} text-xs md:text-sm`}>
                  <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-500 mr-2 md:mr-3" />
                  {browser}
                </div>
              ))}
            </div>
          </div>
          
          <div className="animate-fade-in-right">
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 flex items-center">
              <Settings className="w-4 h-4 md:w-5 md:h-5 mr-2 text-purple-600 dark:text-purple-400" />
              Technical Specifications
            </h3>
            <div className={`space-y-2 md:space-y-3 ${textClass} text-xs md:text-sm`}>
              <div className="flex justify-between">
                <span>JavaScript:</span>
                <span className="font-medium">ES6+ Required</span>
              </div>
              <div className="flex justify-between">
                <span>Resolution:</span>
                <span className="font-medium">1024x768 minimum</span>
              </div>
              <div className="flex justify-between">
                <span>Internet:</span>
                <span className="font-medium">Stable connection</span>
              </div>
              <div className="flex justify-between">
                <span>Local Storage:</span>
                <span className="font-medium">5MB minimum</span>
              </div>
              <div className="flex justify-between">
                <span>RAM:</span>
                <span className="font-medium">2GB recommended</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Support & Contact */}
      <div className={`${cardClass} rounded-2xl shadow-xl p-4 md:p-6 lg:p-8`}>
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">Support & Contact</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {supportChannels.map((channel, index) => (
            <div 
              key={index} 
              className={`p-4 md:p-6 rounded-xl hover:${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} transition-colors group animate-zoom-in ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-center mb-3 md:mb-4">
                <div className={`${channel.color} group-hover:scale-110 transition-transform`}>
                  <channel.icon className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
                </div>
              </div>
              <h3 className="text-base md:text-lg font-semibold mb-2 text-center">{channel.title}</h3>
              <p className={`${textClass} text-xs md:text-sm text-center mb-3 md:mb-4`}>{channel.description}</p>
              <div className="text-center">
                <a 
                  href={channel.link}
                  className={`${channel.color} hover:underline font-medium text-xs md:text-sm`}
                >
                  Contact Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Company Information */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-4 md:p-6 lg:p-8 text-white">
        <div className="text-center mb-6 md:mb-8 animate-fade-in-up">
          <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">EzStay</h2>
          <p className="text-blue-100 text-base md:text-lg">
            Empowering businesses with modern reservation management solutions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-center">
          <div className="bg-white bg-opacity-10 rounded-xl p-4 md:p-6 animate-fade-in-left">
            <MapPin className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 mx-auto mb-2 md:mb-3 text-blue-400" />
            <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">Head Office</h3>
            <p className="text-blue-800 text-xs md:text-sm">
              Jakarta, Indonesia<br />
              Jl. Teknologi No. 123
            </p> 
          </div>
          
          <div className="bg-white bg-opacity-10 rounded-xl p-4 md:p-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <Mail className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 mx-auto mb-2 md:mb-3 text-blue-400" />
            <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">Email</h3>
            <p className="text-blue-800 text-xs md:text-sm">
              info@reservasipro.com<br />
              support@reservasipro.com
            </p>
          </div>
          
          <div className="bg-white bg-opacity-10 rounded-xl p-4 md:p-6 animate-fade-in-right">
            <Phone className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 mx-auto mb-2 md:mb-3 text-blue-400" />
            <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">Phone</h3>
            <p className="text-blue-800 text-xs md:text-sm">
              +62-21-1234567<br />
              +62-812-3456789
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={`${cardClass} rounded-2xl shadow-xl p-4 md:p-6 lg:p-8 text-center animate-fade-in-up`}>
        <div className="border-t pt-4 md:pt-6">
          <p className={`${textClass} mb-3 md:mb-4 text-xs md:text-sm`}>
            Sistem ini dikembangkan untuk memberikan solusi terbaik dalam pengelolaan reservasi 
            dengan mengutamakan user experience, performance, dan reliability.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-500 dark:text-gray-400">
            <span>© 2024 ReservasiPro</span>
            <span className="hidden md:inline">•</span>
            <span>All rights reserved</span>
            <span className="hidden md:inline">•</span>
            <span className="flex items-center">
              Made with <Heart className="w-3 h-3 md:w-4 md:h-4 mx-1 text-red-500" /> in Indonesia
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 md:gap-6 mt-4 md:mt-6">
            <button className={`${isDarkMode ? 'bg-blue-900/50 text-blue-200 hover:bg-blue-900' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'} px-3 py-1 md:px-4 md:py-2 rounded-lg transition-colors text-xs md:text-sm`}>
              Documentation
            </button>
            <button className={`${isDarkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} px-3 py-1 md:px-4 md:py-2 rounded-lg transition-colors text-xs md:text-sm`}>
              API Reference
            </button>
            <button className={`${isDarkMode ? 'bg-green-900/50 text-green-200 hover:bg-green-900' : 'bg-green-100 text-green-700 hover:bg-green-200'} px-3 py-1 md:px-4 md:py-2 rounded-lg transition-colors text-xs md:text-sm`}>
              Support Center
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;