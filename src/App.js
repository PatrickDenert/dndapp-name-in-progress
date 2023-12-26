import { useState } from 'react'
import axios from "axios";
import './App.css';
import ResponsiveAppBar from './navbar.js';
import { Route, Routes } from 'react-router-dom';
import Home from './Home.js'
import About from './About.js'
import Login from './login.js'
import Register from './Register.js';
import Header from './Header.js';
import Profile from './Profile.js';
import useToken from './useToken.js';

function App() {

   // new line start
  const [profileData, setProfileData] = useState(null)
  const { token, removeToken, setToken } = useToken();

  function getData() {
    axios({
      method: "GET",
      url:"/profile",
    })
    .then((response) => {
      const res =response.data
      setProfileData(({
        profile_name: res.name,
        about_me: res.about}))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}
    //end of new line

  return (
    <div className="App">
      <ResponsiveAppBar token={token} rToken={removeToken}/>
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login setToken={setToken}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile token={token} setToken={setToken}/>}/>
        </Routes>
      </header>
    </div>
  );
}

export default App;