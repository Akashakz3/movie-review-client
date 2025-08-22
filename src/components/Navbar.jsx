import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Button from './Button';

function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-primary-500">MovieReviews</span>
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors">
                Home
              </Link>
              <Link to="/movies" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors">
                Movies
              </Link>
              {user && user.role === 'admin' && (
                <Link to="/admin" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors">
                  Admin
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Welcome, {user.name}
                </span>
                <Button
                  text="Logout"
                  onClick={handleLogout}
                  variant="secondary"
                  size="sm"
                />
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button text="Login" variant="outline" size="sm" />
                </Link>
                <Link to="/signup">
                  <Button text="Sign Up" size="sm" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;