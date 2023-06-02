import styles from "./CardGroupe.module.css";
import WilderCard from "../wilderCard/WilderCard";
import { ICardGroupe } from "../../utils/interface";


const CardGroupe = ({ title, skillsData, wilders }: ICardGroupe) => 
{
    const allWilders = wilders?.getAllWilders || []; 
    const allSkills = skillsData?.getAllSkills || []; 
   
    return (
        <div className={styles.CardGroupe}>
            <h2> {title} </h2>
            <div className={styles.flexCard}>
                {allWilders?.map( wilder => 
                    <div key={wilder.id}> 
                        <WilderCard 
                            id={wilder.id} 
                            name={wilder.name}
                            city={wilder.city}
                            url={wilder.url}
                            skills={wilder.skill}
                            skillsData={allSkills}
                        />
                       
                    </div>
                )}       
            </div>
        </div>
    )
}

export default CardGroupe;