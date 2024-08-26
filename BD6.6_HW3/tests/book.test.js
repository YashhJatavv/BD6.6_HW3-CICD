let request = require("supertest");
let http = require("http");
let { getAllBooks, getBookById } = require("../controllers/index.js");
let { app } = require("../index.js");

jest.mock("../controllers/index.js", () => ({
  ...jest.requireActual("../controllers/index.js"),
  getAllBooks: jest.fn(),
  getBookById: jest.fn(),
}));

let server;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen(3001);
});

afterAll(async () => {
  server.close();
});

describe("API Endpoint tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  //Exercise 3: Test Retrieve All Books.
  it("GET /books should get all books", async () => {
    let mockBooks = [
      {
        bookId: 1,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
      },
      {
        bookId: 2,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
      },
      {
        bookId: 3,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Classic",
      },
    ];

    getAllBooks.mockReturnValue({ books: mockBooks });

    let result = await request(server).get("/books");

    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual({
      books: mockBooks,
    });
  });

  //Exercise 4: Test Retrieve Book by ID.
  it("GET /books/details/:id should return book by ID", async () => {
    let mockBook = {
      bookId: 1,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Fiction",
    };

    getBookById.mockReturnValue({ book: mockBook });

    let result = await request(server).get("/books/details/1");

    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual({
      book: mockBook,
    });
  });

  //Exercise 5: Mock the Get All Books Function.
  it("getAllBooks invoked and return correct books data", async () => {
    let mockBooks = [
      {
        bookId: 1,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
      },
      {
        bookId: 2,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
      },
      {
        bookId: 3,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Classic",
      },
    ];

    getAllBooks.mockReturnValue({ books: mockBooks });

    let result = getAllBooks();

    expect(result.books.length).toBe(3);
    expect(result).toEqual({ books: mockBooks });
  });
});
