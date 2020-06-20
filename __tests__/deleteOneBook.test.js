import mongoose from "mongoose";
import request from 'supertest';
import 'babel-polyfill';
import app from '../app';
import db from "../utils/inMemDB";
import Books from "../models/books";


const req = request(app);

jest.setTimeout(30000);

describe('DELETE /book/:bookUuid/delete', () => {
    beforeAll(async () => {
      await db.createConnection();
    });
  
    afterAll(async () => {
      await db.closeConnection();
      await db.cleanup();
    });

    it("should get error if no book details found by bookUuid", async () => {        
        await req
        .delete('/book/45/delete')
        .expect((res) => {
          expect(res.status).toBe(500)
          expect(res.body.message).toBe("No Book Details Found to Delete!");
        });
    });

    it("should delete the book successfully by bookUuid", async () => {
        const bookDetails = {uuid: "15", name: "The Shiva", authorName: "Manoj"};
        const bookInformation = await Books.create(bookDetails);
        await bookInformation.save();

        await req
        .delete('/book/15/delete')
        .expect((res) => {
          expect(res.status).toBe(200)
          expect(res.body.message).toBe("Book Deleted Successfully!")
        });
    });
});
