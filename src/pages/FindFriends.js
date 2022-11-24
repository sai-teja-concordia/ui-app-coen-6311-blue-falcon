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
    <li>
      <Link to={`/UserProfile/${friend.id}`}>{friend.name}</Link>
    </li>
  ));

  return (
    <div>
      <div>
        <Header></Header>
      </div>

      <div className="search-main">
        <div className="search">
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            label="Search for friends"
          />
        </div>
      </div>
    </div>
  );
}

export default Friends;
