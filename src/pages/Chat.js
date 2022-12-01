import React, { useEffect, useState } from "react";
import { Bounce, Flip, toast, ToastContainer } from "react-toastify";
import Header from "../components/Header";
import 'react-toastify/dist/ReactToastify.css';
import 'react-chat-elements/dist/main.css'

import { MessageBox, ChatList, MessageList, ChatItem, Input, Button } from 'react-chat-elements'
import { getUserMessages, getUserSocial, sendMessageToUser } from "../utils/user";

function Invite() {
  const [userFriendsChat, setUserFriendsChat] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState([]);
  const [userName, setUserName] = useState("");
  const [userMessages, setUserMessages] = useState([]);
  const [totalMessages, setTotalMessages] = useState([]);
  const [message, setMessage] = useState("");



  useEffect(() => {
    let mounted = true;
    let userId = localStorage.getItem("id");
    let userName = localStorage.getItem("name");
    setUserName(userName);
    console.log("userid - ");
    console.log(userId);


    getUserSocial(userId).then((response) => {
      if (mounted && response.data) {
        let friends = response.data.friends
        let listOfChats = friends.map(friend => {
          return {
            avatar: friend.imageUrl,
            alt: 'Reactjs',
            id: friend.id,
            title: friend.name,
            // subtitle: 'Hey how are you doing ?? ',
            date: new Date(),
            unread: 0,
          }
        })
        let selectedFriend = {}
        selectedFriend["id"] = friends[0].id
        selectedFriend["title"] = friends[0].name
        selectedFriend["avatar"] = friends[0].imageUrl
        selectedFriend["unread"] = 1
        // selectedFriend.title(friends[0].name)
        // selectedFriend.title(friends[0].name)
        // selectedFriend.title(friends[0].name)

        setSelectedFriend(selectedFriend)
        console.log(listOfChats);
        setUserFriendsChat(listOfChats);

        getUserMessages(userId).then((response) => {
          if (response.data) {
            let chats = response.data.chats
            console.log(chats);
            let chatBoxObjs = []

            chats.forEach(chat => {
              console.log("chat - ");
              console.log(chat);
              let chatObj = {}
              chatObj.receiverUser = chat.receiverUser
              chatObj.fromUser = chat.fromUser
              let chatMessages = []
              chat.messages.forEach(message => {
                let chatBox = {}
                // console.log("message");
                // console.log(message);
                chatBox.type = "text"
                if (message.fromSender == userId) {
                  chatBox.position = "right"
                  chatBox.title = userName
                } else {
                  chatBox.position = "left"
                  chatBox.title = friends[0].name
                }
                chatBox.text = message.content
                chatMessages.push(chatBox)
              })
              chatObj.messages = chatMessages
              chatBoxObjs.push(chatObj)
              if (chat.fromUser == friends[0].id) {
                console.log("selectedChat");
                console.log(chat);
                let selectedMessages = []
                chat.messages.forEach(message => {
                  let chatBox = {}
                  // console.log("message");
                  // console.log(message);

                  chatBox.type = "text"
                  if (message.fromSender == userId) {
                    chatBox.position = "right"
                    chatBox.title = userName
                  } else {
                    chatBox.position = "left"
                    chatBox.title = friends[0].name
                  }
                  chatBox.text = message.content
                  selectedMessages.push(chatBox)
                })
                // console.log(selectedMessages);
                setUserMessages(selectedMessages)
              }
            });
            setTotalMessages(chatBoxObjs)
            console.log("chatBoxObjs");
            console.log(chatBoxObjs);

          }
        })
      }
    });

    return () => (mounted = false);
  }, []);

  const click = (selectedFriend) => {
    console.log("Clicked");
    console.log(selectedFriend);
    setSelectedFriend(selectedFriend)
    let chat = totalMessages.filter(chat => chat.fromUser == selectedFriend.id);

    console.log("selectedChat");
    console.log(chat);
    let selectedMessages = []
    if (chat.length > 0) {
      chat[0].messages.forEach(message => {
        let chatBox = {}
        console.log("message");
        console.log(message);

        chatBox.type = "text"
        if (message.fromSender == localStorage.getItem("id")) {
          chatBox.position = "right"
          chatBox.title = userName
        } else {
          chatBox.position = "left"
          chatBox.title = userName
        }
        chatBox.text = message.content
        selectedMessages.push(chatBox)
      })
      // console.log(selectedMessages);
      setUserMessages(chat[0].messages)
    } else {
      setUserMessages([])
    }
  }
  const sendMessage = (e) => {
    e.preventDefault();
    console.log(message);
    let messageRequest = {}
    console.log(selectedFriend);
    messageRequest.toSender = selectedFriend.id
    messageRequest.fromSender = localStorage.getItem("id")
    messageRequest.content = message
    console.log(messageRequest);
    sendMessageToUser(messageRequest)
    let chatBox = {}
    // console.log("message");
    // console.log(message);
    chatBox.type = "text"
    chatBox.position = "right"
    chatBox.title = userName
    chatBox.text = message
    userMessages.push(chatBox)
    let otherMessages = totalMessages.filter(chat => chat.fromUser != selectedFriend.id);

    let chatList = {}
    chatList.fromUser = selectedFriend.id
    chatList.receiverUser = localStorage.getItem("id")
    chatList.messages = userMessages


    console.log("totalMessages")
    console.log(totalMessages)
    otherMessages.push(chatList)
    console.log("otherMessages");
    console.log(otherMessages);

    setTotalMessages(otherMessages)
    setMessage('')
  }

  return (
    <div>
      <div>
        <Header></Header>
        <div className="content-Chat">
          <div className="chat-list">
            <ChatList
              // className='chat-list'
              onClick={click}
              dataSource=
              {
                userFriendsChat
              }
            />
          </div>
          <div className="message-list">
            <ChatItem
              avatar={selectedFriend.avatar}
              alt={selectedFriend.alt}
              id={selectedFriend.id}
              title={selectedFriend.title}
              // date={new Date()}
              muted={true}
              showMute={true}
              showVideoCall={true}
              unread={selectedFriend.unread}
            />
            <MessageList
              // className='message-list'
              lockable={true}
              toBottomHeight={'100%'}
              dataSource={
                userMessages
              }
            />
            <form onSubmit={sendMessage}>
              <input className="chat-input" value={message} id="chat-in" onInput={e => setMessage(e.target.value)} />
            </form>

          </div>

        </div>
      </div>

    </div >
  );
}

export default Invite;