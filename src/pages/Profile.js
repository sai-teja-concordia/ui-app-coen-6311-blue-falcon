import React from 'react';
import Header from '../components/Header';
import ReactDOM from 'react-dom';
import EditableLabel from 'react-inline-editing';

class Profile extends React.Component {
    constructor(props){
      super(props);

      this._handleFocus = this._handleFocus.bind(this);
      this._handleFocusOut = this._handleFocusOut.bind(this);
      console.log(`localStorage.getItem('isNewUser') - ${localStorage.getItem('isNewUser')}`);
      this.email = localStorage.getItem('email')
      this.familyName = localStorage.getItem('familyName')
      this.givenName = localStorage.getItem('givenName')
    }

    _handleFocus(text) {
        console.log('Focused with text: ' + text);
    }

    _handleFocusOut(text) {
        console.log('Left editor with text: ' + text);
    }
    render() {
        return <div>
            <Header></Header>
            <div className = 'profileTable'>
            <EditableLabel text={this.givenName}
                labelClassName='profileItem'
                inputClassName='profileInput'
                inputFontWeight='bold'
                onFocus={this._handleFocus}
                onFocusOut={this._handleFocusOut}
            />
            <EditableLabel text={this.familyName}
                labelClassName='profileItem'
                inputClassName='profileInput'
                inputFontWeight='bold'
                onFocus={this._handleFocus}
                onFocusOut={this._handleFocusOut}
            />
            </div>
            
        </div>
    }
}


export default Profile;
