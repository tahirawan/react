import classes from './Address.module.css';
function Address({address}) {
    return (
        <li className={classes.address}>
            <p className={ classes.author }>Line 1: { address.line1 }</p>
            <p className={ classes.author }>Line 2: { address.line2 }</p>
            <p className={ classes.author }>County: { address.county }</p>
            <p className={ classes.author }>City: { address.city }</p>
            <p className={ classes.author }>Postcode: { address.postcode }</p>
            <p className={ classes.author }>Country: { address.country_id }</p>
        </li>
    );
}

export default Address;
