import './App.css';
import Header from "./components/header/Header";
import CardGroupe from "./components/cardGroupe/CardGroupe";
import Form from "./components/form/Form";
import FormSkill from "./components/formSkill/FormSkill";
import { useState } from "react";
import { useQuery, gql } from '@apollo/client';
import {ISkillData,IWilder} from "./utils/interface";

const GET_ALL_WILDERS = gql`
  query getAllWilders {
    getAllWilders {
      id
      name
      city
      grades {
        id
        grade
        skill {
          id
          name
        }
      }
    }
  }
`
const GET_ALL_SKILLS = gql`
  query getAllSkills {
    skills {
      id
      name
    }
  }
`;

function App() {

  const [Wilder , setWilder ] = useState()
  const [Skill , setSkill ] = useState()
  
  const fetchData = async (): Promise<void> => {
    const { loading: wildersLoading, error: wildersError, data: wildersData } = useQuery(GET_ALL_WILDERS);
    const { loading: skillsLoading, error: skillsError, data: skillsDatas } = useQuery(GET_ALL_SKILLS);
  }

  const [actif, setActif] = useState(false) ;
  const handleActif = () => { setActif(!actif); };
  


  if (wildersLoading || skillsLoading) return <div>Loading...</div>;
  if (wildersError || skillsError) return <div>Error</div>;

  const wilders = wildersData ? wildersData.wilders : [];     
  const skillsData = skillsDatas ? skillsDatas.skills : [];

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
