const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

// Routers
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);

const commentsRoute = require("./routes/Comments");
app.use("/comments", commentsRoute);

const userssRoute = require("./routes/Users");
app.use("/auth", userssRoute);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("el server anda en el 3001");
  });
});
