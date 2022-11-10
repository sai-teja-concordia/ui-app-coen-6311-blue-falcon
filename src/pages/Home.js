import React from 'react';
import Header from '../components/Header';
import countries from "countries-list";

import {Navigate} from "react-router-dom";


let welcomeMessage

function Home() {    
  console.log(`localStorage.getItem('isNewUser') - ${localStorage.getItem('isNewUser')}`);
  if (localStorage.getItem('isNewUser') === 'false') {
      welcomeMessage ="Welcome back! "
    }
    else  {
      welcomeMessage= "Welcome, "
      // return <Navigate to="/Newuser" />
    }
    welcomeMessage = welcomeMessage + localStorage.getItem('name')
    console.log(welcomeMessage)
    console.log(countries.countries);

  return (
    <div>
      <Header></Header>
      <div className='content'><h1>{welcomeMessage}</h1></div>

      
       
        
        
      
    </div>
  );
}


export default Home;
