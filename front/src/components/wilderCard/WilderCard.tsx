import tete from "../../assets/tete.png";
import { useState } from "react";
import Skill from "../skill/Skill";
import styles from "./WilderCard.module.css";
import Form from "../form/Form";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {GET_ALL_WILDERS , DELETE_WILDER} from "../../utils/gql";
import { useMutation } from '@apollo/client';
import { ISkill , ISkillData, IWilderCard } from "../../utils/interface";

const WilderCard = ({id, name ,url, city, skills, skillsData}: IWilderCard) => {

    const [actif, setActif] = useState(false) ;
    const handleActif = () => {
        setActif(!actif);
        };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [deleteWilder, {  loading,  error }] = useMutation(DELETE_WILDER, { refetchQueries: [GET_ALL_WILDERS]});
    if ( loading ) return <div>Loading...</div>;
    if (error) return <div>Error from delete wilder </div> ;

    return (<div className={styles.card}>
                { url ? <img src={`/${url}`} alt={`${name} Profile`}/> : <img src={tete} alt={`${name} Profile Avatar`}/>} 
                <h3>Name: <br/>{name} </h3>
                <h3>Location: <br/> {city}</h3>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <hr/>
                <>
                    <h4>Wild Skills 
                    </h4>
                    <Button id={id.toString()} variant="primary" onClick={handleShow}>
                        Add wilder skill
                    </Button> 
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Body>
                            <div>
                                <h1>Adding a new skill to {name}</h1>                                       
                                    <label htmlFor="Skill">Skill to add</label>
                                    <select name="Skill">
                                        { skillsData?.map( (skill: ISkillData) => <option value={skill.name}> {skill.name}</option> )}
                                    </select>

                                    <label htmlFor="Grade">Number of Grade (1-10):</label>
                                    <input type="number"  id="Grade" name="Grade" min="1" max="10"/>

                                    <div id={id.toString()}>
                                        <button type="submit">Submit</button>
                                    </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
                <ul>
                    {skills?.map( (skill: ISkill) => <li><Skill title={skill.title} votes={skill.votes}></Skill> </li>)}            
                </ul>
                <hr/>
                <button onClick={() => handleActif()}>{actif ? "cancel" : "update"}</button>
                {actif ? <Form nameW={name} cityW={city}  type="update" id={id} handleActif={handleActif}></Form> : null }
                <br/>
                <button onClick={ () => deleteWilder({ variables: { id } })}>Delete</button>
            </div>

          
        )}

export default WilderCard;