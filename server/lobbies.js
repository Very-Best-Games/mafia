import { nanoid } from "nanoid";
import { save, load } from "./persistence";
import { randomInt } from "./utils/random";

export class Lobby {
  constructor({ id, players, code }) {
    this.id = id || nanoid();
    this.players = players || [];
    this.code = code || randomInt(1000, 9999);
  }

  addPlayer(player) {
    this.players.push(player);

    save(lobbies);
  }
}

export const lobbies = load().map((lobbyData) => new Lobby(lobbyData));

export const getAllLobbies = () => {
  return lobbies;
};

export const getLobbyById = (id) => {
  return lobbies.find((lobby) => lobby.id === id);
};

export const addLobby = (lobbyData) => {
  let lobby = new Lobby(lobbyData);
  lobbies.push(lobby);

  save(lobbies);

  return lobby;
};
