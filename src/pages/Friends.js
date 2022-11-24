import React from "react";
import Header from "../components/Header";
import { TextField } from "@mui/material";

import { useEffect, useState } from "react";
import { getUserfriends } from "../utils/user";

function Friends() {
  const [Userfriends, setUserFriends] = useState([]);

  useEffect(() => {
    let mounted = true;
    let userId = localStorage.getItem("id");
    console.log("userid - ");
    console.log(userId);

    getUserfriends(userId).then((response) => {
      if (mounted && response.data) {
        setUserFriends(response.data);
      }
    });

    return () => (mounted = false);
  }, []);

  console.log("userfriends - ");
  console.log(Userfriends);
  const listItems = Userfriends.map((names) => (
    <li>
      <a href="/Friendsprofile">{names.name}</a>
    </li>
  ));

  return (
    <div>
      <div>
        <Header></Header>
      </div>
      <div className="main">
        <div className="search">
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            label="Search"
          />
        </div>
      </div>
      <div className="friends-list">
        <ul>{listItems}</ul>
      </div>
    </div>
  );
}

export default Friends;
