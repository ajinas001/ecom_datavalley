import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

const ReviewSection = ({ productId, productTitle }) => {
  // Get reviews from localStorage or initialize empty array
  const getStoredReviews = () => {
    const storedReviews = localStorage.getItem(`reviews_${productId}`);
    return storedReviews ? JSON.parse(storedReviews) : [];
  };

  const [reviews, setReviews] = useState(getStoredReviews);
  const [form, setForm] = useState({ name: '', rating: 5, comment: '' });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  // Save reviews to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`reviews_${productId}`, JSON.stringify(reviews));
  }, [reviews, productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'rating' ? Number(value) : value });
  };

  const handleStarClick = (rating) => {
    setForm({ ...form, rating });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.rating || form.rating < 1 || form.rating > 5)
      newErrors.rating = 'Rating must be between 1 and 5';
    if (!form.comment.trim()) newErrors.comment = 'Comment is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newReview = {
      id: Date.now(),
      ...form,
      date: new Date().toLocaleDateString(),
      productId: productId
    };
    setReviews([newReview, ...reviews]);
    setForm({ name: '', rating: 5, comment: '' });
    setErrors({});
    setShowModal(false);
  };

  // Calculate average rating
  const averageRating = reviews.length 
    ? (reviews.reduce((sum, review) => sum + Number(review.rating), 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Customer Reviews</h2>
          {reviews.length > 0 && (
            <div className="flex items-center mt-2">
              <div className="flex text-yellow-400 mr-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`w-5 h-5 ${star <= Math.round(averageRating) ? 'fill-current' : ''}`}
                  />
                ))}
              </div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">{averageRating}/5</span>
              <span className="text-gray-500 dark:text-gray-400 ml-2">
                ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
              </span>
            </div>
          )}
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-medium transition-all flex items-center"
        >
          Write a Review
        </button>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">No reviews yet for {productTitle}.</p>
            <p className="text-primary mt-2 font-medium cursor-pointer" onClick={() => setShowModal(true)}>
              Be the first to leave a review!
            </p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="border border-gray-200 dark:border-gray-700 p-5 rounded-lg">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800 dark:text-white">{review.name}</h3>
                  <div className="flex items-center mt-1 mb-3">
                    <div className="flex text-yellow-400 mr-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-4 h-4 ${star <= review.rating ? 'fill-current' : ''}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-lg p-6 shadow-lg relative animate-fade-in">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">Review {productTitle}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Share your experience with this product</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium text-sm mb-1 text-gray-700 dark:text-gray-300">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-primary"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block font-medium text-sm mb-1 text-gray-700 dark:text-gray-300">Rating</label>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-8 h-8 cursor-pointer transition-all ${
                        star <= (hoverRating || form.rating) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => handleStarClick(star)}
                    />
                  ))}
                  <span className="ml-2 text-gray-700 dark:text-gray-300">
                    {form.rating}/5
                  </span>
                </div>
                {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
              </div>

              <div>
                <label className="block font-medium text-sm mb-1 text-gray-700 dark:text-gray-300">Your Review</label>
                <textarea
                  name="comment"
                  value={form.comment}
                  onChange={handleChange}
                  placeholder="Tell us what you think about this product..."
                  className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-primary"
                  rows="4"
                />
                {errors.comment && <p className="text-red-500 text-sm mt-1">{errors.comment}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white py-2.5 px-5 rounded-lg font-medium transition-all"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;