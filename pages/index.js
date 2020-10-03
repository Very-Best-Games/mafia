import React, { useState } from "react";
import Head from "next/head"
import { useRouter } from 'next/router';

export async function getServerSideProps() {
  const response = await fetch(`http://localhost:3000/api/lobbies`);
  const lobbies = await response.json();

  return { props: { lobbies } };
}

export default function Home({ lobbies }) {
  const [lobbiesSaved, setLobbies] = useState(lobbies);

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
          <a className="card"
          onClick={async () => {
            const response = await fetch("http://localhost:3000/api/lobbies", {
              method: "POST",
            });
            const lobby = await response.json();
            setLobbies(lobbiesSaved.concat(lobby));
            const router = useRouter();
            router.push(`/${lobby.id}`);

          }}
          >
              <h3>Create a city &rarr;</h3>
              <p>You can create your own city and establish your own rules in it.</p>
          </a>

          <a className="card"
            href='/public_cities'
          >
              <h3>Join public city &rarr;</h3>
              <p>You are welcome to any public city in the Mafia world.</p>
          </a>

          <a className="card"
          onClick={async () => {
            const response = await fetch("http://localhost:3000/api/lobbies", {
              method: "POST",
            });
            const lobby = await response.json();
            setLobbies(lobbiesSaved.concat(lobby));
          }}
          >
              <h3>Join private city &rarr;</h3>
              <p>If you have an invitation ticket to a city, you can join a private city.</p>
          </a>
          
        </div>
      </main>

      <footer>
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by VeryBestGames
        </a>
      </footer>

    </div>
  );
}
