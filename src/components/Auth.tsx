import { useCurrentWallet } from 'WalletProvider'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Auth({children}: {children: React.ReactNode}) {
  const wallet = useCurrentWallet()
  const navigate = useNavigate()

  useEffect(() => {
    if (!wallet.connected) {
      navigate('/')
    }
  }, [wallet.connected])
  
  return (
    <>
      {children}
    </>
  )
}

export default Auth
