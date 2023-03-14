import React from 'react'
// import {setLogout} from "../state";
// import { useDispatch } from 'react-redux';


const Navbar = () => {


    const logout = (response) => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.sessionStorage.removeItem("user");
                window.sessionStorage.removeItem("secret");
                localStorage.clear();
                window.location.href = '/signup'

       
         console.log(response)
         ;
     }

  return (
    <>


        <div className="header-top sticky bg-white d-none d-lg-block">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-5">
                                            <div className="header-top-navigation">
                                                <nav>
                                                    <ul>
                                                        <li className="active"><a href="index.html">home</a></li>
                                                        <li className="msg-trigger"><a className="msg-trigger-btn" href="#a">message</a></li>
                                                        <li className="notification-trigger"><a className="msg-trigger-btn" href="#b">notification</a> </li>
                                                    </ul>
                                                </nav>
                                            </div>
                                        
                                        </div>

                                        <div className="col-md-2">
                    
                    <div className="brand-logo text-center">
                        <a href="index.html">
                            <img src="../assets/images/logo/logo.png" alt="brand logo" />
                        </a>
                    </div>
                   
                </div>

                <div className="col-md-5">
                    <div className="header-top-right d-flex align-items-center justify-content-end">
                      
                        <div className="header-top-search">
                            <form className="top-search-box">
                                <input type="text" placeholder="Search" className="top-search-field" />
                                <button className="top-search-btn"><i className="flaticon-search"></i></button>
                            </form>
                        </div>



                        <div >
                                                        <button  className="submit-btn "  onClick={logout}>Log Out</button>
                                                    </div>
                                                    
                  
                                                    


                    
                </div>
                
            </div>

            
        </div>

        </div>
        </div>



    
    
    
    
    
    </>
  )
}

export default Navbar