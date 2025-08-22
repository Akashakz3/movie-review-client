import { Link } from 'react-router-dom';
import Button from '../components/Button';

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Discover Amazing Movies
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
            Explore, review, and discover your next favorite movie. Join our community of movie enthusiasts and share your thoughts on the latest releases.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/movies">
              <Button text="Browse Movies" size="lg" />
            </Link>
            <Link to="/signup">
              <Button text="Join Now" variant="outline" size="lg" />
            </Link>
          </div>
        </div>

        <div className="mt-20">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎬</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Extensive Library
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Browse through thousands of movies from different genres and eras.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                User Reviews
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Read honest reviews from fellow movie lovers and share your own.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👑</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Premium Content
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Access exclusive premium movies and detailed reviews.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;