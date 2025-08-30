/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Mail, Phone, Globe, MapPin, Edit2, Award, Briefcase, DollarSign, Camera, ChevronRight, Shield, Star, Clock, Settings } from 'lucide-react';
import { useWallet } from '@txnlab/use-wallet';

const Profile: React.FC = () => {
  const { activeAddress } = useWallet();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    title: 'Patent Innovation Expert',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    website: 'www.johndoe.com',
    location: 'San Francisco, CA',
    patents: 12,
    activePatents: 8,
    revenue: '$45.2K',
    bio: 'Pioneering innovation in blockchain technology and intellectual property. Specialized in patent tokenization and digital asset management.',
    achievements: [
      { id: 1, title: 'Top Patent Holder 2024', date: 'March 2024' },
      { id: 2, title: 'Innovation Excellence Award', date: 'January 2024' },
      { id: 3, title: 'Blockchain Patent Pioneer', date: 'December 2023' },
    ],
    recentActivity: [
      { id: 1, type: 'Patent Filed', name: 'Quantum Computing Algorithm', date: '2 days ago' },
      { id: 2, type: 'Shares Sold', name: 'AI Neural Network', date: '5 days ago' },
      { id: 3, type: 'Revenue Generated', name: 'Blockchain Security', date: '1 week ago' },
    ]
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleProfileUpdate = (field: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-8 mt-16 mb-16">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 overflow-hidden">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative group">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80"
                alt="Profile"
                className="w-36 h-36 rounded-full border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-300"
              />
              <button className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Camera className="w-4 h-4 text-gray-700" />
              </button>
            </div>

            <div className="text-center md:text-left flex-1">
              <div className="flex items-center justify-center md:justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">{profile.name}</h1>
                  <p className="text-xl text-indigo-100">{profile.title}</p>
                </div>
                <div className="hidden md:flex space-x-4">
                  <button className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white flex items-center space-x-2">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={handleEditToggle}
                    className="px-4 py-2 bg-indigo-500 rounded-lg hover:bg-indigo-600 transition-colors text-white flex items-center space-x-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                </div>
              </div>

              <p className="mt-4 text-indigo-100 max-w-2xl">{profile.bio}</p>

              <div className="mt-6 flex flex-wrap gap-4">
                <div className="px-4 py-2 bg-white/10 rounded-lg text-white">
                  <span className="text-indigo-200">Wallet</span>
                  <p className="font-mono">{activeAddress ? `${activeAddress.slice(0, 6)}...${activeAddress.slice(-4)}` : 'Not Connected'}</p>
                </div>
                <div className="px-4 py-2 bg-white/10 rounded-lg text-white">
                  <span className="text-indigo-200">Member Since</span>
                  <p>March 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-lg rounded-2xl p-6 text-white border border-white/10 hover:border-indigo-500/50 transition-all duration-300 group">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-indigo-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Award className="w-6 h-6 text-indigo-400" />
            </div>
            <h2 className="text-xl font-semibold">Patents</h2>
          </div>
          <p className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            {profile.patents}
          </p>
          <p className="text-gray-300 mt-1">Total Patents Filed</p>
          <div className="mt-4 flex items-center text-indigo-300 text-sm">
            <ChevronRight className="w-4 h-4" />
            <span>View All Patents</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-lg rounded-2xl p-6 text-white border border-white/10 hover:border-purple-500/50 transition-all duration-300 group">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-purple-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Briefcase className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-xl font-semibold">Active</h2>
          </div>
          <p className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {profile.activePatents}
          </p>
          <p className="text-gray-300 mt-1">Active Patents</p>
          <div className="mt-4 flex items-center text-purple-300 text-sm">
            <ChevronRight className="w-4 h-4" />
            <span>Manage Patents</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-500/10 to-rose-500/10 backdrop-blur-lg rounded-2xl p-6 text-white border border-white/10 hover:border-pink-500/50 transition-all duration-300 group">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-pink-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <DollarSign className="w-6 h-6 text-pink-400" />
            </div>
            <h2 className="text-xl font-semibold">Revenue</h2>
          </div>
          <p className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
            {profile.revenue}
          </p>
          <p className="text-gray-300 mt-1">Total Revenue</p>
          <div className="mt-4 flex items-center text-pink-300 text-sm">
            <ChevronRight className="w-4 h-4" />
            <span>View Analytics</span>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-white border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Contact Information</h2>
              <button
                onClick={handleEditToggle}
                className="text-indigo-400 hover:text-indigo-300 transition-colors p-2 hover:bg-white/10 rounded-lg"
              >
                <Edit2 size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group">
                <div className="p-3 bg-indigo-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Email</p>
                  <p className="font-medium">{profile.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group">
                <div className="p-3 bg-purple-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Phone</p>
                  <p className="font-medium">{profile.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group">
                <div className="p-3 bg-pink-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-6 h-6 text-pink-400" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Website</p>
                  <p className="font-medium">{profile.website}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group">
                <div className="p-3 bg-green-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Location</p>
                  <p className="font-medium">{profile.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-white border border-white/10 mt-6">
            <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {profile.recentActivity.map(activity => (
                <div key={activity.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-indigo-500/20 rounded-lg">
                      {activity.type === 'Patent Filed' ? (
                        <Shield className="w-5 h-5 text-indigo-400" />
                      ) : activity.type === 'Shares Sold' ? (
                        <DollarSign className="w-5 h-5 text-green-400" />
                      ) : (
                        <Star className="w-5 h-5 text-yellow-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{activity.type}</p>
                      <p className="text-sm text-gray-300">{activity.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-300 text-sm">
                    <Clock className="w-4 h-4 mr-2" />
                    {activity.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-white border border-white/10 h-fit">
          <h2 className="text-2xl font-bold mb-6">Achievements</h2>
          <div className="space-y-4">
            {profile.achievements.map(achievement => (
              <div key={achievement.id} className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-yellow-500/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Star className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <p className="font-medium">{achievement.title}</p>
                    <p className="text-sm text-gray-300">{achievement.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-sm">
            View All Achievements
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
