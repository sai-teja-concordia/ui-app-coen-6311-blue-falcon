import React, { useEffect, useState } from "react";
import Header from "../components/Header";

// import { Navigate } from "react-router-dom";
import Carousel from "react-elastic-carousel";
import Item from "../components/items";
import Item1 from "../components/carousal-1-item";
import Item2 from "../components/items2";
import trending from "../static/trend.png";
import unavailableImage from "../static/unavailable-image.jpeg";

import { getTrendingnews } from "../utils/newsUtils";
import { getCategorynews } from "../utils/newsUtils";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 1 },
  { width: 768, itemsToShow: 2 },
  { width: 1200, itemsToShow: 2 },
];

function Home() {
  const [trendingNews, setTrendingNews] = useState([]);

  const [categoryNews, setCategoryNews] = useState([]);

  useEffect(() => {
    let mounted = true;
    let country = localStorage.getItem("country");
    getTrendingnews(country).then((response) => {
      if (mounted && response.data && response.data.newsList) {
        let news = response.data.newsList;
        news.map(element => {
          if (!element.urlToImage) {
            element.urlToImage = unavailableImage;
          }
          if (!element.content) {
            element.content = element.description;
          }
        });
        setTrendingNews(response.data.newsList);
      }
    });
    let listOfCategories = localStorage.getItem("selectedCategories");
    console.log("listOfCategories - ");
    console.log(listOfCategories);
    getCategorynews(listOfCategories).then((response) => {
      console.log("categoryNews - ")
      console.log(response);
      if (mounted && response.data && response.data.categoryNews) {
        let news = response.data.categoryNews;
        news.map(cat => {
          console.log("cat");
          console.log(cat);
          cat.newsList.map(element => {
            if (!element.urlToImage) {
              element.urlToImage = unavailableImage;
            }
            if (!element.content) {
              element.content = element.description;
            }
          });
        });
        setCategoryNews(news);
        console.log("Cat News 2");
      }
    });
    return () => (mounted = false);
  }, []);

  console.log("trendingNews - ");
  console.log(trendingNews);

  console.log("Cat News");
  console.log(categoryNews);
  let categorynews = (
    <div>
      {categoryNews.map((cat) => (
        <div className="Carousel-1">
          <div className="Carousel-text1">{cat.category}</div>

          <Carousel breakPoints={breakPoints}>
            {cat.newsList.map((item) => (
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
        <div className="Carousel-0">
          <div className="Carousel-text0">Trending News
            <img
              className="trending-icon"
              src={trending}
              width="20"
              height="20"
            ></img>
          </div>

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
                <text className="news-content">
                  {item.content || item.description}
                </text>
              </Item2>
              <Item2 id={item.id}>
                <text className="news-title">{item.title}</text>

                <a
                  className="Readmore"
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Read more
                </a>
              </Item2>
            </Item1>
          ))}
        </Carousel>
      </div>
      <div className="News-categories-headline">News Categories</div>
      {categorynews}
      {/* {categorynews} */}
    </div>
  );
}

export default Home;
