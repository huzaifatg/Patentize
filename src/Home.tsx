import React, { useState } from 'react'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import WalletConnectPage from './components/WalletConnectPage'

const Home: React.FC = () => {
  const [openWalletModal, setOpenWalletModal] = useState(false)
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar isLoggedIn={false} onLogout={() => {}} onConnectWallet={() => setOpenWalletModal(true)} />
      </div>
      <div className="pt-24 w-full p-6 space-y-6 min-h-screen">
        <div className="min-h-screen text-center">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-800">Welcome to Patentize</h2>
          <p className="text-lg text-gray-600 mb-4">A platform for tokenizing patents, assets, and more.</p>
          <p className="text-lg text-gray-600 mb-6">Connect your wallet to get started!</p>
          <div className="text-center">
            <div className="bg-indigo-100 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 text-indigo-800">Connect Your Wallet</h2>
              <button
                data-test-id="connect-wallet"
                className="btn bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
                onClick={() => setOpenWalletModal(true)}
              >
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </div>
      <WalletConnectPage openModal={openWalletModal} closeModal={() => setOpenWalletModal(false)} />
      <Footer />
    </div>
  )
}

export default Home
