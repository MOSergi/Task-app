import dotenv from "dotenv";
dotenv.config();
import { Server } from "./Server/server";

const app = new Server();

app.startApp();
app.listen();