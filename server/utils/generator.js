export const generatePlayers = (count) => {
  return new Array(count).fill().map(() => ({
    name: `Player${count}`,
  }));
};
