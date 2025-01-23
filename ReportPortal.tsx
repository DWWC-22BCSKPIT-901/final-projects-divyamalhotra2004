import React, { useEffect, useState } from 'react';
import { AlertCircle, FileText, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface Report {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  created_at: string;
}

export function ReportPortal() {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [newReport, setNewReport] = useState({
    title: '',
    description: '',
    category: 'general'
  });

  useEffect(() => {
    if (user) {
      loadReports();
    }
  }, [user]);

  async function loadReports() {
    if (!user) return;

    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading reports:', error);
    } else {
      setReports(data || []);
    }
  }

  async function handleSubmitReport(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;

    const { error } = await supabase.from('reports').insert([
      {
        ...newReport,
        user_id: user.id,
        status: 'pending'
      }
    ]);

    if (error) {
      console.error('Error creating report:', error);
    } else {
      setNewReport({ title: '', description: '', category: 'general' });
      loadReports();
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Report Portal</h1>
        <p className="mt-4 text-lg text-gray-600">
          Submit your case and get expert guidance on your situation
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Submit New Report</h2>
          <form onSubmit={handleSubmitReport} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={newReport.title}
                onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                value={newReport.category}
                onChange={(e) => setNewReport({ ...newReport, category: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="general">General Inquiry</option>
                <option value="marriage">Marriage Related</option>
                <option value="custody">Child Custody</option>
                <option value="property">Property Division</option>
                <option value="welfare">Welfare Benefits</option>
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                value={newReport.description}
                onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500"
            >
              Submit Report
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Your Reports</h2>
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">{report.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    report.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : report.status === 'in_progress'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{report.description}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{new Date(report.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}