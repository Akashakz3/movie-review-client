import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
});

// Mock data
const mockMovies = [
  {
    id: '1',
    title: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    posterUrl: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
    rating: 4.8,
    isPremium: true
  },
  {
    id: '2',
    title: 'The Matrix',
    description: 'A computer programmer is led to fight an underground war against powerful computers who have constructed his entire reality with a system called the Matrix.',
    posterUrl: 'https://images.pexels.com/photos/7991677/pexels-photo-7991677.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
    rating: 4.6,
    isPremium: false
  },
  {
    id: '3',
    title: 'Interstellar',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    posterUrl: 'https://images.pexels.com/photos/7991728/pexels-photo-7991728.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
    rating: 4.7,
    isPremium: true
  },
  {
    id: '4',
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.',
    posterUrl: 'https://images.pexels.com/photos/7991518/pexels-photo-7991518.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
    rating: 4.9,
    isPremium: false
  }
];

const mockReviews = {
  '1': [
    {
      id: '1',
      user: 'John Doe',
      rating: 5,
      comment: 'Mind-bending masterpiece! Christopher Nolan outdid himself.',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      user: 'Sarah Johnson',
      rating: 4,
      comment: 'Great movie but can be confusing at times.',
      createdAt: '2024-01-10'
    }
  ],
  '2': [
    {
      id: '3',
      user: 'Mike Wilson',
      rating: 5,
      comment: 'Revolutionary sci-fi film that changed cinema forever.',
      createdAt: '2024-01-12'
    }
  ]
};

// Mock API functions
export const getMovies = async () => {
  await new Promise(resolve => setTimeout(resolve, 600));
  return mockMovies;
};

export const getMovieById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const movie = mockMovies.find(m => m.id === id);
  if (!movie) throw new Error('Movie not found');
  return {
    ...movie,
    reviews: mockReviews[id] || []
  };
};

export const createMovie = async (movieData) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  const newMovie = {
    ...movieData,
    id: (mockMovies.length + 1).toString(),
    rating: movieData.initialRating || 0
  };
  mockMovies.push(newMovie);
  return newMovie;
};

export const addReview = async (movieId, reviewData) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newReview = {
    ...reviewData,
    id: Math.random().toString(36),
    createdAt: new Date().toISOString().split('T')[0]
  };
  
  if (!mockReviews[movieId]) {
    mockReviews[movieId] = [];
  }
  mockReviews[movieId].push(newReview);
  return newReview;
};

export default api;