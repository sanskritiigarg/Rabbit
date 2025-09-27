import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectdb from "./config/db.js"

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();
const PORT = process.env.PORT || 3000;

connectdb();

app.get("/", (req,res) => {
  res.send("WELCOME TO RABBIT API!");
});

//API ROUTES
import userRoutes from "./routes/user.routes.js"

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});