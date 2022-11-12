import React from 'react';
import Header from '../components/Header';
import countries from "countries-list";
import { getLocationDetails } from '../utils/commonUtils';


class Newuser extends React.Component {
  constructor(props){
    super(props);
    let coutriesTempList = []
    for (let [key, value] of Object.entries(countries.countries) ) {
      let country = {}
      country.id = key
      country.name = value.name
      coutriesTempList.push(country)
    }
    this.state = {
      welcomeMessage : "",
      countriesList: coutriesTempList,
		  colours: {}
    }
    console.log(`localStorage.getItem('isNewUser') - ${localStorage.getItem('isNewUser')}`);
    if (localStorage.getItem('isNewUser') === 'false') {
        this.welcomeMessage ="Welcome back! "
      }
      else  {
        this.welcomeMessage= "Welcome, "
      
      }
      this.welcomeMessage = this.welcomeMessage + localStorage.getItem('name')
      console.log(this.welcomeMessage)

      if ("geolocation" in navigator && !localStorage.getItem('country')) {
        navigator.geolocation.getCurrentPosition( async function(position, props) {
          let lat = position.coords.latitude;
          let long = position.coords.longitude;
          console.log(position)
          console.log("Latitude is :", lat);
          console.log("Longitude is :", long);
          let country = await getLocationDetails(lat, long)
          localStorage.setItem('country', country)
          // window.location.reload(false);
        });
        console.log("Available");
      } else {
        this.welcomeMessage = this.welcomeMessage + `. Your country is ${localStorage.getItem('country')}`
        console.log("Not Available");
      }
      console.log("last");
  }
  
  render() {

    const { countriesList } = this.state;
    console.log(countriesList);
    let countriesListOptions = countriesList.length > 0
      && countriesList.map((item, i) => {
      return (
        <option key={i} value={item.id}>{item.name}</option>
      )
    }, this);
  
      return  <div>
                <Header></Header>
                <div className='content'><h1>{this.welcomeMessage}</h1></div>
                <div className='country_sel'>
                  <h1>{"Select Country"}</h1>
                  <select>
				            {countriesListOptions}
			            </select>
                </div>
              </div>
  }
}

export default Newuser;
