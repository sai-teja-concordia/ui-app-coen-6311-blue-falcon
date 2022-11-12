import React from "react";
import Header from "../components/Header";
import countries from "countries-list";

import { Navigate } from "react-router-dom";
import Carousel from "react-elastic-carousel";
import Item from "../components/items";
import Item2 from "../components/items2";
import background from "../static/background_4.jpg";
let welcomeMessage;

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 1 },
  { width: 768, itemsToShow: 2 },
  { width: 1200, itemsToShow: 2 },
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

  let listOftrendnews = [
    {
      id: "id",
      title: "item #1",
      url: "https://www.google.com",
      urlToImage: background,
      author: "Srikanth",
      description: "description",
      content: "content",
      publishedAtEpoch: 1668192430,
      sourceName: "sourceName1",
    },
    {
      id: "id",
      title: "item #2",
      url: "https://www.google.com",
      urlToImage: background,
      author: "Srikanth",
      description: "description",
      content: "content",
      publishedAtEpoch: 1668192430,
      sourceName: "sourceName1",
    },
    {
      id: "3",
      title: "item #3",
      url: "https://www.google.com",
      urlToImage: background,
      author: "Srikanth",
      description: "description",
      content: "content",
      publishedAtEpoch: 1668192430,
      sourceName: "sourceName1",
    },
    {
      id: "4",
      title: "item #4",
      url: "https://www.google.com",
      urlToImage: background,
      author: "Srikanth",
      description: "description",
      content: "content",
      publishedAtEpoch: 1668192430,
      sourceName: "sourceName1",
    },
    {
      id: "5",
      title: "item #5",
      url: "https://www.google.com",
      urlToImage: background,
      author: "Srikanth",
      description: "description",
      content: "content",
      publishedAtEpoch: 1668192430,
      sourceName: "sourceName1",
    },
  ];

  let listOfNews = [
    {
      id: "id",
      title: "item #1",
      url: "https://www.google.com",
      urlToImage: background,
      author: "Srikanth",
      description: "description",
      content: "content",
      publishedAtEpoch: 1668192430,
      sourceName: "sourceName1",
    },
    {
      id: "id",
      title: "item #2",
      url: "https://www.google.com",
      urlToImage: background,
      author: "Srikanth",
      description: "description",
      content: "content",
      publishedAtEpoch: 1668192430,
      sourceName: "sourceName1",
    },
    {
      id: "3",
      title: "item #3",
      url: "https://www.google.com",
      urlToImage: background,
      author: "Srikanth",
      description: "description",
      content: "content",
      publishedAtEpoch: 1668192430,
      sourceName: "sourceName1",
    },
    {
      id: "4",
      title: "item #4",
      url: "https://www.google.com",
      urlToImage: background,
      author: "Srikanth",
      description: "description",
      content: "content",
      publishedAtEpoch: 1668192430,
      sourceName: "sourceName1",
    },
    {
      id: "5",
      title: "item #5",
      url: "https://www.google.com",
      urlToImage: background,
      author: "Srikanth",
      description: "description",
      content: "content",
      publishedAtEpoch: 1668192430,
      sourceName: "sourceName1",
    },
  ];
  let listOfNews2 = [
    {
      id: "id",
      title: "item #1",
      url: "https://www.google.com",
      urlToImage: background,
      author: "Srikanth",
      description: "description",
      content: "content",
      publishedAtEpoch: 1668192430,
      sourceName: "sourceName1",
    },
    {
      id: "id",
      title: "item #2",
      url: "https://www.google.com",
      urlToImage: background,
      author: "Srikanth",
      description: "description",
      content: "content",
      publishedAtEpoch: 1668192430,
      sourceName: "sourceName1",
    },
    {
      id: "3",
      title: "item #3",
      url: "https://www.google.com",
      urlToImage: background,
      author: "Srikanth",
      description: "description",
      content: "content",
      publishedAtEpoch: 1668192430,
      sourceName: "sourceName1",
    },
    {
      id: "4",
      title: "item #4",
      url: "https://www.google.com",
      urlToImage: background,
      author: "Srikanth",
      description: "description",
      content: "content",
      publishedAtEpoch: 1668192430,
      sourceName: "sourceName1",
    },
    {
      id: "5",
      title: "item #5",
      url: "https://www.google.com",
      urlToImage: background,
      author: "Srikanth",
      description: "description",
      content: "content",
      publishedAtEpoch: 1668192430,
      sourceName: "sourceName1",
    },
  ];

  return (
    <div>
      <Header></Header>
      <div className="content">
        <h1>{welcomeMessage}</h1>
      </div>

      <div className="Carousel-trendingnews">
        <div>
          <text className="Carousel-text0">Trending News</text>
        </div>
        <Carousel breakPoints={breakPoints}>
          {listOftrendnews.map((item) => (
            <Item>
              <Item2 id={item.id}>
                <img src={item.urlToImage} width="250" height="150"></img>
                {item.content}
              </Item2>

              <Item2 id={item.id}>
                {item.title}
                <a href={item.url}>Read more</a>
              </Item2>
            </Item>
          ))}
        </Carousel>
      </div>
      <div className="Carousel-1">
        <div>
          <text className="Carousel-text1">Sports</text>
        </div>
        <Carousel breakPoints={breakPoints}>
          {listOfNews.map((item) => (
            <Item id={item.id}>
              {" "}
              <img src={item.urlToImage} width="250" height="200"></img>{" "}
              {item.title}
            </Item>
          ))}
        </Carousel>
      </div>

      <div className="Carousel-2">
        <div>
          <text className="Carousel-text2">Science</text>
        </div>
        <Carousel breakPoints={breakPoints}>
          {listOfNews2.map((item) => (
            <Item id={item.id}>
              {" "}
              <img src={item.urlToImage} width="250" height="200"></img>{" "}
              {item.title}
            </Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default Home;
