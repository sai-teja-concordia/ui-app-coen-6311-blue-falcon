
import background from '../static/background_3.jpg';
import '../App.css';
import { LoginButton } from "../components/login";

import { useEffect } from 'react';
import { gapi } from 'gapi-script';



const clientId = "257151779582-a1360hlmj2h92fuv79albkgrf9j6qn20.apps.googleusercontent.com";
function LoginPage() {

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    };
    gapi.load('client:auth2', start);
  });



  return (

    <div className='loginpage'>
      <img src={background} className="loginbackground" />
      <div className='loginbox'>

        <div className="welcome-to-text">
          Welcome to
        </div>
        <div className="app-name">
          Unified Social Media
        </div>
        <div className="loginbutton">
          <LoginButton />
        </div>
        <div className="stay-connected-text">
          To stay connected
        </div>


      </div>





    </div>


  );
}


export default LoginPage;
/*..*/