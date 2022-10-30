import './App.css';
import LoginPage from './pages/loginpage';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';


function App() {
  return (
    <Routes>
    <Route path="/" element={<LoginPage />}/>
    <Route path="/Home" element={<Home />}/>
  </Routes>  
    
  );
}

export default App;
