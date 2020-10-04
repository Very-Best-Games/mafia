import { nanoid } from "nanoid";
import { save, load } from "./persistence";
import { randomInt } from "./utils/random";

const LOBBY_TIMESPAN = 10000 // 30s
export class Lobby {
  constructor({ id, players, code }) {
    this.id = id || nanoid();
    this.players = players || [];
	this.code = code || String(randomInt(1000, 9999));
	this.expirationId = 0
	this.hit()
  }

  addPlayer(player) {
    this.players.push(player);

    // TODO temp disable
    // eslint-disable-next-line no-use-before-define
    save(lobbies);
    this.hit()
  }

  // every time this function is called, a new timeout is generated
  hit() {
    this.expirationId++
    setTimeout(() => this.expire(this.expirationId), LOBBY_TIMESPAN)
  }

  expire(expireId) {
    if (expireId == this.expirationId) deleteLobby(this.id)
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
  console.log("Deleting Lobby", id)
  const lobby = lobbies.find((item) => item.id === id);
  if (lobby) {
    lobbies.splice(lobby);
    save(lobbies);
    return true;
  }
  return "Not found";
};
