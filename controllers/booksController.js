import _ from "lodash";
import database from "../config/dbConnection";
import Books from "../models/books";
import { getTimeStamp } from "../utils/getTimeStamp";

/**
 * @description - Function to get all books in the library
 *                If no books are present the show the respective
 *                message
 */

export const getBooks = async (req, res) => {
    try {
        const books = await Books.find({},{_id: 0, __v: 0});

        if(!_.isEmpty(books)) {
            res.send(books);
        } else {
            throw new Error("No Book Details Found!");
        }
    } catch(err) {
        res.status(500).send({message: err.message});
    }
};

/**
 * @description - Function to get book by bookUuid from the library
 *                If no book is present the show the respective
 *                message
 */

export const getBook = async (req, res) => {
    const { bookUuid } = req.params;
    try {
    const book = await Books.findOne({"uuid": bookUuid},{_id: 0, __v: 0});
    if(book) {
        res.send(book);
    } else {
        throw new Error("Book is not available!");
    }
  } catch(err) {
      res.status(500).send({message: err.message});
  }
};

/**
 * @description - Function to add book in the library
 *                getTimeStamp() - is used to convert the string date 
 *                into the timestamp
 */

export const addBook = async (req, res) => {
    let {uuid,name,releaseDate,authorName} = req.body;
    try {
        if(!uuid) {
            return res.status(400).send({message: "UUID is missing!"});
        }
        releaseDate = getTimeStamp(releaseDate);

        const bookDetails = {
            uuid,
            name,
            releaseDate,
            authorName
        };

        const book = await Books.create(bookDetails);
        await book.save();

        if(book) {
            res.send({message: "Book Details Added Successfully!"});
        } else {
            throw new Error("Book Details Cannot be added!");
        }
    } catch(err) {
        res.status(500).send({message: err.message});
    }
};

/**
 * @description - Function to update book information using bookUuid in the library
 *                If no books are present the show the respective message
 *                else update the book details and send acknowledgement message
 */

export const updateBook = async (req, res) => {
    const { bookUuid } = req.params;
    const bookDetails = req.body;
    try {
        if(bookDetails.releaseDate) {
            bookDetails.releaseDate = getTimeStamp(bookDetails.releaseDate);
        }
        const updatedBook = await Books.findOneAndUpdate({"uuid": bookUuid}, {$set: bookDetails});
        if(updatedBook) {
            res.send({message: "Book Details Updated Successfully!"});
        } else {
            throw new Error("No Book Details Found to Update!");
        }
    } catch(err) {
        res.status(500).send({message: err.message});
    }
};

/**
 * @description - Function to delete book information using bookUuid in the library
 *                If no books are present the show the respective message
 *                else delete the book and send acknowledgement message
 */

export const deleteBook = async (req, res) => {
    const { bookUuid } = req.params;
    try {
        const deletedBook = await Books.findOneAndDelete({"uuid": bookUuid});
        if(deletedBook) {
            res.send({message: "Book Deleted Successfully!"});
        } else {
            throw new Error("No Book Details Found to Delete!");
        }
    } catch (err) {
        res.status(500).send({message: err.message});
    }
};
