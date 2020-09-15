import fs from "fs";
import path from "path";

export const save = (data) => {
  fs.writeFileSync(path.resolve("./server/lobbies.json"), JSON.stringify(data));
};

export const load = () => {
  return JSON.parse(fs.readFileSync(path.resolve("./server/lobbies.json")));
};

export const savePlayers = (data) => {
  fs.writeFileSync("./server/sessions.json", JSON.stringify(data));
};

export const loadPlayers = () => {
  return JSON.parse(fs.readFileSync("./server/sessions.json"));
};
