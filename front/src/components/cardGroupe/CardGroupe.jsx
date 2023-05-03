import styles from "./CardGroupe.module.css";
import WilderCard from "../../components/wilderCard/WilderCard";
import { useEffect } from "react";
import axios from "axios";

const CardGroupe = ({title ,skillsData, fetchData , wilders}) => {
   
    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/Wilder/${id}`)
        .then(() => {
            fetchData();
        });
    };

    useEffect(() => {
        fetchData();
    }, [] );

    return (<div className={styles.CardGroupe}>
                <h2> {title} </h2>
                <div className={styles.flexCard}>
                    {wilders?.map( wilder =>
                        <div> 
                            <WilderCard 
                                key={wilder.id}
                                id={wilder.id} 
                                name={wilder.name}
                                city={wilder.city}
                                skill={wilder.skill} 
                                onDelete={() => handleDelete(wilder.id)} 
                                fetchData={ fetchData }
                                skillsData={skillsData}                      
                            >
                            </WilderCard>
                        </div>)}       
                </div>
            </div>
)}

export default CardGroupe;