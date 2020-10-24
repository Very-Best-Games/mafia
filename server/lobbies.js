import { nanoid } from "nanoid";
import { save, load } from "./persistence";
import { randomInt } from "./utils/random";

export const LOBBY_LIFESPAN = 15 * 60000; // 15min
export class Lobby {
  constructor({ id, players, code }) {
    this.id = id || nanoid();
    this.players = players || [];
    this.code = code || String(randomInt(1000, 9999));
    this.hit();
  }

  addPlayer(player) {
    this.players.push(player);

    // TODO temp disable
    // eslint-disable-next-line no-use-before-define
    save(lobbies);
    this.hit();
  }

  // every time this function is called, a new timeout is generated
  hit() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    // eslint-disable-next-line no-use-before-define
    this.timeoutId = setTimeout(() => deleteLobby(this.id), LOBBY_LIFESPAN);
  }

  toJSON() {
    return {
      id: this.id,
      players: this.players,
      code: this.code,
    };
  }
}

export const lobbies = load().map((lobbyData) => new Lobby(lobbyData));

export const getAllLobbies = () => {
  return lobbies;
};

export const getLobbyById = (id) => {
  return lobbies.find((lobby) => lobby.id === id);
};

export const getLobbyByCode = (code) => {
  return lobbies.find((lobby) => lobby.code === code);
};

export const addLobby = (lobbyData) => {
  const lobby = new Lobby(lobbyData);
  lobbies.push(lobby);

  save(lobbies);

  return lobby;
};

export const deleteLobby = (id) => {
  console.log("Deleting Lobby", id);
  const lobby = lobbies.findIndex((item) => item.id === id);
  if (lobby > -1) {
    lobbies.splice(lobby, 1);
    save(lobbies);
    return true;
  }
  return "Not found";
};
