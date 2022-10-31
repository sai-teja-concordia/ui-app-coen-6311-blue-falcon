import React from 'react';
import Header from '../components/Header';

let welcomeMessage

function Home() {    
  console.log(`localStorage.getItem('isNewUser') - ${localStorage.getItem('isNewUser')}`);
  if (localStorage.getItem('isNewUser') === 'false') {
      welcomeMessage ="Welcome back! "
    }
    else  {
      welcomeMessage= "Welcome, "
    }
    welcomeMessage = welcomeMessage + localStorage.getItem('name')
    console.log(welcomeMessage)
      

  return (
    <div>
      <Header></Header>
      <div className='content'><h1>{welcomeMessage}</h1></div>
      {/* <Navbar></Navbar> */}
      {/* <img src={image_url} className="home-image" alt="logo" />
      <div classname="home-header">
      This is your home page
      
      </div>
    <div>
    {welcomeMessage}
    </div>
    <div>
      Name: {first_name} {last_name}
    </div>
    
    
    <div>
    mail:{mail}

    </div>
      <div className="logout">
        <LogoutButton /> 
      </div> */}
         
    </div>
    
  );
}


export default Home;
