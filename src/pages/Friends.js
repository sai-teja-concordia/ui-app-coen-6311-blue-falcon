import React from "react";
import Header from "../components/Header";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { getUserSocial } from "../utils/user";

function Friends() {
  const [userFriends, setUserFriends] = useState([]);
  const [userFollowers, setUserFollowers] = useState([]);
  const [userFollowing, setUserFollowing] = useState([]);
  const [userBlocked, setUserBlocked] = useState([]);

  useEffect(() => {
    let mounted = true;
    let userId = localStorage.getItem("id");
    console.log("userid - ");
    console.log(userId);

    getUserSocial(userId).then((response) => {
      if (mounted && response.data) {
        let friends = response.data.friends
        let followers = response.data.followers
        let following = response.data.following
        let blocked = response.data.blocked
        setUserFriends(friends);
        setUserBlocked(blocked);
        setUserFollowers(followers);
        setUserFollowing(following);
        let friendsIds = friends.map(friend => friend.id)
        localStorage.setItem("friends", friendsIds.toString());
      }
    });

    return () => (mounted = false);
  }, []);

  const listItems = userFriends.map((friend) => (
    <table className="table table-striped table-bordered">
      <tbody>
        <tr key={friend.id}>
          <td><img class="profile-pic" src={friend.imageUrl} width="50" height="50" border-radius="50%" ></img></td>
          <td><Link to={`/UserProfile/${friend.id}`}>{friend.name}</Link></td>
        </tr>
      </tbody>
    </table>
  ));

  return (
    <div>
      <div>
        <Header></Header>
      </div>

      <div className="friends-content">
        <div className="friends-header">
          <h1>Meet your friends!</h1>
        </div>
        <div className="friends-list">
          <ul>{listItems}</ul>
        </div>
      </div>

    </div>
  );
}

export default Friends;
