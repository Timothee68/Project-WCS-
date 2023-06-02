import './App.css';
import Header from "./components/header/Header";
import CardGroupe from "./components/cardGroupe/CardGroupe";
import Form from "./components/form/Form";
import FormSkill from "./components/formSkill/FormSkill";
import { useState } from "react";
import { useQuery } from '@apollo/client';
import {GET_ALL_WILDERS , GET_ALL_SKILLS} from "./utils/gql"

function App() 
{

  const [actif, setActif] = useState(false) ;
  const handleActif = () => { setActif(!actif); };
  
  const { loading: wildersLoading, error: wildersError, data: wilders } = useQuery(GET_ALL_WILDERS);
  const { loading: skillsLoading, error: skillsError, data: skillsData } = useQuery(GET_ALL_SKILLS);

  if (wildersLoading || skillsLoading ) return <div>Loading...</div>;
  if (wildersError || skillsError ) return wildersError ? <div>Error page App/Wilders</div> : <div>Error page App/Skills</div>;
 
  return (
    <div className="App">
        <Header title="Wilders Book"></Header>
        <div>
          <FormSkill></FormSkill>
          <Form  type="add" handleActif={handleActif}></Form>
        </div>
          <CardGroupe wilders={wilders} skillsData={skillsData} title={''}></CardGroupe>
    </div>
 );
}

export default App;
