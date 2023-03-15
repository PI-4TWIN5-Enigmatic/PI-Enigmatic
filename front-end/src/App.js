import './App.css';
import Test from './components/test'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './components/NotFound';
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import ProfilePage from './components/profilePage/ProfilePage'
import { ToastContainer } from 'react-toastify';
import ChangerPassword from './components/changerPassword/changerPassword';
function App() {
  return (
    <>
   <BrowserRouter>
    <Routes>
    <Route path="/test" element={<Test />}></Route>
    <Route path="*" element={<NotFound />}></Route>
    <Route path="/changerPassword" element={<ChangerPassword />}></Route>
   
    <Route path="/profile" element={<ProfilePage />}></Route>
    </Routes>
   </BrowserRouter>
    <ToastContainer />
    </>
   
  );
}

export default App;
