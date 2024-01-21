import express from 'express';

import cacheRoutes from './api/cache.api'

const app = express();
const port = process.env.PORT || 3000;

// middleware to parse incoming JSON payloads.
app.use(express.json());

// caching routes
app.use('/cache', cacheRoutes);



app.listen(port, () => {
    console.log(`Server connected on ${port}!!`);
})
