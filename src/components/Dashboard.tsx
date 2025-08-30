import React from 'react';
import { useWallet } from '@txnlab/use-wallet';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { activeAddress } = useWallet();
  const navigate = useNavigate();

  // Truncate wallet address for display
  const truncateAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const stats = [
    {
      title: "Total Patents",
      value: "12",
      change: "+2.5%",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      bgColor: "from-emerald-500/20 to-teal-500/20"
    },
    {
      title: "Active Patents",
      value: "8",
      change: "+5.0%",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 10V3L4 14H11V21L20 10H13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      bgColor: "from-blue-500/20 to-indigo-500/20"
    },
    {
      title: "Total Revenue",
      value: "$45.2K",
      change: "+8.1%",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 8C12 8 12 8 12 8C12 6.34315 10.6569 5 9 5H4V17H9C10.6569 17 12 15.6569 12 14C12 14 12 14 12 14M12 8C12 8 12 8 12 8C12 6.34315 13.3431 5 15 5H20V17H15C13.3431 17 12 15.6569 12 14C12 14 12 14 12 14M12 8V14"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      bgColor: "from-purple-500/20 to-pink-500/20"
    }
  ];

  const recentActivity = [
    { id: 1, type: 'Patent Purchase', amount: '$12,000', date: '2025-03-15', status: 'Completed' },
    { id: 2, type: 'Royalty Payment', amount: '$3,500', date: '2025-03-14', status: 'Processing' },
    { id: 3, type: 'Share Transfer', amount: '$8,750', date: '2025-03-13', status: 'Completed' },
    { id: 4, type: 'Patent Registration', amount: '$5,000', date: '2025-03-12', status: 'Pending' }
  ];

  const handleStartRegistration = () => {
    navigate('/marketplace');
  };

  const handleOpenMarketplace = () => {
    navigate('/marketplace');
  };

  return (
    <div className="pt-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
        <div className="flex items-center space-x-2 text-gray-300">
          <span>Connected Wallet:</span>
          <span className="px-3 py-1 bg-white/10 rounded-full font-mono text-sm">
            {truncateAddress(activeAddress || '')}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className={`bg-gradient-to-br ${stat.bgColor} backdrop-blur-lg rounded-2xl p-6 border border-white/10`}>
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-white/10 rounded-lg">{stat.icon}</div>
              <span className="text-emerald-400 text-sm font-medium bg-emerald-400/10 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-300 font-medium mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
          <button className="px-4 py-2 bg-indigo-600/20 text-indigo-300 rounded-lg hover:bg-indigo-600/30 transition-colors">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Type</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Amount</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((activity) => (
                <tr key={activity.id} className="border-b border-white/5 last:border-0">
                  <td className="py-4 px-4 text-white">{activity.type}</td>
                  <td className="py-4 px-4 text-white font-medium">{activity.amount}</td>
                  <td className="py-4 px-4 text-gray-300">{activity.date}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${activity.status === 'Completed' ? 'bg-green-400/10 text-green-400' :
                        activity.status === 'Processing' ? 'bg-blue-400/10 text-blue-400' :
                        'bg-yellow-400/10 text-yellow-400'
                      }`}>
                      {activity.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-4">Register New Patent</h3>
          <p className="text-gray-300 mb-4">Protect your intellectual property by registering a new patent on the blockchain.</p>
          <button
            onClick={handleStartRegistration}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Start Registration
          </button>
        </div>

        <div className="bg-gradient-to-br from-pink-500/10 to-rose-500/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-4">Trade Patents</h3>
          <p className="text-gray-300 mb-4">Buy or sell patent shares in the decentralized marketplace.</p>
          <button
            onClick={handleOpenMarketplace}
            className="w-full py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
          >
            Open Marketplace
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
