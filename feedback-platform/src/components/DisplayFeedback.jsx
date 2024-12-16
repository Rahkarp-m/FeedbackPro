import { useState, useEffect } from 'react';
import axios from 'axios';

function DisplayFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/feedback', {
          withCredentials: true
        });
        setFeedbacks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching feedback:', error);
        setError('Failed to load feedback. Please try again later.');
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-center">
        <div className="bg-gray-800 p-8 rounded-xl shadow-xl">
          <p className="text-xl font-semibold text-red-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-900 text-yellow-300';
      case 'open':
        return 'bg-blue-900 text-blue-300';
      case 'in-progress':
        return 'bg-purple-900 text-purple-300';
      case 'completed':
        return 'bg-green-900 text-green-300';
      default:
        return 'bg-gray-800 text-gray-300';
    }
  };

  
  const getRatingStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span 
          key={i} 
          className={`text-xl ${i <= rating ? 'text-yellow-400' : 'text-gray-600'}`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center text-purple-400">
          Feedback Dashboard
        </h1>
        
        {feedbacks.length === 0 ? (
          <div className="text-center text-gray-400">
            <p className="text-2xl">No feedback submitted yet.</p>
            <p className="text-base mt-4 text-gray-500">Be the first to share your thoughts!</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {feedbacks.map((feedback) => (
              <div 
                key={feedback._id} 
                className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold text-gray-200">{feedback.title}</h2>
                    <span 
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(feedback.status)}`}
                    >
                      {feedback.status}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-gray-400">{feedback.comment}</p>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <div>
                      <span className="font-medium text-gray-300">Category:</span> {feedback.category}
                    </div>
                    <div className="flex space-x-1">
                      {getRatingStars(feedback.rating)}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-700">
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <div>By: <span className="text-gray-300">{feedback.userName || 'Anonymous'}</span></div>
                      <div>{new Date(feedback.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DisplayFeedback;