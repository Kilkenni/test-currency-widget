//import propTypes from "prop-types";

import styles from "./CurrencyHeader.module.css";

const CurrencyHeader = ({children}) => {
    return (
        <header className={styles.header}>
            Курси валют Національного Банка України
            {children}
        </header>
    );
}

CurrencyHeader.propTypes = {

}

export default CurrencyHeader;