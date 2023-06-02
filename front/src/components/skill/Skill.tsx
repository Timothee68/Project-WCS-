import styles from "./Skill.module.css";
import {ISkill} from "../../utils/interface";


const Skill = ({title , votes}: ISkill ) => 
{
    return (<div className={styles.skill}>
                <span> {title} <button>{votes}</button></span>
            </div>
)}

export default Skill;