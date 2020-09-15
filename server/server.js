import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import path from "path";
// https://github.com/expressjs/morgan/issues/190
import morgan from "morgan";
import next from "next";

import { getAllPlayers, getPlayerById, addPlayer } from "./players";

const port = parseInt(process.env.PORT, 10) || 3000;

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const server = express();

  var FileStore = require("session-file-store")(session);
  var fileStoreOptions = {};

  server.use(morgan("tiny"));
  server.set("trust proxy", 1);

  server.use(cookieParser());
  console.log("cookie parser");

  server.use(
    session({
      secret: "TheBestGameEver",
      store: new FileStore(fileStoreOptions),
      resave: false,
      saveUninitialized: true,
    })
  );
  console.log("session set");

  server.all((req, res, nextHandler) => {
    console.log("in main", req.session.id);
    const player = getPlayerById(req.session.id);
    console.log(player);

    if (player) {
      console.log("users session found.", req.session.id);
      console.log("All users:", getAllPlayers());
    } else {
      console.log("users session not found.");
      addPlayer(req.session.id);
      console.log("All users:", getAllPlayers());
    }

    nextHandler();
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
