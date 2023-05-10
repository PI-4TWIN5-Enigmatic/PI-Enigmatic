import React from 'react'
import Stat from './views/Donation/Stat'



const Users = React.lazy(() => import('./views/Users/Users'))
const Associations= React.lazy(() => import('./views/Associations/Associations'))
const associationDetails = React.lazy(()=> import('./views/Associations/AssociationDetails'))
const Events = React.lazy(() => import('./views/Events/Events'))
const Statistics = React.lazy(() => import('./views/Events/Statistics'))
const Donation = React.lazy(() => import('./views/Donation/Donation'))
const Calendar = React.lazy(() => import('./views/Events/Calendar'))
const Posts = React.lazy(() => import('./views/posts/Posts'))
const Reported = React.lazy(() => import('./views/posts/Reported'))



const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/users', name: 'users management', element: Users },
  { path: '/events', name: 'Event Management' , element: Events},
  { path: '/statistics', name: 'Event Statistics Management' , element: Statistics},
  { path: '/calendar', name: 'Events calendar managment', element: Calendar },
  { path: '/donation', name: 'Donation Statistics Management' , element: Donation},
  { path: '/stat', name: 'donation management' , element: Stat},
  { path: '/association/:id', name: 'assotiation details', element: associationDetails },
  { path: '/associations', name: 'associations managment', element: Associations },
  { path: '/posts', name: 'posts managment', element: Posts },
  { path: '/Reported', name: 'Reported Posts', element: Reported },


]

export default routes
