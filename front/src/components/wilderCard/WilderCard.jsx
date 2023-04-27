import tete from "../../assets/tete.png";
import Skill from "../../components/skills/Skill";
import styles from "./WilderCard.module.css";
import { useState } from "react";
import Form from "../../components/form/Form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const WilderCard = ({id, name , skills , onDelete, fetchData}) => {

    const [actif, setActif] = useState(false);
    const handleActif = () => {
        setActif(!actif);
        };

    return (<div className={styles.card}>
                <img src={tete} alt={`${name} Profile`}/>
                <h3>{name}</h3>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                    enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat.
                </p>
                <h4>Wild Skills </h4>
                <p>
                    Add Skill <FontAwesomeIcon icon="fa-solid fa-plus" />
                </p>
                <ul>
                    {skills?.map( (skill) => <li><Skill name={skill.title} votes={skill.votes}></Skill></li>)}            
                </ul>
                <button onClick={() => handleActif()}>{actif ? "cancel" : "update"}</button>
                {actif ? <Form fetchData={ fetchData } type="update" id={id}></Form> : null }
                <br/>
                <button onClick={() => onDelete(id)}>Delete</button>
            </div>

          
        )}

export default WilderCard;