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
      <table className="User-Profile-Table">
      <tbody>
        <tr key={user.id}>
          <td class="td-img"><img class="profile-pic" src={user.imageUrl} width="100" height="100" border-radius="100%" ></img></td>
        </tr>
        <tr key={user.id}>
          <td class="td-user"><user to={`/UserProfile/${user.id}`}>{user.name}</user></td>
        </tr>
        <tr key={user.id}>
          <td class= "td-location"><user to={`/UserProfile/${user.id}`}>{user.location}</user></td>
        </tr>
        <tr key={user.id}>
        <td class="td-fav-topics">{user.userInterests.join(", ")}</td>
        </tr>
      </tbody>
    </table>
      </div>
    </div>
  );
}

export default UserProfile;
