import express from 'express';

import cachingRoutes from './api/caching.api'

const app = express();
const port = process.env.PORT || 3000;

// middleware to parse incoming JSON payloads.
app.use(express.json());

// caching routes
app.use(cachingRoutes);

app.listen(port, () => {
    console.log(`Server connected on ${port}!!`);
})
