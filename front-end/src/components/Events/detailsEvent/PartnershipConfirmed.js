import React ,{useEffect , useState} from 'react'
import Navbar from '../../Navbar/Navbar';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const PartnershipConfirmed = () => {

  const location = useLocation();
  const assoId = new URLSearchParams(location.search).get('assoId');
  const eventId = new URLSearchParams(location.search).get('eventId');

  useEffect(()=>{
    fetch(`http://localhost:8000/event/confirmPartner?assoId=${assoId}&eventId=${eventId}`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
            },
                });
    }
  )


  return (
   <>
     <Navbar  />
                <br />
                <section className="h-100"  style={{backgroundColor: '#rgb(217 208 200 / 37%)'   }}   >   

           
                    <div className="container py-5 h-100">
                
                    <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col">
            
            
                    <div className="card card-registration my-4">
         
                
         <div >
          All team of Enigmatic would like to congratulate you on your partnership ! 
          </div>
          </div>

               </div>       
          </div>
      </div>
      </section>

    
   
   
   
   </>
  )
}

export default PartnershipConfirmed