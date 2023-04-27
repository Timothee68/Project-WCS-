import styles from "./CardGroupe.module.css";
import WilderCard from "../../components/wilderCard/WilderCard";

const CardGroupe = ({title}) => {
    const data = [
        {name: "jhon Doe"},
        {name: "Tim luc"},
        {name: "Jeanne Mass"},
        {name: "eric jubert"},
        {name: "garfield le chat"},
        {name: "Chat potté"},
        {name: "Arthure lesourd"},
        {name: "Patrick starOcean"},
    ];

    return (<div className={styles.CardGroupe}>
                <h2> {title} </h2>

                <div className={styles.flexCard}>
                    {data.map( x=> <div> <WilderCard name={x.name}></WilderCard></div>)};       
                </div>

            </div>
)}

export default CardGroupe;