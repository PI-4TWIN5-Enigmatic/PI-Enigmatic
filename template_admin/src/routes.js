import React from 'react'



const Users = React.lazy(() => import('./views/Users/Users'))
const Associations= React.lazy(() => import('./views/Associations/Associations'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/users', name: 'users management', element: Users },
  { path: '/associations', name: 'associations managment', element: Associations },
  
]

export default routes
