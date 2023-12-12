
import { useCurrentWallet } from 'WalletProvider'
import { NavBarLogo } from 'components/SideNav'
import { LandingLogo } from 'images'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { slice } from './utils/slice'

function Home() {
  const { address, connect, disconnect, connected, isMetaMask } = useCurrentWallet()
  const navigate = useNavigate()

  const isConnected = address && connected
  useEffect(() => {
    if (connected && address) {
      navigate('/dashboard')
    }
  }, [connected, address])

  useEffect(() => {
    if (isMetaMask && !connected) {
      connect()
    }
  }, [isMetaMask, connected])


  return (
    <div className="top-20 h-screen w-screen flex flex-col justify-center" style={{
      background: 'linear-gradient(324deg, rgba(88, 153, 226, 0.2)50%, rgba(255,255,255,0.2) 83%)'
    }}>
      <div className='flex justify-between items-center'>
        <NavBarLogo isHomePage/>
        <button className='bg-teal-400 hover:bg-teal-600 text-white-100 text-base h-12 w-48 mr-10 text-white py-3  rounded-lg' onClick={connect}>{isConnected ? slice(address) : "Connect Wallet"}</button>
      </div>
      <div className="w-screen flex justify-between items-center py-10 px-12 lg:py-0">
        <div className="px-28 flex flex-col">
            <h1 className="font-black text-5xl max-w-2xl text-teal-400 font-Satoshi24px">
              Unifying Web3 Publishing: Seamlessly Connecting Areon Network and Beyond for a Borderless Experience.
            </h1>
            <h2 className="text-xl mt-8 max-w-2xl text-gray-600">
              Unleash your content's potential on Areon Blockchain, leveraging our platform— the ultimate gateway to decentralized Web3 publishing.
            </h2>
            <div className='flex gap-8 mt-10'>
                <button className='bg-teal-400 hover:bg-teal-600 text-white-100 text-xl w-48 text-white py-3 rounded-lg' onClick={() => { navigate('/dashboard') }}>Start writing</button>
                <button className='hover:bg-gray-200 bg-gray-100 text-xl w-48 text-gray-700  py-3 rounded-lg' onClick={() => { navigate('/thoughts') }}>Explore</button>
            </div>
        </div>
        <div className='flex flex-col m-auto'>
          <img src={LandingLogo} className="scale-75"/>
        </div>
      </div>
    </div>
  )
}



export default Home
