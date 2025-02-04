import { GoogleLogin } from "react-google-login";
import { Navigate } from "react-router-dom";
import React from "react";
import { getUserDetails } from "../utils/user";
import { saveUserDetails } from "../utils/user";
import { getTrendingnews } from "../utils/newsUtils";

const clientId =
    "257151779582-a1360hlmj2h92fuv79albkgrf9j6qn20.apps.googleusercontent.com";

let responseFromServer;

function LoginButton() {
    const [logstat, setlogstat] = React.useState(false);
    const onSucess = async (response) => {
        let profile = response.profileObj;
        console.log("response", response);
        console.log("Google Login Sucess! Current user:", profile);
        responseFromServer = await getUserDetails(profile.email);
        console.log("response from server: ", responseFromServer);
        if (responseFromServer.data) {
            console.log("old user");
            console.log(responseFromServer.data);
            localStorage.setItem("isNewUser", false);
            localStorage.setItem("name", responseFromServer.data.name);
            localStorage.setItem("id", responseFromServer.data.id);
            localStorage.setItem("country", responseFromServer.data.location);
            localStorage.setItem("selectedCategories", responseFromServer.data.userInterests)
        } else {
            console.log("new user");
            console.log(responseFromServer.data);
            localStorage.setItem("isNewUser", true);
            let user = profile;
            user.emailId = profile.email;
            console.log(profile);
            let responseToServer = await saveUserDetails(user);
            console.log("saved details response: ", responseToServer);
            localStorage.setItem("name", profile.name);
            localStorage.setItem("id", responseToServer.data.id);
        }
        console.log(localStorage);
        localStorage.setItem("email", profile.email);
        localStorage.setItem("familyName", profile.familyName);
        localStorage.setItem("givenName", profile.givenName);
        localStorage.setItem("imageUrl", profile.imageUrl);
        setlogstat(true);
    };
    const onFailure = (res) => {
        console.log("LOGIN FAILED! res", res);
    };
    console.log("logstat - ", logstat);
    if (logstat) {
        console.log("Navigating to home");
        if (responseFromServer.data) {
            return <Navigate to="/Home" />;
        } else {
            return <Navigate to="/Newuser" />;
        }
    }

    return (
        <div id="signInButton">
            <GoogleLogin
                theme="dark"
                clientId={clientId}
                buttonText="Login with Google"
                onSuccess={onSucess}
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
                isSignedIn={true}
            />
        </div>
    );
}
export { LoginButton };
