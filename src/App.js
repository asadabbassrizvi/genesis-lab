import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import List from "./components/List";

function App() {
  const [countryName, setCountryName] = useState("");
  const [universities, setUniversities] = useState([]);
  const [response, setResponse] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = setTimeout(() => {
      if (countryName !== "" && countryName.length > 2) {
        setResponse(false);
        setUniversities([]);
        fetchData();
      }
    }, 1500);

    return () => {
      clearTimeout(getData);
    };
  }, [countryName]);

  async function fetchData() {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://universities.hipolabs.com/search?country=${countryName} `
      );
      response.data.length !== 0
        ? setUniversities(response.data)
        : setResponse(true);
      // Process the data or update state here
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="App">
      <input
        type="text"
        value={countryName}
        onChange={(e) => setCountryName(e.target.value)}
      />
      {loading && <p>Loading...</p>}

      {response ? <p>Nothing to preview</p> : <List List={universities} />}
    </div>
  );
}

export default App;
