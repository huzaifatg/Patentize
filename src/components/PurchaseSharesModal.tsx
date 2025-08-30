/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useWallet } from '@txnlab/use-wallet';
import { supabase } from '../lib/supabase';
import { useSnackbar } from 'notistack';

interface PurchaseSharesModalProps {
  isOpen: boolean;
  onClose: () => void;
  patent: {
    id: string;
    name: string;
    price: number;
    available_shares: number;
  };
  onPurchaseComplete: () => void;
}

const PurchaseSharesModal: React.FC<PurchaseSharesModalProps> = ({ isOpen, onClose, patent, onPurchaseComplete }) => {
  const { activeAddress } = useWallet();
  const { enqueueSnackbar } = useSnackbar();
  const [shares, setShares] = useState('1');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const totalCost = Number(shares) * patent.price;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAddress) return;

    const sharesToPurchase = parseInt(shares);
    if (sharesToPurchase > patent.available_shares) {
      enqueueSnackbar('Not enough shares available', { variant: 'error' });
      return;
    }

    try {
      setIsSubmitting(true);

      // Start a transaction
      const { data: transaction, error: transactionError } = await supabase
        .from('patent_transactions')
        .insert({
          patent_id: patent.id,
          buyer_id: activeAddress,
          shares_purchased: sharesToPurchase,
          price_per_share: patent.price,
          total_amount: totalCost,
        })
        .select()
        .single();

      if (transactionError) throw transactionError;

      // Update available shares
      const { error: updateError } = await supabase
        .from('patents')
        .update({
          available_shares: patent.available_shares - sharesToPurchase,
        })
        .eq('id', patent.id);

      if (updateError) throw updateError;

      enqueueSnackbar('Shares purchased successfully!', { variant: 'success' });
      onPurchaseComplete();
      onClose();
    } catch (error) {
      console.error('Error purchasing shares:', error);
      enqueueSnackbar('Failed to purchase shares. Please try again.', { variant: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-indigo-900/95 via-purple-900/95 to-pink-900/95 rounded-2xl p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Purchase Shares</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-xl text-white mb-2">{patent.name}</h3>
          <p className="text-gray-300">Available Shares: {patent.available_shares}</p>
          <p className="text-gray-300">Price per Share: {patent.price} ALGO</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Number of Shares</label>
            <input
              type="number"
              required
              min="1"
              max={patent.available_shares}
              value={shares}
              onChange={(e) => setShares(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
            />
          </div>

          <div className="bg-white/10 p-4 rounded-lg">
            <p className="text-gray-300">Total Cost</p>
            <p className="text-2xl font-bold text-white">{totalCost.toFixed(2)} ALGO</p>
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
              {isSubmitting ? 'Processing...' : 'Confirm Purchase'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PurchaseSharesModal;
