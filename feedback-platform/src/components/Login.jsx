import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('login') === 'success') {
      toast.success('Successfully logged in!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark' 
      });
      navigate('/feedback');
    }
  }, [location, navigate]);

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8800/auth/google';
  };

  return (
    <div className="flex-1 w-full min-h-screen bg-gray-900">
      <div className="w-full h-full flex items-center justify-center p-6">
        <div className="w-full max-w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center px-4 sm:px-6 lg:px-8">
          {/* Left Side - Login Form */}
          <div className="w-full space-y-6 bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
            <div>
              <h2 className="text-4xl font-bold text-white mb-4">
                Welcome 
              </h2>
              <p className="text-xl text-gray-400">
                Share your valuable feedback 
              </p>
            </div>

            
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex justify-center items-center gap-4 py-3 px-6 rounded-lg shadow-md 
              text-white bg-gray-700 border border-gray-600 
              hover:bg-gray-600 transition-all transform hover:scale-105"
            >
              <img 
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                alt="Google" 
                className="w-6 h-6"
              />
              <span className="text-lg font-medium">
                Sign In with Google
              </span>
            </button>
          </div>

         
          <div className="hidden lg:block space-y-8">
            {[
              {
                icon: (
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                ),
                title: "Track Your History",
                description: "Keep track of all your feedback and suggestions in one place.",
                bgColor: "bg-blue-900/30"
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                ),
                title: "Get Notifications",
                description: "Stay updated with the latest changes and improvements.",
                bgColor: "bg-purple-900/30"
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "Exclusive Access",
                description: "Get early access to new features and exclusive surveys.",
                bgColor: "bg-green-900/30"
              }
            ].map((feature) => (
              <div
                key={feature.title}
                className={`p-6 ${feature.bgColor} rounded-lg border border-gray-700 hover:border-gray-600 transition-all`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                    <p className="mt-2 text-gray-400">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;