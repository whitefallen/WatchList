import './App.css';
import TitleList from "./components/TitleList/TitleList";
import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from "react-bootstrap";
function App() {
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/watchlist`)
      .then(response => response.json())
      .then(data => setList(data))
  }, [])
  const [list, setList] = useState([]);
  const updateList = (_list) => {
    let newlist = [...list,_list]
    setList(newlist);
    saveList(newlist);
  }
  const saveList = (sortedList) => {
    setList(sortedList);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ list: sortedList})
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}/watchlist/add`, requestOptions)
      .then(response => response.json())
  }
  return (
    <>
      <div className="background">

      </div>
      <Container className="App">
        <TitleList list={list} updateList={updateList} saveList={saveList}/>
      </Container>

    </>
  );
}

export default App;
