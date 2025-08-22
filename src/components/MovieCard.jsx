import { useNavigate } from 'react-router-dom';
import Button from './Button';

function MovieCard({ id, title, posterUrl, rating, isPremium }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      <div className="relative">
        <img
          src={posterUrl}
          alt={title}
          className="w-full h-64 object-cover rounded-lg mb-4"
          onError={(e) => {
            e.target.src = 'https://images.pexels.com/photos/274937/pexels-photo-274937.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop';
          }}
        />
        {isPremium && (
          <span className="absolute top-2 right-2 premium-badge text-white text-xs font-bold px-2 py-1 rounded-full">
            Premium
          </span>
        )}
      </div>
      
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
          {title}
        </h3>
        
        <div className="flex items-center space-x-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}>
                ⭐
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {rating.toFixed(1)}
          </span>
        </div>
        
        <Button
          text="View Details"
          onClick={handleViewDetails}
          className="w-full"
          size="sm"
        />
      </div>
    </div>
  );
}

export default MovieCard;