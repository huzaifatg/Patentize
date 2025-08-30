import { Provider, useWallet } from '@txnlab/use-wallet'
import { useState } from 'react'

interface WalletConnectPageProps {
  openModal: boolean
  closeModal: () => void
}

const WalletConnectPage: React.FC<WalletConnectPageProps> = ({ openModal, closeModal }) => {
  const { providers, activeAddress } = useWallet()
  const [connecting, setConnecting] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleConnect = async (provider: Provider) => {
    try {
      setConnecting(provider.metadata.id)
      setError(null)
      await provider.connect()
      closeModal() // Close the modal on successful connection
    } catch (err) {
      console.error('Wallet connection error:', err)
      if (err instanceof Error && err.message.includes('Connect modal is closed by user')) {
        setError('Connection canceled by user. Please try again.') // User-friendly error message
      } else {
        setError('Failed to connect to wallet. Please try again.') // Generic error message
      }
    } finally {
      setConnecting(null)
    }
  }

  // Filter out KMD wallet
  const filteredProviders = providers?.filter((provider) => provider.metadata.id !== 'kmd') || []

  if (!openModal) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="max-w-md w-full bg-gradient-to-br from-indigo-900/95 via-purple-900/95 to-pink-900/95 rounded-2xl p-8 shadow-2xl border border-white/10">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Connect Wallet</h2>
          <p className="text-gray-300">Choose your preferred wallet to continue</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
            {error}
          </div>
        )}

        {/* Wallet List */}
        <div className="space-y-4">
          {filteredProviders.length > 0 ? (
            filteredProviders.map((provider) => (
              <button
                key={provider.metadata.id}
                onClick={() => handleConnect(provider)}
                disabled={connecting === provider.metadata.id}
                className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10
                         rounded-xl transition-all duration-300 border border-white/10
                         hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10
                         disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <div className="flex items-center space-x-4">
                  {provider.metadata.icon && (
                    <div className="w-10 h-10 rounded-full bg-white/10 p-2 border border-white/20">
                      <img
                        src={provider.metadata.icon}
                        alt={provider.metadata.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  <div className="text-left">
                    <p className="text-white font-semibold">{provider.metadata.name}</p>
                    <p className="text-sm text-gray-400">
                      {connecting === provider.metadata.id ? 'Connecting...' : 'Click to connect'}
                    </p>
                  </div>
                </div>

                <svg
                  className="w-6 h-6 text-indigo-400 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ))
          ) : (
            <div className="text-center text-gray-300 py-4">
              No compatible wallets found. Please install Pera, Defly, or Daffi Wallet.
            </div>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={closeModal}
          className="mt-8 w-full py-3 px-4 bg-white/10 hover:bg-white/20
                   text-white rounded-lg transition-all duration-300"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default WalletConnectPage
