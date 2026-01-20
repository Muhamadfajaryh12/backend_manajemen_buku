const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const book = require("./routes/Book.routes");
const ErrorMiddleware = require("./middleware/Error.middleware");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use(book);
app.use(ErrorMiddleware);
app.listen(PORT, () => {
  console.log(`server running in localhost: ${PORT}`);
});
