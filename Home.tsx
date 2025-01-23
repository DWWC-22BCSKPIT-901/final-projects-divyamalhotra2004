import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, Users, BookOpen, Calendar } from 'lucide-react';

export function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Understanding Your Family Legal Rights
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Get comprehensive guidance on marriage, children, property, and welfare rights.
          Access expert resources and support for your family's legal needs.
        </p>
      </section>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <Link to="/resources" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <BookOpen className="h-12 w-12 text-indigo-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Legal Resources</h2>
          <p className="text-gray-600">Access comprehensive guides and articles on family law.</p>
        </Link>

        <Link to="/community" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <Users className="h-12 w-12 text-indigo-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Community Support</h2>
          <p className="text-gray-600">Connect with others and share experiences in our moderated forums.</p>
        </Link>

        <Link to="/consultations" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <Calendar className="h-12 w-12 text-indigo-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Expert Consultations</h2>
          <p className="text-gray-600">Book consultations with qualified family law experts.</p>
        </Link>

        <Link to="/report" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <Scale className="h-12 w-12 text-indigo-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Report Portal</h2>
          <p className="text-gray-600">Submit your case and get expert guidance on your situation.</p>
        </Link>
      </div>

      <section className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Featured Resources</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="font-semibold">Marriage Rights</h3>
            <p className="text-gray-600">Understanding legal rights and responsibilities in marriage.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Child Custody</h3>
            <p className="text-gray-600">Guidelines for child custody and visitation rights.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Property Division</h3>
            <p className="text-gray-600">Learn about fair property division during separation.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Welfare Benefits</h3>
            <p className="text-gray-600">Information about available welfare benefits and eligibility.</p>
          </div>
        </div>
      </section>
    </div>
  );
}