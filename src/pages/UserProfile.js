import React from "react";
import Header from "../components/Header";
import { useParams } from 'react-router-dom';

import { useEffect, useState } from "react";
import { getUserById } from "../utils/user";

function UserProfile() {
  const [user, setUser] = useState([]);
  const { id } = useParams();
  const [friendStatus, setFriendStatus] = useState([]);
  useEffect(() => {
    let mounted = true;

    let friendsIdStr = localStorage.getItem("friends") || "";
    let friends = friendsIdStr.split(",")
    let areFriends = friends.includes(id)
    if (friends.includes(id)) {
      setFriendStatus("You are friends")
    } else {
      setFriendStatus("You are not friends")
    }
    getUserById(id).then((response) => {
      if (mounted && response.data) {
        setUser(response.data);
        console.log("User info - ")
        console.log(response.data)
      }
    });
    return () => (mounted = false);
  }, []);
  return (
    <div>
      <div>
        <Header></Header>
      </div>
      <div className="User-Profile">
        <li>
          <a>{user.name}</a>{" "}
          <img class="profile-pic" src={user.imageUrl} width="50" height="50"></img>
          <li>
            {" "}
            <a>{user.emailId}</a>
          </li>
          <li>
            {user.userInterests}
          </li>
          <li>
            <a>{user.location}</a>
          </li>
          <li>
            {friendStatus}
          </li>
        </li>
      </div>
    </div>
  );
}

export default UserProfile;
