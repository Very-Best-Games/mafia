import { addLobby, LOBBY_LIFESPAN } from "../lobbies";

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

      const spliceFn = jest.spyOn(Array.prototype, "splice");
      jest.advanceTimersByTime(LOBBY_LIFESPAN);
      expect(spliceFn).toHaveBeenCalled();
    });

    it("shouldn't be deleted after 15min if players list changes in the middle", () => {
      const lobbyData = {
        id: "rcxxx5t3Zzpcj0TZxmYsM",
        players: ["2VDBVQ-6MD2F1rWJXdgyBodBp0YjAY88"],
        code: "7025",
      };
      const lobby = addLobby(lobbyData);
      const spliceFn = jest.spyOn(Array.prototype, "splice");

      jest.advanceTimersByTime(LOBBY_LIFESPAN / 2);
      lobby.addPlayer("2VDBVQ-6MD2F1rWJXdgyBodBp0YjAY89"); // change player list in the middle
      jest.advanceTimersByTime(LOBBY_LIFESPAN / 2);

      expect(spliceFn).not.toHaveBeenCalled(); // did not call 15min after creation event

      jest.advanceTimersByTime(LOBBY_LIFESPAN / 2);

      expect(spliceFn).toHaveBeenCalled(); // did call 15min after player addition
    });

    afterEach(() => {
      jest.runOnlyPendingTimers();
      jest.clearAllMocks();
    });
  });
});
