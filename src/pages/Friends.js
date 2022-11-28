import React from "react";
import Header from "../components/Header";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { actionFriendRequest, getUserSocial } from "../utils/user";
import approveIcon from "../static/approve.png";
import rejectIcon from "../static/reject.png";

function Friends() {
  const [userFriends, setUserFriends] = useState([]);
  const [userFollowers, setUserFollowers] = useState([]);
  const [userFollowing, setUserFollowing] = useState([]);
  const [userBlocked, setUserBlocked] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);

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
        let received = response.data.receivedRequests

        let sent = response.data.sentRequests

        setUserFriends(friends);
        setUserBlocked(blocked);
        setUserFollowers(followers);
        setUserFollowing(following);
        setReceivedRequests(received);
        let friendsIds = friends.map(friend => friend.id)
        localStorage.setItem("friends", friendsIds.toString());

        let sentIds = sent.map(friend => friend.id)
        localStorage.setItem("sentRequests", sentIds.toString());
      }
    });

    return () => (mounted = false);
  }, []);


  const reject = async (e) => {
    console.log(e.currentTarget.id)
    console.log('reject');
    let request = {}
    request.fromUserId = e.currentTarget.id
    request.toUserId = localStorage.getItem("id")
    request.status = "REJECTED"
    await actionFriendRequest(request)
    window.location.reload(false);
  }

  const approve = async (e) => {
    console.log(e.currentTarget.id)
    console.log('approved');
    let request = {}
    request.fromUserId = e.currentTarget.id
    request.toUserId = localStorage.getItem("id")
    request.status = "ACCEPTED"
    await actionFriendRequest(request)
    window.location.reload(false);
  }
  const listItems = userFriends.map((friend) => (
    <tr key={friend.id}>
      <td class="td-pic"><img class="profile-pic" src={friend.imageUrl} width="50" height="50" border-radius="50%" ></img></td>
      <td class="td-name"><Link to={`/UserProfile/${friend.id}`}>{friend.name}</Link></td>
    </tr>

  ));

  let friendRequests = ""
  if (receivedRequests) {
    friendRequests = receivedRequests.map((friend) => (
      <tr key={friend.id}>
        <td class="td-pic"><img class="profile-pic" src={friend.imageUrl} width="50" height="50" border-radius="50%" ></img></td>
        <td class="td-name">{friend.name}</td>
        <td> <button class="approve-reject" id={friend.id} onClick={approve}> <img src={approveIcon} key="sports" className="profile-img" width="20px" height="auto" style={{ marginRight: "5px" }} /></button></td>
        <td><button class="approve-reject" id={friend.id} onClick={reject}><img src={rejectIcon} key="sports" className="profile-img" width="20px" height="auto" style={{ marginRight: "5px" }} /></button></td>

      </tr>

    ));
  }


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
          <table className="table table-striped table-bordered styled-table">
            <tbody>
              {listItems}
            </tbody>
          </table>
        </div>
        <div className="friends-header">
          <h1>Friend Requests</h1>
        </div>
        <div className="friends-list">
          <table className="table table-striped table-bordered styled-table">
            <tbody>
              {friendRequests}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default Friends;
