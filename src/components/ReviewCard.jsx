function ReviewCard({ user, rating, comment, createdAt }) {
  return (
    <div className="card">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-medium text-gray-900 dark:text-gray-100">{user}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{createdAt}</p>
        </div>
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
              ⭐
            </span>
          ))}
        </div>
      </div>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{comment}</p>
    </div>
  );
}

export default ReviewCard;