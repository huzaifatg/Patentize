import React from 'react';
import { Share2, DollarSign, BarChart2, Shield } from 'lucide-react';

const MyAssets: React.FC = () => {
  const assets = [
    {
      id: 1,
      name: "Quantum Computing Patent #QC-2025",
      description: "Revolutionary quantum computing architecture for enhanced processing",
      shares: 1000,
      price: 125.00,
      status: "Active",
      performance: "+15.2%"
    },
    {
      id: 2,
      name: "AI Neural Network Patent #AI-2025",
      description: "Advanced neural network system for real-time data processing",
      shares: 750,
      price: 85.50,
      status: "Active",
      performance: "+8.7%"
    },
    {
      id: 3,
      name: "Blockchain Security Patent #BC-2025",
      description: "Next-generation blockchain security protocol",
      shares: 500,
      price: 95.75,
      status: "Pending",
      performance: "+12.3%"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-white">
        <h1 className="text-4xl font-bold mb-4">My Patents</h1>
        <p className="text-xl text-gray-200">Manage your patent portfolio</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {assets.map((asset) => (
          <div key={asset.id} className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 text-white hover:bg-white/30 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold mb-2">{asset.name}</h3>
                <p className="text-gray-300">{asset.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                asset.status === 'Active' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'
              }`}>
                {asset.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="flex items-center space-x-3 bg-white/10 rounded-xl p-4">
                <Share2 className="w-5 h-5 text-indigo-400" />
                <div>
                  <p className="text-sm text-gray-300">Available Shares</p>
                  <p className="text-lg font-bold">{asset.shares}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 rounded-xl p-4">
                <DollarSign className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-sm text-gray-300">Price per Share</p>
                  <p className="text-lg font-bold">${asset.price}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-6">
              <div className="flex items-center space-x-2">
                <BarChart2 className="w-5 h-5 text-indigo-400" />
                <span className="text-green-400">{asset.performance}</span>
              </div>
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Manage Patent</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors text-white font-medium">
          Register New Patent
        </button>
      </div>
    </div>
  );
};

export default MyAssets;
