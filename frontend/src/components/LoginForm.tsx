import React, { useState } from 'react';
import { apiClient } from '../lib/api';
import { setAuthToken } from '../lib/auth';

interface LoginFormProps {
  onSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await apiClient.login({ email, password });
      setAuthToken(data.access_token);
      onSuccess();
    } catch (err: any) {
      // Handle different error response formats
      let errorMessage = 'Login failed';

      if (err.response?.data?.detail) {
        if (Array.isArray(err.response.data.detail)) {
          // Handle validation errors array
          const errorMessages = err.response.data.detail.map((error: any) => {
            if (error.msg) {
              return `${error.loc?.[1] || 'Field'}: ${error.msg}`;
            }
            return typeof error === 'string' ? error : JSON.stringify(error);
          }).join(', ');
          errorMessage = errorMessages;
        } else if (typeof err.response.data.detail === 'string') {
          // Handle string error message
          errorMessage = err.response.data.detail;
        } else if (typeof err.response.data.detail === 'object') {
          // Handle error object with multiple properties
          errorMessage = JSON.stringify(err.response.data.detail);
        }
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl border border-gray-100">
      <div className="text-center mb-8">
        <div className="text-4xl mb-4">🔐</div>
        <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
        <p className="text-gray-600 mt-2">Sign in to your account</p>
      </div>

      {error && <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg shadow-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white placeholder-gray-500 transition-all duration-200"
            required
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white placeholder-gray-500 transition-all duration-200"
            required
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition-all duration-200 shadow-lg ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105'
          }`}
        >
          {loading ? '🔄 Signing in...' : '🔐 Sign In'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600 text-sm">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-600 hover:text-blue-800 font-medium">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;