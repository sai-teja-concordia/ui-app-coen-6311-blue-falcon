import React, { useEffect, useState } from "react";
import Header from "../components/Header";

// import { Navigate } from "react-router-dom";
import Carousel from "react-elastic-carousel";
import Item from "../components/items";
import Item1 from "../components/carousal-1-item";
import Item2 from "../components/items2";
import background from "../static/background_4.jpg";
import trending from "../static/trend.png";

import { getTrendingnews } from "../utils/newsUtils";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 1 },
  { width: 768, itemsToShow: 2 },
  { width: 1200, itemsToShow: 2 },
];

function Home() {
  const [trendingNews, setTrendingNews] = useState([]);
  useEffect(() => {
    let mounted = true;
    let country = localStorage.getItem("country")
    getTrendingnews(country)
      .then(items => {
        if (mounted && items.data && items.data.newsList) {
          setTrendingNews(items.data.newsList)
        }
      })
    return () => mounted = false;
  }, [])

  console.log("trendingNews - ");
  console.log(trendingNews);
  let category_func = [
    {
      category: "Sports",
      listofnews: [
        {
          id: "5",
          title: "sports1",
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
          title: "sports1",
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
          title: "sports1",
          url: "https://www.google.com",
          urlToImage: background,
          author: "Srikanth",
          description: "description",
          content: "content",
          publishedAtEpoch: 1668192430,
          sourceName: "sourceName1",
        },
      ],
    },
    {
      category: "Science",
      listofnews: [
        {
          id: "5",
          title: "sports1",
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
          title: "sports1",
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
          title: "sports1",
          url: "https://www.google.com",
          urlToImage: background,
          author: "Srikanth",
          description: "description",
          content: "content",
          publishedAtEpoch: 1668192430,
          sourceName: "sourceName1",
        },
      ],
    },
    {
      category: "Hollywood",
      listofnews: [
        {
          id: "5",
          title: "sports1",
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
          title: "sports1",
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
          title: "sports1",
          url: "https://www.google.com",
          urlToImage: background,
          author: "Srikanth",
          description: "description",
          content: "content",
          publishedAtEpoch: 1668192430,
          sourceName: "sourceName1",
        },
      ],
    },
  ];

  let categorynews = (
    <div>
      {category_func.map((cat) => (
        <div className="Carousel-1">
          <div>
            <text className="Carousel-text1">{cat.category}</text>
          </div>

          <Carousel breakPoints={breakPoints}>
            {cat.listofnews.map((item) => (
              <Item>
                <Item2 id={item.id}>
                  <img
                    src={item.urlToImage}
                    width="250"
                    height="150"
                    alt=""
                  ></img>
                  <text className="news-content">{item.content}</text>
                </Item2>

                <Item2 id={item.id}>
                  <text className="news-title">{item.title}</text>

                  <a href={item.url}>Read more</a>
                </Item2>
              </Item>
            ))}
          </Carousel>
        </div>
      ))}
    </div>
  );
  // const listItems = trendingnews.map((trendingnews) =>
  // <li>{trendingnews}</li>
  //  );

  return (
    <div>
      <Header></Header>
      <div className="content">
        <h1>Your daily dose of NEWS!</h1>
      </div>

      <div className="Carousel-trendingnews">
        <div>
          <text className="Carousel-text0">Trending News</text>
          <img className="trending-icon" src={trending} width="20"
            height="20"></img>
        </div>
        <Carousel breakPoints={breakPoints}>
          {trendingNews.map((item) => (
            <Item1>
              <Item2 id={item.id}>
                <img
                  src={item.urlToImage}
                  width="250"
                  height="200"
                  alt=""
                ></img>
                <text className="news-content">{item.content || item.description}</text>
              </Item2>

              <Item2 id={item.id}>
                <text className="news-title">{item.title}</text>

                <a href={item.url} target="_blank" rel="noreferrer">
                  Read more
                </a>
              </Item2>
            </Item1>
          ))}
        </Carousel>
      </div>
      <text className="News-categories-headline">News Categories</text>
      {categorynews}
      {/* {categorynews} */}
    </div>
  );
}

export default Home;
