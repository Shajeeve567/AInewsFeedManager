import app from "./app.js"
import dotenv from 'dotenv'
const PORT = 4000 || process.env.PORT;

dotenv.config({
    path: "./.env"
});

app.listen(PORT, () => {
    console.log(`Server started at Port ${process.env.PORT}`);
});

