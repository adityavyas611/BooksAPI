import mongoose from "mongoose";
import request from 'supertest';
import 'babel-polyfill';
import app from '../app';
import db from "../utils/inMemDB";
import Books from "../models/books";


const req = request(app);

jest.setTimeout(30000);

describe('PUT /book/:bookUuid/update', () => {
    beforeAll(async () => {
      await db.createConnection();
    });
  
    afterAll(async () => {
      await db.closeConnection();
      await db.cleanup();
    });

    it("should get error if no book details found by to update", async () => {        
        await req
        .put('/book/45/update')
        .expect((res) => {
          expect(res.status).toBe(500)
          expect(res.body.message).toBe("No Book Details Found to Update!");
        });
    });

    it("should update the book successfully by bookUuid", async () => {
        const bookDetails = {uuid: "15", name: "The Shiva", authorName: "Manoj"};
        const bookInformation = await Books.create(bookDetails);
        await bookInformation.save();

        await req
        .put('/book/15/update')
        .send({name: "The Destroyer", authorName: "Prakash"})
        .expect((res) => {
          expect(res.status).toBe(200)
          expect(res.body.message).toBe("Book Details Updated Successfully!")
        });
    });

    it('should throw validation error', async () => {
      const bookDetails = {releaseDate: "abcd-343-ere", authorName: "Anurag Shrivastava"};
  
      await req
      .put('/book/15/update')
      .send(bookDetails)
      .expect((res) => {
          expect(res.status).toBe(500)
          expect(res.body.message).toBe("Cast to Number failed for value \"NaN\" at path \"releaseDate\"");
      });
  });
});
