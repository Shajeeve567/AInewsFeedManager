import dotenv from 'dotenv'
dotenv.config({ path: "./.env" });

import app from "./app.js"
import { startSourceScheduler } from "./schedulers/source-scheduler.js";

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server started at Port ${PORT}`);
});

startSourceScheduler()