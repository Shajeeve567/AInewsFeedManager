import app from "./app.js"
import dotenv from 'dotenv'
import { startSourceScheduler } from "./schedulers/source-scheduler.js";
const PORT = 4000 || process.env.PORT;

dotenv.config({
    path: "./.env"
});

app.listen(PORT, () => {
    console.log(`Server started at Port ${process.env.PORT}`);
});

startSourceScheduler()