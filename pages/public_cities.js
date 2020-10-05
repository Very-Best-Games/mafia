import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export async function getServerSideProps() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/lobbies`);
  const lobbies = await response.json();

  return { props: { lobbies } };
}

export default function Home({ lobbies }) {
  const [lobbiesSaved, setLobbies] = useState(lobbies);
  const router = useRouter();

  return (
    <div className="container">
      <main>
        <h1 className="title">
          <p>Train to</p>
        </h1>

        <p className="description">Choose your destination.</p>

        <ul>
          {lobbiesSaved.map((lobby) => (
            <li key={lobby.id}>
              <span>
                <Link href="/[lobbyId]" as={`/${lobby.id}`}>
                  <a>{lobby.id}</a>
                </Link>
              </span>
              <ul>
                {lobby.players.map((playerId) => (
                  <li key={playerId}>{playerId}</li>
                ))}
              </ul>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const response = await fetch(
                    `${process.env.NEXT_PUBLIC_HOST}/api/lobbies/${lobby.id}`,
                    {
                      method: "POST",
                    }
                  );
                  console.log("here 2");
                  const lobbyFromServer = await response.json();
                  const index = lobbiesSaved.findIndex(
                    (l) => l.id === lobbyFromServer.id
                  );
                  setLobbies(
                    lobbiesSaved.map((item, i) => {
                      if (i === index) {
                        return lobbyFromServer;
                      }

                      return item;
                    })
                  );
                }}
              >
                <button type="submit">Join</button>
              </form>
            </li>
          ))}
        </ul>

        <button type="button" onClick={() => router.back()}>
          Click here to go back
        </button>
      </main>
    </div>
  );
}
