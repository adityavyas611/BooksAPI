import express from "express";
import bodParser from "body-parser";
import bookRouter from "./routes/bookRouter";

const app = express();

app.use(bodParser.urlencoded({extended: true}));
app.use(bodParser.json());
app.use('/book',bookRouter);

app.get("/", (req, res) => {
    res.send("Welcome To Books Library");
});

export default app;
