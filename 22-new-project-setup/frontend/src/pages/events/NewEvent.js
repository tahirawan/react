import {redirect, useActionData, useParams} from "react-router-dom";
import EventForm from "../../components/EventForm";

function NewEventPage() {
    const event = useActionData();
    return (
        <>
            <EventForm method="post" />
        </>
    );
}

export default NewEventPage;

