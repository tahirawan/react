import {Suspense} from "react";
import {useLoaderData, Await} from "react-router-dom";
import EventsList from "../../components/EventsList";

function EventsPage() {
    const { events } = useLoaderData();

    // if (data.isError) {
    //     return <p>{data.message}</p>;
    // }
    //
    // const events = data.events;

    return (
        <>
            <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
                <Await resolve={events}>
                    {(loadedEvents) => <EventsList events={loadedEvents}/>}
                </Await>
            </Suspense>
        </>
    );
}

export default EventsPage;

async function loadEvents() {
    const response = await fetch('http://localhost:8080/events')
    if (!response.ok) {
        // return { isError: true, message: 'Could not fetch events.' };
        throw new Response(
            JSON.stringify({message: 'Could not fetch events.',}),
            {status: 500}
        );

        /*throw json(
            { message: 'Could not fetch events.' },
            { status: 500 }
        );*/
    }
    const resData = await response.json();
    return resData.events;
    // return response;
}

export function loader() {
    return {
        events: loadEvents()
    }
}
