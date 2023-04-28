import styles from "./CardGroupe.module.css";
import WilderCard from "../../components/wilderCard/WilderCard";
import { useEffect, useState } from "react";
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
                    {wilders?.map( x=>
                        <div> 
                            <WilderCard 
                                key={x.id}
                                id={x.id} 
                                name={x.name} 
                                skills={x.skills} 
                                onDelete={() => handleDelete(x.id)} 
                                fetchData={ fetchData }
                                skillsData={skillsData}                      
                            >
                            </WilderCard>
                        </div>)}       
                </div>
            </div>
)}

export default CardGroupe;