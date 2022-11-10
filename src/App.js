import './App.css';
import LoginPage from './pages/loginpage';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Newuser from './pages/Newuser';
import Profile from './pages/Profile';


function App() {
  return (
    <Routes>
    <Route path="/" element={<LoginPage />}/>
    <Route path="/Home" element={<Home />}/>

    <Route path="/Profile" element={<Profile />}/>
    <Route path="/Newuser" element={<Newuser />}/>
    
  </Routes>  
    
  );
}

export default App;
