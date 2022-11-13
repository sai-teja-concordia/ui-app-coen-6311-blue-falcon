import React from 'react';
import Header from '../components/Header';
import countries from "countries-list";
import { getLocationDetails } from '../utils/commonUtils';
import { updateUserDetails } from '../utils/user';



class Newuser extends React.Component {
  constructor(props) {
    super(props);
    let coutriesTempList = []
    for (let [key, value] of Object.entries(countries.countries)) {
      let country = {}
      country.id = key
      country.name = value.name
      coutriesTempList.push(country)
    }

    this.state = {
      welcomeMessage: "",
      selectedCountry: localStorage.getItem('country'),
      countriesList: coutriesTempList,
      colours: {},
      categories: [
        'environment', 'food', 'politics', 'world',
        'business', 'entertainment', 'technology', 'health', 'science', 'sports'
      ]
    }
    this.countrySelect = this.countrySelect.bind(this);
    this.updateCountry = this.updateCountry.bind(this);

    this.welcomeMessage = "Welcome, " + localStorage.getItem('name')

    if (localStorage.getItem('country')) {
      console.log(`Country - ${localStorage.getItem('country')}`)
      console.log("updating country");
      this.updateCountry(localStorage.getItem('country'))
    }

    if ("geolocation" in navigator && !localStorage.getItem('country')) {
      navigator.geolocation.getCurrentPosition(async function (position, props) {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        console.log(position)
        console.log("Latitude is :", lat);
        console.log("Longitude is :", long);
        let country = await getLocationDetails(lat, long)
        localStorage.setItem('country', country)
        console.log(`Setting country value - ${country}`);
        window.location.reload(false);
      });
      console.log("Available");
    } else {
      console.log("Not Available");
    }
    console.log("last");
  }

  updateCountry(country) {
    console.log(`req country - ${country}`);
    this.setState({
      selectedCountry: country
    })
    console.log(`selectedCountry - ${this.state.selectedCountry}`);
    localStorage.setItem('country', country)
    let user = {}
    user.location = country
    user.emailId = localStorage.getItem("email")
    console.log(`user - ${user}`);
    updateUserDetails(user)
  }

  countrySelect(params) {
    this.updateCountry(params.target.value)
  }
  render() {
    const { countriesList } = this.state;
    let countriesListOptions = countriesList.length > 0
      && countriesList.map((item, i) => {
        return (
          <option key={i} value={item.name.toLowerCase()}>{item.name}</option>
        )
      }, this);
    console.log(`render selected country - ${this.state.selectedCountry}`);

    return <div>
      <Header></Header>
      <div className='content'>
        <h1>{this.welcomeMessage}</h1>
        <div className='country_sel'>
          <h3>{"Select your country"}</h3>
          <select value={this.state.selectedCountry} onChange={this.countrySelect}>
            {countriesListOptions}
          </select>
        </div>
        <div className='Category_Select'>
          <ul className="categories-list" >
            {this.state.categories.map((category) => {
              return (
                <li key={category}>
                  <div className="toppings-list-item">

                    <input
                      type="checkbox"
                      id={`custom-checkbox-${category}`}
                      name={category}
                      value={category}
                    />
                    <label htmlFor={`custom-checkbox-${category}`}>{category}</label>

                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>


    </div>


  }
}

export default Newuser;
