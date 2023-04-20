import React ,{useEffect , useState} from 'react'
import Navbar from '../../Navbar/Navbar';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const PartnershipConfirmed = () => {

  const location = useLocation();
  const assoId = new URLSearchParams(location.search).get('assoId');
  const eventId = new URLSearchParams(location.search).get('eventId');
  const [association,setAssociation]= useState(null);
  const [event,setEvent]= useState(null);

  useEffect(()=>{
    fetch(`http://localhost:8000/event/confirmPartner?assoId=${assoId}&eventId=${eventId}`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
            },
                });
    }
  )

  useEffect(() => {
    fetch(`http://localhost:8000/association/get/${assoId}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setAssociation(data);
    })
      .catch(error => console.error(error));

      fetch(`http://localhost:8000/event/getEventById/${eventId}`)
      .then(response => response.json())
      .then(data => {
        setEvent(data);})
  }, []);



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

    <div className="justify-content-center d-flex">

        <div className ="card widget-item  justify-content-center d-flex " style={{width:"80%"}}>

                <div className="form-outline mb-4">
                <h5>
                All team of Enigmatic would like to congratulate you on your partnership with {association?.name} on {event?.nameEvent}!
                </h5>
                <br/>
                <img src='../images/congrats.jpg' />


                             </div>
                        </div>
                </div>
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