import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <div className="flex-1 flex flex-col lg:flex-row relative bg-gray-900">
        <div className="flex items-center justify-center px-6 py-8 lg:w-1/2 h-full">
          <main className="text-center lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
              <span className="block">Share Your Thoughts</span>
              <span className="block text-purple-400">Shape Our Future</span>
            </h1>
            <p className="mt-4 text-gray-300 sm:text-lg sm:mt-6 md:text-xl">
              Your feedback helps us create better products. Share your experience and help us improve.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
              <Link
                to="/feedback"
                className="flex justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10"
              >
                Give Feedback
              </Link>
              <Link
                to="/display"
                className="flex justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-700 hover:bg-gray-600 md:py-4 md:text-lg md:px-10"
              >
                View Feedback
              </Link>
            </div>
          </main>
        </div>

        
        <div className="hidden lg:block lg:w-1/2">
          <img
            src="https://situational.com/wordpress/wp-content/uploads/2023/04/TBI_Leadership_Image_830x560.jpg"
            alt="Leadership Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;