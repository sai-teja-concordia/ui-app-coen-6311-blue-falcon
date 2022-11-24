import "./App.css";
import LoginPage from "./pages/loginpage";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Newuser from "./pages/Newuser";
import Profile from "./pages/Profile";
import Friends from "./pages/Friends";
import UserProfile from "./pages/UserProfile";
import FindFriends from "./pages/FindFriends";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/Home" element={<Home />} />

      <Route path="/Profile" element={<Profile />} />
      <Route path="/Newuser" element={<Newuser />} />
      <Route path="/Friends" element={<Friends />} />

      <Route path="/FindFriends" element={<FindFriends />} />
      <Route path="/UserProfile/:id" element={<UserProfile />} />
    </Routes>
  );
}

export default App;
