import React, { useState } from "react";
import "../../../src/css/Menu.css";
import { AiOutlineSearch } from "react-icons/ai";
import imgSearch from "../../images/search.png";
import SearchIcon from "../../images/Search_Search.png";

export default function Search({ handleSearch }) {
  // console.log(handleSearch, "handleSearchhhhh");
  const [searchText, setSearchText] = useState("");

  const handleChange = (event) => {
    setSearchText(event.target.value);
    handleSearch(searchText);
  };

  const handleButtonClick = () => {
    handleSearch(searchText);
  };

  return (
    <div className="search-here">
      <div className="search-flex">
        <div>
          <img src={SearchIcon} />
          <input
            className="search"
            placeholder="search here..."
            type="text"
            value={searchText}
            onChange={handleChange}
          />
        </div>
        <img src={imgSearch} />
      </div>
      <button className="search-button" onClick={handleButtonClick}>
        Search
      </button>
    </div>
  );
}
