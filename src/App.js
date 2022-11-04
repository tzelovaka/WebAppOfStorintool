import React, {useState, useEffect} from "react";
import Xarrow from "react-xarrows";
import logo from './logo.svg';
import './App.css';
const bl = {
  border: "grey solid 2px", borderRadius: "5px", padding: "5px", listStyleType: "none", marginTop: "20px"
};
const li = {
  display: "inline", border: "red solid 1px", borderRadius: "15px", padding: "2px", listStyleType: "none"
};
function App() {
  const tgid = window.Telegram.WebApp.initDataUnsafe?.user?.id;
  if (tgid == undefined){
    tgid = 0
  }
  const [data, setData] = useState(null)
  useEffect(() => {
        fetch(`https://storinter.herokuapp.com/api/?data=${tgid}`, {
            method: 'GET',
        })
    .then(response => response.json())
    .then (response => setData(response.message))
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {
            tgid
          }
        </p>
        <ul>
        { 
          !data ? "Загрузка..." : 
          data[0].map((level, h) =>
          level.map ((blin, x) =>
          <li id = {blin.id} style = {blin.type == 'block' ? bl : li}>{blin.text}</li>
          )
          )
          
        }
        </ul>
        {
          !data ? "Загрузка..." : 
          data[1].map((arrow) =>
          <Xarrow
                start={arrow.start}//can be react ref
                end={arrow.end} //or an id
            />
          )
        }
      </header>
    </div>
  );
  }

export default App;
