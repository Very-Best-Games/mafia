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

        <div className="public_city">
          <ul className="city">
            {lobbiesSaved.map((lobby) => (
              <li key={lobby.id}>
                <span>
                  <Link href="/lobbies/[lobbyId]" as={`/lobbies/${lobby.id}`}>
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
                  <Link href="/lobbies/[lobbyId]" as={`/lobbies/${lobby.id}`}>
                    <button type="submit">Join</button>
                  </Link>
                </form>
              </li>
            ))}
          </ul>
        </div>

        <button type="button" onClick={() => router.back()}>
          Click here to go back
        </button>
      </main>
    </div>
  );
}
