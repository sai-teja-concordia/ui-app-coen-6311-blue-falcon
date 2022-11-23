import React from "react";
import Header from "../components/Header";

import { TextField } from "@mui/material";
import { Typography } from "@mui/material";

function Friends() {
  // const listItems = trendingnews.map((trendingnews) =>
  // <li>{trendingnews}</li>
  //  );

  return (
    <div>
      <div>
        <Header></Header>
      </div>
      <div className="main">
        {/* <h1>React Search</h1> */}
        <div className="search">
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            label="Search"
          />
        </div>
      </div>
    </div>
  );
}

export default Friends;
