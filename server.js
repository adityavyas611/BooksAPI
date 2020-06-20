import app from "./app";
import { PORT } from "./config/const";

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
