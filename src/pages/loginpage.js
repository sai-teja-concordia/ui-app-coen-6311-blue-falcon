
import background from '../static/background_1.jpg';
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
    
      <header   >
        <img src={background} className="loginbackground "width="1400" height="600" alt="background"/>
        
        <p className="loginpara">
          Welcome to
        </p>
        <p className="loginpara2">
          Unified social Media App
        </p>
        <div className="loginbutton">
          <LoginButton />
        </div>
      </header>      
    
    
  );
}


export default LoginPage;
