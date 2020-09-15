import { day } from "./day";

export const lobby = {
  enter: () => {
    console.log("lobby");
  },
  update: (gameInstance, { players }) => {
    if (players) {
      gameInstance.players = players;
      console.log("All players set:");
      gameInstance.printAlivePlayers(gameInstance.players);
      gameInstance.changeState(day);
    }
  },
  exit: () => {},
};
