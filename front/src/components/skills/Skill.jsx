import styles from "./Skill.module.css";

const Skill = ({name, votes}) => {

    return (<div className={styles.skill}>
            <span> {name} <button>{votes}</button></span>
    
        </div>
)}

export default Skill;