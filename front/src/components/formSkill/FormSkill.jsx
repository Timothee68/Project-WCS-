import axios from "axios";
import { useState } from "react";
import styles from "./FormSkill.module.css";

const AddSkill = ( { id, fetchData, type}  ) => {
    const [name, setName] = useState("");


    return (
        <div className={styles.form}>
            <h1>Add skill</h1>
            <form 
                onSubmit = { (e) => {
                e.preventDefault();
               
                    axios.post("http://localhost:5000/api/Skill", { name})
                    .then((response) => {
                        alert(`${name}, Skill add to success`);
                        fetchData();
                    });

            }}
            >
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={e => { setName(e.target.value)}}
                />
                <button>Add Skill</button>
            </form>
        </div>
    )
};

export default AddSkill;