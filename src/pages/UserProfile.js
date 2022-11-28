import React from "react";
import Header from "../components/Header";
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { actionFriendRequest, getUserById, sendFriendRequest } from "../utils/user";
import locationIcon from "../static/location.png";
import favIcon from "../static/fav50.png";
import nameIcon from "../static/name.png";

function UserProfile() {
  const [user, setUser] = useState([]);
  const { id } = useParams();
  const [userFriends, setUserFriends] = useState([]);
  const [favNews, setFavNews] = useState([]);

  const [buttonText, setButtonText] = useState('Click');
  const [areFriends, setAreFriends] = useState('');

  useEffect(() => {
    let mounted = true;

    let friendsIdStr = localStorage.getItem("friends") || "";
    let friends = friendsIdStr.split(",")

    let requestsStr = localStorage.getItem("sentRequests") || "";
    let sentRequests = requestsStr.split(",")

    let areFriendsBoolean = friends.includes(id)
    let requestSent = sentRequests.includes(id)
    setAreFriends(areFriendsBoolean)
    if (areFriendsBoolean) {
      setButtonText("UnFriend")
    } else if (requestSent) {
      setButtonText("Friend Request Sent")
    } else {
      setButtonText("Add Friend")

    }
    getUserById(id).then((response) => {
      if (mounted && response.data) {
        let user = response.data
        if (user && user.userInterests) {
          user.userInterestsStr = user.userInterests.join(", ")
        }
        setUser(user);
        if (user.friends) {
          setUserFriends(user.friends)
        }
        if (user.savedNews) {
          setFavNews(user.savedNews)
        }
        console.log("User info - ")
        console.log(response.data)
      }
    });

    return () => (mounted = false);
  }, []);

  let userFriendsTable = userFriends.map((friend) => (
    <td class="td-friends"> <div> <img class="profile-pic" src={friend.imageUrl} width="50" height="50" border-radius="50%" ></img> <a href={`/UserProfile/${friend.id}`}>{friend.name}</a></div> </td >
  ));

  console.log("favNews")
  console.log(favNews)
  let favouriteNews = favNews.map((news) => (
    <li>
      <a href={news.url} target="_blank" rel="noreferrer">{news.title}</a>
    </li>

  ));

  let otherDetails = ""
  if (areFriends) {
    otherDetails = <div>
      <table> <tbody>
        <tr class="tr-friends">
          <h3>Friends</h3>
        </tr>
        <tr class="tr-friends">
          {userFriendsTable}
        </tr>
      </tbody>
      </table>
      <h3>Saved News</h3>
      <ul>
        {favouriteNews}
      </ul>
    </div>
  }
  const handleClick = async () => {
    if (areFriends) {
      // Unfriending
      setAreFriends(false)
      setButtonText("Add Friend")
      let request = {}
      request.fromUserId = localStorage.getItem("id")
      request.toUserId = id
      request.status = "UNFRIEND"
      await actionFriendRequest(request)
      let friendsIdStr = localStorage.getItem("friends") || "";
      let friends = friendsIdStr.split(",")
      friends = friends.filter(ele => { return ele != id })
      localStorage.setItem("friends", friends.toString());
      window.location.reload("false")
    } else {
      // Sending Friend Request
      setButtonText("Friend Request Sent")
      let request = {}
      request.fromUserId = localStorage.getItem("id")
      request.toUserId = id
      let sentRequestsStr = localStorage.getItem("sentRequests") || "";
      let sentRequests = sentRequestsStr.split(",")
      sentRequests.push(id)
      localStorage.setItem("sentRequests", sentRequests.toString());
      await sendFriendRequest(request)
    }
    console.log(areFriends);

  }
  return (
    <div>
      <div>
        <Header></Header>
      </div>
      <div className="User-Profile">
        <table className="User-Profile-Table">
          <tbody>
            <tr>
              <td class="td-img"><img class="profile-pic" src={user.imageUrl} width="200" height="200" border-radius="100%" ></img></td>
            </tr>
            <tr>
              <td class="td-user">{user.name}</td>
            </tr>
            <tr>
              <td class="td-location"><img src={locationIcon} key="sports" className="profile-img" width="20px" height="auto" style={{ marginRight: "5px" }} />{user.location}</td>
            </tr>
            <tr>
              <td class="td-fav-topics"><img src={favIcon} key="sports" className="profile-img" width="20px" height="auto" style={{ marginRight: "5px" }} />{user.userInterestsStr}</td>
            </tr>
            <tr>
              <td>
                <button onClick={handleClick}>{buttonText}</button>
              </td>
            </tr>
          </tbody>
        </table>
        {otherDetails}
      </div>
    </div >
  );
}

export default UserProfile;
/*

db.user_activity.updateOne({ userId: '637fd05eb0041a57e6d73637' }, { $set: { favouriteNews: [ '637fc61c5ee8dce61ac1ed18', '637fc61a5ee8dce61ac1ed16'] } })

 */