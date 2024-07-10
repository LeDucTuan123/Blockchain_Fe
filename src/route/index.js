import React from 'react'
import { useRoutes } from 'react-router-dom'
import { ProfileLayout } from '../ProfileLayout'
import Profile from '../pages/Profile/Profile'

export default function Routee() {
  return useRoutes([
    //profile layout
    {
        element: <ProfileLayout />,
        path:'/member',
        children: [
            {path:'profile', element: <Profile />}
        ]
    }

  ])
}
