import React from 'react';
import Header from '../components/Header';
import countries from "countries-list";
import { getLocationDetails } from '../utils/commonUtils';
import { updateUserDetails } from '../utils/user';
import { FormControlLabel, Checkbox } from '@mui/material';
import { Navigate, Redirect } from "react-router-dom";

import sportsIcon from "../static/sports.png";
import foodIcon from "../static/food.png";
import entertainmentIcon from "../static/entertainment.png";
import politicsIcon from "../static/politics.png";
import worldIcon from "../static/world.png";
import environmentIcon from "../static/environment.png";
import businessIcon from "../static/business.png";
import technologyIcon from "../static/technology.png";
import healthIcon from "../static/health.png";
import scienceIcon from "../static/science.png";



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
    // localStorage.setItem("selectedCategories", ['sports'])
    let selectedCategories = localStorage.getItem('selectedCategories')
    console.log(selectedCategories);
    let selectedCheckBoxesDict = {}
    if (selectedCategories) {

      selectedCategories.split(",").forEach(element => {
        selectedCheckBoxesDict[element] = true
      });
    }
    console.log(selectedCheckBoxesDict);

    this.state = {
      welcomeMessage: "",
      selectedCountry: localStorage.getItem('country'),
      countriesList: coutriesTempList,
      colours: {},
      selectedCheckBoxes: selectedCheckBoxesDict
    }
    this.countrySelect = this.countrySelect.bind(this);
    this.updateCountry = this.updateCountry.bind(this);
    this.checkBoxUpdate = this.checkBoxUpdate.bind(this);
    this.creationDone = this.creationDone.bind(this);



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

  async checkBoxUpdate(event) {
    if (event && event.target) {
      let value = event.target.value
      let checked = event.target.checked
      let selectedCatStr = localStorage.getItem("selectedCategories")
      let selectedCategories = new Set()

      if (selectedCatStr) {
        selectedCatStr.split(",").forEach((element) => {
          selectedCategories.add(element)
        })
      }
      console.log(` ${checked} ${value}`);
      this.state.selectedCheckBoxes[value] = !this.state.selectedCheckBoxes[value]
      console.log(this.state.selectedCheckBoxes);
      if (checked) {
        selectedCategories.add(value)

        localStorage.setItem("selectedCategories", Array.from(selectedCategories).join(','))
      }
      else {
        selectedCategories.delete(value)
      }

      for (let item of selectedCategories.values()) {
        console.log(item);
      }
      let selectCat = Array.from(selectedCategories).join(',')
      console.log(`selectedCategories after - ${selectCat} `);
      localStorage.setItem("selectedCategories", selectCat)
      let user = {}
      user.userInterests = Array.from(selectedCategories)
      user.emailId = localStorage.getItem("email")
      console.log(`user - ${user}`);
      updateUserDetails(user)
    }

  }
  async creationDone() {

    console.log("done");
    return <Navigate to="/Home" />
  }
  render() {
    const { countriesList } = this.state;
    let countriesListOptions = countriesList.length > 0
      && countriesList.map((item, i) => {
        return (
          <option key={i} value={item.name.toLowerCase()}>{item.name}</option>
        )
      }, this);
    console.log(`render selected country - ${this.state.selectedCountry} `);
    return <div>
      <Header></Header>
      <div className='content'>
        <h1>{this.welcomeMessage}</h1>
        <div className='country_sel'>
          <h3>Select your country</h3>
          <select class="minimal" value={this.state.selectedCountry} onChange={this.countrySelect}>
            {countriesListOptions}
          </select>
        </div>
        <h3>Select your favourite categories</h3>
        <ul className="categories-list">
          <li>
            < FormControlLabel
              control={
                < Checkbox {...this.props} checked={this.state.selectedCheckBoxes["sports"]} onChange={this.checkBoxUpdate} value="sports" key="sports" />
              }
              label={
                < React.Fragment >
                  <img src={sportsIcon} key="sports" className="profile-img" width="40px" height="auto" style={{ marginRight: "5px" }} />
                  <text>sports</text>
                </React.Fragment>
              }
            />
          </li>
          <li>
            < FormControlLabel
              control={
                < Checkbox checked={this.state.selectedCheckBoxes["food"]} onChange={this.checkBoxUpdate} value="food" key="food" />
              }
              label={
                < React.Fragment >
                  <img src={foodIcon} key="food" className="profile-img" width="40px" height="auto" style={{ marginRight: "5px" }} />
                  food
                </React.Fragment>
              }
            />
          </li>
          <li>
            < FormControlLabel
              control={
                < Checkbox checked={this.state.selectedCheckBoxes["entertainment"]} onChange={this.checkBoxUpdate} value="entertainment" key="entertainment" />
              }
              label={
                < React.Fragment >
                  <img src={entertainmentIcon} key="entertainment" className="profile-img" width="40px" height="auto" style={{ marginRight: "5px" }} />
                  entertainment
                </React.Fragment>
              }
            />
          </li>
          <li>
            < FormControlLabel
              control={
                < Checkbox checked={this.state.selectedCheckBoxes["politics"]} onChange={this.checkBoxUpdate} value="politics" key="politics" />
              }
              label={
                < React.Fragment >
                  <img src={politicsIcon} key="politics" className="profile-img" width="40px" height="auto" style={{ marginRight: "5px" }} />
                  politics
                </React.Fragment>
              }
            />
          </li>
          <li>
            < FormControlLabel
              control={
                < Checkbox checked={this.state.selectedCheckBoxes["world"]} onChange={this.checkBoxUpdate} value="world" key="world" />
              }
              label={
                < React.Fragment >
                  <img src={worldIcon} key="world" className="profile-img" width="40px" height="auto" style={{ marginRight: "5px" }} />
                  world
                </React.Fragment>
              }
            />
          </li>
          <li>
            < FormControlLabel
              control={
                < Checkbox checked={this.state.selectedCheckBoxes["environment"]} onChange={this.checkBoxUpdate} value="environment" key="environment" />
              }
              label={
                < React.Fragment >
                  <img src={environmentIcon} key="environment" className="profile-img" width="40px" height="auto" style={{ marginRight: "5px" }} />
                  environment
                </React.Fragment>
              }
            />
          </li>
          <li>
            < FormControlLabel
              control={
                < Checkbox checked={this.state.selectedCheckBoxes["business"]} onChange={this.checkBoxUpdate} value="business" key="business" />
              }
              label={
                < React.Fragment >
                  <img src={businessIcon} key="business" className="profile-img" width="40px" height="auto" style={{ marginRight: "5px" }} />
                  business
                </React.Fragment>
              }
            />
          </li>
          <li>
            < FormControlLabel
              control={
                < Checkbox checked={this.state.selectedCheckBoxes["technology"]} onChange={this.checkBoxUpdate} value="technology" key="technology" />
              }
              label={
                < React.Fragment >
                  <img src={technologyIcon} key="technology" className="profile-img" width="40px" height="auto" style={{ marginRight: "5px" }} />
                  technology
                </React.Fragment>
              }
            />
          </li>
          <li>
            < FormControlLabel
              control={
                < Checkbox checked={this.state.selectedCheckBoxes["health"]} onChange={this.checkBoxUpdate} value="health" key="health" />
              }
              label={
                < React.Fragment >
                  <img src={healthIcon} key="health" className="profile-img" width="40px" height="auto" style={{ marginRight: "5px" }} />
                  health
                </React.Fragment>
              }
            />
          </li>
          <li>
            < FormControlLabel
              control={
                < Checkbox checked={this.state.selectedCheckBoxes["science"]} onChange={this.checkBoxUpdate} value="science" key="science" />
              }
              label={
                < React.Fragment >
                  <img src={scienceIcon} key="science" className="profile-img" width="40px" height="auto" style={{ marginRight: "5px" }} />
                  science
                </React.Fragment>
              }
            />
          </li>
        </ul>
        <nav>
          <a href="/Home"></a>
        </nav>
        <div>

          <a href="/Home" >Done!</a>
        </div>
      </div>


    </div >


  }
}

export default Newuser;
