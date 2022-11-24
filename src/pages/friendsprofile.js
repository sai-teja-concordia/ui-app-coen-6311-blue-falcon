import React from "react";
import Header from "../components/Header";
import EditableLabel from "react-inline-editing";
import { updateUserDetails } from "../utils/user";
import countries from "countries-list";
import { FormControlLabel, Checkbox } from "@mui/material";
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

class Profile extends React.Component {
  constructor(props) {
    super(props);
    let coutriesTempList = [];
    for (let [key, value] of Object.entries(countries.countries)) {
      let country = {};
      country.id = key;
      country.name = value.name;
      coutriesTempList.push(country);
    }
    // localStorage.setItem("selectedCategories", ['sports'])
    let selectedCategories = localStorage.getItem("selectedCategories");
    console.log(selectedCategories);
    let selectedCheckBoxesDict = {};
    if (selectedCategories) {
      selectedCategories.split(",").forEach((element) => {
        selectedCheckBoxesDict[element] = true;
      });
    }
    console.log(selectedCheckBoxesDict);

    this.state = {
      selectedCountry: localStorage.getItem("country"),
      countriesList: coutriesTempList,
      selectedCheckBoxes: selectedCheckBoxesDict,
    };
    this._handleFocus = this._handleFocus.bind(this);
    this._handleFocusOut = this._handleFocusOut.bind(this);
    this.countrySelect = this.countrySelect.bind(this);
    this.updateCountry = this.updateCountry.bind(this);
    this.checkBoxUpdate = this.checkBoxUpdate.bind(this);

    console.log(
      `localStorage.getItem('isNewUser') - ${localStorage.getItem("isNewUser")}`
    );
    this.email = localStorage.getItem("friendemail");
    this.name = localStorage.getItem("friendname");
    this.userProfilePic = localStorage.getItem("friendimageUrl");
    console.log(this.userProfilePic);
  }

  _handleFocus(text) {
    console.log("Focused with text: " + text);
  }

  updateCountry(country) {
    console.log(`req country - ${country}`);
    this.setState({
      selectedCountry: country,
    });
    console.log(`selectedCountry - ${this.state.selectedCountry}`);
    localStorage.setItem("country", country);
    let user = {};
    user.location = country;
    user.emailId = localStorage.getItem("email");
    console.log(`user - ${user}`);
    updateUserDetails(user);
  }

  countrySelect(params) {
    this.updateCountry(params.target.value);
  }

  _handleFocusOut(text) {
    console.log("Left editor with text: " + text);
    let user = {};
    user.name = text;
    user.emailId = this.email;
    console.log(user);
    localStorage.setItem("name", text);
    updateUserDetails(user);
  }

