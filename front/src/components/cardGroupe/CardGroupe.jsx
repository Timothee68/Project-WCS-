import styles from "./CardGroupe.module.css";
import WilderCard from "../../components/wilderCard/WilderCard";
import { useEffect, useState } from "react";
import axios from "axios";

const CardGroupe = ({title}) => {
    const [wilders, setWilders]= useState([])

    useEffect(() => {
        const fetchData = async () => {
            const Wilders = await axios.get("http://localhost:5000/api/Wilder");
            setWilders(Wilders.data)
        }
        fetchData();
    }, [] );
    
    console.log(wilders)
    return (<div className={styles.CardGroupe}>
                <h2> {title} </h2>

                <div className={styles.flexCard}>
                    {wilders.map( x=> <div> <WilderCard name={x.name}></WilderCard></div>)};       
                </div>

            </div>
)}

export default CardGroupe;