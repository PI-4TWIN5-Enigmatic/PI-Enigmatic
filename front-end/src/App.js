import './App.css';
import Test from './components/test'
import NotFound from './components/NotFound';
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import ProfilePage from './components/profilePage/ProfilePage'
function App() {
  return (
   <BrowserRouter>
    <Routes>
    <Route path="/test" element={<Test />}></Route>
    <Route path="*" element={<NotFound />}></Route>
    <Route path="/profile/:id" element={<ProfilePage />}></Route>
    </Routes>
   </BrowserRouter>
   
  );
}

export default App;
