import './App.css';
import Header from "./components/header/Header";
import CardGroupe from "./components/cardGroupe/CardGroupe";
import WilderCard from "./components/wilderCard/WilderCard";
import Skill from "./components/skills/Skill";
import tete from "./assets/tete.png";


function App() {
  return (
    <div className="App">
        <Header title="Wilders Book"></Header>
        <CardGroupe title="Wilders"></CardGroupe>
    </div>
  );
}

export default App;
