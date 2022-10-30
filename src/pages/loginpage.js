import logo from '../globe.svg';
import '../App.css';
import {LoginButton} from "../components/login";

import { useEffect} from 'react';
import { gapi } from 'gapi-script';


const clientId="257151779582-a1360hlmj2h92fuv79albkgrf9j6qn20.apps.googleusercontent.com";
function LoginPage() {

  useEffect( ()=>{
    function start(){
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    };
    gapi.load('client:auth2', start);
  });

 

  return (
    <div  className="LoginPage" >
      <header  className="LoginPage-header" >
        <img src={logo} className="LoginPage-logo" alt="logo" />
        <p>
          Welcome to Unified social Media
        </p>
        <div className="loginbutton">
          <LoginButton />
        </div>
      </header>      
    </div>
    
  );
}


export default LoginPage;
