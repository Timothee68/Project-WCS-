import { useState } from "react";
import styles from "./FormSkill.module.css";
import {CREATE_SKILL , GET_ALL_SKILLS} from "../../utils/gql"
import { useMutation } from '@apollo/client';

const AddSkill = () => 
{
    const [name, setName] = useState("");

    const [createSkill , {loading, error } ] = useMutation(CREATE_SKILL , { refetchQueries: [GET_ALL_SKILLS],});

    if ( loading ) return <div>Loading...</div>;

    if ( error) return  <div>Error from skillAdd</div> ;

    return (
        <div className={styles.form}>
            <h1>Add skill</h1>   
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={e => { setName(e.target.value)}}
                />
                <button  onClick={() => { createSkill({ variables:{ name: name }}) }}>
                    Add Skill
                </button>
        </div>
    )
};

export default AddSkill;