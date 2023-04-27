import styles from "./Header.module.css";

const Header = ({title}) => {

    return (<div className={styles.header}>
                <div>
                    <h1> {title} </h1>
                </div>
        </div>
)}

export default Header;