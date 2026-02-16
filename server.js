const express = require('express');
const app = express();

app.use(express.json());

const PORT = 3000;

// In-memory book storage
let books = [
    { id: 1, title: "Atomic Habits", author: "James Clear" },
    { id: 2, title: "The Alchemist", author: "Paulo Coelho" }
];

// GET all books
app.get('/books', (req, res) => {
    res.json(books);
});

// POST add new book
app.post('/books', (req, res) => {
    const { title, author } = req.body;

    const newBook = {
        id: books.length ? books[books.length - 1].id + 1 : 1,
        title,
        author
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT update book
app.put('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, author } = req.body;

    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    book.title = title || book.title;
    book.author = author || book.author;

    res.json(book);
});

// DELETE book
app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = books.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Book not found" });
    }

    const deletedBook = books.splice(index, 1);
    res.json(deletedBook);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

