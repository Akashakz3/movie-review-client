import { useState } from 'react';
import { createMovie } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import { Navigate } from 'react-router-dom';

function AdminDashboardPage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    posterUrl: '',
    initialRating: 0,
    isPremium: false
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await createMovie({
        ...formData,
        initialRating: parseFloat(formData.initialRating)
      });
      
      setMessage('Movie added successfully!');
      setFormData({
        title: '',
        description: '',
        posterUrl: '',
        initialRating: 0,
        isPremium: false
      });
    } catch (error) {
      setMessage('Failed to add movie. Please try again.');
      console.error('Failed to create movie:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage movies and content
          </p>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Add New Movie
          </h2>

          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.includes('successfully') 
                ? 'bg-green-100 text-green-700 border border-green-400' 
                : 'bg-red-100 text-red-700 border border-red-400'
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Movie Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                className="input-field"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter movie title"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                className="input-field"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter movie description"
              />
            </div>

            <div>
              <label htmlFor="posterUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Poster URL
              </label>
              <input
                type="url"
                id="posterUrl"
                name="posterUrl"
                required
                className="input-field"
                value={formData.posterUrl}
                onChange={handleChange}
                placeholder="https://example.com/poster.jpg"
              />
            </div>

            <div>
              <label htmlFor="initialRating" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Initial Rating (0-5)
              </label>
              <input
                type="number"
                id="initialRating"
                name="initialRating"
                min="0"
                max="5"
                step="0.1"
                className="input-field"
                value={formData.initialRating}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isPremium"
                name="isPremium"
                className="w-4 h-4 text-primary-500 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                checked={formData.isPremium}
                onChange={handleChange}
              />
              <label htmlFor="isPremium" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Premium Content?
              </label>
            </div>

            <Button
              text={loading ? 'Adding Movie...' : 'Add Movie'}
              type="submit"
              disabled={loading}
              className="w-full"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;