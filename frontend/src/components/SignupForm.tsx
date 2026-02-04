import React, { useState } from 'react';
import { apiClient } from '../lib/api';
import { setAuthToken } from '../lib/auth';

interface SignupFormProps {
  onSuccess: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password strength
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    // Ensure password is not longer than 72 characters (bcrypt limit)
    if (password.length > 72) {
      setError('Password must be 72 characters or less');
      setLoading(false);
      return;
    }

    try {
      const data = await apiClient.register({
        email,
        password: password.substring(0, 72), // Limit password to 72 characters
        first_name: firstName,
        last_name: lastName
      });
      setAuthToken(data.access_token);
      onSuccess();
    } catch (err: any) {
      // Handle different error response formats
      if (err.response?.data?.detail) {
        if (Array.isArray(err.response.data.detail)) {
          // Handle validation errors array
          const errorMessage = err.response.data.detail.map((error: any) => {
            if (error.msg) {
              return `${error.loc?.[1] || 'Field'}: ${error.msg}`;
            }
            return typeof error === 'string' ? error : JSON.stringify(error);
          }).join(', ');
          setError(errorMessage);
        } else if (typeof err.response.data.detail === 'string') {
          // Handle string error message
          setError(err.response.data.detail);
        } else if (typeof err.response.data.detail === 'object') {
          // Handle error object with multiple properties
          setError(JSON.stringify(err.response.data.detail));
        }
      } else {
        setError('Registration failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-xl border border-gray-100">
      <div className="text-center mb-8">
        <div className="text-4xl mb-4">📝</div>
        <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
        <p className="text-gray-600 mt-2">Join us to manage your tasks</p>
      </div>

      {error && <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg shadow-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-gray-700 text-sm font-semibold mb-2">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 bg-white placeholder-gray-500 transition-all duration-200"
              placeholder="John"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-gray-700 text-sm font-semibold mb-2">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 bg-white placeholder-gray-500 transition-all duration-200"
              placeholder="Doe"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 bg-white placeholder-gray-500 transition-all duration-200"
            required
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
            Password *
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 pr-16 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 bg-white placeholder-gray-500 transition-all duration-200"
              required
              minLength={6}
              maxLength={72}
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-semibold mb-2">
            Confirm Password *
          </label>
          <input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 bg-white placeholder-gray-500 transition-all duration-200"
            required
            minLength={6}
            maxLength={72}
            placeholder="Confirm your password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition-all duration-200 shadow-lg ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transform hover:scale-105'
          }`}
        >
          {loading ? '🔄 Creating account...' : '✅ Create Account'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600 text-sm">
          Already have an account?{' '}
          <a href="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
            Sign in here
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;