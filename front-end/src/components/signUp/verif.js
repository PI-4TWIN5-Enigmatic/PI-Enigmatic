import axios from 'axios';
import React, { useState } from 'react'
import { Badge } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Verif  ()  {

  const Navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [optCode, setOptCode] = useState("");
    

 
    


    const handleSubmit = async (event) => {
        event.preventDefault();
        
    
        axios.post("http://127.0.0.1:8000/api/confirmationemail", { email,optCode })
        .then((response)=> { toast.info(response.data) 
            if(response.data===""){
                Navigate('/signup');}}
        )
        
               
        
        
        
            
    
       
      };

    return(
<>
<main>
        <div className="main-wrapper pb-0 mb-0">
            <div className="timeline-wrapper">
                


                <div className="timeline-page-wrapper">
                    <div className="container-fluid p-0">
                        <div className="row no-gutters">
                         
                            <div className="col-lg-12 order-1 order-lg-2 d-flex align-items-center justify-content-center">
                                <div className="signup-form-wrapper">
                                    <h1 className="create-acc text-center">Verify your account</h1>
                                    <div className="signup-inner text-center">
                                        <h3 className="title">Wellcome to Give Back</h3>
                                        <form className="signup-inner--form">
                                            <div className="row">
                                                <div className="col-12">
                                                    <input  type="email"
                                                  
                                                     value={email}
                                                     onChange={(event) => setEmail(event.target.value)}
                                                    
                                                    className="single-field" placeholder="Email" />
                                                </div>
                                                <div className="col-md-12">
                                                    <input  
                                                    value={optCode}
                                                    onChange={(event) => setOptCode(event.target.value)}
                                                    type="number" className="single-field" placeholder="Code OTP" />
                                                </div>
                                                <div className="col-12">
                                                    <button onClick={handleSubmit}   className="submit-btn">Verify account</button>
                                                </div>
                                            </div>
                                           
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

      
</main>

</>
)


}

export default Verif