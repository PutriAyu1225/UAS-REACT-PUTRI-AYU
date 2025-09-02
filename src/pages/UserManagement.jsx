import React, { useState, useEffect } from 'react';
import { useDarkMode } from "../components/DarkModeContext";

import { 
  Search, 
  Plus, 
  Filter,
  Download,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Users,
  Mail,
  Phone,
  Calendar,
  Shield,
  UserCheck,
  ChevronDown,
  X,
  MoreVertical
} from 'lucide-react';

// Mock Data
const mockUsers = [
  { 
    id: 1, 
    name: 'Admin User', 
    email: 'admin@reservasi.com', 
    phone: '+62812345678',
    role: 'admin', 
    status: 'active', 
    lastLogin: '2024-08-24',
    joinDate: '2023-01-15',
    totalReservations: 0,
    avatar: null
  },
  { 
    id: 2, 
    name: 'Staff Member', 
    email: 'staff@reservasi.com', 
    phone: '+62812345679',
    role: 'staff', 
    status: 'active', 
    lastLogin: '2024-08-23',
    joinDate: '2023-03-20',
    totalReservations: 0,
    avatar: null
  },
  { 
    id: 3, 
    name: 'Aep', 
    email: 'aep.doe@email.com', 
    phone: '+62812345680',
    role: 'customer', 
    status: 'active', 
    lastLogin: '2024-08-22',
    joinDate: '2023-06-10',
    totalReservations: 15,
    avatar: null
  },
  { 
    id: 4, 
    name: 'Smith', 
    email: 'jane.smith@email.com', 
    phone: '+62812345681',
    role: 'staff', 
    status: 'suspended', 
    lastLogin: '2024-08-20',
    joinDate: '2023-08-05',
    totalReservations: 3,
    avatar: null
  },
  { 
    id: 5, 
    name: 'Bob son', 
    email: 'bob.son@email.com', 
    phone: '+62812345682',
    role: 'staff', 
    status: 'active', 
    lastLogin: '2024-08-24',
    joinDate: '2024-01-12',
    totalReservations: 8,
    avatar: null
  }
];

