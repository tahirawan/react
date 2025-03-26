import {useState} from "react";

import classes from './NewAddress.module.css';

function NewAddress({ onAddAddress, onCancel }) {

    const [enteredLine1, setEnteredLine1] = useState('')
    const [enteredLine2, setEnteredLine2] = useState('')
    const [enteredCounty, setEnteredCounty] = useState('')
    const [enteredCity, setEnteredCity] = useState('')
    const [enteredPostcode, setEnteredPostcode] = useState('')
    const [enteredCountryId, setEnteredCountryId] = useState('')

    function changeLine1Handler(event) {
        setEnteredLine1(event.target.value);
    }
    function changeLine2Handler(event) {
        setEnteredLine2(event.target.value);
    }
    function changeCountyHandler(event) {
        setEnteredCounty(event.target.value);
    }
    function changeCityHandler(event) {
        setEnteredCity(event.target.value);
    }
    function changePostCodeHandler(event) {
        setEnteredPostcode(event.target.value);
    }
    function changeCountryIdHandler(event) {
        setEnteredCountryId(event.target.value);
    }

    function submitAddress(event) {
        event.preventDefault();

        const addressData = {
            line1: event.target.line1.value,
            line2: event.target.line2.value,
            county: event.target.county.value,
            city: event.target.city.value,
            postcode: event.target.postcode.value,
            country_id: event.target.countryId.value,
        }

        //submitting a post
        onAddAddress(addressData);

        //closing the form
        onCancel();
    }

    return (
        <form className={classes.form} onSubmit={submitAddress}>
            <p className={classes.header}>New address</p>
            <p>
                <label htmlFor="line1">Line 1</label>
                <input id="line1" required onChange={changeLine1Handler}/>
            </p>

            <p>
                <label htmlFor="line2">Line 2</label>
                <input id="line2" value="Line 2" required onChange={changeLine2Handler}/>
            </p>

            <p>
                <label htmlFor="county">County</label>
                <input id="county" value="County" required onChange={changeCountyHandler}/>
            </p>

            <p>
                <label htmlFor="city">City</label>
                <input id="city" value="City" required onChange={changeCityHandler}/>
            </p>
            <p>
                <label htmlFor="postcode">Postcode</label>
                <input id="postcode" value="Postcode" required onChange={changePostCodeHandler}/>
            </p>
            <p>
                <label htmlFor="countryId">Country</label>
                <select id="countryId" value="3" required onChange={changeCountryIdHandler}>
                    <option value="1">Italy</option>
                    <option value="2">Pakistan</option>
                    <option value="3">United Kingdom</option>
                </select>
            </p>

            <p className={classes.actions}>
                <button type="button" onClick={onCancel}>Cancel</button>
                <button>Submit</button>
            </p>
        </form>
    );
}

export default NewAddress;
