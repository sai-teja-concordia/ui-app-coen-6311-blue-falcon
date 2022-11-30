import React from "react";
import { Bounce, Flip, toast, ToastContainer } from "react-toastify";
import Header from "../components/Header";
import 'react-toastify/dist/ReactToastify.css';

import emailIcon from "../static/email.png";
import whatsappIcon from "../static/whatsapp.png";

function Invite() {

  const copy = () => {
    toast("Text Copied");
    navigator.clipboard.writeText("Try this amazing social media app - https://software-engineering-6311.firebaseapp.com");
  }

  return (
    <div>
      <div>
        <Header></Header>
        <div className="content-Invite">
          <div className="inviteDiv">
            <input
              value="Try this amazing social media app - https://software-engineering-6311.firebaseapp.com"
              className="copyField"
              readonly="readonly"
              onClick={copy}>
            </input>
          </div>
          <div className="inviteDiv">
            <a target="_blank" href="mailto:?subject=Invitation to try this app&body=Try this amazing social media app - https://software-engineering-6311.firebaseapp.com" class="share-button"><img src={emailIcon} /></a>
            <a target="_blank" href="whatsapp://send?text=Try this amazing social media app - https://software-engineering-6311.firebaseapp.com" class="share-button"><img src={whatsappIcon} /></a>
          </div>

          <ToastContainer
            position="bottom-center"
            autoClose={2000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            transition={Flip}
            limit={1}
            theme="dark" />
        </div>
      </div>

    </div >
  );
}

export default Invite;