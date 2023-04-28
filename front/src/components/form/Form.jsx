import axios from "axios";
import styles from "./Form.module.css";
import { useEffect, useState } from "react";


const AddWilder = ( { id, fetchData, type ,handleActif , nameW , cityW}  ) => {
    const [name, setName] = useState(nameW);
    const [city, setCity] = useState(cityW);

    const [buttonText, setButtonText] = useState("");
    const [formTitle, setFormTitle] = useState("");

    useEffect(() => {
        if (type === "add") {
            setButtonText("Add wilder");
            setFormTitle("Add Wilder");
        } else if(type === "update") {
            setButtonText("Update wilder");
            setFormTitle("Update Wilder");
        }
      }, [type]);

   
    return (
        <div className={styles.form}>
            <h1>{formTitle}</h1>
            <form 
                onSubmit = { (e) => {
                e.preventDefault();
                if (type === "add"){
                    axios.post("http://localhost:5000/api/Wilder", { name , city})
                    .then((response) => {
                        fetchData();

                    });
                    
                } else if(type === "update") {
                    axios
                    .put(`http://localhost:5000/api/Wilder/${id}`, { name, city })
                    .then((response) => {
                        handleActif();
                        fetchData();
                    });
                }
            }}
            >
                <label>Name:</label>
                <input
                    type="text"
                    value= {type === "add" ? name : name }
                    onChange={e => { setName(e.target.value)}}
                />
                <br/>
                <label>City:</label>
                <input
                    type="text"
                    value= {type === "add" ? city : city }
                    onChange={e => { setCity(e.target.value)}}

                />
                <br />
                <button>{buttonText}</button>
            </form>
        </div>
    )
};

export default AddWilder;