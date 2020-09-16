import { addLobby, getAllLobbies } from "../../../server/lobbies";

export default (req, res) => {
  if (req.method === "POST") {
    return res.json(addLobby({ players: [req.session.id] }));
  }
  if (req.method === "GET") {
    return res.json(getAllLobbies());
  }
  return res.sendStatus(404);
};
