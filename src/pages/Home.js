import React from "react";
import Header from "../components/Header";
import countries from "countries-list";

import { Navigate } from "react-router-dom";
import Carousel from "react-elastic-carousel";
import Item from "../components/items";
import background from '../static/background_3.jpg';
let welcomeMessage;

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

function Home() {
  
    console.log(
      `localStorage.getItem('isNewUser') - ${localStorage.getItem("isNewUser")}`
    );
    if (localStorage.getItem("isNewUser") === "false") {
      welcomeMessage = "Welcome back! ";
    } else {
      welcomeMessage = "Welcome, ";
      // return <Navigate to="/Newuser" />
    }
    welcomeMessage = welcomeMessage + localStorage.getItem("name");
    console.log(welcomeMessage);
    console.log(countries.countries);
  

  
    return (
      <div>
        <Header></Header>
        <div className="content">
          <h1>{welcomeMessage}</h1>
        </div>
        <div className="Carousel-1">
          
        <Carousel breakPoints={breakPoints}>
          <Item> <img src={background} className="loginbackground"/></Item>
          <Item>Two</Item>
          <Item>Three</Item>
          <Item>Four</Item>
          <Item>Five</Item>
          <Item>Six</Item>
          <Item>Seven</Item>
          <Item>Eight</Item>
        </Carousel>
        
      </div>
      <div className="Carousel-2">
          
        <Carousel breakPoints={breakPoints}>
          <Item> <img src={background} className="loginbackground"/> <text>world</text></Item>
          <Item>Two</Item>
          <Item>Three</Item>
          <Item>Four</Item>
          <Item>Five</Item>
          <Item>Six</Item>
          <Item>Seven</Item>
          <Item>Eight</Item>
        </Carousel>
        
      </div>

        
      </div>
    );
    }


export default Home;
