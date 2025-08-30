import React, { useState } from 'react'
import { Search, Filter, ArrowUpDown, Briefcase, DollarSign, Users, Clock } from 'lucide-react'

interface Patent {
  id: string
  name: string
  description: string
  price: number
  shares: number
  owner: string
  timeLeft: string
  image: string
  category: string
}

const Marketplace: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Patents' },
    { id: 'technology', name: 'Technology' },
    { id: 'biotech', name: 'Biotech' },
    { id: 'software', name: 'Software' },
    { id: 'hardware', name: 'Hardware' },
  ]

  const patents: Patent[] = [
    {
      id: '1',
      name: 'Quantum Computing Algorithm',
      description: 'Revolutionary quantum computing algorithm for optimization problems',
      price: 25000,
      shares: 1000,
      owner: '0x1234...5678',
      timeLeft: '48 hours',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=60',
      category: 'technology',
    },
    {
      id: '2',
      name: 'Neural Network Architecture',
      description: 'Advanced neural network design for natural language processing',
      price: 18500,
      shares: 750,
      owner: '0x8765...4321',
      timeLeft: '24 hours',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=60',
      category: 'software',
    },
    {
      id: '3',
      name: 'Biotech Enzyme Process',
      description: 'Novel enzyme production process for pharmaceutical applications',
      price: 32000,
      shares: 500,
      owner: '0x2468...1357',
      timeLeft: '72 hours',
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop&q=60',
      category: 'biotech',
    },
    {
      id: '4',
      name: 'Hardware Acceleration System',
      description: 'High-performance computing acceleration architecture',
      price: 28500,
      shares: 850,
      owner: '0x9876...5432',
      timeLeft: '36 hours',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60',
      category: 'hardware',
    },
  ]

  const filteredPatents = patents.filter((patent) => {
    const matchesSearch =
      patent.name.toLowerCase().includes(searchTerm.toLowerCase()) || patent.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || patent.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-8 mt-16">
      {/* Header Section */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-white">
        <h1 className="text-4xl font-bold mb-4">Patent Marketplace</h1>
        <p className="text-xl text-gray-200">Discover and invest in revolutionary patents</p>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 bg-white/5 backdrop-blur-lg rounded-xl p-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search patents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                selectedCategory === category.id ? 'bg-indigo-600 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Patents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatents.map((patent) => (
          <div
            key={patent.id}
            className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10 hover:border-indigo-500/50 transition-all duration-300 group"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={patent.image}
                alt={patent.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute bottom-4 left-4 text-white font-semibold bg-black/50 px-3 py-1 rounded-full text-sm">
                {patent.category.charAt(0).toUpperCase() + patent.category.slice(1)}
              </span>
            </div>

            <div className="p-6 space-y-4">
              <h3 className="text-xl font-bold text-white">{patent.name}</h3>
              <p className="text-gray-300">{patent.description}</p>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 text-gray-300">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  <span>${patent.price.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span>{patent.shares} shares</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Briefcase className="w-5 h-5 text-purple-400" />
                  <span>{patent.owner}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Clock className="w-5 h-5 text-pink-400" />
                  <span>{patent.timeLeft}</span>
                </div>
              </div>

              <button className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors mt-4">
                Purchase Shares
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Marketplace
