import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, Users, Home, BookOpen, MessageSquare, Calendar, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Navigation() {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-indigo-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Scale className="h-8 w-8" />
              <span className="font-bold text-xl">FamilyLegal</span>
            </Link>
            
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                <Link to="/" className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-indigo-600">
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>
                <Link to="/resources" className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-indigo-600">
                  <BookOpen className="h-4 w-4" />
                  <span>Resources</span>
                </Link>
                <Link to="/community" className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-indigo-600">
                  <Users className="h-4 w-4" />
                  <span>Community</span>
                </Link>
                <Link to="/consultations" className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-indigo-600">
                  <Calendar className="h-4 w-4" />
                  <span>Consultations</span>
                </Link>
                {user && (
                  <Link to="/report" className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-indigo-600">
                    <AlertCircle className="h-4 w-4" />
                    <span>Report Portal</span>
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm">{user.email}</span>
                <button
                  onClick={() => signOut()}
                  className="bg-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-500"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-500"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}