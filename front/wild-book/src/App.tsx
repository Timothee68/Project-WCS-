import './App.css';
import Header from "./components/header/Header";
import CardGroupe from "./components/cardGroupe/CardGroupe";
import Form from "./components/form/Form";
import FormSkill from "./components/formSkill/FormSkill";
import { useState } from "react";
import axios from "axios";
import {ISkillData,IWilder} from "./utils/interface";


function App() {

  const [wilders, setWilders]= useState<IWilder[]>([]);
  const [skillsData, setSkillsData]= useState<ISkillData[]>([]);
  const fetchData = async (): Promise<void> => {
    
    const Wilders = await axios.get<IWilder[]>("http://localhost:5000/api/Wilder");
    setWilders(Wilders.data);
    const SkillsData = await axios.get<ISkillData[]>("http://localhost:5000/api/Skill");
    setSkillsData(SkillsData.data);
  }

  const [actif, setActif] = useState(false) ;
  const handleActif = () => {
      setActif(!actif);
      };

  return (

    <div className="App">
        <Header title="Wilders Book"></Header>
        <div>
          <FormSkill fetchData={function (): void { } }></FormSkill>
          <Form fetchData={ fetchData } type="add" handleActif={handleActif}></Form>
        </div>
          <CardGroupe wilders={wilders} skillsData={skillsData} fetchData={ fetchData } title="Wilders"></CardGroupe>
    </div>
 );
}

export default App;
