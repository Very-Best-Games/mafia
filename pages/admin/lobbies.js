import React, { useState } from "react";
import Head from "next/head";

export async function getServerSideProps() {
  const response = await fetch(`http://localhost:3000/api/lobbies`);
  const lobbies = await response.json();

  return { props: { lobbies } };
}

export default function Lobbies({ lobbies }) {
  const [lobbiesSaved, setLobbies] = useState(lobbies);

  const hostNewGame = async () => {
    const response = await fetch("http://localhost:3000/api/lobbies", {
      method: "POST",
    });
    const lobby = await response.json();
    setLobbies(lobbiesSaved.concat(lobby));
  };

  const joinGame = (lobby) => async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:3000/api/lobbies/${lobby.id}`,
      {
        method: "POST",
      }
    );
    const lobbyFromServer = await response.json();
    const index = lobbiesSaved.findIndex((l) => l.id === lobbyFromServer.id);
    setLobbies(
      lobbiesSaved.map((item, i) => {
        if (i === index) {
          return lobbyFromServer;
        }

        return item;
      })
    );
  };

  return (
    <div>
      <Head>
        <title>Lobbies list</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Lobbies list</h1>

        <table>
          <thead>
            <tr>
              <th>Lobby Id</th>
              <th>Code</th>
              <th>Players list</th>
              <th>Join</th>
            </tr>
          </thead>
          <tbody>
            {lobbiesSaved.map((lobby) => (
              <tr key={lobby.id}>
                <td>{lobby.id}</td>
                <td>{lobby.code}</td>
                <td>
                  <ul>
                    {lobby.players.map((playerId) => (
                      <li key={playerId}>{playerId}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  <button type="button" onClick={joinGame(lobby)}>
                    Join
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button type="button" className="host-new-game" onClick={hostNewGame}>
          Host a new game
        </button>
      </main>

      <style jsx>{`
        main {
          padding: 1rem;
        }

        table {
          margin-top: 1rem;
          border: solid thin;
          border-collapse: collapse;
        }

        table th,
        table td {
          border: solid thin;
          padding: 0.5rem;
        }

        table th {
          font-weight: normal;
          vertical-align: middle;
          text-align: center;
        }

        button.host-new-game {
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
}
