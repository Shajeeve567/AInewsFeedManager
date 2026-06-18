import express from "express";

import healthRoutes from "./api/routes/health.routes.js"
import articleRoutes from "./api/routes/articles.routes.js"
import sourcesRoutes from "./api/routes/source.routes.js"
import feedRoutes from "./api/routes/feed.routes.js"

const app = express();

app.use(express.json());

app.use('/api/health', healthRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/sources', sourcesRoutes);
app.use('/api/feed', feedRoutes);


export default app;