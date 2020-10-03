import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import next from "next";
import sessionFileStore from "session-file-store";
// https://github.com/expressjs/morgan/issues/190
import morgan from "morgan";

import { getPlayerById, addPlayer } from "./players";

const port = parseInt(process.env.PORT, 10) || 3000;

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const server = express();

  const FileStore = sessionFileStore(session);
  const fileStoreOptions = {
    path: path.resolve(__dirname, "../file-db/sessions"),
  };

  server.use(morgan("tiny"));
  server.set("trust proxy", 1);

  server.use(cookieParser());

  server.use(
    session({
      secret: "TheBestGameEver",
      store: new FileStore(fileStoreOptions),
      resave: false,
      saveUninitialized: true,
    })
  );

  server.all((req, res, nextHandler) => {
    const player = getPlayerById(req.session.id);

    if (!player) {
      addPlayer(req.session.id);
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
