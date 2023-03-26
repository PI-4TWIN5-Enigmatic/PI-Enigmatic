import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilBuilding,
  cilCalculator,
  cilChartPie,
  cilContact,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Users management',
    to: '/users',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
   
  },
  {
    component: CNavItem,
    name: 'Associations management',
    to: '/associations',
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
   
  },

  {
    component: CNavItem,
    name: 'Events Management',
    to: '/events',
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
   
  },
 
 
]

export default _nav
