import { useEffect, useState } from 'react'

export default function useConfig() {
  const [network, setNetwork] = useState()

  useEffect(() => {
    async function getConfig() {
      
    }
    getConfig()
  }, [])

  return { network }
}