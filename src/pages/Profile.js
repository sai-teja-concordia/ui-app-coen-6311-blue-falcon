import React from 'react';
import Header from '../components/Header';
import EditableLabel from 'react-inline-editing';
import { updateUserDetails } from '../utils/user';
import countries from "countries-list";

class Profile extends React.Component {
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
            selectedCountry: localStorage.getItem('country'),
            countriesList: coutriesTempList,
            categories: [
                'environment', 'food', 'politics', 'world',
                'business', 'entertainment', 'technology', 'health', 'science', 'sports'
            ]
        }
        this._handleFocus = this._handleFocus.bind(this);
        this._handleFocusOut = this._handleFocusOut.bind(this);
        this.countrySelect = this.countrySelect.bind(this);
        this.updateCountry = this.updateCountry.bind(this);

        console.log(`localStorage.getItem('isNewUser') - ${localStorage.getItem('isNewUser')}`);
        this.email = localStorage.getItem('email')
        this.name = localStorage.getItem('name')
        this.userProfilePic = localStorage.getItem('imageUrl')
        console.log(this.userProfilePic)
    }

    _handleFocus(text) {
        console.log('Focused with text: ' + text);
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

    _handleFocusOut(text) {
        console.log('Left editor with text: ' + text);
        let user = {}
        user.name = text
        user.emailId = this.email
        console.log(user);
        localStorage.setItem("name", text)
        updateUserDetails(user)
        // TODO save in DB
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
            <div className='profileTable'>
                <div><img src={this.userProfilePic} alt={this.name} style={{ borderRadius: "100%" }} /></div>
                <div><h2>{this.email}</h2></div>
                <div>
                    <EditableLabel text={this.name}
                        labelClassName='profileItem'
                        inputClassName='profileInput'
                        labelFontWeight='bold'
                        onFocus={this._handleFocus}
                        onFocusOut={this._handleFocusOut}
                    />
                </div>
                <div className='country_sel'>
                    <select value={this.state.selectedCountry} onChange={this.countrySelect}>
                        {countriesListOptions}
                    </select>
                </div>

            </div>

        </div>
    }
}


export default Profile;
