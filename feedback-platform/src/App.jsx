import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import FeedbackForm from './components/FeedbackForm';
import DisplayFeedback from './components/DisplayFeedback';
import Login from './components/Login';
import './App.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen w-full bg-gray-900">
        <Navbar />
        <main className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/feedback" element={<FeedbackForm />} />
            <Route path="/display" element={<DisplayFeedback />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;