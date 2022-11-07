
import background from '../static/background_3.jpg';
import '../App.css';
import {LoginButton} from "../components/login";

import { useEffect} from 'react';
import { gapi } from 'gapi-script';
import { Form } from 'react-router-dom';


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
    
      <div className='loginpage'>
        
        <img src={background} className="loginbackground "width="1400" height="600" alt="background"/>
          <form className='loginbox'>
            <div className="loginbutton">
              <LoginButton />
            </div>
            
            
          </form>
          <text className="loginpara">
              Welcome to
            </text>
            <text className="loginpara2">
               Unified social Media
            </text>
            <text className="loginpara3">
               To stay connected
            </text>
            
        

        
      </div>      
    
    
  );
}


export default LoginPage;
/*..*/