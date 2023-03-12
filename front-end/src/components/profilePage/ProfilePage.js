import React from 'react'
import Navbar from '../Navbar/Navbar'
import About from './About'
import UserWidget from './UserWidget'
import Share from './Share'
import Memories from './Memories'
import LikedPages from './LikedPages'
import RecentNotifications from './RecentNotifications'
import Advertissement from './Advertissement'
import Friends from './Friends'
const ProfilePage = () => {
 

  return (
    <>

        <Navbar />
    <main >
        <div className ="main-wrapper">
            <div className ="profile-banner-large bg-img" data-bg="assets/images/banner/profile-banner.jpg">
            </div>
        <About />


        <div className ="container">
                <div className ="row">
                    <div className ="col-lg-3 order-2 order-lg-1">
                        <aside className ="widget-area profile-sidebar">

                                 <UserWidget />
        
                                 <Memories />

                                 <LikedPages />

                         </aside>

        
                     </div>


     
                     <div className ="col-lg-3 order-3">
                        <aside className ="widget-area">
        
                             <RecentNotifications />
                              <Advertissement />
                              <Friends />
                            
                        </aside>
                    </div>

                    <Share />
                </div>

    
        </div>
    
    </div>
    </main>
    

    
    
    
    </>
  )
}

export default ProfilePage