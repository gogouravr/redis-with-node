import express from 'express';

import cacheRoutes from './api/cache.api';
import pubsubRoutes from './api/pubsub.api';
import msgQueueRoutes from './api/msgQueue.api';

const app = express();
const port = process.env.PORT || 3000;

// middleware to parse incoming JSON payloads.
app.use(express.json());

// caching routes
app.use('/cache', cacheRoutes);
// pubsub routes
app.use('/pub-sub', pubsubRoutes);
// message queue routes
app.use('/message-queue', msgQueueRoutes);


app.listen(port, () => {
    console.log(`Server connected on ${port}!!`);
})
