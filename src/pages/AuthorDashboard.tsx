import { BodyLayout } from 'components/BodyLayout'
import SideNav from 'components/SideNav'
import React from 'react'

function AuthorDashboard() {
  return (
    <BodyLayout>
        <SideNav selectedTab='Articles'/>
        <div>
            <h1>Author Dashboard</h1>
        </div>
    </BodyLayout>
  )
}

export default AuthorDashboard
