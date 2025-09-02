/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDarkMode } from "../components/DarkModeContext";

import { 
  Search, 
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CreditCard,
  Calendar,
  Receipt,
  RefreshCw,
  ChevronDown,
  MoreVertical
} from 'lucide-react';

// Mock Data
const mockTransactions = [
  { 
    id: 1, 
    transactionId: 'TXN-001-2024', 
    reservation: 'RSV-001', 
    customer: 'John Doe', 
    customerEmail: 'john@email.com',
    amount: 1500000, 
    status: 'paid', 
    paymentStatus: 'completed',
    date: '2024-08-24', 
    time: '14:30',
    method: 'Credit Card',
    provider: 'Visa **** 1234',
    fee: 45000,
    netAmount: 1455000
  },
  { 
    id: 2, 
    transactionId: 'TXN-002-2024', 
    reservation: 'RSV-002', 
    customer: 'Jane Smith', 
    customerEmail: 'jane@email.com',
    amount: 500000, 
    status: 'pending', 
    paymentStatus: 'processing',
    date: '2024-08-24', 
    time: '16:15',
    method: 'Bank Transfer',
    provider: 'BCA Transfer',
    fee: 2500,
    netAmount: 497500
  },
  { 
    id: 3, 
    transactionId: 'TXN-003-2024', 
    reservation: 'RSV-003', 
    customer: 'Bob Johnson', 
    customerEmail: 'bob@email.com',
    amount: 800000, 
    status: 'failed', 
    paymentStatus: 'failed',
    date: '2024-08-23', 
    time: '09:45',
    method: 'E-Wallet',
    provider: 'GoPay',
    fee: 0,
    netAmount: 0
  },
  { 
    id: 4, 
    transactionId: 'TXN-004-2024', 
    reservation: 'RSV-004', 
    customer: 'Alice Brown', 
    customerEmail: 'alice@email.com',
    amount: 350000, 
    status: 'refunded', 
    paymentStatus: 'refunded',
    date: '2024-08-23', 
    time: '11:20',
    method: 'Credit Card',
    provider: 'Mastercard **** 5678',
    fee: 10500,
    netAmount: 339500
  },
  { 
    id: 5, 
    transactionId: 'TXN-005-2024', 
    reservation: 'RSV-005', 
    customer: 'Charlie Wilson', 
    customerEmail: 'charlie@email.com',
    amount: 2500000, 
    status: 'paid', 
    paymentStatus: 'completed',
    date: '2024-08-22', 
    time: '13:10',
    method: 'Bank Transfer',
    provider: 'Mandiri Transfer',
    fee: 5000,
    netAmount: 2495000
  }
];

