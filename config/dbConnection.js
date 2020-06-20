import mongoose, { mongo } from "mongoose";
import { dbUrl } from "./const";

mongoose.connect(dbUrl,{ useNewUrlParser: true, useUnifiedTopology: true },(err) => {
    if(err) {
        console.log(`Error Connecting to db:${err}`);
        process.exit();
    }
});
