import express from 'express';

import cacheRoutes from './api/cache.api';
import pubsubRoutes from './api/pubsub.api';

const app = express();
const port = process.env.PORT || 3000;

// middleware to parse incoming JSON payloads.
app.use(express.json());

// caching routes
app.use('/cache', cacheRoutes);
// pubsub routes
app.use('/pubsub', pubsubRoutes);


app.listen(port, () => {
    console.log(`Server connected on ${port}!!`);
})
