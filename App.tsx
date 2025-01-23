import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { AuthProvider } from './contexts/AuthContext';
import { Home } from './pages/Home';
import { Resources } from './pages/Resources';
import { Community } from './pages/Community';
import { Consultations } from './pages/Consultations';
import { ReportPortal } from './pages/ReportPortal';
import { Login } from './pages/Login';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/community" element={<Community />} />
              <Route path="/consultations" element={<Consultations />} />
              <Route path="/report" element={<ReportPortal />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;