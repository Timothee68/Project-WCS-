import axios from "axios";
import styles from "./Form.module.css";
import { useEffect, useRef, useState } from "react";
import { IAddWilderUpdate ,IAddWilder } from "../../utils/interface";
import { gql, useMutation } from '@apollo/client';

const AddWilder = ( {  type , id,  handleActif , nameW , cityW}: IAddWilder & IAddWilderUpdate   ) => {

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


const CREATE_WILDER = gql`
mutation CreateWilder($name: String!, $city: String!) {
    createWilder(name: $name, city: $city) {
        name
        city
    }
}
`;
  
const UPDATE_WILDER = gql`
    mutation UpdateWilder($id: Int!, $name: String!, $city: String!) {
    updateWilder(id: $id, name: $name, city: $city) {
        name
        city
    }
}
`;

const AddWilderForm = () => {
    const [createdWilder , {loading, error } ]= useMutation(CREATED_WILDER);
    if (loading) return <div>Loading...</div>;
    if (error ) return <div>Error</div>;

    const handleSaveWilder = async () => {
      try {
        await createdWilder({
          variables: {
            name: name,
            city: city,
          },
        });
      } catch (err) {
        console.log(err);
      }
    };
};

const UpdateWilderForm = () => {
    const [updateWilder , {loading ,error } ] = useMutation(UPDATE_WILDER);
    if (loading) return <div>Loading...</div>;
    if (error ) return <div>Error</div>;

    const handleUpdateWilder = async () => {
        try {
        await updateWilder({
            variables: {
            name: name,
            city: city,
            },
        });
        } catch (err) {
        console.log(err);
        }
    };
};

    return (
        <div className={styles.form}>
            <h1>{formTitle}</h1>
            <form encType="multipart/form-data"
                onSubmit = { (e) => {
                e.preventDefault();
                const formData:FormData = new FormData();
                formData.append('name', name as string);
                // Ajouter les données de texte à l'objet FormData
                formData.append('city', city as string);
                // Ajouter le fichier à l'objet FormData
                formData.append('url', fileInputRef.current.files[0]);
                if (type === "add"){
                    // createdWilder(formData);
                } else if(type === "update") {
                    // updateWilder(formData)
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

                <button onClick= { type === "add" ? AddWilderForm : UpdateWilderForm}>{buttonText}</button>
            </form>
        </div>
    )
};

export default AddWilder;