import { addLobby, getAllLobbies } from "../../../server/lobbies";

export default (req, res) => {
  if (req.method === "POST") {
    return res.json(addLobby({ players: [req.session.id] }));
  } else if (req.method === "GET") {
    return res.json(getAllLobbies());
  } else {
    return res.sendStatus(404);
  }
};