  checkBoxUpdate(event) {
    if (event && event.target) {
      let value = event.target.value;
      let checked = event.target.checked;
      let selectedCatStr = localStorage.getItem("selectedCategories");
      let selectedCategories = new Set();

      if (selectedCatStr) {
        selectedCatStr.split(",").forEach((element) => {
          selectedCategories.add(element);
        });
      }
      console.log(` ${checked} ${value}`);
      this.state.selectedCheckBoxes[value] =
        !this.state.selectedCheckBoxes[value];
      console.log(this.state.selectedCheckBoxes);
      if (checked) {
        selectedCategories.add(value);

        localStorage.setItem(
          "selectedCategories",
          Array.from(selectedCategories).join(",")
        );
      } else {
        selectedCategories.delete(value);
      }

      for (let item of selectedCategories.values()) {
        console.log(item);
      }
      let selectCat = Array.from(selectedCategories).join(",");
      console.log(`selectedCategories after - ${selectCat} `);
      localStorage.setItem("selectedCategories", selectCat);
      let user = {};
      user.userInterests = Array.from(selectedCategories);
      user.emailId = localStorage.getItem("email");
      console.log(`user - ${user}`);
      updateUserDetails(user);
    }
  }
  render() {
    const { countriesList } = this.state;
    let countriesListOptions =
      countriesList.length > 0 &&
      countriesList.map((item, i) => {
        return (
          <option key={i} value={item.name.toLowerCase()}>
            {item.name}
          </option>
        );
      }, this);
    console.log(`render selected country - ${this.state.selectedCountry}`);

    return (
      <div>
        <Header></Header>
        <div className="profileTable">
          <div>
            <img
              src={this.userProfilePic}
              alt={this.name}
              style={{ borderRadius: "100%" }}
            />
          </div>
          <div>
            <h3>{this.email}</h3>
          </div>
          <div>
            <EditableLabel
              text={this.name}
              labelClassName="profileItem"
              inputClassName="profileInput"
              labelFontWeight="bold"
              onFocus={this._handleFocus}
              onFocusOut={this._handleFocusOut}
            />
          </div>
          <div className="country_sel">
            <select
              value={this.state.selectedCountry}
              onChange={this.countrySelect}
            >
              {countriesListOptions}
            </select>
          </div>
          <h3>Your favourite categories</h3>
          <ul className="categories-list">
            <li>
              <FormControlLabel
                control={
                  <Checkbox
                    {...this.props}
                    checked={this.state.selectedCheckBoxes["sports"]}
                    onChange={this.checkBoxUpdate}
                    value="sports"
                    key="sports"
                  />
                }
                label={
                  <React.Fragment>
                    <img
                      src={sportsIcon}
                      key="sports"
                      className="profile-img"
                      width="40px"
                      height="auto"
                      style={{ marginRight: "5px" }}
                    />
                    <text>sports</text>
                  </React.Fragment>
                }
              />
            </li>
            <li>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.selectedCheckBoxes["food"]}
                    onChange={this.checkBoxUpdate}
                    value="food"
                    key="food"
                  />
                }
                label={
                  <React.Fragment>
                    <img
                      src={foodIcon}
                      key="food"
                      className="profile-img"
                      width="40px"
                      height="auto"
                      style={{ marginRight: "5px" }}
                    />
                    food
                  </React.Fragment>
                }
              />
            </li>
            <li>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.selectedCheckBoxes["entertainment"]}
                    onChange={this.checkBoxUpdate}
                    value="entertainment"
                    key="entertainment"
                  />
                }
                label={
                  <React.Fragment>
                    <img
                      src={entertainmentIcon}
                      key="entertainment"
                      className="profile-img"
                      width="40px"
                      height="auto"
                      style={{ marginRight: "5px" }}
                    />
                    entertainment
                  </React.Fragment>
                }
              />
            </li>
            <li>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.selectedCheckBoxes["politics"]}
                    onChange={this.checkBoxUpdate}
                    value="politics"
                    key="politics"
                  />
                }
                label={
                  <React.Fragment>
                    <img
                      src={politicsIcon}
                      key="politics"
                      className="profile-img"
                      width="40px"
                      height="auto"
                      style={{ marginRight: "5px" }}
                    />
                    politics
                  </React.Fragment>
                }
              />
            </li>
            <li>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.selectedCheckBoxes["world"]}
                    onChange={this.checkBoxUpdate}
                    value="world"
                    key="world"
                  />
                }
                label={
                  <React.Fragment>
                    <img
                      src={worldIcon}
                      key="world"
                      className="profile-img"
                      width="40px"
                      height="auto"
                      style={{ marginRight: "5px" }}
                    />
                    world
                  </React.Fragment>
                }
              />
            </li>
            <li>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.selectedCheckBoxes["environment"]}
                    onChange={this.checkBoxUpdate}
                    value="environment"
                    key="environment"
                  />
                }
                label={
                  <React.Fragment>
                    <img
                      src={environmentIcon}
                      key="environment"
                      className="profile-img"
                      width="40px"
                      height="auto"
                      style={{ marginRight: "5px" }}
                    />
                    environment
                  </React.Fragment>
                }
              />
            </li>
            <li>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.selectedCheckBoxes["business"]}
                    onChange={this.checkBoxUpdate}
                    value="business"
                    key="business"
                  />
                }
                label={
                  <React.Fragment>
                    <img
                      src={businessIcon}
                      key="business"
                      className="profile-img"
                      width="40px"
                      height="auto"
                      style={{ marginRight: "5px" }}
                    />
                    business
                  </React.Fragment>
                }
              />
            </li>
            <li>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.selectedCheckBoxes["technology"]}
                    onChange={this.checkBoxUpdate}
                    value="technology"
                    key="technology"
                  />
                }
                label={
                  <React.Fragment>
                    <img
                      src={technologyIcon}
                      key="technology"
                      className="profile-img"
                      width="40px"
                      height="auto"
                      style={{ marginRight: "5px" }}
                    />
                    technology
                  </React.Fragment>
                }
              />
            </li>
            <li>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.selectedCheckBoxes["health"]}
                    onChange={this.checkBoxUpdate}
                    value="health"
                    key="health"
                  />
                }
                label={
                  <React.Fragment>
                    <img
                      src={healthIcon}
                      key="health"
                      className="profile-img"
                      width="40px"
                      height="auto"
                      style={{ marginRight: "5px" }}
                    />
                    health
                  </React.Fragment>
                }
              />
            </li>
            <li>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.selectedCheckBoxes["science"]}
                    onChange={this.checkBoxUpdate}
                    value="science"
                    key="science"
                  />
                }
                label={
                  <React.Fragment>
                    <img
                      src={scienceIcon}
                      key="science"
                      className="profile-img"
                      width="40px"
                      height="auto"
                      style={{ marginRight: "5px" }}
                    />
                    science
                  </React.Fragment>
                }
              />
            </li>
          </ul>
          <a href="/Home">Done!</a>
        </div>
      </div>
    );
  }
}

export default Profile;
