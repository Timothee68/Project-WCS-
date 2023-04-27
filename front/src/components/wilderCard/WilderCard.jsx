import tete from "../../assets/tete.png";
import Skill from "../../components/skills/Skill";
import styles from "./WilderCard.module.css";

const WilderCard = ({name}) => {
        const data = [
            {name: "PHP", votes:8},
            {name: "C#" , votes:5},
            {name: "JavaScript" , votes:4},
        ];
   


    return (<div className={styles.card}>
                <img src={tete} alt="{name} + Profile" />
                <h3>{name}</h3>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
                </p>
                <h4>Wild Skills</h4>
                <ul>
                    {data.map( (wilder) => <li><Skill key={wilder.key} name={wilder.name} votes={wilder.votes}></Skill></li>)}           
                </ul>
            </div>
        )}

export default WilderCard;