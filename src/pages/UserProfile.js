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
        let user = response.data
        if (user && user.userInterests) {
          user.userInterestsStr = user.userInterests.join(", ")
        }
        setUser(user);
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
        <table className="User-Profile-Table">
          <tbody>
            <tr>
              <td class="td-img"><img class="profile-pic" src={user.imageUrl} width="100" height="100" border-radius="100%" ></img></td>
            </tr>
            <tr>
              <td class="td-user">{user.name}</td>
            </tr>
            <tr>
              <td class="td-location">{user.location}</td>
            </tr>
            <tr>
              <td class="td-fav-topics">{user.userInterestsStr}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div >
  );
}

export default UserProfile;
