import React, { useEffect, useState } from "react";
import CountryCard from "../components/CountryCard";
import "./HomePage.css";

import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

function HomePage() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/countries")
      .then((res) => res.json())
      .then(setCountries);
  }, []);

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  const filteredCountries = countries.filter((country) => {
    if (search === "") {
      return true;
    }
    return country.name.toLowerCase().includes(search.toLowerCase());
  });

  const countryCards = filteredCountries.map((country) => {
    return <CountryCard key={country.id} country={country} />;
  });

  return (
    <div className="home">
      <Container sx={{ height: 1000, width: 1100 }}>
        <Box>
          <TextField
            size="small"
            variant="outlined"
            label="Search Country"
            value={search}
            onChange={handleSearch}
          />
          <div className="home__grid">
            <div className="caption">
              <i>* click on camera icon to explore user experirnces</i>
              <br></br>
              <i>* currency exchange is updated daily</i>
            </div>
            <Grid container spacing={5}>
              {countryCards}
            </Grid>
          </div>
        </Box>
      </Container>
    </div>
  );
}

export default HomePage;
