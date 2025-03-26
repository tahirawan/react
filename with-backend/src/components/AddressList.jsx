import NewAddress from "./NewAddress.jsx";
import Modal from "./Modal.jsx";
import {useEffect, useState} from "react";
import Address from "./Address.jsx";

import classes from './AddressList.module.css';

function AddressList({onShowModal, onCreateAddress, onHideModal}) {

    const [addresses, setAddresses] = useState([])
    const [isFetching, setIsFetching] = useState(false)

    useEffect(() => {
        async function fetchAddresses(){
            setIsFetching(true);
            await fetch('http://localhost/api/addresses', {})
                .then(response => response.json())
                .then(data => {
                    setAddresses(data.data);
                    setIsFetching(false)
                })
        }

        fetchAddresses();
    }, []);

    function addAddressHandler(addressData) {
        console.log(addressData);
        fetch('http://localhost/api/addresses', {
            method: 'POST',
            body: JSON.stringify(addressData),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        setAddresses((existingAddress) => [addressData, ...existingAddress])
    }

    return (
        <>
            {onShowModal && (
                <Modal onClose={onHideModal}>
                    <NewAddress
                        onAddAddress={addAddressHandler}
                        onCancel={onHideModal}
                    />
                </Modal>
            )}

            {!isFetching && addresses.length > 0 && (
                <ul className={classes.addresses}>
                    {addresses.map((address) => <Address
                            key={Math.random()}
                            address={address}
                        />
                    )}
                </ul>
            )}

            {!isFetching && addresses.length === 0 && (
                <div style={{textAlign: 'center'}}>
                    <h2>There are no address yet</h2>
                    <p>
                        <button className={classes.button} onClick={onCreateAddress}>
                            Start adding them
                        </button>
                    </p>
                </div>
            )}

            {isFetching && (
                <div style={{textAlign: 'center'}}>
                    <p>Loading addresses...</p>
                </div>
            )}
        </>
    );
}

export default AddressList;
