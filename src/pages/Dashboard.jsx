import React, { useState, useEffect } from 'react';
import { useDarkMode } from "../components/DarkModeContext";
import { 
  DollarSign,
  TrendingUp,
  CheckCircle,
  XCircle,
  BarChart3,
  Target,
  Eye,
  Download,
  RefreshCw,
  AlertTriangle,
  TrendingDown,
  Calculator,
  ShoppingBag,
  UserCheck,
  Clock3,
  Wifi,
  Database,
  Shield,
  Users,
  MapPin,
  Monitor,
  Smartphone,
  Globe,
  Activity,
  Star,
  Heart,
  Share2,
  Zap
} from 'lucide-react';

const Dashboard = () => {
  const { isDarkMode } = useDarkMode();
  const [time, setTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('monthly');
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredBar, setHoveredBar] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const clockTimer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Check if mobile device
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => {
      clearTimeout(timer);
      clearInterval(clockTimer);
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const darkModeClasses = {
    bg: isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100',
    cardBg: isDarkMode ? 'bg-gray-800' : 'bg-white',
    text: isDarkMode ? 'text-gray-100' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    border: isDarkMode ? 'border-gray-700' : 'border-gray-200',
    hover: isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50',
    inputBg: isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900',
    chartBg: isDarkMode ? 'bg-gray-800' : 'bg-white'
  };

  const stats = [
    { 
      title: 'Total Revenue', 
      value: 'Rp 127.8Jt', 
      change: '+24.7%', 
      icon: DollarSign, 
      color: 'from-emerald-500 to-emerald-600',
      trend: 'up',
      description: 'vs bulan lalu',
      sparkline: [45, 52, 48, 61, 55, 67, 78, 85, 79, 88, 92, 96],
      details: 'Rp 4.26Jt/hari rata-rata'
    },
    { 
      title: 'Active Users', 
      value: '15,847', 
      change: '+31.5%', 
      icon: Users, 
      color: 'from-blue-500 to-blue-600',
      trend: 'up',
      description: 'vs bulan lalu',
      sparkline: [65, 72, 68, 78, 82, 89, 94, 87, 91, 96, 89, 103],
      details: '2,847 pengguna baru'
    },
    { 
      title: 'Conversion Rate', 
      value: '8.47%', 
      change: '+2.3%', 
      icon: Target, 
      color: 'from-purple-500 to-purple-600',
      trend: 'up',
      description: 'vs bulan lalu',
      sparkline: [6.2, 6.8, 7.1, 7.5, 7.9, 8.2, 8.0, 8.3, 8.5, 8.1, 8.4, 8.47],
      details: 'Target: 9.0%'
    },
    { 
      title: 'Customer Satisfaction', 
      value: '97.8%', 
      change: '+4.1%', 
      icon: Star, 
      color: 'from-amber-500 to-amber-600',
      trend: 'up',
      description: 'vs bulan lalu',
      sparkline: [92, 93, 95, 94, 96, 97, 95, 96, 98, 97, 98, 97.8],
      details: '4.9/5.0 rating rata-rata'
    }
  ];

  const advancedMetrics = [
    {
      category: 'Financial Performance',
      metrics: [
        { name: 'Gross Revenue', value: 'Rp 127.8Jt', change: '+24.7%', trend: 'up' },
        { name: 'Net Profit', value: 'Rp 38.3Jt', change: '+18.2%', trend: 'up' },
        { name: 'Profit Margin', value: '29.97%', change: '+1.8%', trend: 'up' },
        { name: 'ROI', value: '186%', change: '+12%', trend: 'up' }
      ]
    },
    {
      category: 'User Engagement',
      metrics: [
        { name: 'Daily Active Users', value: '12,847', change: '+15.3%', trend: 'up' },
        { name: 'Session Duration', value: '8m 42s', change: '+22%', trend: 'up' },
        { name: 'Pages per Session', value: '4.7', change: '+8%', trend: 'up' },
        { name: 'Bounce Rate', value: '23.4%', change: '-5.2%', trend: 'up' }
      ]
    },
    {
      category: 'Operational Excellence',
      metrics: [
        { name: 'Server Uptime', value: '99.97%', change: '+0.15%', trend: 'up' },
        { name: 'Avg Response Time', value: '1.2s', change: '-18%', trend: 'up' },
        { name: 'Error Rate', value: '0.03%', change: '-67%', trend: 'up' },
        { name: 'Security Score', value: '98.5%', change: '+2.1%', trend: 'up' }
      ]
    }
  ];

  // Geographic Distribution
  const geographicData = [
    { region: 'Jakarta', percentage: 32.5, users: 5147, revenue: 'Rp 41.5Jt', color: 'bg-blue-500' },
    { region: 'Surabaya', percentage: 18.7, users: 2963, revenue: 'Rp 23.9Jt', color: 'bg-green-500' },
    { region: 'Bandung', percentage: 15.2, users: 2409, revenue: 'Rp 19.4Jt', color: 'bg-purple-500' },
    { region: 'Medan', percentage: 11.8, users: 1870, revenue: 'Rp 15.1Jt', color: 'bg-orange-500' },
    { region: 'Makassar', percentage: 8.3, users: 1315, revenue: 'Rp 10.6Jt', color: 'bg-pink-500' },
    { region: 'Lainnya', percentage: 13.5, users: 2143, revenue: 'Rp 17.3Jt', color: 'bg-gray-500' }
  ];

  // Device & Platform Analytics
  const deviceData = [
    { device: 'Mobile', percentage: 68.2, sessions: 10813, color: 'from-blue-500 to-blue-600', icon: Smartphone },
    { device: 'Desktop', percentage: 27.5, sessions: 4358, color: 'from-green-500 to-green-600', icon: Monitor },
    { device: 'Tablet', percentage: 4.3, sessions: 682, color: 'from-purple-500 to-purple-600', icon: Globe }
  ];

  // Real-time Performance Indicators
  const realTimeMetrics = [
    { label: 'Active Sessions', value: 1247, icon: Activity, color: 'text-green-500' },
    { label: 'Live Orders', value: 89, icon: ShoppingBag, color: 'text-blue-500' },
    { label: 'Server Load', value: '23%', icon: Database, color: 'text-purple-500' },
    { label: 'Cache Hit Rate', value: '94.2%', icon: Zap, color: 'text-amber-500' }
  ];

  // Enhanced Trend Data
  const trendData = {
    weekly: [
      { period: 'Sen', revenue: 28.5, orders: 145, users: 1847, conversion: 7.2 },
      { period: 'Sel', revenue: 32.1, orders: 167, users: 2103, conversion: 7.9 },
      { period: 'Rab', revenue: 35.8, orders: 189, users: 2241, conversion: 8.4 },
      { period: 'Kam', revenue: 41.2, orders: 215, users: 2587, conversion: 8.3 },
      { period: 'Jum', revenue: 48.7, orders: 253, users: 2894, conversion: 8.7 },
      { period: 'Sab', revenue: 52.3, orders: 278, users: 3125, conversion: 8.9 },
      { period: 'Min', revenue: 45.9, orders: 241, users: 2756, conversion: 8.7 }
    ],
    monthly: [
      { period: 'Jan', revenue: 98.2, orders: 1250, users: 12450, conversion: 6.8 },
      { period: 'Feb', revenue: 105.7, orders: 1387, users: 13120, conversion: 7.1 },
      { period: 'Mar', revenue: 112.3, orders: 1456, users: 13785, conversion: 7.4 },
      { period: 'Apr', revenue: 118.9, orders: 1523, users: 14201, conversion: 7.6 },
      { period: 'Mei', revenue: 124.1, orders: 1598, users: 14673, conversion: 7.8 },
      { period: 'Jun', revenue: 131.5, orders: 1687, users: 15142, conversion: 8.0 },
      { period: 'Jul', revenue: 138.7, orders: 1754, users: 15598, conversion: 8.2 },
      { period: 'Agu', revenue: 145.2, orders: 1823, users: 15923, conversion: 8.4 },
      { period: 'Sep', revenue: 152.8, orders: 1897, users: 16347, conversion: 8.6 },
      { period: 'Okt', revenue: 159.4, orders: 1954, users: 16785, conversion: 8.5 },
      { period: 'Nov', revenue: 166.9, orders: 2018, users: 17234, conversion: 8.7 },
      { period: 'Des', revenue: 174.3, orders: 2087, users: 17689, conversion: 8.9 }
    ]
  };

  // Customer Lifecycle Analytics
  const customerLifecycle = [
    { stage: 'Awareness', count: 25847, percentage: 100, color: 'bg-blue-400' },
    { stage: 'Interest', count: 18293, percentage: 70.8, color: 'bg-green-400' },
    { stage: 'Consideration', count: 12456, percentage: 48.2, color: 'bg-yellow-400' },
    { stage: 'Purchase', count: 8947, percentage: 34.6, color: 'bg-orange-400' },
    { stage: 'Retention', count: 7523, percentage: 29.1, color: 'bg-purple-400' },
    { stage: 'Advocacy', count: 3847, percentage: 14.9, color: 'bg-pink-400' }
  ];

  if (isLoading) {
    return (
      <div className={`min-h-screen p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'}`}>
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 animate-spin">
              <Database className="text-white w-6 h-6" />
            </div>
            <div className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-700'}`}>Loading Analytics...</div>
            <div className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Memuat data statistik terbaru</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-4 ${darkModeClasses.bg}`}>
      {/* Enhanced Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div className="flex items-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl shadow-lg mr-3">
            <BarChart3 className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className={`text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1 ${isDarkMode ? 'text-white' : ''}`}>
               Analytics Dashboard
            </h1>
            <p className={`text-sm ${darkModeClasses.textSecondary}`}>Comprehensive business intelligence & performance metrics</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-4 lg:mt-0">
          <div className={`${darkModeClasses.cardBg} rounded-xl p-3 shadow-lg border ${darkModeClasses.border}`}>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className={`text-xs ${darkModeClasses.textSecondary}`}>Live</span>
              </div>
              <div className="text-right">
                <p className={`text-xs ${darkModeClasses.textSecondary}`}>{formatDate(time)}</p>
                <p className={`text-lg font-bold ${darkModeClasses.text}`}>{formatTime(time)} WIB</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-1 text-sm">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button className={`${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'} px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-1 text-sm`}>
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Key Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className={`${darkModeClasses.cardBg} rounded-xl shadow-xl border ${darkModeClasses.border} p-4 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
            
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <p className={`text-xs font-medium ${darkModeClasses.textSecondary} mb-1`}>{stat.title}</p>
                <p className={`text-xl font-bold ${darkModeClasses.text} mb-1`}>{stat.value}</p>
                <p className={`text-xs ${darkModeClasses.textSecondary}`}>{stat.details}</p>
              </div>
              <div className={`bg-gradient-to-r ${stat.color} p-2 rounded-lg text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className={`inline-flex items-center text-xs font-semibold ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                {stat.change}
              </span>
              <span className={`text-xs ${darkModeClasses.textSecondary}`}>{stat.description}</span>
            </div>

            {/* Enhanced Sparkline */}
            <div className="h-10 flex items-end space-x-0.5">
              {stat.sparkline.map((value, idx) => (
                <div 
                  key={idx}
                  className="flex-1 flex items-end"
                >
                  <div 
                    className={`w-full bg-gradient-to-t ${stat.color} rounded-t opacity-70 hover:opacity-100 transition-all duration-300`}
                    style={{ height: `${(value / Math.max(...stat.sparkline)) * 100}%` }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Real-time Metrics Bar */}
      <div className={`${darkModeClasses.cardBg} rounded-xl shadow-xl border ${darkModeClasses.border} p-4 mb-6`}>
        <h3 className={`text-base font-bold ${darkModeClasses.text} mb-3 flex items-center`}>
          <Activity className="text-green-500 mr-2 w-4 h-4" />
          Real-time Performance
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {realTimeMetrics.map((metric, index) => (
            <div key={index} className={`text-center p-3 rounded-lg transition-colors duration-300 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'}`}>
              <metric.icon className={`${metric.color} mx-auto mb-1 w-4 h-4`} />
              <div className={`text-lg font-bold ${darkModeClasses.text} mb-1`}>{metric.value}</div>
              <div className={`text-xs ${darkModeClasses.textSecondary}`}>{metric.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        
        {/* Enhanced Trend Chart - PERBAIKAN DI SINI */}
        <div className={`xl:col-span-2 ${darkModeClasses.cardBg} rounded-xl shadow-xl border ${darkModeClasses.border} p-4`}>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4">
            <h3 className={`text-base font-bold ${darkModeClasses.text} mb-3 lg:mb-0 flex items-center`}>
              <TrendingUp className="text-blue-500 mr-2 w-4 h-4" />
              Performance Trends
            </h3>
            <div className="flex flex-wrap gap-1">
              <select 
                value={selectedMetric} 
                onChange={(e) => setSelectedMetric(e.target.value)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent ${darkModeClasses.inputBg} ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}
              >
                <option value="revenue">Revenue</option>
                <option value="orders">Orders</option>
                <option value="users">Users</option>
                <option value="conversion">Conversion</option>
              </select>
              <button 
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${activeTab === 'weekly' ? 'bg-blue-500 text-white shadow-lg' : isDarkMode ? 'bg-gray-700 text-gray-100 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                onClick={() => setActiveTab('weekly')}
              >
                Weekly
              </button>
              <button 
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${activeTab === 'monthly' ? 'bg-blue-500 text-white shadow-lg' : isDarkMode ? 'bg-gray-700 text-gray-100 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                onClick={() => setActiveTab('monthly')}
              >
                Monthly
              </button>
            </div>
          </div>
          
          {/* Container untuk grafik yang responsif */}
          <div className="w-full overflow-x-auto">
            <div className="min-w-[500px] h-60 flex items-end justify-between mt-4">
              {trendData[activeTab].map((item, index) => {
                const maxValue = Math.max(...trendData[activeTab].map(i => i[selectedMetric]));
                const height = (item[selectedMetric] / maxValue) * 100;
                
                return (
                  <div 
                    key={index} 
                    className="flex flex-col items-center flex-1 px-1 group relative"
                    onMouseEnter={() => !isMobile && setHoveredBar(index)}
                    onMouseLeave={() => !isMobile && setHoveredBar(null)}
                    onClick={() => isMobile && setHoveredBar(hoveredBar === index ? null : index)}
                  >
                    {hoveredBar === index && (
                      <div className="absolute -top-16 bg-gray-900 text-white text-xs py-1.5 px-2 rounded-lg z-10 shadow-xl">
                        <div className="font-semibold">{item.period}</div>
                        <div>Revenue: Rp {item.revenue}{activeTab === 'monthly' ? 'Jt' : 'Rb'}</div>
                        <div>Orders: {item.orders}</div>
                        <div>Users: {item.users.toLocaleString()}</div>
                        <div>Conversion: {item.conversion}%</div>
                      </div>
                    )}
                    <div className="w-full flex justify-center items-end h-48">
                      <div 
                        className="w-4/5 bg-gradient-to-t from-blue-400 via-blue-500 to-blue-600 rounded-t hover:from-blue-500 hover:to-blue-700 transition-all duration-500 cursor-pointer shadow-lg relative overflow-hidden"
                        style={{ height: `${height}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20"></div>
                      </div>
                    </div>
                    <span className={`text-xs mt-2 font-semibold ${darkModeClasses.text}`}>{item.period}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className={`${darkModeClasses.cardBg} rounded-xl shadow-xl border ${darkModeClasses.border} p-4`}>
          <h3 className={`text-base font-bold ${darkModeClasses.text} mb-4 flex items-center`}>
            <MapPin className="text-green-500 mr-2 w-4 h-4" />
            Geographic Distribution
          </h3>
          <div className="space-y-3">
            {geographicData.map((item, index) => (
              <div key={index} className="group">
                <div className="flex justify-between items-center mb-1.5">
                  <span className={`text-xs font-semibold ${darkModeClasses.text}`}>{item.region}</span>
                  <div className="text-right">
                    <span className={`text-xs font-bold ${darkModeClasses.text}`}>{item.percentage}%</span>
                    <div className={`text-xs ${darkModeClasses.textSecondary}`}>{item.users.toLocaleString()} users</div>
                  </div>
                </div>
                <div className={`w-full rounded-full h-2 mb-1.5 overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div 
                    className={`${item.color} h-2 rounded-full transition-all duration-1000 ease-out shadow-inner relative`}
                    style={{ width: `${item.percentage}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/30"></div>
                  </div>
                </div>
                <div className={`flex justify-between text-xs ${darkModeClasses.textSecondary}`}>
                  <span>Revenue: {item.revenue}</span>
                  <span>{((item.users / 15847) * 100).toFixed(1)}% of total</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Advanced Metrics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {advancedMetrics.map((category, categoryIndex) => (
          <div key={categoryIndex} className={`${darkModeClasses.cardBg} rounded-xl shadow-xl border ${darkModeClasses.border} p-4`}>
            <h3 className={`text-base font-bold ${darkModeClasses.text} mb-4 flex items-center`}>
              {categoryIndex === 0 && <DollarSign className="text-green-500 mr-2 w-4 h-4" />}
              {categoryIndex === 1 && <Users className="text-blue-500 mr-2 w-4 h-4" />}
              {categoryIndex === 2 && <Shield className="text-purple-500 mr-2 w-4 h-4" />}
              {category.category}
            </h3>
            <div className="space-y-3">
              {category.metrics.map((metric, index) => (
                <div key={index} className={`flex items-center justify-between p-2 rounded-lg transition-colors duration-300 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'}`}>
                  <div>
                    <div className={`font-semibold text-sm ${darkModeClasses.text}`}>{metric.value}</div>
                    <div className={`text-xs ${darkModeClasses.textSecondary}`}>{metric.name}</div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-semibold ${
                      metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    } flex items-center`}>
                      {metric.trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                      {metric.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Device Analytics & Customer Lifecycle */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        
        {/* Device Analytics */}
        <div className={`${darkModeClasses.cardBg} rounded-xl shadow-xl border ${darkModeClasses.border} p-4`}>
          <h3 className={`text-base font-bold ${darkModeClasses.text} mb-4 flex items-center`}>
            <Monitor className="text-purple-500 mr-2 w-4 h-4" />
            Device & Platform Analytics
          </h3>
          <div className="space-y-4">
            {deviceData.map((device, index) => (
              <div key={index} className="group">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className={`bg-gradient-to-r ${device.color} p-1.5 rounded-lg text-white mr-2`}>
                      <device.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className={`font-semibold text-sm ${darkModeClasses.text}`}>{device.device}</div>
                      <div className={`text-xs ${darkModeClasses.textSecondary}`}>{device.sessions.toLocaleString()} sessions</div>
                    </div>
                  </div>
                  <div className={`text-xl font-bold ${darkModeClasses.text}`}>{device.percentage}%</div>
                </div>
                <div className={`w-full rounded-full h-2 mb-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div 
                    className={`bg-gradient-to-r ${device.color} h-2 rounded-full transition-all duration-1000 ease-out shadow-inner`}
                    style={{ width: `${device.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Lifecycle Funnel */}
        <div className={`${darkModeClasses.cardBg} rounded-xl shadow-xl border ${darkModeClasses.border} p-4`}>
          <h3 className={`text-base font-bold ${darkModeClasses.text} mb-4 flex items-center`}>
            <Target className="text-orange-500 mr-2 w-4 h-4" />
            Customer Lifecycle Funnel
          </h3>
          <div className="space-y-2">
            {customerLifecycle.map((stage, index) => (
              <div key={index} className="group">
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-xs font-semibold ${darkModeClasses.text}`}>{stage.stage}</span>
                  <div className="text-right">
                    <span className={`text-xs font-bold ${darkModeClasses.text}`}>{stage.count.toLocaleString()}</span>
                    <div className={`text-xs ${darkModeClasses.textSecondary}`}>{stage.percentage}%</div>
                  </div>
                </div>
                <div className="relative">
                  <div className={`w-full rounded-full h-1.5 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <div 
                      className={`${stage.color} h-1.5 rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${stage.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Advanced Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {[
          { 
            title: 'Customer Lifetime Value', 
            value: 'Rp 2.4Jt', 
            change: '+8.7%', 
            icon: Heart, 
            color: 'from-pink-500 to-rose-500',
            description: 'Avg per customer'
          },
          { 
            title: 'Churn Rate', 
            value: '2.3%', 
            change: '-1.2%', 
            icon: UserCheck, 
            color: 'from-red-500 to-orange-500',
            description: 'Monthly churn'
          },
          { 
            title: 'Social Engagement', 
            value: '847K', 
            change: '+23.4%', 
            icon: Share2, 
            color: 'from-indigo-500 to-purple-500',
            description: 'Total interactions'
          },
          { 
            title: 'API Response Time', 
            value: '124ms', 
            change: '-15%', 
            icon: Zap, 
            color: 'from-yellow-500 to-amber-500',
            description: 'P95 latency'
          }
        ].map((metric, index) => (
          <div key={index} className={`${darkModeClasses.cardBg} rounded-xl shadow-xl border ${darkModeClasses.border} p-4 hover:shadow-2xl transition-all duration-300 group`}>
            <div className="flex items-center justify-between mb-3">
              <div className={`bg-gradient-to-r ${metric.color} p-2 rounded-lg text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <metric.icon className="w-4 h-4" />
              </div>
              <div className="text-right">
                <div className={`text-xl font-bold ${darkModeClasses.text}`}>{metric.value}</div>
                <div className={`text-xs ${darkModeClasses.textSecondary}`}>{metric.description}</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-medium ${darkModeClasses.text}`}>{metric.title}</span>
              <span className={`text-xs font-semibold ${
                metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Performance Matrix */}
      <div className={`${darkModeClasses.cardBg} rounded-xl shadow-xl border ${darkModeClasses.border} p-4 mb-6`}>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4">
          <h3 className={`text-base font-bold ${darkModeClasses.text} mb-3 lg:mb-0 flex items-center`}>
            <Calculator className="text-blue-500 mr-2 w-4 h-4" />
            Comprehensive Performance Matrix
          </h3>
          <div className="flex gap-1">
            <button className={`px-3 py-1.5 rounded-lg transition-colors duration-300 text-xs ${isDarkMode ? 'bg-blue-800 text-white hover:bg-blue-700' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}>
              Export Data
            </button>
            <button className={`px-3 py-1.5 rounded-lg transition-colors duration-300 text-xs ${isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              Configure
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {[
            { label: 'Monthly Revenue Growth', value: '+24.7%', status: 'excellent', target: '+20%' },
            { label: 'Customer Acquisition Cost', value: 'Rp 45K', status: 'good', target: 'Rp 50K' },
            { label: 'Net Promoter Score', value: '72', status: 'excellent', target: '70+' },
            { label: 'Cart Abandonment Rate', value: '18.4%', status: 'warning', target: '<15%' },
            { label: 'First Contact Resolution', value: '89%', status: 'good', target: '85%+' },
            { label: 'Server Uptime', value: '99.97%', status: 'excellent', target: '99.9%+' },
            { label: 'Page Load Speed', value: '1.8s', status: 'good', target: '<2s' },
            { label: 'Mobile Conversion Rate', value: '7.2%', status: 'good', target: '7%+' },
            { label: 'Email Open Rate', value: '28.5%', status: 'excellent', target: '25%+' },
            { label: 'Social Media Reach', value: '2.1M', status: 'good', target: '2M+' },
            { label: 'Customer Support Rating', value: '4.8/5', status: 'excellent', target: '4.5+' },
            { label: 'Inventory Turnover', value: '8.2x', status: 'good', target: '8x+' }
          ].map((item, index) => {
            const statusColors = {
              excellent: isDarkMode ? 'from-green-900/30 to-emerald-900/30 border-green-700 text-green-300' : 'from-green-50 to-emerald-50 border-green-200 text-green-800',
              good: isDarkMode ? 'from-blue-900/30 to-cyan-900/30 border-blue-700 text-blue-300' : 'from-blue-50 to-cyan-50 border-blue-200 text-blue-800',
              warning: isDarkMode ? 'from-yellow-900/30 to-orange-900/30 border-yellow-700 text-yellow-300' : 'from-yellow-50 to-orange-50 border-yellow-200 text-orange-800',
              danger: isDarkMode ? 'from-red-900/30 to-pink-900/30 border-red-700 text-red-300' : 'from-red-50 to-pink-50 border-red-200 text-red-800'
            };

            const statusIcons = {
              excellent: <CheckCircle className="w-4 h-4 text-green-500" />,
              good: <TrendingUp className="w-4 h-4 text-blue-500" />,
              warning: <AlertTriangle className="w-4 h-4 text-yellow-500" />,
              danger: <XCircle className="w-4 h-4 text-red-500" />
            };

            return (
              <div key={index} className={`bg-gradient-to-br ${statusColors[item.status]} border rounded-lg p-3 hover:shadow-lg transition-all duration-300`}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className={`text-lg font-bold ${darkModeClasses.text}`}>{item.value}</div>
                  {statusIcons[item.status]}
                </div>
                <div className={`text-xs font-medium mb-1 ${darkModeClasses.text}`}>{item.label}</div>
                <div className={`text-xs ${darkModeClasses.textSecondary}`}>Target: {item.target}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activities & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        
        {/* Recent Activities */}
        <div className={`${darkModeClasses.cardBg} rounded-xl shadow-xl border ${darkModeClasses.border} p-4`}>
          <h3 className={`text-base font-bold ${darkModeClasses.text} mb-4 flex items-center`}>
            <Clock3 className="text-blue-500 mr-2 w-4 h-4" />
            Recent Activities
          </h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {[
              { time: '2 min ago', action: 'High-value transaction completed', user: 'Premium Customer #1247', amount: 'Rp 2.8Jt', type: 'success' },
              { time: '5 min ago', action: 'New user registration', user: 'Sarah Wilson', amount: '', type: 'info' },
              { time: '12 min ago', action: 'Server performance alert resolved', user: 'System', amount: '', type: 'warning' },
              { time: '18 min ago', action: 'Payment processed successfully', user: 'Michael Chen', amount: 'Rp 750K', type: 'success' },
              { time: '25 min ago', action: '5-star review received', user: 'Lisa Anderson', amount: '', type: 'success' },
              { time: '32 min ago', action: 'API rate limit adjusted', user: 'Admin Panel', amount: '', type: 'info' },
              { time: '45 min ago', action: 'Marketing campaign launched', user: 'Marketing Team', amount: '', type: 'info' },
              { time: '1 hour ago', action: 'Database backup completed', user: 'System', amount: '', type: 'success' }
            ].map((activity, index) => {
              const typeColors = {
                success: isDarkMode ? 'bg-green-900/30 border-green-700' : 'bg-green-50 border-green-200',
                warning: isDarkMode ? 'bg-yellow-900/30 border-yellow-700' : 'bg-yellow-50 border-yellow-200',
                info: isDarkMode ? 'bg-blue-900/30 border-blue-700' : 'bg-blue-50 border-blue-200',
                danger: isDarkMode ? 'bg-red-900/30 border-red-700' : 'bg-red-50 border-red-200'
              };

              const typeIcons = {
                success: <CheckCircle className="w-4 h-4 text-green-500" />,
                warning: <AlertTriangle className="w-4 h-4 text-yellow-500" />,
                info: <Activity className="w-4 h-4 text-blue-500" />,
                danger: <XCircle className="w-4 h-4 text-red-500" />
              };

              return (
                <div key={index} className={`flex items-start p-3 ${typeColors[activity.type]} border rounded-lg hover:shadow-md transition-all duration-300`}>
                  <div className="mr-2 mt-0.5">
                    {typeIcons[activity.type]}
                  </div>
                  <div className="flex-1">
                    <div className={`font-medium text-sm ${darkModeClasses.text}`}>{activity.action}</div>
                    <div className={`text-xs ${darkModeClasses.textSecondary}`}>{activity.user}</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xs ${darkModeClasses.textSecondary}`}>{activity.time}</div>
                    {activity.amount && (
                      <div className={`text-xs font-semibold ${darkModeClasses.text} mt-1`}>{activity.amount}</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* System Health & Alerts */}
        <div className={`${darkModeClasses.cardBg} rounded-xl shadow-xl border ${darkModeClasses.border} p-4`}>
          <h3 className={`text-base font-bold ${darkModeClasses.text} mb-4 flex items-center`}>
            <Wifi className="text-green-500 mr-2 w-4 h-4" />
            System Health & Alerts
          </h3>
          
          <div className="space-y-4">
            {/* System Status Overview */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'API Status', value: 'Operational', status: 'success' },
                { label: 'Database', value: 'Healthy', status: 'success' },
                { label: 'CDN', value: 'Optimal', status: 'success' },
                { label: 'Cache', value: '94.2%', status: 'success' }
              ].map((item, index) => (
                <div key={index} className={`rounded-lg p-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs ${darkModeClasses.textSecondary}`}>{item.label}</span>
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  </div>
                  <div className={`font-semibold text-sm ${darkModeClasses.text}`}>{item.value}</div>
                </div>
              ))}
            </div>

            {/* Recent Alerts */}
            <div>
              <h4 className={`font-semibold text-sm ${darkModeClasses.text} mb-2`}>Recent Alerts</h4>
              <div className="space-y-2">
                {[
                  { type: 'info', message: 'Scheduled maintenance completed successfully', time: '2h ago' },
                  { type: 'success', message: 'Performance optimization deployed', time: '4h ago' },
                  { type: 'warning', message: 'High traffic detected - auto-scaling activated', time: '6h ago' },
                  { type: 'info', message: 'Security patch applied', time: '1d ago' }
                ].map((alert, index) => {
                  const alertIcons = {
                    success: <CheckCircle className="w-3 h-3 text-green-500" />,
                    warning: <AlertTriangle className="w-3 h-3 text-yellow-500" />,
                    info: <Activity className="w-3 h-3 text-blue-500" />,
                    danger: <XCircle className="w-3 h-3 text-red-500" />
                  };

                  return (
                    <div key={index} className="flex items-start gap-2 p-1.5 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                      {alertIcons[alert.type]}
                      <div className="flex-1">
                        <div className={`text-xs ${darkModeClasses.text}`}>{alert.message}</div>
                        <div className={`text-xs ${darkModeClasses.textSecondary}`}>{alert.time}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Performance Metrics */}
            <div>
              <h4 className={`font-semibold text-sm ${darkModeClasses.text} mb-2`}>Performance Metrics</h4>
              <div className="space-y-2">
                {[
                  { metric: 'Response Time', value: '124ms', target: '<200ms', status: 'good' },
                  { metric: 'Throughput', value: '2.4K req/s', target: '2K req/s', status: 'excellent' },
                  { metric: 'Error Rate', value: '0.03%', target: '<0.1%', status: 'excellent' },
                  { metric: 'CPU Usage', value: '23%', target: '<80%', status: 'good' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className={`text-xs ${darkModeClasses.textSecondary}`}>{item.metric}</span>
                    <div className="flex items-center gap-1">
                      <span className={`text-xs font-semibold ${darkModeClasses.text}`}>{item.value}</span>
                      <span className={`text-xs ${darkModeClasses.textSecondary}`}>({item.target})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Summary */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white rounded-xl shadow-2xl p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-1">Dashboard Summary</h3>
            <p className="text-blue-100 text-xs">Real-time insights and comprehensive analytics</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-center">
              <div className="text-xl font-bold">99.97%</div>
              <div className="text-xs text-blue-100">System Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">1247</div>
              <div className="text-xs text-blue-100">Active Users</div>
            </div>
          </div>
          <div className="text-center md:text-right">
            <div className="text-xs text-blue-100 mb-1">Last updated</div>
            <div className="text-base font-semibold">{formatTime(time)} WIB</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;