const express = require("express"),
      bodyParser = require("body-parser"),
      http = require("http"),
      morgan = require("morgan"),
      dishRouter = require("./routes/dishRouter"),
      promotinRouter = require("./routes/promotionRouter"),
      leaderRouter = require("./routes/leaderRouter"),
      hostname = "localhost",
      port = 3001;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.use("/dishes", dishRouter);
app.use("/promotions", promotinRouter);
app.use("/leaders", leaderRouter);



const server = http.createServer(app);
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });