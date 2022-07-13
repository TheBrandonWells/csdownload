import { useState, useEffect } from "react";

import "./scss/app.scss";
import DownloadList from "./components/downloadList";

function App() {
  const [downloadData, setDownloadData] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await fetch(
          "https://thebrandonwells.github.io/csdownload/src/services/index.json"
        );
        const json = await res.json();
        setDownloadData(json);
      } catch (error) {
        console.error("Error: " + error.message);
        setError("Error: " + error.message);
        //return our error message for proper error handling render
        return { error: error.message };
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header"></header>
      {error.length > 0 && (
        <div className="error">
          <p>&#128562; Something went wrong! </p>
          <p>{error}</p>
        </div>
      )}
      <DownloadList data={downloadData} />
    </div>
  );
}

export default App;
