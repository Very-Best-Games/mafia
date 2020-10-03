import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const hostNewGame = async () => {
    const response = await fetch("http://localhost:3000/api/lobbies", {
      method: "POST",
    });
    const lobby = await response.json();

    // TODO return or await or nothing?
    router.push(`/lobbies/${lobby.id}`);
  };

  const joinGame = async (e) => {
    e.preventDefault();

    const code = e.target.code.value;

    const response = await fetch(`http://localhost:3000/api/lobbies/join`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });
    if (response.status === 200) {
      const lobbyFromServer = await response.json();

      // TODO return or await or nothing?
      router.push(`/lobbies/${lobbyFromServer.id}`);
    } else {
      console.log(response.status, await response.text());
    }
  };

  return (
    <div className="container">
      <Head>
        <title>Very Best Mafia</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          <p>Welcome to The Mafia World!</p>
        </h1>

        <p className="description">
          Choose your Mafia city or create a new one.
        </p>

        <div className="grid">
          <button
            type="button"
            className="card host-new-game"
            onClick={hostNewGame}
          >
            <h3>Create a city &rarr;</h3>
            <p>
              You can create your own city and establish your own rules in it.
            </p>
          </button>

          <a className="card" href="/public_cities">
            <h3>[TODO] Join public city &rarr;</h3>
            <p>You are welcome to any public city in the Mafia world.</p>
          </a>

          <form onSubmit={joinGame} className="card">
            <h3>Join private city &rarr;</h3>
            <p>
              If you have an invitation ticket to a city, you can join a private
              city.
            </p>

            <input type="text" name="code" />
            <button type="submit">Join</button>
          </form>
        </div>
      </main>

      <footer>
        <a
          href="https://github.com/Very-Best-Games"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by VeryBestGames
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title {
          text-align: center;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>
    </div>
  );
}
