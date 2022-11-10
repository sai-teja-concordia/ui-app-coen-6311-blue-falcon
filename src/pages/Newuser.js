import React from 'react';
import Header from '../components/Header';
import countries from "countries-list";


let welcomeMessage

class Newuser extends React.Component {
  constructor(props){
    super(props);

    console.log(`localStorage.getItem('isNewUser') - ${localStorage.getItem('isNewUser')}`);
    if (localStorage.getItem('isNewUser') === 'false') {
        welcomeMessage ="Welcome back! "
      }
      else  {
        welcomeMessage= "Welcome, "
      
      }
      welcomeMessage = welcomeMessage + localStorage.getItem('name')
      console.log(welcomeMessage)
      console.log(countries.countries);
  }

  
  render() {
      return  <div>
                <Header></Header>
                <div className='content'><h1>{welcomeMessage}</h1></div>
                <div className='country_sel'><h1>{"Select Country"}</h1></div>
              </div>
  }
}

export default Newuser;
