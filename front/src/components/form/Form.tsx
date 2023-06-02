import styles from "./Form.module.css";
import { useEffect, useRef, useState } from "react";
import { IAddWilderUpdate ,IAddWilder } from "../../utils/interface";
import { useMutation } from '@apollo/client';
import {GET_ALL_WILDERS , CREATE_WILDER, UPDATE_WILDER} from "../../utils/gql"

const AddWilder = ( {  type , id,  handleActif , nameW , cityW}: IAddWilder & IAddWilderUpdate   ) => {

    const [name, setName] = useState(nameW);
    const [city, setCity] = useState(cityW);
    const [buttonText, setButtonText] = useState("");
    const [formTitle, setFormTitle] = useState("");
    const fileInputRef:any = useRef(null);

    useEffect(() => {
        if (type === "add") { setButtonText("Add wilder"); setFormTitle("Add Wilder"); }
        else if(type === "update") { setButtonText("Update wilder"); setFormTitle("Update Wilder"); }
      }, [type]);

    const [createdWilder , {loading, error } ]= useMutation(CREATE_WILDER , { refetchQueries: [GET_ALL_WILDERS],});

    const [updateWilder , {loading:updateloading ,error: errorWilder } ] =  useMutation(UPDATE_WILDER , { refetchQueries: [GET_ALL_WILDERS],});

    if (updateloading || loading ) return <div>Loading...</div>;

    if (errorWilder || error) return errorWilder ? <div>Error from update</div> :<div>Error from add</div> ;

    return (
        <div className={styles.form}>
            <h1>{formTitle}</h1>
                <label>Name:</label>
                <input
                    type="text"
                    value= { name  }
                    onChange={e => { setName(e.target.value)}}/>
                <br/>
                <label>City:</label>
                <input
                    type="text"
                    value= { city  }
                    onChange={e => { setCity(e.target.value)}}/>
                <br />
                <label>Image:</label>
                <input type="file" name="avatar" ref={fileInputRef}/>

                <button onClick={() => {
                     type === "add" 
                     ? createdWilder( { variables: { name: name , city: city}, } ) 
                     : updateWilder( { variables: { id: id, name: name, city: city }, } )
                    }}>
                    {buttonText}
                </button>
        </div>
    )
};

export default AddWilder;