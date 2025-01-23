import React, { useEffect, useState } from 'react';
import { Calendar, Clock, User, Award, BookOpen, Star, MapPin, Phone, Mail, Briefcase } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface Expert {
  id: string;
  name: string;
  specialization: string;
  bio: string;
  experience: number;
  location: string;
  languages: string[];
  rating: number;
  consultationFee: string;
  education: string;
  barCouncil: string;
  imageUrl: string;
  availability: Record<string, string[]>;
}

export function Consultations() {
  const { user } = useAuth();
  const [experts, setExperts] = useState<Expert[]>([]);
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    loadExperts();
  }, []);

  async function loadExperts() {
    const { data, error } = await supabase
      .from('experts')
      .select('*');

    if (error) {
      console.error('Error loading experts:', error);
    } else {
      setExperts(data || defaultExperts);
    }
  }

  const defaultExperts: Expert[] = [
    {
      id: '1',
      name: 'Adv. Priya Sharma',
      specialization: 'Family Law Expert',
      bio: 'Specialized in family law with extensive experience in divorce, child custody, and property disputes. Known for compassionate approach to sensitive family matters.',
      experience: 15,
      location: 'New Delhi',
      languages: ['English', 'Hindi', 'Punjabi'],
      rating: 4.8,
      consultationFee: '₹2,000',
      education: 'LLM, Delhi University',
      barCouncil: 'Bar Council of Delhi',
      imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200',
      availability: {
        'Monday': ['10:00', '14:00', '16:00'],
        'Wednesday': ['11:00', '15:00', '17:00'],
        'Friday': ['09:00', '13:00', '15:00']
      }
    },
    {
      id: '2',
      name: 'Adv. Rajesh Kumar',
      specialization: 'Property Law Expert',
      bio: 'Expert in property law and family property disputes. Successfully handled numerous high-profile cases with focus on amicable settlements.',
      experience: 20,
      location: 'Mumbai',
      languages: ['English', 'Hindi', 'Marathi'],
      rating: 4.9,
      consultationFee: '₹2,500',
      education: 'LLM, Mumbai University',
      barCouncil: 'Bar Council of Maharashtra',
      imageUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=200&h=200',
      availability: {
        'Tuesday': ['09:00', '13:00', '15:00'],
        'Thursday': ['10:00', '14:00', '16:00'],
        'Saturday': ['11:00', '15:00']
      }
    },
    {
      id: '3',
      name: 'Adv. Meera Patel',
      specialization: 'Child Custody Expert',
      bio: 'Dedicated to protecting children\'s rights in custody battles. Known for child-centric approach and successful mediation skills.',
      experience: 12,
      location: 'Bangalore',
      languages: ['English', 'Hindi', 'Kannada'],
      rating: 4.7,
      consultationFee: '₹1,800',
      education: 'LLM, National Law School',
      barCouncil: 'Bar Council of Karnataka',
      imageUrl: 'https://images.unsplash.com/photo-1580894894513-541e068a3e2b?auto=format&fit=crop&q=80&w=200&h=200',
      availability: {
        'Monday': ['11:00', '15:00'],
        'Wednesday': ['10:00', '14:00'],
        'Friday': ['09:00', '13:00']
      }
    }
  ];

  async function handleBooking() {
    if (!user || !selectedExpert || !selectedDate || !selectedTime) return;

    const { error } = await supabase.from('consultations').insert([
      {
        user_id: user.id,
        expert_id: selectedExpert.id,
        date: new Date(`${selectedDate}T${selectedTime}`).toISOString(),
        status: 'scheduled'
      }
    ]);

    if (error) {
      console.error('Error booking consultation:', error);
    } else {
      setSelectedExpert(null);
      setSelectedDate('');
      setSelectedTime('');
      // Show success message
      alert('Consultation booked successfully!');
    }
  }

  const specializations = ['all', 'Family Law', 'Property Law', 'Child Custody'];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Expert Legal Consultations</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Connect with experienced Indian legal experts specializing in family law.
          Get professional guidance tailored to your specific situation.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-wrap gap-4">
          {specializations.map((spec) => (
            <button
              key={spec}
              onClick={() => setActiveFilter(spec)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === spec
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {spec.charAt(0).toUpperCase() + spec.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Experts List */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <User className="h-5 w-5 text-indigo-600" />
            Available Legal Experts
          </h2>
          
          <div className="space-y-6">
            {experts.map((expert) => (
              <div
                key={expert.id}
                className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer ${
                  selectedExpert?.id === expert.id ? 'ring-2 ring-indigo-500' : ''
                }`}
                onClick={() => setSelectedExpert(expert)}
              >
                <div className="flex gap-6">
                  <img
                    src={expert.imageUrl}
                    alt={expert.name}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{expert.name}</h3>
                        <p className="text-indigo-600 text-sm">{expert.specialization}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{expert.rating}</span>
                      </div>
                    </div>

                    <div className="mt-2 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{expert.location}</span>
                        <span className="mx-2">•</span>
                        <Briefcase className="h-4 w-4" />
                        <span>{expert.experience} years</span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {expert.languages.map((lang) => (
                          <span
                            key={lang}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>

                      <p className="text-sm text-gray-600 line-clamp-2">{expert.bio}</p>

                      <div className="flex items-center justify-between mt-4">
                        <div className="text-sm">
                          <span className="font-medium text-gray-900">{expert.consultationFee}</span>
                          <span className="text-gray-600"> per session</span>
                        </div>
                        <button
                          onClick={() => setSelectedExpert(expert)}
                          className="text-indigo-600 text-sm hover:text-indigo-700"
                        >
                          View Details →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Section */}
        {selectedExpert && (
          <div className="lg:sticky lg:top-4 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-6">Expert Details & Booking</h2>
              
              <div className="space-y-6">
                {/* Expert Details */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedExpert.imageUrl}
                      alt={selectedExpert.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{selectedExpert.name}</h3>
                      <p className="text-indigo-600 text-sm">{selectedExpert.specialization}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-indigo-600" />
                      <span>{selectedExpert.education}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-indigo-600" />
                      <span>{selectedExpert.barCouncil}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Available Time Slots</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Select Date
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Select Time
                        </label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <select
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          >
                            <option value="">Select a time</option>
                            {Object.entries(selectedExpert.availability).map(([day, times]) => (
                              times.map((time) => (
                                <option key={`${day}-${time}`} value={time}>
                                  {day} - {time}
                                </option>
                              ))
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-medium">Consultation Fee</span>
                      <span className="text-lg font-semibold">{selectedExpert.consultationFee}</span>
                    </div>
                    
                    <button
                      onClick={handleBooking}
                      disabled={!selectedDate || !selectedTime || !user}
                      className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      {user ? 'Book Consultation' : 'Sign in to Book'}
                    </button>
                    
                    {!user && (
                      <p className="text-sm text-gray-500 text-center mt-2">
                        Please sign in to book a consultation
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-indigo-50 p-6 rounded-lg">
              <h3 className="font-medium mb-4">Need Help?</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-indigo-600" />
                  <span>+91 1800-123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-indigo-600" />
                  <span>support@familylegal.com</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}