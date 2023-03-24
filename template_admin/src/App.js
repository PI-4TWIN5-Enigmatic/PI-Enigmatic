import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
const Redirection = React.lazy(() => import('./views/Redirection'))




class App extends Component {

  render() {
    return (
      <>
      
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>

            <Route path='/redirection/:token' exact name="rediction" element={<Redirection/>}/>

            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </HashRouter>
      </>
      
    )
  }
}

export default App
