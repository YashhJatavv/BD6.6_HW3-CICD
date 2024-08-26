let express = require("express");
let app = express();
let cors = require("cors");
let port = 3000;

app.use(cors());
app.use(express.json());

let { getAllBooks, getBookById } = require("./controllers/index.js");

//Exercise 1: Retrieve All Books.
app.get("/books", async (req, res) => {
  try {
    let result = await getAllBooks();

    if (result.length === 0) {
      return res.status(404).json({ message: "No books found." });
    }

    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Exercise 2: Retrieve Book by ID.
app.get("/books/details/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);

    let result = await getBookById(id);

    if (result.book == null) {
      return res.status(404).json({ message: "Book not found." });
    }

    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = {
  app,
  port,
};
