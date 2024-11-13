import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import colorfulMorganFormat from "./utils/morgan";
import { DB_CONNECTION_URL, DEFAULT_CONNECTION_URL, PORT } from "./const/env";
import usersRouter from "./routes/userRouter";
import authRouter from "./routes/authRouter";
import registerRouter from "./routes/registerRouter";
import characterRouter from "./routes/characterRouter";

export async function startExpressServer() {
    const app: Express = express();

    if (!DB_CONNECTION_URL) {
        console.error(`\x1b[31mDB_CONNECTION_URL is not defined, go to .env file and define it.
        You can try using ${DEFAULT_CONNECTION_URL}.\x1b[0m`);
        return;
    }
    await mongoose.connect(DB_CONNECTION_URL, {});

    app.use(express.json());
    app.use(cors());
    app.use(morgan(colorfulMorganFormat));
    app.get("/", (req: Request, res: Response) => {
        res.send("Alive!");
    });

    app.use("/user", usersRouter);
    app.use("/login", authRouter);
    app.use("/", registerRouter);
    app.use("/char", characterRouter);

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}
