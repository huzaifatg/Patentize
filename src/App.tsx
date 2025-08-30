/* eslint-disable prettier/prettier */
import { DeflyWalletConnect } from '@blockshake/defly-connect'
import { DaffiWalletConnect } from '@daffiwallet/connect'
import { PeraWalletConnect } from '@perawallet/connect'
import { PROVIDER_ID, ProvidersArray, WalletProvider, useInitializeProviders, useWallet } from '@txnlab/use-wallet'
import algosdk from 'algosdk'
import { SnackbarProvider, useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Footer from './components/Footer'
import Marketplace from './components/MarketPlace'
import MyAssets from './components/MyAssets'
import Navbar from './components/Navbar'
import Profile from './components/Profile'
import WalletConnectPage from './components/WalletConnectPage'
import { getAlgodConfigFromViteEnvironment } from './utils/network/getAlgoClientConfigs'

const providersArray: ProvidersArray = [
  { id: PROVIDER_ID.DEFLY, clientStatic: DeflyWalletConnect },
  { id: PROVIDER_ID.PERA, clientStatic: PeraWalletConnect },
  { id: PROVIDER_ID.DAFFI, clientStatic: DaffiWalletConnect },
]

function App() {
  const algodConfig = getAlgodConfigFromViteEnvironment()
  const { activeAddress, providers } = useWallet()
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    // If wallet is not connected, clear local storage and show login page
    if (!activeAddress) {
      setIsWalletModalOpen(false)
      localStorage.clear()
      // Optionally disconnect any lingering wallet provider
      if (providers) {
        const activeProvider = providers.find((p) => p.isActive)
        if (activeProvider) {
          activeProvider.disconnect()
        }
      }
      navigate('/')
    }
  }, [activeAddress, providers, navigate])

  const handleLogout = async () => {
    if (providers) {
      const activeProvider = providers.find((p) => p.isActive)
      if (activeProvider) {
        try {
          await activeProvider.disconnect()
          localStorage.clear()
          window.location.reload() // Force a complete page reload
        } catch (error) {
          enqueueSnackbar('Error disconnecting wallet. Please try again.', { variant: 'error' })
        }
      }
    }
  }

  const walletProviders = useInitializeProviders({
    providers: providersArray,
    nodeConfig: {
      network: algodConfig.network,
      nodeServer: algodConfig.server,
      nodePort: String(algodConfig.port),
      nodeToken: String(algodConfig.token),
    },
    algosdkStatic: algosdk,
  })

  const features = [
    {
      title: 'Patent Tokenization',
      description: 'Convert your intellectual property into digital assets on the blockchain',
      icon: (
        <svg className="w-12 h-12 text-indigo-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9 12L11 14L15 10M20.618 5.984C17.45 2.817 12.55 2.817 9.38197 5.984C8.7516 6.614 8.31375 7.344 8.0578 8.122C7.86736 8.714 7.51327 9.238 7.02534 9.636C6.04976 10.439 5.5 11.646 5.5 13C5.5 15.485 7.515 17.5 10 17.5H14C16.485 17.5 18.5 15.485 18.5 13C18.5 11.646 17.9502 10.439 16.9747 9.636C16.4867 9.238 16.1326 8.714 15.9422 8.122C15.6862 7.344 15.2484 6.614 14.618 5.984"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: 'Secure Trading',
      description: 'Trade patent shares securely using blockchain technology',
      icon: (
        <svg className="w-12 h-12 text-purple-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21ZM16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      title: 'Royalty Management',
      description: 'Automatically track and distribute patent royalties',
      icon: (
        <svg className="w-12 h-12 text-pink-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9 14L15 8M9.00001 8H9.01001M15 14H15.01M19 4H5C3.89543 4 3 4.89543 3 6V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V6C21 4.89543 20.1046 4 19 4Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ]

  return (
    <SnackbarProvider maxSnack={3}>
      <WalletProvider value={walletProviders}>
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
          <Navbar isLoggedIn={!!activeAddress} onLogout={handleLogout} onConnectWallet={() => setIsWalletModalOpen(true)} />
          <div className="container mx-auto px-4" style={{ paddingTop: '6rem', paddingBottom: '2rem' }}>
            <Routes>
              <Route
                path="/"
                element={
                  activeAddress ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <div className="min-h-[80vh] flex flex-col items-center justify-center">
                      <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                          Welcome to Patentize
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                          The future of patent management and trading on the blockchain. Secure, transparent, and efficient.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 w-full max-w-5xl">
                        {features.map((feature, index) => (
                          <div
                            key={index}
                            className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10
                                     hover:bg-white/20 transition-all duration-300 group"
                          >
                            <div className="bg-white/5 rounded-xl p-4 mb-4 w-fit group-hover:scale-110 transition-transform duration-300">
                              {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                            <p className="text-gray-300">{feature.description}</p>
                          </div>
                        ))}
                      </div>

                      <div className="text-center">
                        <button
                          onClick={() => setIsWalletModalOpen(true)}
                          className="px-8 py-4 bg-indigo-600 text-white text-lg rounded-xl
                                   hover:bg-indigo-700 transition-all duration-300
                                   shadow-lg hover:shadow-indigo-500/25 transform hover:scale-105"
                        >
                          Get Started with Patentize
                        </button>
                        <p className="mt-4 text-gray-400">Connect your wallet to start managing your patents</p>
                      </div>
                    </div>
                  )
                }
              />
              <Route path="/dashboard" element={activeAddress ? <Dashboard /> : <Navigate to="/" replace />} />
              <Route path="/my-assets" element={activeAddress ? <MyAssets /> : <Navigate to="/" replace />} />
              <Route path="/marketplace" element={activeAddress ? <Marketplace /> : <Navigate to="/" replace />} />
              <Route path="/profile" element={activeAddress ? <Profile /> : <Navigate to="/" replace />} />
            </Routes>
          </div>
          <Footer />
          <WalletConnectPage openModal={isWalletModalOpen} closeModal={() => setIsWalletModalOpen(false)} />
        </div>
      </WalletProvider>
    </SnackbarProvider>
  )
}

export default App
