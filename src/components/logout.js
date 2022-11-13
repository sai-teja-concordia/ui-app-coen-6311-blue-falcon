import { GoogleLogout } from 'react-google-login';
import { Navigate } from "react-router-dom";
import React from 'react';

const clientId = "257151779582-a1360hlmj2h92fuv79albkgrf9j6qn20.apps.googleusercontent.com";

function Logout() {
   const [logstat, setlogstat] = React.useState(false);
   const onSucess = (res) => {
      console.log("LOGOUT SUCESSFUL! Current user:");
      setlogstat(true)
      localStorage.clear()
      console.log(localStorage);
   }
   if (logstat) {
      return <Navigate to="/" />
   }

   return (
      <div id="signOutButton">
         <GoogleLogout
            clientId={clientId}
            buttonText="Logout"
            onLogoutSuccess={onSucess}

         />
      </div>

   )

}
export default Logout;