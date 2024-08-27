import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// ROute for save a new book

router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res
        .status(400)
        .send({ message: "Title, author and publisher are required fields!" });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);

    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// ROute for getting all the books from database

router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});

    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// ROute for getting the book from database by id

router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if(!book){
        return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for updating a book by id

router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required parameters: title, author, publisher",
      });
    }

    const { id } = req.params;

    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Delete a book from the database by its ID

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBook = await Book.findByIdAndDelete(id);

    if (!deleteBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});


export default router;