import { MdLocationOn, MdLocationCity } from 'react-icons/md';

import classes from './MainHeader.module.css';

function MainHeader({ onCreateAddress }) {
    return (
        <header className={classes.header}>
            <h1 className={classes.logo}>
                <MdLocationCity />
                Address
            </h1>
            <p>
                <button
                    className={classes.button}
                    onClick={onCreateAddress}>
                    <MdLocationOn size={18} />
                    New Address
                </button>
            </p>
        </header>
    );
}

export default MainHeader;
