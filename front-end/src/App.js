import './App.css';
<<<<<<< HEAD
import Test from './components/test'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './components/NotFound';
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import ProfilePage from './components/profilePage/ProfilePage'
import { ToastContainer } from 'react-toastify';
import ChangerPassword from './components/changerPassword/changerPassword';
=======
import Signup from './components/signUp/signup'
import NotFound from './components/NotFound';
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import ProfilePage from './components/profilePage/ProfilePage'
import Create from './components/association/create';


>>>>>>> 896e70ea4b01d8e3d39955a00acd864a12788558
function App() {

  return (
<<<<<<< HEAD
    <>
=======
  
>>>>>>> 896e70ea4b01d8e3d39955a00acd864a12788558
   <BrowserRouter>
    <Routes>
    <Route path="/signup" element={<Signup />}></Route>
    <Route path="/association/cree" element={<Create />}></Route>
    <Route path="*" element={<NotFound />}></Route>
<<<<<<< HEAD
    <Route path="/changerPassword" element={<ChangerPassword />}></Route>
   
    <Route path="/profile" element={<ProfilePage />}></Route>
    </Routes>
   </BrowserRouter>
    <ToastContainer />
    </>
   
=======
    <Route path="/profile/:id" element={<ProfilePage />}></Route>
    </Routes>
   </BrowserRouter>
 
>>>>>>> 896e70ea4b01d8e3d39955a00acd864a12788558
  );
}

export default App;
