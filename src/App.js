import React, {useState, useEffect} from "react";
import logo from './logo.svg';
import './App.css';


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
        <ul>
          {
            tgid
          }
        {
          !data ? "Загрузка..." : 
          
          data.map((arrlin) => {
            
            arrlin.map((link, j) => {
              <li key={j}>{link.linktext}</li>
          })
            /*arrlin.map((lins, i) => {
              <ul>
              <li>{lins.blocktext}</li>
              <li key={i}>{lins.linktext}</li>
              </ul>
            })*/
          })
          /*data.map((link, i) => (
              <li key={i}>{link.linktext}</li>
          ))*/
        }
         </ul>
        </p>
      </header>
    </div>
  );
  }

export default App;
