import styles from "./CardGroupe.module.css";
import WilderCard from "../wilderCard/WilderCard";
import { useEffect } from "react";
import axios from "axios";
import { ICardGroupe } from "../../utils/interface";


const CardGroupe = ({ title, skillsData, wilders }: ICardGroupe) => {
   
    // const handleDelete = (id: number) => {
    //     axios.delete(`http://localhost:5000/api/Wilder/${id}`)
    //     .then(() => {
    //         fetchData();
    //     });
    // };

    // useEffect(() => {
    //     fetchData();
    // }, [] );

    return (<div className={styles.CardGroupe}>
                <h2> {title} </h2>
                <div className={styles.flexCard}>
                    {wilders?.map( wilder =>
                        <div key={wilder.id}> 
                            <WilderCard 
                                id={wilder.id} 
                                name={wilder.name}
                                city={wilder.city}
                                url={wilder.url}
                                skills={wilder.skill} 
                                // onDelete={() => handleDelete(wilder.id)} 
                                // fetchData={fetchData}
                                skillsData={skillsData}                      
                            />
                        </div>
                    )}       
                </div>
            </div>
)}

export default CardGroupe;