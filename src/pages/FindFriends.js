import React from "react";
import Header from "../components/Header";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { getNearByUsers, getUserByName } from "../utils/user";

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
  const [nearByUsers, setNearByUsers] = useState([]);
  useEffect(() => {
    let mounted = true;
    let country = localStorage.getItem("country");
    let userId = localStorage.getItem("id");
    getNearByUsers(country).then((response) => {
      if (mounted && response.data) {
        let nearByUsersResponse = response.data
        let nearByUsersData = nearByUsersResponse.filter(friend => {
          return friend.id != userId
        })
        console.log("Near By Users - ")
        console.log(nearByUsersData)
        setNearByUsers(nearByUsersData)
      }
    });
    return () => (mounted = false);
  }, []);

  let tableHeader = <thead>
    <tr>
      <th class="td-pic">Pic</th>
      <th class="td-name">Name</th>
      <th class="td-interests">User Interests</th>
    </tr>
  </thead>

  const nearByUsersList = nearByUsers.map((user) => (
    <tr key={user.id}>
      <td class="td-pic"><img class="profile-pic" src={user.imageUrl} width="50" height="50" border-radius="50%" ></img></td>
      <td class="td-name"><Link to={`/UserProfile/${user.id}`}>{user.name}</Link></td>
      <td class="td-interests">{user.userInterests.join(", ")}</td>
    </tr>
  ));

  const listItems = userFriends.map((friend) => (

    <tr key={friend.id}>
      <td class="td-pic"><img class="profile-pic" src={friend.imageUrl} width="50" height="50" border-radius="50%" ></img></td>
      <td class="td-name"><Link to={`/UserProfile/${friend.id}`}>{friend.name}</Link></td>
      <td class="td-interests">{friend.userInterests.join(", ")}</td>
    </tr>

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
          <table className="table table-striped table-bordered styled-table">
            <tbody>
              {listItems}
            </tbody>
          </table>

        </div>

        <div>
          <div>
            <h1>Near By Users</h1>
          </div>
          <table className="table table-striped table-bordered styled-table">
            {tableHeader}
            <tbody>
              {nearByUsersList}
            </tbody>
          </table>


        </div>
      </div>
    </div>
  );
}

export default Friends;
