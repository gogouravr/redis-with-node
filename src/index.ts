import express from 'express';
import { Request, Response } from 'express';

import { redisClient } from './utils/redis';

const app = express();
const port = process.env.PORT || 3000;

// middleware to parse incoming JSON payloads.
app.use(express.json());

app.post('/store', (req: Request, res: Response) => {
    const data = req.body;
    console.log(JSON.stringify(data));
    for (const property in data) {
        console.log(`${property}: ${data[property]}`);
        redisClient.set(property, data[property]);
    }
    res.json({ msg: 'success' });
})

app.get('/store/:key', async (req: Request, res: Response) => {
    const { key } = req.params;
    console.log(key);
    const value: string = await redisClient.get(key);
    res.json({ data: value });
})



app.listen(port, () => {

    console.log(`Server connected on ${port}!!`);
})
