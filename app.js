require("dotenv").config();
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const cors = require("cors");

// Routes
const routes = require("./routes");

let corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api", routes);

app.get("/", (req, res) => {
  res.json("Api is running");
});

app.use((err, req, res, next) => {
  err.status = err.status || 500;
  res.status(err.status).json({ status: false, message: err.message });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
