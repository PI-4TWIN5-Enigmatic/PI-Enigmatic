import './App.css';

import Test from './components/test'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './components/NotFound';
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import ProfilePage from './components/profilePageAssociation/ProfilePage'
import ProfilePagee from './components/profilePage/ProfilePage'
import { ToastContainer } from 'react-toastify';
import ChangerPassword from './components/changerPassword/changerPassword';

import Signup from './components/signUp/signup'



import Create from './components/association/create';
import Verif from './components/signUp/verif';
import UpdateAssociation from './components/association/update';
import UpdateUser from './components/signUp/updateUser';



function App() {

  return (

    <>

   <BrowserRouter>
    <Routes>
    <Route path="/signup" element={<Signup />}></Route>
    <Route path="/verif" element={<Verif />}></Route>
    <Route path="/association/cree" element={<Create />}></Route>
    <Route path="/association/update/:id" element={<UpdateAssociation />}></Route>
    <Route path="/user/update/:id" element={<UpdateUser />}></Route>

    

    <Route path="/changerPassword" element={<ChangerPassword />}></Route>
   
    <Route path="/profile" element={<ProfilePage />}></Route>

    
    
   
    <Route path="/association/:id" element={<ProfilePage />}></Route>

    <Route path="/profile/:id" element={<ProfilePagee />}></Route>
    <Route path="*" element={<NotFound />}></Route>
    </Routes>
   </BrowserRouter>
   <ToastContainer />
 
   </>
  );
}

export default App;
