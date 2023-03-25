import React from 'react'



const Users = React.lazy(() => import('./views/Users/Users'))
const Associations= React.lazy(() => import('./views/Associations/Associations'))
const associationDetails = React.lazy(()=> import('./views/Associations/AssociationDetails'))
const Events = React.lazy(() => import('./views/Events/Events'))



const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/users', name: 'users management', element: Users },
  { path: '/events', name: 'event management' , element: Events},

  { path: '/association/:id', name: 'assotiation details', element: associationDetails },
  { path: '/associations', name: 'associations managment', element: Associations },
  
]

export default routes
