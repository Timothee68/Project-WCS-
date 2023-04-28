import './App.css';
import Header from "./components/header/Header";
import CardGroupe from "./components/cardGroupe/CardGroupe";
import Form from "./components/form/Form";
import FormSkill from "./components/formSkill/FormSkill";
import { useState } from "react";
import axios from "axios";

function App() {

  const [wilders, setWilders]= useState([]);
  const [skillsData, setSkillsData]= useState([]);
  const fetchData = async () => {
    const Wilders = await axios.get("http://localhost:5000/api/Wilder");
    setWilders(Wilders.data);
    const SkillsData = await axios.get("http://localhost:5000/api/Skills");
    setSkillsData(SkillsData.data);
    // console.log(Wilders, "sduivdshguihgcuirhgursikcghutdghcduighdyu");
  }


console.log(wilders)
  return (

    <div className="App">
        <Header title="Wilders Book"></Header>
        
        <div>
          <FormSkill></FormSkill>
          <Form fetchData={ fetchData } type="add"></Form>
        </div>
          
        <CardGroupe wilders={wilders} skillsData={skillsData} fetchData={ fetchData } title="Wilders"></CardGroupe>
    </div>
  );
}

export default App;
