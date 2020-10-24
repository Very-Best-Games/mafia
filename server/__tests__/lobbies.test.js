import { addLobby, getAllLobbies, LOBBY_LIFESPAN } from "../lobbies";

// Mock persistence so DB doesn't change during tests
jest.mock("../persistence", () => ({
  save: jest.fn(),
  load: jest.fn(() => []),
}));

describe("Lobby actions", () => {
  describe("Lobby expiration", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it("should be deleted after 15min of inactivity", () => {
      const lobbyData = {
        id: "rbbfJ5t3Zzpcj0TZxmYsM",
        players: ["2VDBVQ-6MD2F1rWJXdgyBodBp0YjAY88"],
        code: "7025",
      };
      addLobby(lobbyData);

      jest.advanceTimersByTime(LOBBY_LIFESPAN);
      expect(getAllLobbies()).toHaveLength(0);
    });

    it("shouldn't be deleted after 15min if players list changes in the middle", () => {
      const lobbyData = {
        id: "rcxxx5t3Zzpcj0TZxmYsM",
        players: ["2VDBVQ-6MD2F1rWJXdgyBodBp0YjAY88"],
        code: "7025",
      };
      const lobby = addLobby(lobbyData);

      jest.advanceTimersByTime(LOBBY_LIFESPAN / 2);
      lobby.addPlayer("2VDBVQ-6MD2F1rWJXdgyBodBp0YjAY89"); // change player list in the mean time
      jest.advanceTimersByTime(LOBBY_LIFESPAN / 2);

      expect(getAllLobbies()).toContain(lobby); // did not delete 15min after creation event

      jest.advanceTimersByTime(LOBBY_LIFESPAN / 2);

      expect(getAllLobbies()).toHaveLength(0); // did delete 15min after player addition
    });

    it("should only delete one lobby", () => {
      const lobbyData1 = {
        id: "firstLobbyDataInHere",
        players: ["2VDBVQ-6MD2F1rWJXdgyBodBp0YjAY88"],
        code: "1111",
      };
      const lobby1 = addLobby(lobbyData1);
      expect(getAllLobbies()).toHaveLength(1);

      jest.advanceTimersByTime(LOBBY_LIFESPAN / 2);
      const lobbyData2 = {
        id: "secondLobbyDataInHere",
        players: ["2VDBVQ-6MD2F1rWJXdgyBodBp0YjAY88"],
        code: "2222",
      };
      const lobby2 = addLobby(lobbyData2);
      expect(getAllLobbies()).toHaveLength(2);

      jest.advanceTimersByTime(LOBBY_LIFESPAN / 2);

      expect(getAllLobbies()).toHaveLength(1);
      expect(getAllLobbies()).not.toContain(lobby1);
      expect(getAllLobbies()).toContain(lobby2); // deleted lobby1 but not lobby2
    });

    afterEach(() => {
      jest.runOnlyPendingTimers();
      jest.clearAllMocks();
    });
  });
});
