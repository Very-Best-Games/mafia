import { game } from "../game.js";
import { ROLE } from "../roles";

test("test whole game", () => {
  game.start();

  const players = [
    {
      name: "Player1",
      role: ROLE.CITIZEN,
      alive: true,
    },
    {
      name: "Player2",
      role: ROLE.CITIZEN,
      alive: true,
    },
    {
      name: "Player3",
      role: ROLE.CITIZEN,
      alive: true,
    },
    {
      name: "Player4",
      role: ROLE.CITIZEN,
      alive: true,
    },
    {
      name: "Player5",
      role: ROLE.CITIZEN,
      alive: true,
    },
    {
      name: "Player6",
      role: ROLE.CITIZEN,
      alive: true,
    },
    {
      name: "Mafia1",
      role: ROLE.MAFIA,
      alive: true,
    },
    {
      name: "Mafia2",
      role: ROLE.MAFIA,
      alive: true,
    },
  ];

  game.update({ players });

  const citizenVoteDay1 = {
    Player1: "Player2",
    Player2: "Player3",
    Player3: "Player2",
    Player4: "Player2",
    Player5: "Player4",
    Player6: "Player4",
    Mafia1: "Player4",
    Mafia2: "Player4",
  };

  game.update({ vote: citizenVoteDay1 });

  const mafiaVoteNight1 = {
    Mafia1: "Player2",
    Mafia2: "Player2",
  };

  game.update({ vote: mafiaVoteNight1 });

  const citizenVoteDay2 = {
    Player1: "Mafia1",
    Player3: "Mafia1",
    Player5: "Mafia1",
    Player6: "Mafia1",
    Mafia1: "Player6",
    Mafia2: "Player6",
  };

  game.update({ vote: citizenVoteDay2 });

  const mafiaVoteNight2 = {
    Mafia2: "Player6",
  };

  game.update({ vote: mafiaVoteNight2 });

  const citizenVoteDay3 = {
    Player1: "Player3",
    Player3: "Player1",
    Player5: "Player1",
    Mafia2: "Player1",
  };

  game.update({ vote: citizenVoteDay3 });

  const mafiaVoteNight3 = {
    Mafia2: "Player5",
  };

  game.update({ vote: mafiaVoteNight3 });

  const citizenVoteDay4 = {
    Player3: "Mafia2",
    Mafia2: "Player3",
  };

  game.update({ vote: citizenVoteDay4 });

  const actualAlivePlayers = game.players.filter((p) => p.alive);
  expect(game.winner).toEqual(ROLE.MAFIA);
  const mafiaPlayers = actualAlivePlayers.filter((p) => p.role === ROLE.MAFIA);
  expect(mafiaPlayers.length).toEqual(1);
  expect(mafiaPlayers[0].name).toEqual("Mafia2");
  const citizenPlayers = actualAlivePlayers.filter(
    (p) => p.role === ROLE.CITIZEN
  );
  expect(citizenPlayers.length).toEqual(1);
  expect(citizenPlayers[0].name).toEqual("Player3");
});
