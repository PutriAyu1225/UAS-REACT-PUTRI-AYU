

// export default LoginForm;
import { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, ArrowRight } from 'lucide-react';

const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Default akun
  const defaultUser = {
    email: 'admin@gmail.com',
    password: '1234567'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email/Username wajib diisi';
    if (!formData.password) newErrors.password = 'Password wajib diisi';
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (
        formData.email === defaultUser.email &&
        formData.password === defaultUser.password
      ) {
        onLogin(formData);
      } else {
        setErrors({
          email: 'Username atau password salah',
          password: 'Username atau password salah'
        });
      }
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-black flex items-center justify-center p-4">
      <div className="bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl p-10 w-full max-w-md border border-blue-800/40 hover:scale-[1.02] transition-transform duration-300">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="bg-gradient-to-r from-blue-700 to-black w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-900/50">
            <User className="text-white" size={32} />
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-wide">Selamat Datang</h2>
          <p className="text-gray-400 mt-2">Masuk ke akun Anda</p>
        </div>

        {/* Input Fields */}
        <div className="space-y-6">
          {/* Username */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Username
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" size={20} />
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                className={`w-full pl-12 pr-4 py-3 bg-black/60 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                  errors.email
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-blue-700/60 focus:ring-blue-600'
                }`}
                placeholder="Masukkan username"
              />
            </div>
            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                className={`w-full pl-12 pr-12 py-3 bg-black/60 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                  errors.password
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-blue-700/60 focus:ring-blue-600'
                }`}
                placeholder="Masukkan password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
          </div>

          {/* Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-800 to-black text-white py-3 px-4 rounded-xl font-semibold 
            hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-105 
            disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 shadow-lg shadow-blue-900/40"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                Masuk
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
