import styles from "./Skill.module.css";

const Skill = ({name, votes}) => {

    return (<div className={styles.skill}>
            {/* <button onDelete > X</button> */}
            <span> {name} <button>{votes}</button></span>
    
        </div>
)}

export default Skill;