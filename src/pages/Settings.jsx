/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDarkMode } from "../components/DarkModeContext";

import { 
  Bell,
  Settings as SettingsIcon,
  CreditCard,
  Mail,
  MessageSquare,
  Smartphone,
  Clock,
  DollarSign,
  Percent,
  Shield,
  Database,
  Globe,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

const Settings = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [settings, setSettings] = useState({
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    whatsappNotifications: true,
    pushNotifications: true,
    
    // Booking Settings  
    autoConfirmation: false,
    refundPolicy: 24,
    maxBookingAdvance: 90,
    minBookingAdvance: 2,
    allowSameDayBooking: true,
    
    // Payment Settings
    dynamicPricing: true,
    weekendSurcharge: 15,
    holidaySurcharge: 25,
    lateBookingFee: 10,
    
    // System Settings
    maintenanceMode: false,
    debugMode: false,
    autoBackup: true,
    sessionTimeout: 30,
    
    // Business Settings
    businessName: 'ReservasiPro',
    businessEmail: 'admin@reservasipro.com',
    businessPhone: '+62-21-1234567',
    timezone: 'Asia/Jakarta',
    currency: 'IDR',
    language: 'id'
  });

  const [activeTab, setActiveTab] = useState('notifications');
  const [saveStatus, setSaveStatus] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const ToggleSwitch = ({ checked, onChange, label, description }) => (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1">
        <div className={`font-medium text-sm sm:text-base ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{label}</div>
        {description && <div className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{description}</div>}
      </div>
      <button
        className={`w-10 h-5 sm:w-12 sm:h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          checked ? 'bg-blue-600' : isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
        }`}
        onClick={() => onChange(!checked)}
      >
        <div
          className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full shadow-md transform transition-transform duration-200 ${
            checked ? 'translate-x-5 sm:translate-x-6' : 'translate-x-1'
          } ${isDarkMode ? 'bg-gray-300' : 'bg-white'}`}
        />
      </button>
    </div>
  );

  const tabs = [
    { id: 'notifications', label: 'Notifikasi', icon: Bell },
    { id: 'booking', label: 'Reservasi', icon: Clock },
    { id: 'payment', label: 'Pembayaran', icon: CreditCard },
    { id: 'system', label: 'Sistem', icon: SettingsIcon },
    { id: 'business', label: 'Bisnis', icon: Globe }
  ];

  // Classes untuk mode gelap
  const bgColor = isDarkMode ? 'bg-gray-900' : 'bg-gray-50';
  const textColor = isDarkMode ? 'text-gray-100' : 'text-gray-900';
  const secondaryTextColor = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const cardBg = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const lightCardBg = isDarkMode ? 'bg-gray-700' : 'bg-gray-50';
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200';
  const inputBg = isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300';
  const buttonBg = isDarkMode ? 'bg-gray-700 text-gray-100 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200';
  const saveButtonBg = isDarkMode ? 'bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900' : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800';

  return (
    <div className={`space-y-6 min-h-screen p-4 sm:p-6 ${bgColor}`}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className={`text-2xl sm:text-3xl font-bold ${textColor}`}>Pengaturan Sistem</h1>
          <p className={`mt-1 sm:mt-2 text-sm sm:text-base ${secondaryTextColor}`}>Konfigurasi dan personalisasi sistem reservasi Anda</p>
        </div>
        <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
          <button 
            onClick={() => window.location.reload()}
            className={`px-3 sm:px-4 py-2 rounded-lg flex items-center text-sm sm:text-base ${buttonBg}`}
          >
            <RefreshCw className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden xs:inline">Reset</span>
          </button>
          <button 
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
            className={`text-white px-4 sm:px-6 py-2 rounded-lg flex items-center shadow-md disabled:opacity-50 text-sm sm:text-base ${saveButtonBg}`}
          >
            {saveStatus === 'saving' ? (
              <RefreshCw className="w-4 h-4 mr-1 sm:mr-2 animate-spin" />
            ) : saveStatus === 'saved' ? (
              <CheckCircle className="w-4 h-4 mr-1 sm:mr-2" />
            ) : (
              <Save className="w-4 h-4 mr-1 sm:mr-2" />
            )}
            {saveStatus === 'saving' ? 'Menyimpan...' : saveStatus === 'saved' ? 'Tersimpan!' : 'Simpan'}
          </button>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <button 
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className={`w-full flex justify-between items-center px-4 py-3 rounded-lg ${cardBg} ${textColor} border ${borderColor}`}
        >
          <span className="flex items-center">
            {tabs.find(tab => tab.id === activeTab)?.icon && 
              React.createElement(tabs.find(tab => tab.id === activeTab)?.icon, { className: "w-5 h-5 mr-2" })
            }
            {tabs.find(tab => tab.id === activeTab)?.label || 'Pilih Menu'}
          </span>
          <ChevronDown className={`w-5 h-5 transform ${showMobileMenu ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Sidebar Tabs */}
        <div className={`lg:col-span-1 ${showMobileMenu ? 'block' : 'hidden'} lg:block`}>
          <nav className={`${cardBg} rounded-xl shadow-lg p-2`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setShowMobileMenu(false);
                }}
                className={`w-full flex items-center px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-left transition-colors mb-1 text-sm sm:text-base ${
                  activeTab === tab.id
                    ? isDarkMode 
                      ? 'bg-blue-900 text-blue-100 border-r-2 border-blue-500' 
                      : 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : `${textColor} hover:${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`
                }`}
              >
                <tab.icon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className={`${cardBg} rounded-xl shadow-lg p-4 sm:p-6`}>
            
            {/* Notifications Settings */}
            {activeTab === 'notifications' && (
              <div>
                <h3 className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center ${textColor}`}>
                  <Bell className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                  Pengaturan Notifikasi
                </h3>
                
                <div className="space-y-4 sm:space-y-6">
                  <div className={`${lightCardBg} rounded-lg p-3 sm:p-4`}>
                    <h4 className={`font-semibold mb-3 sm:mb-4 flex items-center ${textColor}`}>
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Email Notifications
                    </h4>
                    <ToggleSwitch
                      checked={settings.emailNotifications}
                      onChange={(value) => handleSettingChange('emailNotifications', value)}
                      label="Enable Email Notifications"
                      description="Kirim notifikasi via email untuk reservasi baru, pembayaran, dll"
                    />
                  </div>

                  <div className={`${lightCardBg} rounded-lg p-3 sm:p-4`}>
                    <h4 className={`font-semibold mb-3 sm:mb-4 flex items-center ${textColor}`}>
                      <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      SMS Notifications
                    </h4>
                    <ToggleSwitch
                      checked={settings.smsNotifications}
                      onChange={(value) => handleSettingChange('smsNotifications', value)}
                      label="Enable SMS Notifications"
                      description="Kirim SMS untuk konfirmasi reservasi dan reminder"
                    />
                  </div>

                  <div className={`${lightCardBg} rounded-lg p-3 sm:p-4`}>
                    <h4 className={`font-semibold mb-3 sm:mb-4 flex items-center ${textColor}`}>
                      <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      WhatsApp Notifications
                    </h4>
                    <ToggleSwitch
                      checked={settings.whatsappNotifications}
                      onChange={(value) => handleSettingChange('whatsappNotifications', value)}
                      label="Enable WhatsApp Notifications"
                      description="Kirim notifikasi via WhatsApp Business API"
                    />
                  </div>

                  <div className={`${lightCardBg} rounded-lg p-3 sm:p-4`}>
                    <h4 className={`font-semibold mb-3 sm:mb-4 ${textColor}`}>Push Notifications</h4>
                    <ToggleSwitch
                      checked={settings.pushNotifications}
                      onChange={(value) => handleSettingChange('pushNotifications', value)}
                      label="Enable Push Notifications"
                      description="Notifikasi real-time di browser dan mobile app"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Payment Settings */}
            {activeTab === 'payment' && (
              <div>
                <h3 className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center ${textColor}`}>
                  <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                  Pengaturan Pembayaran
                </h3>
                
                <div className="space-y-4 sm:space-y-6">
                  <div className={`${lightCardBg} rounded-lg p-3 sm:p-4`}>
                    <ToggleSwitch
                      checked={settings.dynamicPricing}
                      onChange={(value) => handleSettingChange('dynamicPricing', value)}
                      label="Dynamic Pricing"
                      description="Enable harga yang berbeda untuk weekend dan holiday"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    <div className={`${lightCardBg} rounded-lg p-3 sm:p-4`}>
                      <label className={`block text-sm font-medium mb-2 items-center ${textColor}`}>
                        <Percent className="w-4 h-4 mr-1" />
                        Weekend Surcharge (%)
                      </label>
                      <input
                        type="number"
                        value={settings.weekendSurcharge}
                        onChange={(e) => handleSettingChange('weekendSurcharge', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${inputBg}`}
                        min="0"
                        max="100"
                        disabled={!settings.dynamicPricing}
                      />
                      <p className={`text-xs mt-1 ${secondaryTextColor}`}>Tambahan biaya weekend</p>
                    </div>

                    <div className={`${lightCardBg} rounded-lg p-3 sm:p-4`}>
                      <label className={`block text-sm font-medium mb-2 items-center ${textColor}`}>
                        <Percent className="w-4 h-4 mr-1" />
                        Holiday Surcharge (%)
                      </label>
                      <input
                        type="number"
                        value={settings.holidaySurcharge}
                        onChange={(e) => handleSettingChange('holidaySurcharge', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${inputBg}`}
                        min="0"
                        max="100"
                        disabled={!settings.dynamicPricing}
                      />
                      <p className={`text-xs mt-1 ${secondaryTextColor}`}>Tambahan biaya hari libur</p>
                    </div>

                    <div className={`${lightCardBg} rounded-lg p-3 sm:p-4`}>
                      <label className={`block text-sm font-medium mb-2 items-center ${textColor}`}>
                        <Percent className="w-4 h-4 mr-1" />
                        Late Booking Fee (%)
                      </label>
                      <input
                        type="number"
                        value={settings.lateBookingFee}
                        onChange={(e) => handleSettingChange('lateBookingFee', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${inputBg}`}
                        min="0"
                        max="50"
                      />
                      <p className={`text-xs mt-1 ${secondaryTextColor}`}>Fee untuk booking mendadak</p>
                    </div>
                  </div>

                  {/* Payment Gateway Configuration */}
                  <div className={`${lightCardBg} rounded-lg p-3 sm:p-4`}>
                    <h4 className={`font-semibold mb-3 sm:mb-4 flex items-center ${textColor}`}>
                      <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Payment Gateway Configuration
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                      {[
                        { name: 'Midtrans', status: 'Connected', color: 'green' },
                        { name: 'Xendit', status: 'Connected', color: 'green' },
                        { name: 'DOKU', status: 'Disconnected', color: 'red' }
                      ].map((gateway) => (
                        <div key={gateway.name} className={`border rounded-lg p-3 sm:p-4 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}>
                          <div className="flex justify-between items-center mb-2 sm:mb-3">
                            <h5 className={`font-medium text-sm sm:text-base ${textColor}`}>{gateway.name}</h5>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              gateway.color === 'green' 
                                ? isDarkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
                                : isDarkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800'
                            }`}>
                              {gateway.status}
                            </span>
                          </div>
                          <button className={`w-full py-2 px-3 rounded-lg text-xs sm:text-sm transition-colors ${
                            isDarkMode 
                              ? 'bg-blue-800 text-blue-200 hover:bg-blue-700' 
                              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                          }`}>
                            Configure
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* System Settings */}
            {activeTab === 'system' && (
              <div>
                <h3 className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center ${textColor}`}>
                  <SettingsIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                  Pengaturan Sistem
                </h3>
                
                <div className="space-y-4 sm:space-y-6">
                  <div className={`${isDarkMode ? 'bg-red-900 border-red-700' : 'bg-red-50 border-red-200'} border rounded-lg p-3 sm:p-4`}>
                    <div className="flex items-center mb-2 sm:mb-3">
                      <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 mr-2" />
                      <h4 className={`font-semibold text-sm sm:text-base ${isDarkMode ? 'text-red-300' : 'text-red-900'}`}>Maintenance Mode</h4>
                    </div>
                    <ToggleSwitch
                      checked={settings.maintenanceMode}
                      onChange={(value) => handleSettingChange('maintenanceMode', value)}
                      label="Enable Maintenance Mode"
                      description="Sistem akan offline untuk customer, hanya admin yang bisa akses"
                    />
                  </div>

                  <div className={`${lightCardBg} rounded-lg p-3 sm:p-4`}>
                    <h4 className={`font-semibold mb-3 sm:mb-4 flex items-center ${textColor}`}>
                      <Database className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Database & Backup
                    </h4>
                    <ToggleSwitch
                      checked={settings.autoBackup}
                      onChange={(value) => handleSettingChange('autoBackup', value)}
                      label="Auto Backup"
                      description="Backup otomatis database setiap hari pada pukul 02:00"
                    />
                    
                    <div className={`mt-3 sm:mt-4 pt-3 sm:pt-4 border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                      <button className={`px-3 sm:px-4 py-2 rounded-lg mr-2 text-xs sm:text-sm ${
                        isDarkMode 
                          ? 'bg-blue-800 text-blue-200 hover:bg-blue-700' 
                          : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      }`}>
                        Backup Now
                      </button>
                      <button className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm ${
                        isDarkMode 
                          ? 'bg-green-800 text-green-200 hover:bg-green-700' 
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}>
                        Download Backup
                      </button>
                    </div>
                  </div>

                  <div className={`${lightCardBg} rounded-lg p-3 sm:p-4`}>
                    <h4 className={`font-semibold mb-3 sm:mb-4 flex items-center ${textColor}`}>
                      <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Security Settings
                    </h4>
                    <div className="space-y-3 sm:space-y-4">
                      <ToggleSwitch
                        checked={settings.debugMode}
                        onChange={(value) => handleSettingChange('debugMode', value)}
                        label="Debug Mode"
                        description="Enable untuk troubleshooting (hanya untuk development)"
                      />
                      
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${textColor}`}>
                          Session Timeout (menit)
                        </label>
                        <input
                          type="number"
                          value={settings.sessionTimeout}
                          onChange={(e) => handleSettingChange('sessionTimeout', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${inputBg}`}
                          min="5"
                          max="480"
                        />
                        <p className={`text-xs mt-1 ${secondaryTextColor}`}>User akan auto logout setelah tidak aktif</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Business Settings */}
            {activeTab === 'business' && (
              <div>
                <h3 className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center ${textColor}`}>
                  <Globe className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                  Pengaturan Bisnis
                </h3>
                
                <div className="space-y-4 sm:space-y-6">
                  <div className={`${lightCardBg} rounded-lg p-3 sm:p-4`}>
                    <h4 className={`font-semibold mb-3 sm:mb-4 ${textColor}`}>Informasi Bisnis</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${textColor}`}>
                          Nama Bisnis
                        </label>
                        <input
                          type="text"
                          value={settings.businessName}
                          onChange={(e) => handleSettingChange('businessName', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${inputBg}`}
                        />
                      </div>
                      
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${textColor}`}>
                          Email Bisnis
                        </label>
                        <input
                          type="email"
                          value={settings.businessEmail}
                          onChange={(e) => handleSettingChange('businessEmail', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${inputBg}`}
                        />
                      </div>
                      
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${textColor}`}>
                          Nomor Telepon
                        </label>
                        <input
                          type="tel"
                          value={settings.businessPhone}
                          onChange={(e) => handleSettingChange('businessPhone', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${inputBg}`}
                        />
                      </div>
                      
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${textColor}`}>
                          Timezone
                        </label>
                        <select
                          value={settings.timezone}
                          onChange={(e) => handleSettingChange('timezone', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${inputBg}`}
                        >
                          <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
                          <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
                          <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className={`${lightCardBg} rounded-lg p-3 sm:p-4`}>
                    <h4 className={`font-semibold mb-3 sm:mb-4 ${textColor}`}>Localization</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${textColor}`}>
                          Currency
                        </label>
                        <select
                          value={settings.currency}
                          onChange={(e) => handleSettingChange('currency', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${inputBg}`}
                        >
                          <option value="IDR">Indonesian Rupiah (IDR)</option>
                          <option value="USD">US Dollar (USD)</option>
                          <option value="EUR">Euro (EUR)</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${textColor}`}>
                          Language
                        </label>
                        <select
                          value={settings.language}
                          onChange={(e) => handleSettingChange('language', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${inputBg}`}
                        >
                          <option value="id">Bahasa Indonesia</option>
                          <option value="en">English</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className={`${isDarkMode ? 'bg-blue-900 border-blue-700' : 'bg-blue-50 border-blue-200'} border rounded-lg p-3 sm:p-4`}>
                    <div className="flex items-center mb-2 sm:mb-3">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mr-2" />
                      <h4 className={`font-semibold text-sm sm:text-base ${isDarkMode ? 'text-blue-300' : 'text-blue-900'}`}>System Status</h4>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm">
                      <div className="text-center">
                        <div className={`font-semibold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>Operational</div>
                        <div className={secondaryTextColor}>Database</div>
                      </div>
                      <div className="text-center">
                        <div className={`font-semibold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>Online</div>
                        <div className={secondaryTextColor}>Payment Gateway</div>
                      </div>
                      <div className="text-center">
                        <div className={`font-semibold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>Active</div>
                        <div className={secondaryTextColor}>Notifications</div>
                      </div>
                      <div className="text-center">
                        <div className={`font-semibold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>99.9%</div>
                        <div className={secondaryTextColor}>Uptime</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Save Status Alert */}
      {saveStatus && (
        <div className={`fixed bottom-4 right-4 p-3 sm:p-4 rounded-lg shadow-lg text-sm sm:text-base ${
          saveStatus === 'saving' 
            ? isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
            : saveStatus === 'saved' 
              ? isDarkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'
              : isDarkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'
        }`}>
          <div className="flex items-center">
            {saveStatus === 'saving' ? (
              <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
            ) : (
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            )}
            {saveStatus === 'saving' ? 'Menyimpan pengaturan...' : 'Pengaturan berhasil disimpan!'}
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;