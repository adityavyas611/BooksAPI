import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: [true, "UUID is required"],
        unique: true    
    },
    name: { type: String, default: undefined},
    releaseDate: {type: Number, default: new Date().getTime()},
    authorName: {type: String, default: undefined}
});

const Books = mongoose.model('Books',bookSchema,'Books');

export default Books;
