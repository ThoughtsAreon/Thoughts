import { BodyLayout } from 'components/BodyLayout'
import SideNav from 'components/SideNav'
import useCurrentUser from 'hooks/useCurrentUser'
import React, { useEffect } from 'react'
import { getSubscribersEndpoint } from 'pages/utils/constants'


function Subscribers() {
  const [subsribers, setSubscribers] = React.useState<any[]>()
  const user = useCurrentUser()
  
  useEffect(() => {
    const getSubscribers = async (address: string) => {
      try {
          const res = await fetch(`${getSubscribersEndpoint}?authorAddress=${address}`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json'
              }
          })
          const data = await res.json()
          console.log(data)
      } catch(e) {
          console.log(e)
      } 
    }

    if (user && user?.addr) {
        getSubscribers(user?.addr)
    }
  }, [user])

  return (
    <BodyLayout>
       <SideNav selectedTab='Subscribers' />
        <div className='flex flex-col p-4 w-full items-center'>
            
            <div className='flex flex-col items-center w-full h-full gap-4 overflow-scroll'>
            <h1 className='font-black text-[48px] text-teal-600 mb-7 w-[840px] font-Satoshi16px text-left '>
                <span className='text-black-100 font-normal'>Your</span> Subscribers
            </h1>
            
            <div className='w-[840px] pl-1'>You don't have any subscribers yet</div>
           
            </div>
            
        </div>
    </BodyLayout>
  )
}

export default Subscribers
