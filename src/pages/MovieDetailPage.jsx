import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieById, addReview } from '../services/api';
import { useAuth } from '../context/AuthContext';
import ReviewCard from '../components/ReviewCard';
import Button from '../components/Button';
import Loader from '../components/Loader';

function MovieDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: ''
  });

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieById(id);
        setMovie(data);
      } catch (error) {
        console.error('Failed to fetch movie:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setSubmitting(true);
    try {
      const newReview = await addReview(id, {
        user: user.name,
        rating: parseInt(reviewForm.rating),
        comment: reviewForm.comment
      });

      setMovie(prev => ({
        ...prev,
        reviews: [...prev.reviews, newReview]
      }));

      setReviewForm({ rating: 5, comment: '' });
    } catch (error) {
      console.error('Failed to add review:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Movie not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="card">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-96 object-cover rounded-lg"
                onError={(e) => {
                  e.target.src = 'https://images.pexels.com/photos/274937/pexels-photo-274937.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop';
                }}
              />
              {movie.isPremium && (
                <span className="inline-block mt-4 premium-badge text-white text-sm font-bold px-3 py-1 rounded-full">
                  Premium Content
                </span>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="card">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {movie.title}
              </h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.floor(movie.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                      ⭐
                    </span>
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {movie.rating.toFixed(1)}/5.0
                </span>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {movie.description}
              </p>
            </div>

            {user && (
              <div className="card">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Write a Review
                </h3>
                
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="rating" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Rating (1-5)
                    </label>
                    <select
                      id="rating"
                      className="input-field"
                      value={reviewForm.rating}
                      onChange={(e) => setReviewForm(prev => ({ ...prev, rating: e.target.value }))}
                    >
                      {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num} Star{num !== 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Your Review
                    </label>
                    <textarea
                      id="comment"
                      rows={4}
                      className="input-field"
                      placeholder="Share your thoughts about this movie..."
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <Button
                    text={submitting ? 'Submitting...' : 'Submit Review'}
                    type="submit"
                    disabled={submitting}
                  />
                </form>
              </div>
            )}

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Reviews ({movie.reviews.length})
              </h3>
              
              {movie.reviews.length > 0 ? (
                <div className="space-y-4">
                  {movie.reviews.map(review => (
                    <ReviewCard
                      key={review.id}
                      user={review.user}
                      rating={review.rating}
                      comment={review.comment}
                      createdAt={review.createdAt}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No reviews yet. Be the first to review this movie!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailPage;