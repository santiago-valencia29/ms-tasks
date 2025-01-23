import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/task.routes";

dotenv.config();

// Initializations
const app = express();

// Settings
app.set("port", process.env.PORT || 3000);


//middlewares
app.use(morgan("dev"));
app.use(cors({ origin: "http://localhost:4200" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.get("/", (req, res) => {
    res.send(`The MicroService Tasks is running on port ${app.get("port")}`);
});

app.use("/ms/task", taskRoutes);
// app.use("/ms/auth", specialRoutes);

export default app;