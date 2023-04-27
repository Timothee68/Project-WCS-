import './App.css';
import Header from "./components/header/Header";
import CardGroupe from "./components/cardGroupe/CardGroupe";
import Form from "./components/form/Form";
import { useState } from "react";
import axios from "axios";


function App() {

  const [wilders, setWilders]= useState([]);

  const fetchData = async () => {
    const Wilders = await axios.get("http://localhost:5000/api/Wilder");
    setWilders(Wilders.data);
  }

  return (

    <div className="App">
        <Header title="Wilders Book"></Header>
        <Form fetchData={ fetchData } type="add"></Form>
        <CardGroupe wilders={wilders} fetchData={ fetchData } title="Wilders"></CardGroupe>
    </div>
  );
}

export default App;
