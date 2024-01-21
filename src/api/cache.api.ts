import { Router, Request, Response } from "express";

import { redisClient } from '../utils/redis';

const router = Router();

router.post('/store', (req: Request, res: Response) => {
    const data = req.body;
    console.log(JSON.stringify(data));
    for (const property in data) {
        console.log(`${property}: ${data[property]}`);
        redisClient.set(property, data[property]);
    }
    res.json({ msg: 'success' });
})

router.get('/store/:key', async (req: Request, res: Response) => {
    const { key } = req.params;
    console.log(key);
    const value: string = await redisClient.get(key);
    res.json({ data: value });
})

export default router;