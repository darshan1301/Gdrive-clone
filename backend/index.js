const express = require("express");
require("dotenv").config();
const cors = require("cors");
const fileRouter = require("./routes/fileRoute.js");
const folderRouter = require("./routes/folderRoute.js");
const userRouter = require("./routes/userRoute.js");
const bodyParser = require("body-parser");

const { connectMongoDB } = require("./db.js");

const app = express();
connectMongoDB();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT;

///// ROUTES  /////
app.use("/user", userRouter);
app.use("/folder", folderRouter);
app.use("/file", fileRouter);

app.get("/", (req, res) => {
  res.send("Hello server");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