const PaymentManagement = () => {
  const { isDarkMode } = useDarkMode();
  const [transactions, setTransactions] = useState(mockTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.reservation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesMethod = methodFilter === 'all' || transaction.method === methodFilter;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const handlePaymentAction = (id, action) => {
    setTransactions(transactions.map(t => 
      t.id === id ? { ...t, status: action, paymentStatus: action === 'paid' ? 'completed' : action } : t
    ));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'paid': return isDarkMode ? 'bg-green-900/30 text-green-300 border-green-700' : 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return isDarkMode ? 'bg-yellow-900/30 text-yellow-300 border-yellow-700' : 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed': return isDarkMode ? 'bg-red-900/30 text-red-300 border-red-700' : 'bg-red-100 text-red-800 border-red-200';
      case 'refunded': return isDarkMode ? 'bg-blue-900/30 text-blue-300 border-blue-700' : 'bg-blue-100 text-blue-800 border-blue-200';
      default: return isDarkMode ? 'bg-gray-800 text-gray-300 border-gray-700' : 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMethodIcon = (method) => {
    switch(method) {
      case 'Credit Card': return <CreditCard className="w-4 h-4" />;
      case 'Bank Transfer': return <Receipt className="w-4 h-4" />;
      case 'E-Wallet': return <DollarSign className="w-4 h-4" />;
      default: return <DollarSign className="w-4 h-4" />;
    }
  };

  // Calculate summary statistics
  const totalRevenue = transactions.filter(t => t.status === 'paid').reduce((sum, t) => sum + t.netAmount, 0);
  const pendingAmount = transactions.filter(t => t.status === 'pending').reduce((sum, t) => sum + t.amount, 0);
  const refundAmount = transactions.filter(t => t.status === 'refunded').reduce((sum, t) => sum + t.amount, 0);
  const successRate = transactions.length > 0 ? ((transactions.filter(t => t.status === 'paid').length / transactions.length) * 100).toFixed(1) : 0;

  const handleViewDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setShowModal(true);
  };

  const toggleRowExpansion = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  // Classes untuk mode gelap
  const bgClass = isDarkMode ? 'bg-gray-900' : 'bg-white';
  const textClass = isDarkMode ? 'text-gray-100' : 'text-gray-900';
  const cardClass = isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  const inputClass = isDarkMode 
    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
    : 'border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500';

  return (
    <div className={`space-y-6 min-h-screen p-4 sm:p-6 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className={`text-2xl sm:text-3xl font-bold ${textClass}`}>Manajemen Pembayaran</h1>
          <p className={`mt-1 sm:mt-2 text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Monitor dan kelola semua transaksi pembayaran</p>
        </div>
      </div>

      {/* Payment Summary Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className={`rounded-xl shadow-lg p-4 sm:p-6 border-l-4 border-green-500 ${cardClass}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Pendapatan</p>
              <p className="text-xl sm:text-2xl font-bold text-green-600">Rp {totalRevenue.toLocaleString('id-ID')}</p>
              <p className="text-xs sm:text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                +12.5%
              </p>
            </div>
            <div className={`p-2 sm:p-3 rounded-full ${isDarkMode ? 'bg-green-900/30' : 'bg-green-100'}`}>
              <DollarSign className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className={`rounded-xl shadow-lg p-4 sm:p-6 border-l-4 border-yellow-500 ${cardClass}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Pending Payment</p>
              <p className="text-xl sm:text-2xl font-bold text-yellow-600">Rp {pendingAmount.toLocaleString('id-ID')}</p>
              <p className={`text-xs sm:text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {transactions.filter(t => t.status === 'pending').length} transaksi
              </p>
            </div>
            <div className={`p-2 sm:p-3 rounded-full ${isDarkMode ? 'bg-yellow-900/30' : 'bg-yellow-100'}`}>
              <Clock className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className={`rounded-xl shadow-lg p-4 sm:p-6 border-l-4 border-red-500 ${cardClass}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Refund</p>
              <p className="text-xl sm:text-2xl font-bold text-red-600">Rp {refundAmount.toLocaleString('id-ID')}</p>
              <p className={`text-xs sm:text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {transactions.filter(t => t.status === 'refunded').length} refund
              </p>
            </div>
            <div className={`p-2 sm:p-3 rounded-full ${isDarkMode ? 'bg-red-900/30' : 'bg-red-100'}`}>
              <AlertTriangle className="w-4 h-4 sm:w-6 sm:h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className={`rounded-xl shadow-lg p-4 sm:p-6 border-l-4 border-blue-500 ${cardClass}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Success Rate</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-600">{successRate}%</p>
              <p className={`text-xs sm:text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Tingkat keberhasilan</p>
            </div>
            <div className={`p-2 sm:p-3 rounded-full ${isDarkMode ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
              <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={`rounded-xl shadow-lg p-4 sm:p-6 ${cardClass}`}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari transaksi, customer, atau ID reservasi..."
                  className={`w-full pl-9 sm:pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent text-sm sm:text-base ${inputClass}`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="sm:hidden">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`w-full flex justify-between items-center px-4 py-2 border rounded-lg ${inputClass}`}
              >
                <span>Filter Options</span>
                <ChevronDown className={`w-4 h-4 transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
          
          <div className={`${showFilters ? 'flex' : 'hidden'} sm:flex flex-col sm:flex-row gap-3`}>
            <select
              className={`px-3 sm:px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${inputClass}`}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Semua Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>
            <select
              className={`px-3 sm:px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${inputClass}`}
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
            >
              <option value="all">Semua Method</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="E-Wallet">E-Wallet</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className={`rounded-xl shadow-lg overflow-hidden ${cardClass}`}>
        <div className={`px-4 sm:px-6 py-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className={`text-lg font-semibold ${textClass}`}>
            Riwayat Transaksi ({filteredTransactions.length})
          </h3>
        </div>
        
        {/* Mobile View - Card Layout */}
        <div className="sm:hidden">
          {filteredTransactions.map((transaction) => (
            <div 
              key={transaction.id} 
              className={`border-b p-4 ${isDarkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50'} transition-colors duration-150`}
              onClick={() => toggleRowExpansion(transaction.id)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`text-sm font-mono font-medium ${textClass}`}>{transaction.transactionId}</div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </div>
                  
                  <div className="mb-2">
                    <div className={`text-sm font-medium ${textClass}`}>{transaction.customer}</div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{transaction.customerEmail}</div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <div className={`text-sm font-semibold ${textClass}`}>
                      Rp {transaction.amount.toLocaleString('id-ID')}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {transaction.date}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {getMethodIcon(transaction.method)}
                      </div>
                      <div className={`text-xs ${textClass}`}>{transaction.method}</div>
                    </div>
                    <ChevronDown className={`w-4 h-4 transform ${expandedRow === transaction.id ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </div>
              
              {/* Expanded Content */}
              {expandedRow === transaction.id && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Reservation ID</div>
                      <div className="font-medium">{transaction.reservation}</div>
                    </div>
                    <div>
                      <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Provider</div>
                      <div className="font-medium">{transaction.provider}</div>
                    </div>
                    <div>
                      <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Fee</div>
                      <div className="font-medium">Rp {transaction.fee.toLocaleString('id-ID')}</div>
                    </div>
                    <div>
                      <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Net Amount</div>
                      <div className="font-medium text-green-600">Rp {transaction.netAmount.toLocaleString('id-ID')}</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2 mt-4">
                    <button 
                      className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-100 rounded dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/30"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetails(transaction);
                      }}
                      title="Lihat Detail"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {transaction.status === 'pending' && (
                      <>
                        <button 
                          className="text-green-600 hover:text-green-800 p-1 hover:bg-green-100 rounded dark:text-green-400 dark:hover:text-green-300 dark:hover:bg-green-900/30"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePaymentAction(transaction.id, 'paid');
                          }}
                          title="Konfirmasi Pembayaran"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-800 p-1 hover:bg-red-100 rounded dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/30"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePaymentAction(transaction.id, 'failed');
                          }}
                          title="Tolak Pembayaran"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    {transaction.status === 'paid' && (
                      <button 
                        className="text-orange-600 hover:text-orange-800 p-1 hover:bg-orange-100 rounded dark:text-orange-400 dark:hover:text-orange-300 dark:hover:bg-orange-900/30"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePaymentAction(transaction.id, 'refunded');
                        }}
                        title="Process Refund"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Desktop View - Table Layout */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className={isDarkMode ? "bg-gray-800" : "bg-gray-50"}>
              <tr>
                <th className={`px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Transaction ID
                </th>
                <th className={`px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Customer
                </th>
                <th className={`px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Amount
                </th>
                <th className={`px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Method
                </th>
                <th className={`px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Status
                </th>
                <th className={`px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Date
                </th>
                <th className={`px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700 bg-gray-900' : 'divide-gray-200 bg-white'}`}>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className={isDarkMode ? "hover:bg-gray-800 transition-colors duration-150" : "hover:bg-gray-50 transition-colors duration-150"}>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className={`text-sm font-mono font-medium ${textClass}`}>{transaction.transactionId}</div>
                      <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{transaction.reservation}</div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className={`text-sm font-medium ${textClass}`}>{transaction.customer}</div>
                      <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{transaction.customerEmail}</div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className={`text-sm font-semibold ${textClass}`}>
                        Rp {transaction.amount.toLocaleString('id-ID')}
                      </div>
                      {transaction.fee > 0 && (
                        <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Fee: Rp {transaction.fee.toLocaleString('id-ID')}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {getMethodIcon(transaction.method)}
                      </div>
                      <div>
                        <div className={`text-sm ${textClass}`}>{transaction.method}</div>
                        <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{transaction.provider}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm flex items-center ${textClass}`}>
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      {transaction.date}
                    </div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{transaction.time}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-100 rounded dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/30"
                        onClick={() => handleViewDetails(transaction)}
                        title="Lihat Detail"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {transaction.status === 'pending' && (
                        <>
                          <button 
                            className="text-green-600 hover:text-green-800 p-1 hover:bg-green-100 rounded dark:text-green-400 dark:hover:text-green-300 dark:hover:bg-green-900/30"
                            onClick={() => handlePaymentAction(transaction.id, 'paid')}
                            title="Konfirmasi Pembayaran"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-800 p-1 hover:bg-red-100 rounded dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/30"
                            onClick={() => handlePaymentAction(transaction.id, 'failed')}
                            title="Tolak Pembayaran"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      {transaction.status === 'paid' && (
                        <button 
                          className="text-orange-600 hover:text-orange-800 p-1 hover:bg-orange-100 rounded dark:text-orange-400 dark:hover:text-orange-300 dark:hover:bg-orange-900/30"
                          onClick={() => handlePaymentAction(transaction.id, 'refunded')}
                          title="Process Refund"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Detail Modal */}
      {showModal && selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`rounded-2xl p-4 sm:p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold">Detail Transaksi</h3>
              <button 
                onClick={() => setShowModal(false)}
                className={`p-2 rounded-full ${isDarkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <Receipt className="w-5 h-5 mr-2" />
                  Informasi Transaksi
                </h4>
                <div className={`space-y-2 text-sm p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <p><span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Transaction ID:</span> <span className="font-mono">{selectedTransaction.transactionId}</span></p>
                  <p><span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Reservation ID:</span> <span className="font-mono">{selectedTransaction.reservation}</span></p>
                  <p><span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Tanggal:</span> {selectedTransaction.date} {selectedTransaction.time}</p>
                  <p><span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Method:</span> {selectedTransaction.method}</p>
                  <p><span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Provider:</span> {selectedTransaction.provider}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Detail Pembayaran
                </h4>
                <div className={`space-y-2 text-sm p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex justify-between">
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Amount:</span>
                    <span className="font-semibold">Rp {selectedTransaction.amount.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Fee:</span>
                    <span className="text-red-600 dark:text-red-400">- Rp {selectedTransaction.fee.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="border-t pt-2 mt-2 dark:border-gray-600">
                    <div className="flex justify-between">
                      <span className={`font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Net Amount:</span>
                      <span className="font-bold text-lg">Rp {selectedTransaction.netAmount.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Status:</span>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(selectedTransaction.status)}`}>
                      {selectedTransaction.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Customer Information</h4>
              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {selectedTransaction.customer.split(' ').map(n => n[0]).join('').slice(0,2)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{selectedTransaction.customer}</p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{selectedTransaction.customerEmail}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 mt-6 pt-6 border-t dark:border-gray-700">
              <button 
                onClick={() => setShowModal(false)}
                className={`px-4 py-2 border rounded-lg ${isDarkMode ? 'text-gray-300 border-gray-600 hover:bg-gray-700 hover:text-white' : 'text-gray-600 border-gray-300 hover:bg-gray-50 hover:text-gray-800'}`}
              >
                Tutup
              </button>
              {selectedTransaction.status === 'pending' && (
                <>
                  <button 
                    onClick={() => {
                      handlePaymentAction(selectedTransaction.id, 'paid');
                      setShowModal(false);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Konfirmasi Pembayaran
                  </button>
                  <button 
                    onClick={() => {
                      handlePaymentAction(selectedTransaction.id, 'failed');
                      setShowModal(false);
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Tolak Pembayaran
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentManagement;