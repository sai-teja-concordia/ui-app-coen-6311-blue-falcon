import React from "react";
import Header from "../components/Header";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { getUserByName } from "../utils/user";

function Friends() {
  const [userFriends, setUserFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const keyPress = (e) => {
    if (e.keyCode == 13) {
      let query = e.target.value;
      console.log('value', e.target.value);
      setSearchQuery(query);
      let userId = localStorage.getItem("id");
      // put the login here
      getUserByName(query).then((response) => {
        console.log(response);
        let searchList = response.data
        let friends = searchList.filter(friend => {
          return friend.id != userId
        })
        setUserFriends(friends)
      })
    }
  }

  let tableHeader = <thead>
    <tr>
      <th class="td-pic">Pic</th>
      <th class="td-name">Name</th>
      <th class="td-interests">User Interests</th>
    </tr>
  </thead>
  const listItems = userFriends.map((friend) => (
    <table className="table table-striped table-bordered styled-table">
      <tbody>
        <tr key={friend.id}>
          <td class="td-pic"><img class="profile-pic" src={friend.imageUrl} width="50" height="50" border-radius="50%" ></img></td>
          <td class="td-name"><Link to={`/UserProfile/${friend.id}`}>{friend.name}</Link></td>
          <td class="td-interests">{friend.userInterests.join(", ")}</td>
        </tr>
      </tbody>
    </table>
    // <li>

    //   <Link to={`/UserProfile/${friend.id}`}>{friend.name}</Link>
    // </li>
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
            onKeyDown={keyPress}
          // onChange={(e) => {
          //   setSearchQuery(e.target.value);
          // }}
          // onInput={(e) => {
          //   setSearchQuery(e.target.value);
          // }}
          />
        </div>
        <div>
          {tableHeader}
          {listItems}
        </div>
      </div>
    </div>
  );
}

export default Friends;
