import React from "react";
import Header from "../components/Header";
import { TextField } from "@mui/material";

function Friends() {
  return (
    <div>
      <div>
        <Header></Header>
      </div>
      <div className="main">
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
