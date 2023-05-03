import tete from "../../assets/tete.png";
import { useEffect, useState } from "react";
import Skill from "../../components/skill/Skill";
import styles from "./WilderCard.module.css";
import Form from "../../components/form/Form";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";

const WilderCard = ({id, name , city, skill, onDelete , fetchData, skillsData}) => {

    const [actif, setActif] = useState(false);
    const handleActif = () => {
        setActif(!actif);
        };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        fetchData();
    }, [] );

    console.log(city)
    return (<div className={styles.card}>
                <img src={tete} alt={`${name} Profile`}/>
                <h3>{name}</h3>
                <h3>Location :{city}</h3>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                    enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat.
                </p>
                <hr/>
                <>
                    <h4>Wild Skills 
                    </h4>
                    <Button id={id} variant="primary" onClick={handleShow}>
                        Add wilder skill
                    </Button> 
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Body>
                            <div>
                                <h1>Adding a new skill to {name}</h1>
                                <form 
                                    onSubmit = { (e) => {
                                       const skillName = e.target.elements.Skill.value ;
                                       const grade =e.target.elements.Grade.value;
                                        console.log(grade, skillName, name)
                                        e.preventDefault();
                                        axios.post(`http://localhost:5000/api/Grade`, {  
                                            grade: grade,
                                            skill: skillName,
                                            wilder: name,
                                            })
                                            .then((response) => {
                                                fetchData();
                                                handleClose();
                                            }).catch((error) => {
                                                console.error(error);
                                            })
                                        }
                                    }
                                >
                                    <select name="Skill">
                                        {skillsData.Skill?.map( (skill) => <option value={skill.name}> {skill.name}</option> )}
                                    
                                    </select>
                                    <label for="Grade">Number of Grade (1-10):</label>
                                    <input type="number"  id="Grade" name="Grade" min="1" max="10" />
                                    <div id={id}>
                                        <button type="submit">Submit</button>
                                    </div>
                                </form>
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
                    {skill?.map( (skill) => <li><Skill name={skill.title} votes={skill.votes}></Skill> </li>)}            
                </ul>
                <hr/>
                <button onClick={() => handleActif()}>{actif ? "cancel" : "update"}</button>
                {actif ? <Form nameW={name} cityW={city} fetchData={ fetchData } type="update" id={id} handleActif={handleActif}></Form> : null }
                <br/>
                <button onClick={() => onDelete(id) } >Delete</button>
            </div>

          
        )}

export default WilderCard;