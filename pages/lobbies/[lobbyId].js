import React from "react";

export async function getServerSideProps(context) {
  const { lobbyId } = context.query;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/lobbies/${lobbyId}`
  );
  const lobby = await response.json();

  return { props: { lobby } };
}

export default function Lobbies({ lobby }) {
  return (
    <div>
      <main>
        <table>
          <thead>
            <tr>
              <th>Lobby Id</th>
              <th>Code</th>
              <th>Players list</th>
            </tr>
          </thead>
          <tbody>
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
            </tr>
          </tbody>
        </table>
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
