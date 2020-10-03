import { getLobbyByCode } from "../../../server/lobbies";

export default (req, res) => {
  if (req.method !== "PUT") {
    return res.sendStatus(404);
  }

  const { code } = req.body;

  if (!code) {
    return res.sendStatus(400);
  }

  const lobby = getLobbyByCode(code);
  if (!lobby) {
    return res.sendStatus(404);
  }

  const playerId = req.session.id;
  if (!lobby.players.includes(playerId)) {
    lobby.addPlayer(playerId);
  }
  return res.json({ id: lobby.id });
};
