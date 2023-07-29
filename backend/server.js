const express = require("express");
// const notes = require("./data/notes.js");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const userRoutes = require("./routes/userRoutes.js");
const noteRoutes = require("./routes/noteRoutes.js");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware.js");
const cors = require("cors");
const app = express();
dotenv.config();
connectDB();
app.use(express.json());
app.use(cors());
// cors({ credentials: true, origin: "*" });
app.options("*", cors());
app.get("/", (req, res) => {
  res.send("API is running..");
});

// app.get("/api/notes", (req, res) => {
//   res.json(notes);
// });

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

app.use(notFound);
app.use(errorHandler);

// app.get("/api/notes/:id", (req, res) => {
//   const note = notes.find((n) => n._id === req.params.id);

//   res.send(note);
// });

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
