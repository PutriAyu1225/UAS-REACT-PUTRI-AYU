import React, { useState } from 'react';
import { useDarkMode } from "../components/DarkModeContext";
import { 
  BarChart3,
  Download,
  TrendingUp,
  TrendingDown,
  Calendar,
  Users,
  DollarSign,
  Star,
  MapPin,
  Clock,
  Filter,
  FileText,
  PieChart,
  ChevronDown,
  Menu
} from 'lucide-react';

const Analytics = () => {
  const { isDarkMode } = useDarkMode();
  const [dateRange, setDateRange] = useState('30days');
  const [reportType, setReportType] = useState('overview');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Mock data for analytics
  const monthlyRevenue = [
    { month: 'Jan', revenue: 45600000, reservations: 234 },
    { month: 'Feb', revenue: 52300000, reservations: 267 },
    { month: 'Mar', revenue: 48900000, reservations: 245 },
    { month: 'Apr', revenue: 61200000, reservations: 312 },
    { month: 'May', revenue: 58700000, reservations: 289 },
    { month: 'Jun', revenue: 67500000, reservations: 334 },
    { month: 'Jul', revenue: 72100000, reservations: 356 },
    { month: 'Aug', revenue: 69800000, reservations: 341 }
  ];

  const topServices = [
    { name: 'Hotel Room Deluxe', bookings: 145, revenue: 15200000, growth: 12.5 },
    { name: 'Conference Hall', bookings: 89, revenue: 12400000, growth: 8.3 },
    { name: 'Meeting Room A', bookings: 134, revenue: 8900000, growth: -2.1 },
    { name: 'Car Rental Premium', bookings: 67, revenue: 8100000, growth: 15.7 },
    { name: 'Restaurant VIP Table', bookings: 234, revenue: 9800000, growth: 6.2 },
    { name: 'Wedding Package', bookings: 12, revenue: 18500000, growth: 25.4 }
  ];

  const locationStats = [
    { city: 'Jakarta', bookings: 456, revenue: 23400000, percentage: 35.2 },
    { city: 'Surabaya', bookings: 298, revenue: 15600000, percentage: 23.1 },
    { city: 'Bandung', bookings: 234, revenue: 12800000, percentage: 18.0 },
    { city: 'Bali', bookings: 189, revenue: 19200000, percentage: 14.6 },
    { city: 'Yogyakarta', bookings: 123, revenue: 8900000, percentage: 9.1 }
  ];

  const customerInsights = {
    newCustomers: 89,
    returningCustomers: 234,
    retentionRate: 72.3,
    averageRating: 4.6,
    totalReviews: 1247,
    averageBookingValue: 875000,
    peakHours: [
      { hour: '09:00-10:00', bookings: 45 },
      { hour: '14:00-15:00', bookings: 67 },
      { hour: '19:00-20:00', bookings: 89 }
    ]
  };

  const exportReport = (format) => {
    console.log(`Exporting ${reportType} report in ${format} format`);
    // Logic for export functionality
  };

  // Kelas CSS untuk mode gelap
  const darkModeClasses = {
    bg: isDarkMode ? 'bg-gray-800' : 'bg-white',
    text: isDarkMode ? 'text-gray-100' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    border: isDarkMode ? 'border-gray-700' : 'border-gray-300',
    cardBg: isDarkMode ? 'bg-gray-700' : 'bg-white',
    inputBg: isDarkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-900',
    hover: isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'
  };

  return (
    <div className={`min-h-screen p-4 sm:p-6 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className={`text-2xl sm:text-3xl font-bold ${darkModeClasses.text}`}>Analytics & Laporan</h1>
            <p className={`mt-1 sm:mt-2 text-sm sm:text-base ${darkModeClasses.textSecondary}`}>Insight mendalam tentang performa bisnis Anda</p>
          </div>
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
            <div className="sm:hidden">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`w-full flex justify-between items-center px-4 py-2 border rounded-lg ${darkModeClasses.inputBg} ${darkModeClasses.border}`}
              >
                <span>Filter Options</span>
                <ChevronDown className={`w-4 h-4 transform ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
            
            <div className={`${isFilterOpen ? 'block' : 'hidden'} sm:flex flex-col sm:flex-row gap-3 mt-2 sm:mt-0`}>
              <select
                className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${darkModeClasses.inputBg} ${darkModeClasses.border}`}
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="7days">7 Hari Terakhir</option>
                <option value="30days">30 Hari Terakhir</option>
                <option value="90days">3 Bulan Terakhir</option>
                <option value="1year">1 Tahun Terakhir</option>
              </select>
              <div className="flex gap-2">
                <button 
                  onClick={() => exportReport('pdf')}
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-2 rounded-lg hover:from-red-700 hover:to-red-800 flex items-center justify-center shadow-md text-sm sm:text-base"
                >
                  <Download className="w-4 h-4 mr-1 sm:mr-2" />
                  <span className="hidden xs:inline">Export</span> PDF
                </button>
                <button 
                  onClick={() => exportReport('excel')}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white px-3 py-2 rounded-lg hover:from-green-700 hover:to-green-800 flex items-center justify-center shadow-md text-sm sm:text-base"
                >
                  <Download className="w-4 h-4 mr-1 sm:mr-2" />
                  <span className="hidden xs:inline">Export</span> Excel
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className={`rounded-xl shadow-lg p-4 sm:p-6 border-l-4 border-blue-500 ${darkModeClasses.cardBg}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs sm:text-sm font-medium ${darkModeClasses.textSecondary}`}>Total Revenue</p>
                <p className={`text-xl sm:text-2xl font-bold ${darkModeClasses.text}`}>Rp 45.6M</p>
                <p className="text-xs sm:text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  +12.5% vs last month
                </p>
              </div>
              <div className={`p-2 sm:p-3 rounded-full ${isDarkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
                <DollarSign className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className={`rounded-xl shadow-lg p-4 sm:p-6 border-l-4 border-green-500 ${darkModeClasses.cardBg}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs sm:text-sm font-medium ${darkModeClasses.textSecondary}`}>Total Reservations</p>
                <p className={`text-xl sm:text-2xl font-bold ${darkModeClasses.text}`}>1,234</p>
                <p className="text-xs sm:text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  +8.3% vs last month
                </p>
              </div>
              <div className={`p-2 sm:p-3 rounded-full ${isDarkMode ? 'bg-green-900' : 'bg-green-100'}`}>
                <Calendar className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className={`rounded-xl shadow-lg p-4 sm:p-6 border-l-4 border-purple-500 ${darkModeClasses.cardBg}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs sm:text-sm font-medium ${darkModeClasses.textSecondary}`}>Active Customers</p>
                <p className={`text-xl sm:text-2xl font-bold ${darkModeClasses.text}`}>856</p>
                <p className="text-xs sm:text-sm text-red-600 flex items-center mt-1">
                  <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  -2.1% vs last month
                </p>
              </div>
              <div className={`p-2 sm:p-3 rounded-full ${isDarkMode ? 'bg-purple-900' : 'bg-purple-100'}`}>
                <Users className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className={`rounded-xl shadow-lg p-4 sm:p-6 border-l-4 border-orange-500 ${darkModeClasses.cardBg}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs sm:text-sm font-medium ${darkModeClasses.textSecondary}`}>Satisfaction Rate</p>
                <p className={`text-xl sm:text-2xl font-bold ${darkModeClasses.text}`}>94.2%</p>
                <p className="text-xs sm:text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  +1.5% vs last month
                </p>
              </div>
              <div className={`p-2 sm:p-3 rounded-full ${isDarkMode ? 'bg-orange-900' : 'bg-orange-100'}`}>
                <Star className="w-4 h-4 sm:w-6 sm:h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className={`rounded-xl shadow-lg p-4 sm:p-6 ${darkModeClasses.cardBg}`}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
            <h3 className={`text-lg sm:text-xl font-bold ${darkModeClasses.text}`}>Revenue & Reservations Trend</h3>
            <select
              className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${darkModeClasses.inputBg} ${darkModeClasses.border} text-sm sm:text-base`}
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="overview">Overview</option>
              <option value="revenue">Revenue Only</option>
              <option value="reservations">Reservations Only</option>
            </select>
          </div>
          
          {/* Mock Chart Area */}
          <div className={`h-60 sm:h-80 rounded-lg flex items-center justify-center border-2 border-dashed ${
            isDarkMode ? 'bg-gray-800 border-blue-800' : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200'
          }`}>
            <div className="text-center p-2">
              <BarChart3 className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-4 ${isDarkMode ? 'text-blue-500' : 'text-blue-400'}`} />
              <p className={`text-base sm:text-lg font-medium ${darkModeClasses.text}`}>Interactive Revenue Chart</p>
              <p className={`text-xs sm:text-sm ${darkModeClasses.textSecondary}`}>Data visualisasi akan ditampilkan di sini</p>
              
              {/* Sample Data Bars */}
              <div className="flex items-end justify-center space-x-1 sm:space-x-2 mt-4 sm:mt-6">
                {monthlyRevenue.slice(-6).map((data, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t w-4 sm:w-8 transition-all duration-300 hover:from-blue-700 hover:to-blue-500"
                      style={{ height: `${(data.revenue / 80000000) * 70}px` }}
                    ></div>
                    <div className={`text-xs mt-2 ${darkModeClasses.text}`}>{data.month}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Analytics Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
          
          {/* Top Services */}
          <div className={`rounded-xl shadow-lg p-4 sm:p-6 ${darkModeClasses.cardBg}`}>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className={`text-lg sm:text-xl font-bold ${darkModeClasses.text}`}>Layanan Terpopuler</h3>
              <PieChart className={`w-5 h-5 sm:w-6 sm:h-6 ${darkModeClasses.textSecondary}`} />
            </div>
            <div className="space-y-3 sm:space-y-4">
              {topServices.map((service, index) => (
                <div key={index} className={`flex items-center justify-between p-3 sm:p-4 rounded-lg transition-colors ${
                  isDarkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-50 hover:bg-gray-100'
                }`}>
                  <div className="flex-1">
                    <div className="flex flex-col xs:flex-row xs:items-center justify-between mb-2 gap-1 xs:gap-0">
                      <h4 className={`font-semibold text-sm sm:text-base ${darkModeClasses.text} truncate`}>{service.name}</h4>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full shrink-0 ${
                        service.growth > 0 ? 
                        (isDarkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800') : 
                        (isDarkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800')
                      }`}>
                        {service.growth > 0 ? '+' : ''}{service.growth}%
                      </span>
                    </div>
                    <div className="flex flex-col xs:flex-row xs:items-center justify-between text-xs sm:text-sm">
                      <span className={darkModeClasses.textSecondary}>{service.bookings} bookings</span>
                      <span className="font-semibold text-green-600">
                        Rp {(service.revenue / 1000000).toFixed(1)}M
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className={`w-full rounded-full h-2 ${isDarkMode ? 'bg-gray-500' : 'bg-gray-200'}`}>
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(service.bookings / 250) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Location Statistics */}
          <div className={`rounded-xl shadow-lg p-4 sm:p-6 ${darkModeClasses.cardBg}`}>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className={`text-lg sm:text-xl font-bold ${darkModeClasses.text}`}>Statistik per Lokasi</h3>
              <MapPin className={`w-5 h-5 sm:w-6 sm:h-6 ${darkModeClasses.textSecondary}`} />
            </div>
            <div className="space-y-3 sm:space-y-4">
              {locationStats.map((location, index) => (
                <div key={index} className={`flex items-center justify-between p-3 sm:p-4 rounded-lg ${
                  isDarkMode ? 'bg-gray-600' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center flex-1">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mr-3 shrink-0">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`font-semibold text-sm sm:text-base ${darkModeClasses.text} truncate`}>{location.city}</h4>
                        <span className={`text-xs sm:text-sm font-medium ${darkModeClasses.textSecondary} ml-2 shrink-0`}>{location.percentage}%</span>
                      </div>
                      <div className="flex flex-col xs:flex-row xs:items-center justify-between text-xs sm:text-sm">
                        <span className={darkModeClasses.textSecondary}>{location.bookings} reservasi</span>
                        <span className="font-semibold text-green-600">
                          Rp {(location.revenue / 1000000).toFixed(1)}M
                        </span>
                      </div>
                      <div className="mt-2">
                        <div className={`w-full rounded-full h-2 ${isDarkMode ? 'bg-gray-500' : 'bg-gray-200'}`}>
                          <div 
                            className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                            style={{ width: `${location.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Customer Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          
          {/* Customer Analytics */}
          <div className={`rounded-xl shadow-lg p-4 sm:p-6 ${darkModeClasses.cardBg}`}>
            <h3 className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center ${darkModeClasses.text}`}>
              <Users className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              Customer Insights
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className={`text-center p-3 sm:p-4 rounded-lg ${isDarkMode ? 'bg-blue-900' : 'bg-blue-50'}`}>
                <div className="text-xl sm:text-2xl font-bold text-blue-600 mb-1">{customerInsights.newCustomers}</div>
                <div className={`text-xs sm:text-sm ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>New Customers</div>
              </div>
              <div className={`text-center p-3 sm:p-4 rounded-lg ${isDarkMode ? 'bg-green-900' : 'bg-green-50'}`}>
                <div className="text-xl sm:text-2xl font-bold text-green-600 mb-1">{customerInsights.returningCustomers}</div>
                <div className={`text-xs sm:text-sm ${isDarkMode ? 'text-green-300' : 'text-green-700'}`}>Returning</div>
              </div>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between items-center">
                <span className={`text-sm ${darkModeClasses.textSecondary}`}>Customer Retention Rate</span>
                <span className="font-bold text-green-600 text-sm sm:text-base">{customerInsights.retentionRate}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${darkModeClasses.textSecondary}`}>Average Rating</span>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="font-bold text-yellow-600 text-sm sm:text-base">{customerInsights.averageRating}/5</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${darkModeClasses.textSecondary}`}>Total Reviews</span>
                <span className="font-bold text-blue-600 text-sm sm:text-base">{customerInsights.totalReviews.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${darkModeClasses.textSecondary}`}>Avg. Booking Value</span>
                <span className="font-bold text-green-600 text-sm sm:text-base">Rp {customerInsights.averageBookingValue.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>

          {/* Peak Hours Analysis */}
          <div className={`rounded-xl shadow-lg p-4 sm:p-6 ${darkModeClasses.cardBg}`}>
            <h3 className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center ${darkModeClasses.text}`}>
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              Peak Hours Analysis
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {customerInsights.peakHours.map((hour, index) => (
                <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                  isDarkMode ? 'bg-gray-600' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mr-2 sm:mr-3 shrink-0">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <span className={`font-medium text-sm sm:text-base ${darkModeClasses.text}`}>{hour.hour}</span>
                  </div>
                  <div className="flex items-center">
                    <div className={`w-16 sm:w-32 rounded-full h-2 mr-2 sm:mr-3 ${isDarkMode ? 'bg-gray-500' : 'bg-gray-200'}`}>
                      <div 
                        className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                        style={{ width: `${(hour.bookings / 100) * 100}%` }}
                      ></div>
                    </div>
                    <span className={`font-semibold text-sm sm:text-base w-8 sm:w-12 text-right ${darkModeClasses.text}`}>{hour.bookings}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className={`mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg border ${
              isDarkMode ? 'bg-gray-800 border-blue-800' : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200'
            }`}>
              <h4 className={`font-semibold mb-1 sm:mb-2 text-sm sm:text-base ${darkModeClasses.text}`}>Recommendation</h4>
              <p className={`text-xs sm:text-sm ${darkModeClasses.textSecondary}`}>
                Pertimbangkan untuk menyesuaikan staff scheduling dan inventory berdasarkan peak hours untuk 
                mengoptimalkan customer experience dan operational efficiency.
              </p>
            </div>
          </div>
        </div>

        {/* Export Options */}
        <div className={`rounded-xl shadow-lg p-4 sm:p-6 ${darkModeClasses.cardBg}`}>
          <h3 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 ${darkModeClasses.text}`}>Export Reports</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            <div className={`border rounded-lg p-3 sm:p-4 transition-colors ${
              isDarkMode ? 'border-gray-700 hover:border-blue-500' : 'border-gray-300 hover:border-blue-500'
            }`}>
              <div className="flex items-center mb-2 sm:mb-3">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 mr-2 sm:mr-3" />
                <h4 className={`font-semibold text-sm sm:text-base ${darkModeClasses.text}`}>Revenue Report</h4>
              </div>
              <p className={`text-xs sm:text-sm mb-3 sm:mb-4 ${darkModeClasses.textSecondary}`}>Detailed revenue analysis dengan breakdown per service dan location</p>
              <button 
                onClick={() => exportReport('pdf')}
                className={`w-full py-2 px-3 sm:px-4 rounded-lg transition-colors text-xs sm:text-sm ${
                  isDarkMode ? 'bg-red-900 text-red-300 hover:bg-red-800' : 'bg-red-100 text-red-700 hover:bg-red-200'
                }`}
              >
                Export PDF
              </button>
            </div>
            
            <div className={`border rounded-lg p-3 sm:p-4 transition-colors ${
              isDarkMode ? 'border-gray-700 hover:border-green-500' : 'border-gray-300 hover:border-green-500'
            }`}>
              <div className="flex items-center mb-2 sm:mb-3">
                <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-2 sm:mr-3" />
                <h4 className={`font-semibold text-sm sm:text-base ${darkModeClasses.text}`}>Customer Analytics</h4>
              </div>
              <p className={`text-xs sm:text-sm mb-3 sm:mb-4 ${darkModeClasses.textSecondary}`}>Customer behavior analysis dan retention metrics</p>
              <button 
                onClick={() => exportReport('excel')}
                className={`w-full py-2 px-3 sm:px-4 rounded-lg transition-colors text-xs sm:text-sm ${
                  isDarkMode ? 'bg-green-900 text-green-300 hover:bg-green-800' : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                Export Excel
              </button>
            </div>
            
            <div className={`border rounded-lg p-3 sm:p-4 transition-colors ${
              isDarkMode ? 'border-gray-700 hover:border-blue-500' : 'border-gray-300 hover:border-blue-500'
            }`}>
              <div className="flex items-center mb-2 sm:mb-3">
                <PieChart className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 mr-2 sm:mr-3" />
                <h4 className={`font-semibold text-sm sm:text-base ${darkModeClasses.text}`}>Operational Report</h4>
              </div>
              <p className={`text-xs sm:text-sm mb-3 sm:mb-4 ${darkModeClasses.textSecondary}`}>Complete operational metrics dan performance indicators</p>
              <button 
                onClick={() => exportReport('both')}
                className={`w-full py-2 px-3 sm:px-4 rounded-lg transition-colors text-xs sm:text-sm ${
                  isDarkMode ? 'bg-blue-900 text-blue-300 hover:bg-blue-800' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                Export Both
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;