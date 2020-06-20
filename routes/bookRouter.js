import express from "express";
import { getBooks, addBook, getBook, updateBook, deleteBook} from "../controllers/booksController";

const router = express.Router();

router.get("/", getBooks);

router.get("/:bookUuid", getBook);

router.post("/add", addBook);

router.put("/:bookUuid/update", updateBook);

router.delete("/:bookUuid/delete", deleteBook);

export default router;
