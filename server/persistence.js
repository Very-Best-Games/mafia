import fs from "fs";
import path from "path";

export const save = (data) => {
  fs.writeFileSync(
    path.resolve("./file-db/lobbies.json"),
    JSON.stringify(data)
  );
};

export const load = () => {
  return JSON.parse(fs.readFileSync(path.resolve("./file-db/lobbies.json")));
};

export const savePlayers = (data) => {
  fs.writeFileSync("./file-db/sessions.json", JSON.stringify(data));
};

export const loadPlayers = () => {
  return JSON.parse(fs.readFileSync("./file-db/sessions.json"));
};
