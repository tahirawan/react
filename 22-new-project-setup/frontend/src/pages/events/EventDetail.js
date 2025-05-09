import {Await, redirect, useRouteLoaderData} from "react-router-dom";
import EventItem from "../../components/EventItem";
import {Suspense} from "react";
import EventsList from "../../components/EventsList";

function EventDetailPage() {
    const {event, events} = useRouteLoaderData('event-detail');

    return (
        <>
            <Suspense fallback={<p>Loading event...</p>}>
                <Await resolve={event}>
                    {(loadedEvent) => <EventItem event={loadedEvent}/>}
                </Await>
            </Suspense>

            <Suspense fallback={<p>Loading all events...</p>}>
                <Await resolve={events}>
                    {(loadedEvents) => <EventsList events={loadedEvents}/>}
                </Await>
            </Suspense>
        </>
    );
}

export default EventDetailPage;

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

async function loadEvent(eventId) {
    const response = await fetch('http://localhost:8080/events/' + eventId);

    if (!response.ok) {
        throw new Response(
            JSON.stringify({message: 'Could not fetch events details.',}),
            {status: 500}
        );
    }

    // return response;
    const resData = await response.json();
    return resData.event;
}

export async function loader({request, params}) {
    const eventId = params.id;

    return {
        event: await loadEvent(eventId),
        events: loadEvents(),
    }
}

export async function action({request, params}) {
    const eventId = params.id;
    const response = await fetch('http://localhost:8080/events/' + eventId, {
        method: request.method,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Response(
            JSON.stringify({message: 'Could not delete event.',}),
            {status: 500}
        );
    }

    return redirect('/events');
}
