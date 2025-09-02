/* eslint-disable no-unused-vars */
import React, { useState, useMemo, useEffect } from 'react';
import { useDarkMode } from "../components/DarkModeContext"; 
import { Search, Plus, Edit2, Trash2, Star, MapPin, DollarSign, Filter, ArrowUpDown, Hotel, Users, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Upload, X } from 'lucide-react';

const HotelManagement = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [hotels, setHotels] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLokasi, setFilterLokasi] = useState('');
  const [filterRating, setFilterRating] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [isLoading, setIsLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    nama: '',
    lokasi: '',
    harga: '',
    rating: '',
    image: null
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const savedHotels = localStorage.getItem('hotels');
      
      if (savedHotels) {
        // Jika ada data di localStorage, gunakan data tersebut
        setHotels(JSON.parse(savedHotels));
      } else {
        // Jika tidak ada data di localStorage, gunakan data default
const initialHotels = [
  { id: 1, nama: "Grand Hyatt Jakarta", lokasi: "Jakarta", harga: 2500000, rating: 4.8 },
  { id: 2, nama: "The Ritz-Carlton Bali", lokasi: "Bali", harga: 3200000, rating: 4.9 },
  { id: 3, nama: "Hotel Majapahit Surabaya", lokasi: "Surabaya", harga: 1200000, rating: 4.5 },
  { id: 4, nama: "Trans Luxury Hotel Bandung", lokasi: "Bandung", harga: 1800000, rating: 4.6 },
  { id: 5, nama: "Ayana Resort Bali", lokasi: "Bali", harga: 4500000, rating: 4.9 },
  { id: 6, nama: "Hotel Indonesia Kempinski", lokasi: "Jakarta", harga: 2800000, rating: 4.7 },
  { id: 7, nama: "Four Seasons Jakarta", lokasi: "Jakarta", harga: 3500000, rating: 4.9 },
  { id: 8, nama: "The Legian Bali", lokasi: "Bali", harga: 4200000, rating: 4.8 },
  { id: 9, nama: "JW Marriott Surabaya", lokasi: "Surabaya", harga: 1500000, rating: 4.6 },
  { id: 10, nama: "Padma Resort Bandung", lokasi: "Bandung", harga: 2200000, rating: 4.7 },
  { id: 11, nama: "W Bali Seminyak", lokasi: "Bali", harga: 4800000, rating: 4.8 },
  { id: 12, nama: "Mandarin Oriental Jakarta", lokasi: "Jakarta", harga: 3800000, rating: 4.9 }
];
        setHotels(initialHotels);
        // Simpan data default ke localStorage
        localStorage.setItem('hotels', JSON.stringify(initialHotels));
      }
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Save to localStorage whenever hotels change
  useEffect(() => {
    if (hotels.length > 0) {
      localStorage.setItem('hotels', JSON.stringify(hotels));
    }
  }, [hotels]);

  // Reset current page ketika filter berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterLokasi, filterRating]);

  // Responsive items per page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(3);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(4);
      } else {
        setItemsPerPage(6);
      }
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Get unique locations for filter
  const uniqueLocations = [...new Set(hotels.map(hotel => hotel.lokasi))];

  // Filter and sort hotels
  const filteredAndSortedHotels = useMemo(() => {
    let filtered = hotels.filter(hotel => {
      const matchesSearch = hotel.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           hotel.lokasi.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = !filterLokasi || hotel.lokasi === filterLokasi;
      const matchesRating = !filterRating || hotel.rating >= parseFloat(filterRating);
      
      return matchesSearch && matchesLocation && matchesRating;
    });

    if (sortBy) {
      filtered.sort((a, b) => {
        const aVal = a[sortBy];
        const bVal = b[sortBy];
        
        if (sortOrder === 'asc') {
          return aVal > bVal ? 1 : -1;
        } else {
          return aVal < bVal ? 1 : -1;
        }
      });
    }

    return filtered;
  }, [hotels, searchTerm, filterLokasi, filterRating, sortBy, sortOrder]);

  // Pagination logic
  const totalItems = filteredAndSortedHotels.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Ensure current page is valid when filters change
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedHotels = filteredAndSortedHotels.slice(startIndex, startIndex + itemsPerPage);

  const resetForm = () => {
    setFormData({ nama: '', lokasi: '', harga: '', rating: '', image: null });
    setImagePreview(null);
    setEditingHotel(null);
  };

  const openModal = (hotel = null) => {
    if (hotel) {
      setFormData({ ...hotel });
      setEditingHotel(hotel);
      // Jika hotel memiliki gambar yang sudah diupload (bukan preset)
      if (hotel.image && typeof hotel.image === 'string' && hotel.image.startsWith('data:image')) {
        setImagePreview(hotel.image);
      } else {
        setImagePreview(null);
      }
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => {
      resetForm();
    }, 300);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validasi tipe file
      if (!file.type.startsWith('image/')) {
        alert('File harus berupa gambar!');
        return;
      }
      
      // Validasi ukuran file (maksimal 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('Ukuran file maksimal 2MB!');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData({ ...formData, image: null });
  };

  const handleSubmit = () => {
    if (!formData.nama || !formData.lokasi || !formData.harga || !formData.rating) {
      alert('Semua field harus diisi!');
      return;
    }
    
    if (editingHotel) {
      setHotels(hotels.map(hotel => 
        hotel.id === editingHotel.id 
          ? { 
              ...formData, 
              id: editingHotel.id, 
              harga: parseFloat(formData.harga), 
              rating: parseFloat(formData.rating),
              image: formData.image || hotel.image // Pertahankan gambar lama jika tidak ada yang baru
            }
          : hotel
      ));
    } else {
      const newHotel = {
        id: Date.now(),
        ...formData,
        harga: parseFloat(formData.harga),
        rating: parseFloat(formData.rating),
        image: formData.image || 'default' // Gunakan gambar yang diupload atau default
      };
      setHotels([...hotels, newHotel]);
    }
    
    closeModal();
  };

  const deleteHotel = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus hotel ini?')) {
      setHotels(hotels.filter(hotel => hotel.id !== id));
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterLokasi('');
    setFilterRating('');
    setSortBy('');
    setSortOrder('asc');
    setCurrentPage(1);
  };

  const getImageGradient = (imageType) => {
    const gradients = {
      luxury: isDarkMode ? 'from-gray-800 to-gray-700' : 'from-slate-100 to-gray-200',
      beach: isDarkMode ? 'from-blue-900 to-blue-800' : 'from-blue-50 to-blue-100',
      heritage: isDarkMode ? 'from-amber-900 to-orange-800' : 'from-amber-50 to-orange-100',
      mountain: isDarkMode ? 'from-green-900 to-emerald-800' : 'from-green-50 to-emerald-100',
      resort: isDarkMode ? 'from-purple-900 to-pink-800' : 'from-purple-50 to-pink-100',
      business: isDarkMode ? 'from-gray-800 to-slate-700' : 'from-gray-50 to-slate-100',
      default: isDarkMode ? 'from-gray-700 to-gray-600' : 'from-slate-50 to-gray-100'
    };
    return gradients[imageType] || gradients.default;
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.8) return isDarkMode ? 'text-green-300' : 'text-green-600';
    if (rating >= 4.5) return isDarkMode ? 'text-blue-300' : 'text-blue-600';
    if (rating >= 4.0) return isDarkMode ? 'text-amber-300' : 'text-amber-600';
    return isDarkMode ? 'text-gray-300' : 'text-gray-600';
  };

  const getRatingBg = (rating) => {
    if (rating >= 4.8) return isDarkMode ? 'bg-green-900/30 border-green-700' : 'bg-green-50 border-green-200';
    if (rating >= 4.5) return isDarkMode ? 'bg-blue-900/30 border-blue-700' : 'bg-blue-50 border-blue-200';
    if (rating >= 4.0) return isDarkMode ? 'bg-amber-900/30 border-amber-700' : 'bg-amber-50 border-amber-200';
    return isDarkMode ? 'bg-gray-900/30 border-gray-700' : 'bg-gray-50 border-gray-200';
  };

  // Pagination controls
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = window.innerWidth < 640 ? 3 : 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust if we're at the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl font-semibold transition-all ${
            currentPage === i
              ? isDarkMode 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-gray-800 text-white shadow-lg'
              : isDarkMode 
                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {i}
        </button>
      );
    }
    
    return pages;
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100' : 'bg-gradient-to-br from-gray-50 via-white to-gray-50 text-gray-800'}`}>
      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${isDarkMode ? 'ffffff' : '000000'}' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='7' r='1'/%3E%3Ccircle cx='47' cy='7' r='1'/%3E%3Ccircle cx='7' cy='27' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='47' cy='27' r='1'/%3E%3Ccircle cx='7' cy='47' r='1'/%3E%3Ccircle cx='27' cy='47' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl mb-4 sm:mb-6 shadow-xl border ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
            <Hotel className={`w-8 h-8 sm:w-10 sm:h-10 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} />
          </div>
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Hotel Management
          </h1>
          <p className={`text-base sm:text-lg max-w-2xl mx-auto leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Kelola portofolio hotel premium dengan sistem manajemen yang elegan dan profesional
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className={`rounded-2xl p-4 sm:p-6 shadow-lg border transition-all duration-300 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:shadow-gray-800/20' : 'bg-white border-gray-100 hover:shadow-xl'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs sm:text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Hotels</p>
                <p className={`text-xl sm:text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{hotels.length}</p>
              </div>
              <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
                <Hotel className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`} />
              </div>
            </div>
          </div>
          
          <div className={`rounded-2xl p-4 sm:p-6 shadow-lg border transition-all duration-300 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:shadow-gray-800/20' : 'bg-white border-gray-100 hover:shadow-xl'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs sm:text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Avg Rating</p>
                <p className={`text-xl sm:text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {hotels.length > 0 ? (hotels.reduce((sum, hotel) => sum + hotel.rating, 0) / hotels.length).toFixed(1) : '0'}
                </p>
              </div>
              <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-amber-900/30' : 'bg-amber-50'}`}>
                <Star className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${isDarkMode ? 'text-amber-300' : 'text-amber-500'} fill-current`} />
              </div>
            </div>
          </div>
          
          <div className={`rounded-2xl p-4 sm:p-6 shadow-lg border transition-all duration-300 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:shadow-gray-800/20' : 'bg-white border-gray-100 hover:shadow-xl'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs sm:text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Locations</p>
                <p className={`text-xl sm:text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{uniqueLocations.length}</p>
              </div>
              <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-green-900/30' : 'bg-green-50'}`}>
                <MapPin className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${isDarkMode ? 'text-green-300' : 'text-green-600'}`} />
              </div>
            </div>
          </div>
          
          <div className={`rounded-2xl p-4 sm:p-6 shadow-lg border transition-all duration-300 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:shadow-gray-800/20' : 'bg-white border-gray-100 hover:shadow-xl'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs sm:text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Premium</p>
                <p className={`text-xl sm:text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{hotels.filter(h => h.rating >= 4.7).length}</p>
              </div>
              <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-purple-900/30' : 'bg-purple-50'}`}>
                <Users className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${isDarkMode ? 'text-purple-300' : 'text-purple-600'}`} />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className={`rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 mb-4 sm:mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Cari hotel berdasarkan nama atau lokasi..."
                className={`w-full pl-9 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' 
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-white'
                }`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Add Hotel Button */}
            <button
              onClick={() => openModal()}
              className="bg-gray-800 hover:bg-gray-900 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl font-semibold flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 transform hover:scale-105 shadow-lg group"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-90 transition-transform duration-300" />
              <span className="hidden sm:inline">Tambah Hotel</span>
              <span className="sm:hidden">Tambah</span>
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 items-start lg:items-center">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-1 w-full">
              {/* Location Filter */}
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                <select
                  value={filterLokasi}
                  onChange={(e) => setFilterLokasi(e.target.value)}
                  className={`w-full pl-8 sm:pl-10 pr-6 sm:pr-8 py-2 sm:py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-gray-50 border-gray-200 text-gray-700'
                  }`}
                >
                  <option value="">Semua Lokasi</option>
                  {uniqueLocations.map(lokasi => (
                    <option key={lokasi} value={lokasi}>{lokasi}</option>
                  ))}
                </select>
              </div>

              {/* Rating Filter */}
              <div className="relative flex-1">
                <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                <select
                  value={filterRating}
                  onChange={(e) => setFilterRating(e.target.value)}
                  className={`w-full pl-8 sm:pl-10 pr-6 sm:pr-8 py-2 sm:py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-gray-50 border-gray-200 text-gray-700'
                  }`}
                >
                  <option value="">Semua Rating</option>
                  <option value="4.5">4.5+ ⭐</option>
                  <option value="4.0">4.0+ ⭐</option>
                  <option value="3.5">3.5+ ⭐</option>
                </select>
              </div>

              {/* Sort Options */}
              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={() => handleSort('harga')}
                  className={`px-3 sm:px-4 py-2 sm:py-3 rounded-xl flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-semibold transition-all transform hover:scale-105 ${
                    sortBy === 'harga' 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : isDarkMode 
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'
                  }`}
                >
                  <DollarSign className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden xs:inline">Harga</span>
                  {sortBy === 'harga' && (
                    <ArrowUpDown className={`w-3 h-3 transform transition-transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                  )}
                </button>
                
                <button
                  onClick={() => handleSort('rating')}
                  className={`px-3 sm:px-4 py-2 sm:py-3 rounded-xl flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-semibold transition-all transform hover:scale-105 ${
                    sortBy === 'rating' 
                      ? 'bg-amber-500 text-white shadow-lg' 
                      : isDarkMode 
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'
                  }`}
                >
                  <Star className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden xs:inline">Rating</span>
                  {sortBy === 'rating' && (
                    <ArrowUpDown className={`w-3 h-3 transform transition-transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                  )}
                </button>
              </div>
            </div>

            {/* Clear Filters */}
            <button
              onClick={clearFilters}
              className={`text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg transition-all ${
                isDarkMode 
                  ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Filter className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Reset Filter</span>
              <span className="sm:hidden">Reset</span>
            </button>
          </div>
        </div>

        {/* Results and Items Per Page */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6">
          <div className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-3 sm:mb-0`}>
            Menampilkan <span className="font-semibold">{startIndex + 1}-{Math.min(startIndex + itemsPerPage, totalItems)}</span> dari <span className="font-semibold">{totalItems}</span> hotel
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <span className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Items per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className={`px-2 sm:px-3 py-1 sm:py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-200 text-gray-700'
              }`}
            >
              <option value="3">3</option>
              <option value="6">6</option>
              <option value="9">9</option>
              <option value="12">12</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Hotels Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
              {paginatedHotels.map((hotel, index) => (
                <div 
                  key={hotel.id} 
                  className={`group rounded-2xl overflow-hidden transition-all duration-500 transform hover:-translate-y-2 ${
                    isDarkMode 
                      ? 'bg-gray-800 border border-gray-700 hover:shadow-gray-900/30' 
                      : 'bg-white border border-gray-100 hover:shadow-2xl'
                  }`}
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  <div className={`h-48 sm:h-56 md:h-64 relative overflow-hidden ${
                    hotel.image && typeof hotel.image === 'string' && hotel.image.startsWith('data:image') 
                      ? '' 
                      : `bg-gradient-to-br ${getImageGradient(hotel.image)}`
                  }`}>
                    {hotel.image && typeof hotel.image === 'string' && hotel.image.startsWith('data:image') ? (
                      <img 
                        src={hotel.image} 
                        alt={hotel.nama}
                        className="w-full h-full object-cover"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/30 transition-all duration-300"></div>
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                      <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-bold border ${getRatingBg(hotel.rating)} ${getRatingColor(hotel.rating)}`}>
                        ⭐ {hotel.rating}
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-4 sm:p-6">
                        <h3 className={`text-xl sm:text-2xl font-bold mb-2 leading-tight group-hover:scale-105 transition-transform duration-300 ${
                          isDarkMode ? 'text-white' : 'text-gray-800'
                        }`}>
                          {hotel.nama}
                        </h3>
                        <div className="flex items-center justify-center gap-1 sm:gap-2 text-gray-400">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="text-sm sm:text-base font-medium">{hotel.lokasi}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Subtle Pattern Overlay */}
                    <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                      <div className="w-full h-full" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23${isDarkMode ? 'ffffff' : '000000'}' fill-opacity='0.2' fill-rule='evenodd'%3E%3Cpath d='m0 40l40-40h-40z'/%3E%3Cpath d='m40 40v-40h-40z' fill-opacity='0.1'/%3E%3C/g%3E%3C/svg%3E")`
                      }}></div>
                    </div>
                  </div>
                  
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center ${
                          isDarkMode ? 'bg-green-900/30' : 'bg-green-50'
                        }`}>
                          <DollarSign className={`w-3 h-3 sm:w-4 sm:h-4 ${isDarkMode ? 'text-green-300' : 'text-green-600'}`} />
                        </div>
                        <div>
                          <div className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>per malam</div>
                          <div className={`text-lg sm:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                            {formatCurrency(hotel.harga)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`text-xs mb-1 sm:mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>Rating</div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3 h-3 sm:w-4 sm:h-4 ${i < Math.floor(hotel.rating) ? 'text-amber-400 fill-current' : isDarkMode ? 'text-gray-600' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 sm:gap-3">
                      <button
                        onClick={() => openModal(hotel)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-xl font-semibold flex items-center justify-center gap-1 sm:gap-2 transition-all duration-300 transform hover:scale-105 shadow-md group"
                      >
                        <Edit2 className="w-3 h-3 sm:w-4 sm:h-4 group-hover:rotate-12 transition-transform" />
                        <span className="text-xs sm:text-sm">Edit</span>
                      </button>
                      
                      <button
                        onClick={() => deleteHotel(hotel.id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-xl font-semibold flex items-center justify-center gap-1 sm:gap-2 transition-all duration-300 transform hover:scale-105 shadow-md group"
                      >
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
                        <span className="text-xs sm:text-sm">Hapus</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className={`rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-xl'}`}>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                  <div className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Halaman {currentPage} dari {totalPages}
                  </div>
                  
                  <div className="flex items-center gap-1 sm:gap-2">
                    {/* First Page Button */}
                    <button
                      onClick={() => goToPage(1)}
                      disabled={currentPage === 1}
                      className={`p-1 sm:p-2 rounded-xl border transition-all ${
                        isDarkMode 
                          ? 'border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-50' 
                          : 'border-gray-200 text-gray-700 hover:bg-gray-100 disabled:opacity-50'
                      } disabled:cursor-not-allowed`}
                      title="Halaman pertama"
                    >
                      <ChevronsLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    
                    {/* Previous Page Button */}
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`p-1 sm:p-2 rounded-xl border transition-all ${
                        isDarkMode 
                          ? 'border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-50' 
                          : 'border-gray-200 text-gray-700 hover:bg-gray-100 disabled:opacity-50'
                      } disabled:cursor-not-allowed`}
                      title="Halaman sebelumnya"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    
                    {/* Page Numbers */}
                    <div className="flex gap-1 sm:gap-2 mx-1 sm:mx-2">
                      {renderPageNumbers()}
                    </div>
                    
                    {/* Next Page Button */}
                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`p-1 sm:p-2 rounded-xl border transition-all ${
                        isDarkMode 
                          ? 'border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-50' 
                          : 'border-gray-200 text-gray-700 hover:bg-gray-100 disabled:opacity-50'
                      } disabled:cursor-not-allowed`}
                      title="Halaman berikutnya"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    
                    {/* Last Page Button */}
                    <button
                      onClick={() => goToPage(totalPages)}
                      disabled={currentPage === totalPages}
                      className={`p-1 sm:p-2 rounded-xl border transition-all ${
                        isDarkMode 
                          ? 'border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-50' 
                          : 'border-gray-200 text-gray-700 hover:bg-gray-100 disabled:opacity-50'
                      } disabled:cursor-not-allowed`}
                      title="Halaman terakhir"
                    >
                      <ChevronsRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                  
                  
                
                </div>
              </div>
            )}

            {filteredAndSortedHotels.length === 0 && (
              <div className="text-center py-12 sm:py-20">
                <div className="text-6xl sm:text-8xl mb-4 sm:mb-6 animate-bounce">🏨</div>
                <h3 className={`text-xl sm:text-2xl font-bold mb-2 sm:mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Tidak ada hotel ditemukan</h3>
                <p className={`mb-4 sm:mb-6 text-base sm:text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Coba ubah kriteria pencarian atau filter Anda</p>
                <button
                  onClick={clearFilters}
                  className="bg-gray-800 hover:bg-gray-900 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Reset Semua Filter
                </button>
              </div>
            )}
          </>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-3 sm:p-4 z-50 backdrop-blur-sm">
            <div className={`rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg transform transition-all border ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className={`p-6 sm:p-8 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                <h2 className={`text-2xl sm:text-3xl font-bold text-center ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  {editingHotel ? '✏ Edit Hotel' : '➕ Tambah Hotel Baru'}
                </h2>
              </div>
              
              <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
                {/* Image Upload Section */}
                <div>
                  <label className={`block text-sm font-semibold mb-2 sm:mb-3 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Gambar Hotel
                  </label>
                  
                  {imagePreview ? (
                    <div className="relative mb-4">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-48 object-cover rounded-xl border"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                      isDarkMode 
                        ? 'border-gray-600 hover:border-gray-500 bg-gray-700 hover:bg-gray-600' 
                        : 'border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100'
                    }`}>
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Klik untuk upload</span> atau drag & drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, JPEG (Maks. 2MB)
                        </p>
                      </div>
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  )}
                </div>
                
                <div>
                  <label className={`block text-sm font-semibold mb-2 sm:mb-3 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Nama Hotel
                  </label>
                  <input
                    type="text"
                    required
                    className={`w-full px-3 sm:px-4 py-3 sm:py-4 border rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-gray-50 border-gray-200 text-gray-700'
                    }`}
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    placeholder="Masukkan nama hotel"
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-semibold mb-2 sm:mb-3 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Lokasi
                  </label>
                  <input
                    type="text"
                    required
                    className={`w-full px-3 sm:px-4 py-3 sm:py-4 border rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-gray-50 border-gray-200 text-gray-700'
                    }`}
                    value={formData.lokasi}
                    onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                    placeholder="Masukkan lokasi hotel"
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-semibold mb-2 sm:mb-3 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Harga per Malam (Rp)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    className={`w-full px-3 sm:px-4 py-3 sm:py-4 border rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-gray-50 border-gray-200 text-gray-700'
                    }`}
                    value={formData.harga}
                    onChange={(e) => setFormData({ ...formData, harga: e.target.value })}
                    placeholder="Masukkan harga"
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-semibold mb-2 sm:mb-3 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Rating (1-5)
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="5"
                    step="0.1"
                    className={`w-full px-3 sm:px-4 py-3 sm:py-4 border rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-gray-50 border-gray-200 text-gray-700'
                    }`}
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    placeholder="Masukkan rating"
                  />
                </div>
                
                <div className="flex gap-3 sm:gap-4 pt-4 sm:pt-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className={`flex-1 py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    {editingHotel ? 'Update Hotel' : 'Simpan Hotel'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default HotelManagement;