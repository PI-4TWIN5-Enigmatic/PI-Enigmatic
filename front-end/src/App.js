import './App.css';
import Test from './components/test'
import NotFound from './components/NotFound';
import {BrowserRouter,Route, Routes} from 'react-router-dom'

function App() {
  return (
   <BrowserRouter>
    <Routes>
    <Route path="/test" element={<Test />}></Route>
    <Route path="*" element={<NotFound />}></Route>
    </Routes>
   </BrowserRouter>
   
  );
}

export default App;
