import React, { useState } from 'react';

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name: '', rating: '', comment: '' });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
    };
    setReviews([newReview, ...reviews]);
    setForm({ name: '', rating: '', comment: '' });
    setErrors({});
    setShowModal(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Your Review
        </button>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet. Be the first to leave one!</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="border border-gray-200 p-4 rounded-lg shadow-sm">
              <div className="font-semibold text-lg text-gray-800">{review.name}</div>
              <div className="text-yellow-500 font-medium">Rating: {review.rating} / 5</div>
              <p className="text-gray-700 mt-1">{review.comment}</p>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-0 bg-opacity-50">
          <div className="bg-white w-full max-w-md rounded-lg p-6 shadow-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-xl"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4 text-center">Add Your Review</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium text-sm mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>

              <div>
                <label className="block font-medium text-sm mb-1">Rating (1 - 5)</label>
                <input
                  type="number"
                  name="rating"
                  value={form.rating}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  min="1"
                  max="5"
                />
                {errors.rating && <p className="text-red-500 text-sm">{errors.rating}</p>}
              </div>

              <div>
                <label className="block font-medium text-sm mb-1">Comment</label>
                <textarea
                  name="comment"
                  value={form.comment}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  rows="3"
                />
                {errors.comment && <p className="text-red-500 text-sm">{errors.comment}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
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

export default ReviewSection;
