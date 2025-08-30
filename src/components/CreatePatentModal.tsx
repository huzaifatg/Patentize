/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useWallet } from '@txnlab/use-wallet';
import { supabase } from '../lib/supabase';
import { useSnackbar } from 'notistack';

interface CreatePatentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPatentCreated: () => void;
}

const CreatePatentModal: React.FC<CreatePatentModalProps> = ({ isOpen, onClose, onPatentCreated }) => {
  const { activeAddress } = useWallet();
  const { enqueueSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    totalShares: '',
    category: 'technology',
    imageUrl: '',
    expiresIn: '48', // hours
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAddress) return;

    try {
      setIsSubmitting(true);
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + parseInt(formData.expiresIn));

      const { data, error } = await supabase
        .from('patents')
        .insert({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          total_shares: parseInt(formData.totalShares),
          available_shares: parseInt(formData.totalShares),
          owner_id: activeAddress,
          category: formData.category,
          image_url: formData.imageUrl,
          expires_at: expiresAt.toISOString(),
        })
        .select()
        .single();

      if (error) throw error;

      enqueueSnackbar('Patent created successfully!', { variant: 'success' });
      onPatentCreated();
      onClose();
    } catch (error) {
      console.error('Error creating patent:', error);
      enqueueSnackbar('Failed to create patent. Please try again.', { variant: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-indigo-900/95 via-purple-900/95 to-pink-900/95 rounded-2xl p-8 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Create New Patent</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Patent Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
              placeholder="Enter patent name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 h-24"
              placeholder="Describe your patent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Price per Share (ALGO)</label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Total Shares</label>
              <input
                type="number"
                required
                min="1"
                value={formData.totalShares}
                onChange={(e) => setFormData({ ...formData, totalShares: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
                placeholder="1000"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
              >
                <option value="technology">Technology</option>
                <option value="biotech">Biotech</option>
                <option value="software">Software</option>
                <option value="hardware">Hardware</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Expires In (hours)</label>
              <input
                type="number"
                required
                min="1"
                value={formData.expiresIn}
                onChange={(e) => setFormData({ ...formData, expiresIn: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
                placeholder="48"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating...' : 'Create Patent'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePatentModal;
