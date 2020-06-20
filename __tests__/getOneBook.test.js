import mongoose from "mongoose";
import request from 'supertest';
import 'babel-polyfill';
import app from '../app';
import db from "../utils/inMemDB";
import Books from "../models/books";


const req = request(app);

jest.setTimeout(30000);

describe('GET /book/:bookUuid', () => {
    beforeAll(async () => {
      await db.createConnection();
    });
  
    afterAll(async () => {
      await db.closeConnection();
      await db.cleanup();
    });

    it("should get error if no book details found by bookUuid", async () => {        
        await req
        .get('/book/15')
        .expect((res) => {
          expect(res.status).toBe(500)
          expect(res.body.message).toBe("Book is not available!");
        });
    });

    it("should get the book successfully by bookUuid", async () => {
        const bookDetails = {uuid: "5", name: "The Shiva", authorName: "Manoj"};
        const bookInformation = await Books.create(bookDetails);
        await bookInformation.save();

        await req
        .get('/book/5')
        .expect((res) => {
          expect(res.status).toBe(200)
          expect(res.body).toHaveProperty("name")
          expect(res.body).toHaveProperty("authorName")
          expect(res.body).toHaveProperty("releaseDate")
        });
    });
});
