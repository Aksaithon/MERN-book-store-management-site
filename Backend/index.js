import express, { response } from "express";
import { PORT, mongoDB_URL } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
import booksRouter from "./routes/BooksRouter.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for allowing cross-origin requests
// Option 1: Allow all origins with default cors(*)
app.use(cors());

// Allow custom origins
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "PUT", "POST", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to MERN stack tutorial!");
});

app.use("/books", booksRouter);

mongoose
  .connect(mongoDB_URL)
  .then(() => {
    console.log("App connetcted to database");

    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
