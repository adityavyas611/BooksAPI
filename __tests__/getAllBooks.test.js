import mongoose from "mongoose";
import request from 'supertest';
import 'babel-polyfill';
import app from '../app';
import db from "../utils/inMemDB";
import Books from "../models/books";


const req = request(app);

jest.setTimeout(30000);

describe('GET /book', () => {
    beforeAll(async () => {
      await db.createConnection();
    });
  
    afterAll(async () => {
      await db.closeConnection();
      await db.cleanup();
    });

    it("should get error no book details found", async () => {        
        await req
        .get('/book')
        .expect((res) => {
          expect(res.status).toBe(500)
          expect(res.body.message).toBe("No Book Details Found!");
        });
    });

    it("should get books successfully", async () => {
        const expected = [{"authorName": "Aditya Vyas", "name": "The Three Musketeers", "releaseDate": 1592628965666, "uuid": "3"}];
        const bookDetails = {uuid: "3", name: "The Three Musketeers",releaseDate: 1592628965666, authorName: "Aditya Vyas"};
        const bookInformation = await Books.create(bookDetails);
        await bookInformation.save();

        await req
        .get('/book')
        .expect((res) => {
          expect(res.status).toBe(200)
          expect(res.body).toEqual(expected)
        });
    });

    it("should not be the expected array", async () => {
        const notExpected = [{"authorName": "Aditya Vyas", "name": "The Three Musketeers", "releaseDate": 1592628965666, "uuid": "13"}];
        const bookDetails = {uuid: "4", name: "The Three",releaseDate: 1592628965666, authorName: "Aditya Vyas"};
        const bookInformation = await Books.create(bookDetails);
        await bookInformation.save();

        await req
        .get('/book')
        .expect((res) => {
          expect(res.status).toBe(200)
          expect(res.body).not.toEqual(notExpected);
        });
    });
});
