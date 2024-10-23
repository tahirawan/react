import { useState, useRef } from "react";

export default function Player() {
    const player = useRef();
    const [playerName, setPlayerName] = useState('');

    function onSubmitted() {
        setPlayerName(player.current.value);
        player.current.value = '';
    }

    return (
        <section id="player">
            <h2>Welcome { playerName ?? 'unknown entity' }</h2>
            <p>
                <input
                    ref={player}
                    type="text"
                />
                <button onClick={onSubmitted}>Set Name</button>
            </p>
        </section>
    );
}
