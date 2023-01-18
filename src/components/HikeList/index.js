import React, { useState, useEffect } from 'react';

function HikeList() {
  const [hikes, setHikes] = useState([]);

  const getHikes = () => fetch('https://bmjfgvynnl.execute-api.us-west-2.amazonaws.com/items')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    setHikes(data);
  });

  useEffect(() => {
    getHikes();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          {hikes.length > 0 && hikes.map((h) => <p key={h.hikeid}>{h.name}</p>)}
        </div>
      </header>
    </div>
  );
}

export default HikeList;
