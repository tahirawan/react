import AddressList from "./components/AddressList.jsx";
import MainHeader from "./components/MainHeader.jsx";
import {useState} from "react";

function App() {
    const [modelIsVisible, setModelIsVisible] = useState(false)

    function hideModalHandler() {
        setModelIsVisible(false)
    }

    function showModalHandler() {
        setModelIsVisible(true)
    }
    return (
        <>
            <MainHeader onCreateAddress={showModalHandler}/>
            <main>
                <AddressList
                    onShowModal={modelIsVisible}
                    onHideModal={hideModalHandler}
                    onCreateAddress={showModalHandler}
                />
            </main>
        </>
    );
}

export default App;
