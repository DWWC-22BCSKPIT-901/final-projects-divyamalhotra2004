import React from 'react';
import { BookOpen, FileText, Scale, Users, Heart, Home, Briefcase, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Resources() {
  const categories = [
    {
      title: 'Marriage Rights',
      icon: <Scale className="h-6 w-6" />,
      description: 'Essential information about legal rights and responsibilities in marriage',
      articles: [
        { title: 'Understanding Marriage Laws', readTime: '5 min', featured: true },
        { title: 'Legal Rights in Marriage', readTime: '7 min', featured: true },
        { title: 'Marriage Property Rights', readTime: '6 min' },
        { title: 'Prenuptial Agreements Guide', readTime: '8 min' },
        { title: 'Marriage Registration Process', readTime: '4 min' },
        { title: 'International Marriage Laws', readTime: '10 min' }
      ]
    },
    {
      title: 'Child Custody',
      icon: <Users className="h-6 w-6" />,
      description: 'Comprehensive guides on child custody rights and responsibilities',
      articles: [
        { title: 'Child Custody Basics', readTime: '8 min', featured: true },
        { title: 'Visitation Rights Guide', readTime: '6 min', featured: true },
        { title: 'Co-Parenting Legal Framework', readTime: '7 min' },
        { title: 'Child Support Guidelines', readTime: '9 min' },
        { title: 'International Child Custody', readTime: '12 min' },
        { title: 'Modifying Custody Agreements', readTime: '6 min' }
      ]
    },
    {
      title: 'Property Division',
      icon: <Home className="h-6 w-6" />,
      description: 'Information about property rights and division during separation',
      articles: [
        { title: 'Property Division Laws', readTime: '5 min', featured: true },
        { title: 'Asset Distribution Guide', readTime: '6 min', featured: true },
        { title: 'Protecting Your Assets', readTime: '7 min' },
        { title: 'Business Assets in Divorce', readTime: '8 min' },
        { title: 'Real Estate Division Guide', readTime: '6 min' },
        { title: 'Debt Division in Divorce', readTime: '5 min' }
      ]
    },
    {
      title: 'Welfare Benefits',
      icon: <Heart className="h-6 w-6" />,
      description: 'Guide to available welfare benefits and eligibility criteria',
      articles: [
        { title: 'Understanding Welfare Rights', readTime: '7 min', featured: true },
        { title: 'Child Benefit Guide', readTime: '5 min', featured: true },
        { title: 'Housing Benefit Overview', readTime: '6 min' },
        { title: 'Disability Benefits Guide', readTime: '8 min' },
        { title: 'Income Support Eligibility', readTime: '5 min' },
        { title: 'Emergency Assistance Programs', readTime: '4 min' }
      ]
    }
  ];

  const quickGuides = [
    {
      title: 'Legal Process',
      icon: <Briefcase className="h-5 w-5" />,
      content: 'Step-by-step guide to navigating the legal system'
    },
    {
      title: 'Document Checklist',
      icon: <FileText className="h-5 w-5" />,
      content: 'Essential documents needed for legal proceedings'
    },
    {
      title: 'FAQ',
      icon: <HelpCircle className="h-5 w-5" />,
      content: 'Common questions about family legal matters'
    }
  ];

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">Legal Resources</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Access comprehensive guides and expert articles to help you understand your legal rights.
          Our resources are regularly updated and reviewed by legal professionals.
        </p>
      </div>

      {/* Featured Articles Section */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Featured Articles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.flatMap(category => 
            category.articles
              .filter(article => article.featured)
              .map(article => (
                <div key={article.title} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-indigo-600 mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{article.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{article.readTime} read</span>
                    <button className="text-indigo-600 text-sm hover:text-indigo-700">Read more →</button>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>

      {/* Quick Guides Section */}
      <div className="bg-white rounded-xl p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Quick Guides</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {quickGuides.map(guide => (
            <div key={guide.title} className="border border-gray-100 rounded-lg p-6 hover:border-indigo-100 transition-colors">
              <div className="flex items-center space-x-3 mb-3">
                <div className="text-indigo-600">{guide.icon}</div>
                <h3 className="font-semibold text-gray-900">{guide.title}</h3>
              </div>
              <p className="text-gray-600 text-sm">{guide.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Categories Section */}
      <div className="space-y-8">
        <h2 className="text-2xl font-semibold text-gray-900">Resource Categories</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <div key={category.title} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="text-indigo-600">{category.icon}</div>
                  <div>
                    <h2 className="text-xl font-semibold">{category.title}</h2>
                    <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {category.articles.map((article) => (
                    <button
                      key={article.title}
                      className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-gray-800 group-hover:text-indigo-600 transition-colors">
                            {article.title}
                          </span>
                          {article.featured && (
                            <span className="ml-2 text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full">
                              Featured
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">{article.readTime}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl p-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-semibold mb-2">Need Personalized Legal Guidance?</h3>
            <p className="text-indigo-100">
              Book a consultation with our expert legal advisors for detailed advice tailored to your situation.
            </p>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/consultations"
              className="bg-white text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              Book Consultation
            </Link>
            <Link
              to="/community"
              className="border border-white text-white px-6 py-3 rounded-lg hover:bg-indigo-500 transition-colors"
            >
              Join Community
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}