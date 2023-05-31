import axios from "axios";
import styles from "./Form.module.css";
import { useEffect, useRef, useState } from "react";
import { IAddWilderUpdate ,IAddWilder } from "../../utils/interface";


const AddWilder = ( { fetchData, type , id,  handleActif , nameW , cityW}: IAddWilder & IAddWilderUpdate   ) => {

    const [name, setName] = useState(nameW);
    const [city, setCity] = useState(cityW);
    const [buttonText, setButtonText] = useState("");
    const [formTitle, setFormTitle] = useState("");
    const fileInputRef:any = useRef(null);

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
            <form encType="multipart/form-data"
                onSubmit = { (e) => {
                e.preventDefault();
                if (type === "add"){
                    const formData:FormData = new FormData();
                    // Ajouter les données de texte à l'objet FormData
                    formData.append('name', name as string);
                    formData.append('city', city as string);
                    // Ajouter le fichier à l'objet FormData
                    formData.append('url', fileInputRef.current.files[0]);
                    CREATED_WILDER = gql`
                        
                    `;
                    const { loading , error , data  } = useQuery(CREATED_WILDER);
                    
        
                } else if(type === "update") {
                    UPDATE_WILDER = gql`
      
                    `;
                    const { loading , error , data  } = useQuery(UPDATE_WILDER);
                }
            }}
            >
                <label>Name:</label>
                <input
                    type="text"
                    value= { name  }
                    onChange={e => { setName(e.target.value)}}
                />
                <br/>
                <label>City:</label>
                <input
                    type="text"
                    value= { city  }
                    onChange={e => { setCity(e.target.value)}}

                />
                <br />
                <label>Image:</label>
                <input type="file" name="avatar" ref={fileInputRef}/>

                <button>{buttonText}</button>
            </form>
        </div>
    )
};

export default AddWilder;