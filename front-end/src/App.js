import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './components/NotFound';
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import ProfilePage from './components/profilePageAssociation/ProfilePage'

import ProfilePagee from './components/profilePage/ProfilePage'
import { ToastContainer } from 'react-toastify';
import ChangerPassword from './components/changerPassword/changerPassword';

import Signup from './components/signUp/signup'

import ProfilePageUser from './components/Acceuil/ProfilePageUser'


import Create from './components/association/create';
import Verif from './components/signUp/verif';
import UpdateAssociation from './components/association/update';
import UpdateUser from './components/signUp/updateUser';
import RequestDonnation from './components/donnation/RequestDonnation';
import CreateEvent from './components/Events/createEvent/CreateEvent'

import { useCookies } from "react-cookie";

import UpdateDonnation from './components/donnation/UpdateDonnation';


import EventDisplay from './components/Events/dislayEvent/EventDisplay';
import EventDetails from './components/Events/detailsEvent/EventDetails';
import UpdateEvent from './components/Events/updateEvent/UpdateEvent';
import PresenceList from './components/Events/detailsEvent/PresenceList';
import PartnershipConfirmed from './components/Events/detailsEvent/PartnershipConfirmed'
import Partners from './components/Events/detailsEvent/Partner';
import MeetHomePage from './components/Events/Meetings/MeetHomePage';
import MeetRoom from './components/Events/Meetings/MeetRoom';
import Notifications from './components/Notifications/Notifications';
import DetailDonation from './components/donnation/DetailDonation';

import Reels from "./components/Reels/Reels";


function App() {
  const [cookies, setCookies] = useCookies(["access_token"]);
  
  return (

    <>

   <BrowserRouter>
      <Routes>
    <Route path="/" element={<Signup />}></Route>
    <Route path="/signup" element={<Signup />}></Route>
    <Route path="/verif" element={<Verif />}></Route>
    <Route path="/association/cree" element={<Create />}></Route>

    <Route path="/association/update/:id" element={<UpdateAssociation />}></Route>
    
    {cookies.access_token &&
            <Route path="/user/update/:id" element={<UpdateUser />} /> 
          }
          
          <Route path="/donnation/request/:id" element={<RequestDonnation />}> </Route>
          <Route path="/donnation/update/:id" element ={<UpdateDonnation />}> </Route>
          <Route path="/donation/detail/:id" element ={<DetailDonation />}> </Route>



    <Route path="/changerPassword" element={<ChangerPassword />}></Route>
   
    <Route path="/association/:id" element={<ProfilePage />}></Route>
    <Route path="/profile/:id" element={<ProfilePagee />}></Route>
    <Route path="/createEvent/:id" element={<CreateEvent />}></Route>
    <Route path="/EventDisplay/:id" element={<EventDisplay />}></Route>
    <Route path="/EventDetails/:id" element={<EventDetails />}></Route>
    <Route path="/updateEvent/:id" element={<UpdateEvent />}></Route>
    <Route path="/presenceList/:id" element={<PresenceList />}></Route>
    <Route path="/partners/:id" element={<Partners/>}></Route>
    <Route path="/partnershipConfirmed" element={<PartnershipConfirmed />}></Route>
    <Route path="/meetHomePage/:id" element={<MeetHomePage/>}></Route>
    <Route path="/meetRoom/:roomID" element={<MeetRoom/>}></Route>

    
    

    <Route path="/HomePage/:id" element={<ProfilePageUser />}></Route>
    <Route path='/reels' element={<Reels />}></Route>


    <Route path="*" element={<NotFound />}></Route>
    {/* <Route path="/" exact= {true}  name= 'Home'></Route>
    <Route path="/users" element={<Users />}></Route>
    <Route path="/association/:id" element={<associationDetails />}></Route>
    <Route path="/associations" element={<Associations />}></Route> */}

    
  {/* { path: '/association/:id', name: 'assotiation details', element: associationDetails }, */}
  {/* { path: '/associations', name: 'associations managment', element: Associations }, */}
  

    </Routes>
   </BrowserRouter>
   <ToastContainer />
 
   </>
  );
}

export default App;