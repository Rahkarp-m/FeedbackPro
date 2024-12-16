import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitFeedback } from '../services/api';

const FeedbackForm = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !feedback) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitFeedback({
        category,
        rating,
        comment: feedback
      });
      
      alert('Feedback submitted successfully!');
      navigate('/');
    } catch (error) {
      alert('Error submitting feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-purple-400 mb-3">Share Your Feedback</h2>
          <p className="text-xl text-gray-300">Help us improve our products with your valuable insights</p>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-2xl p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature Cards */}
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all">
              <div className="text-purple-400 mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-200 mb-2">Quick & Easy</h3>
              <p className="text-base text-gray-400">Submit your feedback in just a few clicks</p>
            </div>

            <div className="bg-gray-700 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all">
              <div className="text-purple-400 mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-200 mb-2">Make an Impact</h3>
              <p className="text-base text-gray-400">Your feedback shapes our future updates</p>
            </div>

            <div className="bg-gray-700 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all">
              <div className="text-purple-400 mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-200 mb-2">Track Progress</h3>
              <p className="text-base text-gray-400">Follow how your feedback is implemented</p>
            </div>
          </div>

          {/* Feedback Form */}
          <form className="space-y-6 mt-8" onSubmit={handleSubmit}>
            <div>
              <label className="block text-lg font-medium text-gray-200 mb-2">
                Select Category
              </label>
              <select 
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-700 focus:ring-purple-500 focus:border-purple-500 text-base text-gray-200 bg-gray-700"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="" className="bg-gray-800 text-gray-300">Choose a category</option>
                <option value="Product Features" className="bg-gray-800 text-gray-300">Product Features</option>
                <option value="Product Pricing" className="bg-gray-800 text-gray-300">Product Pricing</option>
                <option value="Product Usability" className="bg-gray-800 text-gray-300">Product Usability</option>
              </select>
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-200 mb-2">
                Rating
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    className={`w-10 h-10 rounded-full focus:outline-none transition-all ${
                      rating >= value
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-700 text-gray-400'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-200 mb-2">
                Your Feedback
              </label>
              <textarea
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-700 focus:ring-purple-500 focus:border-purple-500 text-base text-gray-200 bg-gray-700"
                rows="5"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your thoughts..."
                required
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-purple-600 text-white text-base font-medium rounded-lg hover:bg-purple-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;