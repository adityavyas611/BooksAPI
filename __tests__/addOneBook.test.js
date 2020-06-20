import request from 'supertest';
import 'babel-polyfill';
import app from '../app';
import db from "../utils/inMemDB";


const req = request(app);

jest.setTimeout(30000);

describe('POST /book/add', () => {
  beforeAll(async () => {
    await db.createConnection();
  });

  afterAll(async () => {
    await db.closeConnection();
    await db.cleanup();
  });

    it("should add book successfully", async () => {
        const bookDetails = { uuid: "1", name: "The Three Musketeers", releaseDate: "2012-11-02", authorName: "Aditya Vyas"};
        
        await req
        .post('/book/add')
        .send(bookDetails)
        .set('Accept', 'application/json')
        .expect((res) => {
          expect(res.status).toBe(200)
          expect(res.body.message).toBe("Book Details Added Successfully!");
        });
    });

    it("should throw error on missing Book Uuid", async () => {
        const bookDetails = {name: "The Three Musketeers", releaseDate: "2012-11-02", authorName: "Aditya Vyas"};

        await req
        .post('/book/add')
        .send(bookDetails)
        .set('Accept', 'application/json')
        .expect((res) => {
            expect(res.status).toBe(400)
            expect(res.body.message).toBe("UUID is missing!");
        });
    });

    it('should throw duplicate key error', async () => {
        const bookDetails = {uuid: "1", name: "The Two State", releaseDate: "2020-11-02", authorName: "Anurag Shrivastava"};

        await req
        .post('/book/add')
        .send(bookDetails)
        .set('Accept', 'application/json')
        .expect((res) => {
            expect(res.status).toBe(500)
            expect(res.body.message).toBe("E11000 duplicate key error dup key: { : \"1\" }");
        });
   });

   it('should throw validation error', async () => {
    const bookDetails = {uuid: "1", name: "The Two State", releaseDate: "abcd-343-ere", authorName: "Anurag Shrivastava"};

    await req
    .post('/book/add')
    .send(bookDetails)
    .set('Accept', 'application/json')
    .expect((res) => {
        expect(res.status).toBe(500)
        expect(res.body.message).toBe("Books validation failed: releaseDate: Cast to Number failed for value \"NaN\" at path \"releaseDate\"");
    });
});
});
