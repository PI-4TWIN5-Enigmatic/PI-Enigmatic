import './App.css';
import Signup from './components/signUp/signup'
import NotFound from './components/NotFound';
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import ProfilePage from './components/profilePage/ProfilePage'


function App() {
  return (
   <BrowserRouter>
    <Routes>
    <Route path="/signup" element={<Signup />}></Route>
    <Route path="*" element={<NotFound />}></Route>
    <Route path="/profile" element={<ProfilePage />}></Route>
    </Routes>
   </BrowserRouter>
   
  );
}

export default App;
