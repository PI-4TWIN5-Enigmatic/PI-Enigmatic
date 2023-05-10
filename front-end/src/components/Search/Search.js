import axios from "axios";
import React, { useState, useEffect } from "react";
import './Search.css'
import { Link } from "react-router-dom";


const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [users, setUsers] = useState([]);

          useEffect(() => {
        axios.get("http://localhost:8000/api/users/getAll").then((response) => {
          setUsers(response.data);
        });
          }, []);
    
    
  const handleInputChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const results = searchTerm
      ? users.filter((user) =>
          user.firstName.toLowerCase().includes(searchTerm)
        )
      : [];
    setSearchResults(results);
  };

    return (
      <div>
        <input
          type="text"
          placeholder="Search"
          onChange={handleInputChange}
          className="top-search-field"
          value={searchTerm}
        />
        {searchResults.length > 0 && (
          <div className="search-results">
            <ul>
              {searchResults.map((user) => (
                <li key={user._id} >
                  <Link className="custom-link" to={`http://localhost:3000/profile/${user._id}`}>
                        {user.lastName} {user.firstName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
};

export default Search;
