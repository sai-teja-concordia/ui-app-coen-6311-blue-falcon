import React from 'react';
import Header from '../components/Header';
import EditableLabel from 'react-inline-editing';

class Profile extends React.Component {
    constructor(props){
      super(props);

      this._handleFocus = this._handleFocus.bind(this);
      this._handleFocusOut = this._handleFocusOut.bind(this);
      console.log(`localStorage.getItem('isNewUser') - ${localStorage.getItem('isNewUser')}`);
      this.email = localStorage.getItem('email')
      this.name = localStorage.getItem('name')
      this.userProfilePic = localStorage.getItem('imageUrl')
      console.log(this.userProfilePic)
    }

    _handleFocus(text) {
        console.log('Focused with text: ' + text);
    }

    _handleFocusOut(text) {
        console.log('Left editor with text: ' + text);
        // TODO save in DB
    }
    render() {
        return <div>
            <Header></Header>
            <div className = 'profileTable'>
                <div><img src={this.userProfilePic} alt={this.name} style={{ borderRadius: "100%" }}/></div>
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
                
            </div>
            
        </div>
    }
}


export default Profile;