const UserManagement = () => {
  const { isDarkMode } = useDarkMode();
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showMobileActions, setShowMobileActions] = useState(null);

  // Listen for window resize to update mobile view state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const toggleUserStatus = (id) => {
    setUsers(users.map(user =>
      user.id === id 
        ? { ...user, status: user.status === 'active' ? 'suspended' : 'active' }
        : user
    ));
    setShowMobileActions(null);
  };

  const addUser = (userData) => {
    const newUser = {
      id: Math.max(...users.map(u => u.id)) + 1,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      role: userData.role,
      status: userData.status,
      lastLogin: new Date().toISOString().split('T')[0],
      joinDate: new Date().toISOString().split('T')[0],
      totalReservations: 0,
      avatar: null
    };
    
    setUsers([...users, newUser]);
    setShowAddUser(false);
  };

  const updateUser = (userData) => {
    setUsers(users.map(user =>
      user.id === selectedUser.id 
        ? { 
            ...user, 
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            role: userData.role,
            status: userData.status
          }
        : user
    ));
    
    setShowEditUser(false);
    setShowModal(false);
  };

  const deleteUser = () => {
    setUsers(users.filter(user => user.id !== userToDelete.id));
    setShowDeleteConfirm(false);
    setUserToDelete(null);
    setShowMobileActions(null);
  };

  const getRoleColor = (role) => {
    const baseClasses = "inline-flex px-2 py-1 text-xs font-semibold rounded-full border";
    
    switch(role) {
      case 'admin': 
        return isDarkMode 
          ? `${baseClasses} bg-purple-900/30 text-purple-300 border-purple-700/50`
          : `${baseClasses} bg-purple-100 text-purple-800 border-purple-200`;
      case 'staff': 
        return isDarkMode 
          ? `${baseClasses} bg-blue-900/30 text-blue-300 border-blue-700/50`
          : `${baseClasses} bg-blue-100 text-blue-800 border-blue-200`;
      case 'customer': 
        return isDarkMode 
          ? `${baseClasses} bg-gray-800 text-gray-300 border-gray-700`
          : `${baseClasses} bg-gray-100 text-gray-800 border-gray-200`;
      default: 
        return isDarkMode 
          ? `${baseClasses} bg-gray-800 text-gray-300 border-gray-700`
          : `${baseClasses} bg-gray-100 text-gray-800 border-gray-200`;
    }
  };

  const getStatusColor = (status) => {
    const baseClasses = "inline-flex px-2 py-1 text-xs font-semibold rounded-full border";
    
    switch(status) {
      case 'active': 
        return isDarkMode 
          ? `${baseClasses} bg-green-900/30 text-green-300 border-green-700/50`
          : `${baseClasses} bg-green-100 text-green-800 border-green-200`;
      case 'suspended': 
        return isDarkMode 
          ? `${baseClasses} bg-red-900/30 text-red-300 border-red-700/50`
          : `${baseClasses} bg-red-100 text-red-800 border-red-200`;
      case 'pending': 
        return isDarkMode 
          ? `${baseClasses} bg-yellow-900/30 text-yellow-300 border-yellow-700/50`
          : `${baseClasses} bg-yellow-100 text-yellow-800 border-yellow-200`;
      default: 
        return isDarkMode 
          ? `${baseClasses} bg-gray-800 text-gray-300 border-gray-700`
          : `${baseClasses} bg-gray-100 text-gray-800 border-gray-200`;
    }
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setShowModal(true);
    setShowMobileActions(null);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditUser(true);
    setShowMobileActions(null);
  };

  const handleDeleteUser = (user) => {
    setUserToDelete(user);
    setShowDeleteConfirm(true);
    setShowMobileActions(null);
  };

  const UserForm = ({ user = null, onClose, onSave, isEdit = false }) => {
    const [formData, setFormData] = useState({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      role: user?.role || 'customer',
      status: user?.status || 'active'
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-2xl p-4 md:p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto`}>
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h3 className="text-xl md:text-2xl font-bold">
              {isEdit ? 'Edit User' : 'Tambah User Baru'}
            </h3>
            <button 
              onClick={onClose}
              className={`${isDarkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'} p-1 md:p-2 rounded-full`}
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-1 md:mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Nama Lengkap</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'border-gray-300'
                }`}
                required
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-1 md:mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'border-gray-300'
                }`}
                required
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-1 md:mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>No. Telepon</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'border-gray-300'
                }`}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-1 md:mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'border-gray-300'
                }`}
              >
                <option value="customer">Customer</option>
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-1 md:mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'border-gray-300'
                }`}
              >
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            
            <div className="flex justify-end space-x-2 md:space-x-3 pt-3 md:pt-4">
              <button 
                type="button"
                onClick={onClose}
                className={`px-3 py-2 md:px-4 md:py-2 border rounded-lg text-sm md:text-base ${
                  isDarkMode 
                    ? 'text-gray-300 border-gray-600 hover:bg-gray-700' 
                    : 'text-gray-600 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Batal
              </button>
              <button 
                type="submit"
                className="px-3 py-2 md:px-4 md:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm md:text-base"
              >
                {isEdit ? 'Update' : 'Simpan'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const DeleteConfirmation = ({ user, onClose, onConfirm }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-2xl p-4 md:p-6 max-w-md w-full mx-4`}>
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h3 className="text-xl md:text-2xl font-bold">Konfirmasi Hapus</h3>
            <button 
              onClick={onClose}
              className={`${isDarkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'} p-1 md:p-2 rounded-full`}
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
          
          <div className="space-y-3 md:space-y-4">
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
              Apakah Anda yakin ingin menghapus user <span className="font-semibold">{user?.name}</span>?
            </p>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Tindakan ini tidak dapat dibatalkan. Semua data user akan dihapus secara permanen.
            </p>
          </div>
          
          <div className="flex justify-end space-x-2 md:space-x-3 mt-4 md:mt-6 pt-4 md:pt-6 border-t">
            <button 
              onClick={onClose}
              className={`px-3 py-2 md:px-4 md:py-2 border rounded-lg text-sm md:text-base ${
                isDarkMode 
                  ? 'text-gray-300 border-gray-600 hover:bg-gray-700' 
                  : 'text-gray-600 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Batal
            </button>
            <button 
              onClick={onConfirm}
              className="px-3 py-2 md:px-4 md:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm md:text-base"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Kelas CSS untuk mode gelap
  const darkModeClasses = {
    bg: isDarkMode ? 'bg-gray-900' : 'bg-gray-100',
    card: isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900',
    text: isDarkMode ? 'text-gray-100' : 'text-gray-900',
    textMuted: isDarkMode ? 'text-gray-400' : 'text-gray-600',
    border: isDarkMode ? 'border-gray-700' : 'border-gray-200',
    input: isDarkMode 
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
      : 'border-gray-300',
    hover: isDarkMode 
      ? 'hover:bg-gray-700' 
      : 'hover:bg-gray-50',
    tableHeader: isDarkMode 
      ? 'bg-gray-800 text-gray-300' 
      : 'bg-gray-50 text-gray-500',
    tableRow: isDarkMode 
      ? 'hover:bg-gray-700/50' 
      : 'hover:bg-gray-50'
  };

  return (
    <div className={`min-h-screen p-4 md:p-6 ${darkModeClasses.bg}`}>
      <div className="space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${darkModeClasses.text}`}>Manajemen User</h1>
            <p className={`mt-1 md:mt-2 text-sm md:text-base ${darkModeClasses.textMuted}`}>Kelola akun pengguna dan hak akses sistem</p>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-3 w-full lg:w-auto">
            <button 
              onClick={() => setShowAddUser(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 flex items-center shadow-md text-sm md:text-base w-full sm:w-auto justify-center"
            >
              <Plus className="w-4 h-4 mr-1 md:mr-2" />
              <span className="truncate">Tambah User</span>
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            { 
              label: 'Total Users', 
              value: users.length, 
              color: 'bg-blue-500',
              icon: Users
            },
            { 
              label: 'Active Users', 
              value: users.filter(u => u.status === 'active').length, 
              color: 'bg-green-500',
              icon: UserCheck
            },
            { 
              label: 'Admin & Staff', 
              value: users.filter(u => u.role === 'admin' || u.role === 'staff').length, 
              color: 'bg-purple-500',
              icon: Shield
            },
            { 
              label: 'Customers', 
              value: users.filter(u => u.role === 'customer').length, 
              color: 'bg-orange-500',
              icon: Users
            }
          ].map((stat, index) => (
            <div key={index} className={`rounded-xl shadow-lg p-3 md:p-4 ${darkModeClasses.card}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-xs md:text-sm ${darkModeClasses.textMuted}`}>{stat.label}</p>
                  <p className={`text-xl md:text-2xl font-bold ${darkModeClasses.text}`}>{stat.value}</p>
                </div>
                <div className={`${stat.color} p-2 md:p-3 rounded-lg text-white`}>
                  <stat.icon className="w-4 h-4 md:w-6 md:h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className={`rounded-xl shadow-lg p-4 md:p-6 ${darkModeClasses.card}`}>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className={`w-4 h-4 md:w-5 md:h-5 absolute left-3 top-2.5 md:top-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                <input
                  type="text"
                  placeholder="Cari nama atau email user..."
                  className={`w-full pl-9 md:pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${darkModeClasses.input}`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {/* Mobile filter toggle */}
            <div className="block lg:hidden">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`w-full flex items-center justify-between px-4 py-2 border rounded-lg ${darkModeClasses.input}`}
              >
                <span>Filter</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>
            
            {/* Desktop filters */}
            <div className="hidden lg:flex gap-3">
              <select
                className={`px-3 md:px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${darkModeClasses.input}`}
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="all">Semua Role</option>
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
                <option value="customer">Customer</option>
              </select>
              <select
                className={`px-3 md:px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${darkModeClasses.input}`}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Semua Status</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            
            {/* Mobile filters (collapsible) */}
            {showFilters && (
              <div className="lg:hidden grid grid-cols-2 gap-3">
                <select
                  className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${darkModeClasses.input}`}
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <option value="all">Semua Role</option>
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                  <option value="customer">Customer</option>
                </select>
                <select
                  className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${darkModeClasses.input}`}
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">Semua Status</option>
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Users Table */}
        <div className={`rounded-xl shadow-lg overflow-hidden ${darkModeClasses.card}`}>
          <div className={`px-4 md:px-6 py-3 md:py-4 border-b ${darkModeClasses.border}`}>
            <h3 className={`text-base md:text-lg font-semibold ${darkModeClasses.text}`}>
              Daftar User ({filteredUsers.length})
            </h3>
          </div>
          
          {isMobile ? (
            /* Mobile View - Card Layout */
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers.map((user) => (
                <div key={user.id} className={`p-4 ${darkModeClasses.tableRow}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-semibold text-sm">
                          {user.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                        </span>
                      </div>
                      <div>
                        <div className={`font-medium ${darkModeClasses.text}`}>{user.name}</div>
                        <div className={`text-sm ${darkModeClasses.textMuted}`}>{user.email}</div>
                      </div>
                    </div>
                    
                    {/* Mobile Actions Dropdown */}
                    <div className="relative">
                      <button 
                        onClick={() => setShowMobileActions(showMobileActions === user.id ? null : user.id)}
                        className={`p-1 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      
                      {showMobileActions === user.id && (
                        <div className={`absolute right-0 mt-1 w-40 rounded-md shadow-lg z-10 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${darkModeClasses.border}`}>
                          <div className="py-1">
                            <button
                              onClick={() => handleViewDetails(user)}
                              className={`block w-full text-left px-4 py-2 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                            >
                              Lihat Detail
                            </button>
                            <button
                              onClick={() => handleEditUser(user)}
                              className={`block w-full text-left px-4 py-2 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => toggleUserStatus(user.id)}
                              className={`block w-full text-left px-4 py-2 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                            >
                              {user.status === 'active' ? 'Suspend' : 'Activate'}
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user)}
                              className={`block w-full text-left px-4 py-2 text-sm ${isDarkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-gray-100'}`}
                            >
                              Hapus
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div>
                      <span className={`text-xs ${darkModeClasses.textMuted}`}>Role</span>
                      <div className={getRoleColor(user.role)}>
                        {user.role}
                      </div>
                    </div>
                    <div>
                      <span className={`text-xs ${darkModeClasses.textMuted}`}>Status</span>
                      <div className={getStatusColor(user.status)}>
                        {user.status}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex justify-between items-center">
                    <div>
                      <span className={`text-xs ${darkModeClasses.textMuted}`}>Last Login</span>
                      <div className={`text-sm ${darkModeClasses.text}`}>{user.lastLogin}</div>
                    </div>
                    <div>
                      <span className={`text-xs ${darkModeClasses.textMuted}`}>Reservations</span>
                      <div className={`text-sm font-medium ${darkModeClasses.text}`}>{user.totalReservations}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Desktop View - Table Layout */
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className={darkModeClasses.tableHeader}>
                  <tr>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Last Login
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Reservations
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className={`transition-colors duration-150 ${darkModeClasses.tableRow}`}>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                            <span className="text-white font-semibold text-sm">
                              {user.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                            </span>
                          </div>
                          <div>
                            <div className={`text-sm font-medium ${darkModeClasses.text}`}>{user.name}</div>
                            <div className={`text-xs flex items-center ${darkModeClasses.textMuted}`}>
                              <Calendar className="w-3 h-3 mr-1" />
                              Joined {user.joinDate}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm flex items-center ${darkModeClasses.text}`}>
                          <Mail className="w-4 h-4 mr-2 text-gray-400" />
                          {user.email}
                        </div>
                        <div className={`text-sm flex items-center ${darkModeClasses.textMuted}`}>
                          <Phone className="w-4 h-4 mr-2 text-gray-400" />
                          {user.phone}
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                        <span className={getRoleColor(user.role)}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                        <span className={getStatusColor(user.status)}>
                          {user.status}
                        </span>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkModeClasses.text}`}>
                        {user.lastLogin}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          isDarkMode 
                            ? 'bg-blue-900/30 text-blue-300' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.totalReservations}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-1 md:space-x-2">
                          <button 
                            className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-100 rounded"
                            onClick={() => handleViewDetails(user)}
                            title="Lihat Detail"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            className="text-green-600 hover:text-green-900 p-1 hover:bg-green-100 rounded" 
                            onClick={() => handleEditUser(user)}
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            className={`${user.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'} p-1 hover:bg-gray-100 rounded`}
                            onClick={() => toggleUserStatus(user.id)}
                            title={user.status === 'active' ? 'Suspend' : 'Activate'}
                          >
                            {user.status === 'active' ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-900 p-1 hover:bg-red-100 rounded" 
                            title="Hapus"
                            onClick={() => handleDeleteUser(user)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Detail Modal */}
        {showModal && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className={`rounded-2xl p-4 md:p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto mx-4 ${darkModeClasses.card}`}>
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <h3 className="text-xl md:text-2xl font-bold">Detail User</h3>
                <button 
                  onClick={() => setShowModal(false)}
                  className={`${isDarkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'} p-1 md:p-2 rounded-full`}
                >
                  <X className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <h4 className={`font-semibold mb-2 md:mb-3 flex items-center ${darkModeClasses.text}`}>
                    <Users className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                    Informasi Personal
                  </h4>
                  <div className={`space-y-2 text-sm ${darkModeClasses.textMuted}`}>
                    <p><span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Nama:</span> {selectedUser.name}</p>
                    <p><span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Email:</span> {selectedUser.email}</p>
                    <p><span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Phone:</span> {selectedUser.phone}</p>
                    <p><span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Join Date:</span> {selectedUser.joinDate}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className={`font-semibold mb-2 md:mb-3 flex items-center ${darkModeClasses.text}`}>
                    <Shield className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                    Status Akun
                  </h4>
                  <div className="space-y-2 md:space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Role:</span>
                      <span className={getRoleColor(selectedUser.role)}>
                        {selectedUser.role}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Status:</span>
                      <span className={getStatusColor(selectedUser.status)}>
                        {selectedUser.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Last Login:</span>
                      <span className={`text-sm font-medium ${darkModeClasses.text}`}>{selectedUser.lastLogin}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Total Reservasi:</span>
                      <span className={`text-sm font-bold ${darkModeClasses.text}`}>{selectedUser.totalReservations}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 md:space-x-3 mt-4 md:mt-6 pt-4 md:pt-6 border-t">
                <button 
                  onClick={() => setShowModal(false)}
                  className={`px-3 py-2 md:px-4 md:py-2 border rounded-lg text-sm md:text-base ${
                    isDarkMode 
                      ? 'text-gray-300 border-gray-600 hover:bg-gray-700' 
                      : 'text-gray-600 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Tutup
                </button>
                <button 
                  className="px-3 py-2 md:px-4 md:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm md:text-base"
                  onClick={() => {
                    setShowModal(false);
                    handleEditUser(selectedUser);
                  }}
                >
                  Edit User
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add User Modal */}
        {showAddUser && (
          <UserForm 
            onClose={() => setShowAddUser(false)}
            onSave={addUser}
            isEdit={false}
          />
        )}

        {/* Edit User Modal */}
        {showEditUser && selectedUser && (
          <UserForm 
            user={selectedUser}
            onClose={() => setShowEditUser(false)}
            onSave={updateUser}
            isEdit={true}
          />
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && userToDelete && (
          <DeleteConfirmation 
            user={userToDelete}
            onClose={() => setShowDeleteConfirm(false)}
            onConfirm={deleteUser}
          />
        )}
      </div>
    </div>
  );
};

export default UserManagement;