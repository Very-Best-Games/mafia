export const generatePlayers = (count) => {
  return new Array(count).fill().map((_, i) => ({
    name: `Player${count}`,
  }));
};
