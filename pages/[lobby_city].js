import React, { useState } from "react";
import { useRouter } from 'next/router';
import { deleteLobby, getLobbyById } from "../server/lobbies";

export async function getServerSideProps() {
  const response = await fetch(`http://localhost:3000/api/lobbies/`);
  const lobbies = await response.json();
  const router = useRouter()
  const lobbyId = router.query.id;

  return { props: { lobbyId } };
}

export default function LobbyId({ lobbyId }) {
  //const [lobbiesSaved, setLobbies] = useState(lobbyId);
  //const lobby = getLobbyById(lobbyId);

  if (!lobbyId) return <p></p>
  return (
    <div className="container">
        
        <h1 className="title">
            <p>Welcome to the city! ${lobbyId}</p>
        </h1>

        <p className="description">
            Citizens:
        </p>

        <ul>
            <image scr='./public/scr/citizen1.jpg'></image>
        </ul>

        
        <a
        onClick={async () => {
          const response = await fetch("http://localhost:3000/api/lobbies", {
            method: "DELETE",
          });
          const lobby = await response.json();
          setLobbies(lobbiesSaved.concat(lobby));
          const router = useRouter();
          router.push(`/${lobby.id}`)
        }}
        >
            <h3>Create a city &rarr;</h3>
            <p>You can create your own city and establish your own rules in it.</p>
        </a>
        
        
        <span 
            onClick={() => 
            router.back()}
        >
            Click here to go back
        </span> 
    </div>
  )
}
