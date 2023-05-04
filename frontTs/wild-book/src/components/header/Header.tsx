import styles from "./Header.module.css";
import {IHeader} from "../../utils/interface";

const Header = ({title}:IHeader) => {

    return (<div className={styles.header}>
                <div>
                    <h1> {title} </h1>
                </div>
        </div>
)}

export default Header;